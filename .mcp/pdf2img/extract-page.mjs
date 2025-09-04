import { exec } from 'child_process';
import { promisify } from 'util';
import path from 'path';
import fs from 'fs-extra';
import os from 'os';
import { v4 as uuidv4 } from 'uuid';

const execAsync = promisify(exec);

// Get PDF path and optional page number from command line arguments
const pdfPath = process.argv[2];
const pageNumber = process.argv[3] ? parseInt(process.argv[3]) : null;

if (!pdfPath) {
    console.error('❌ Error: Please provide PDF path as argument');
    console.error('Usage: node extract-page.mjs "path/to/document.pdf" [page-number]');
    console.error('Note: If page-number is not specified, the last page will be extracted');
    process.exit(1);
}

// Verify PDF exists
if (!await fs.pathExists(pdfPath)) {
    console.error(`❌ Error: PDF file not found: ${pdfPath}`);
    process.exit(1);
}

// Dynamic path resolution for poppler tools (works for any user)
const scriptDir = path.dirname(new URL(import.meta.url).pathname.slice(1)); // Remove leading slash on Windows
const popplerBinPath = path.join(scriptDir, 'node_modules', 'pdf-poppler', 'lib', 'win', 'poppler-0.51', 'bin');
const pdftocairoPath = path.join(popplerBinPath, 'pdftocairo.exe');
const pdfinfoPath = path.join(popplerBinPath, 'pdfinfo.exe');

// Verify poppler tools exist
if (!await fs.pathExists(pdftocairoPath)) {
    console.error(`❌ Error: pdftocairo.exe not found at: ${pdftocairoPath}`);
    console.error('Please ensure pdf-poppler is properly installed in node_modules');
    process.exit(1);
}

if (!await fs.pathExists(pdfinfoPath)) {
    console.error(`❌ Error: pdfinfo.exe not found at: ${pdfinfoPath}`);
    console.error('Please ensure pdf-poppler is properly installed in node_modules');
    process.exit(1);
}

// Get total page count first
console.log('📋 Getting PDF info...');
const infoResult = await execAsync(`"${pdfinfoPath}" "${pdfPath}"`);
const pageMatch = infoResult.stdout.match(/Pages:\s+(\d+)/);
const totalPages = pageMatch ? parseInt(pageMatch[1]) : 10;

// Determine which page to extract
let targetPage;
if (pageNumber) {
    if (pageNumber < 1 || pageNumber > totalPages) {
        console.error(`❌ Error: Page ${pageNumber} is out of range. PDF has ${totalPages} pages.`);
        process.exit(1);
    }
    targetPage = pageNumber;
    console.log(`🎯 Extracting page ${targetPage} from: ${path.basename(pdfPath)}`);
} else {
    targetPage = totalPages;
    console.log(`🎯 Extracting last page (${targetPage}) from: ${path.basename(pdfPath)}`);
}

// Generate output filename in the same directory as the input PDF
const pdfDir = path.dirname(path.resolve(pdfPath));
const pdfBasename = path.basename(pdfPath, path.extname(pdfPath));
const sanitizedName = pdfBasename.replace(/[^a-zA-Z0-9_-]/g, '_').toLowerCase();
const outputPath = path.join(pdfDir, `${sanitizedName}_page_${targetPage}.png`);

console.log(`🎯 Extracting page ${targetPage} of ${totalPages} from: ${path.basename(pdfPath)}`);

// Create temp directory
const tempDir = path.join(os.tmpdir(), `pdf2img-signature-${uuidv4()}`);
await fs.ensureDir(tempDir);

// Convert specified page at high resolution
const outputPrefix = path.join(tempDir, 'signature-page');
const cmd = `"${pdftocairoPath}" -png -f ${targetPage} -l ${targetPage} -r 300 "${pdfPath}" "${outputPrefix}"`;

const result = await execAsync(cmd);

// The file will be named signature-page-{targetPage}.png - try different naming patterns
let tempFile;
const expectedPatterns = [
    `${outputPrefix}-${targetPage.toString().padStart(2, '0')}.png`,  // 01, 02, 03
    `${outputPrefix}-${targetPage}.png`,                               // 1, 2, 3
    `${outputPrefix}-${targetPage.toString().padStart(3, '0')}.png`    // 001, 002, 003
];

// Find which file was actually created
for (const pattern of expectedPatterns) {
    if (await fs.pathExists(pattern)) {
        tempFile = pattern;
        break;
    }
}

if (!tempFile) {
    // List files to debug
    const tempFiles = await fs.readdir(tempDir);
    console.error(`❌ Error: Could not find expected output file. Files in temp dir:`, tempFiles);
    console.error(`❌ Expected one of:`, expectedPatterns);
    process.exit(1);
}

// Copy to final location
await fs.copy(tempFile, outputPath);

// Get file stats
const stats = await fs.stat(outputPath);
const fileSizeMB = (stats.size / (1024 * 1024)).toFixed(2);

console.log(`✅ Page ${targetPage} extracted successfully!`);
console.log(`️ Output: ${outputPath}`);
console.log(`📦 Size: ${fileSizeMB} MB`);

// Cleanup temp directory
await fs.remove(tempDir);