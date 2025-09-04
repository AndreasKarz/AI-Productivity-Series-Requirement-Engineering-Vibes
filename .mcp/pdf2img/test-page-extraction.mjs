import { exec } from 'child_process';
import { promisify } from 'util';
import path from 'path';
import fs from 'fs-extra';
import os from 'os';
import { v4 as uuidv4 } from 'uuid';
import Jimp from 'jimp';

const execAsync = promisify(exec);

// Test extracting specific pages
const pdfPath = "C:\\Users\\karz\\ARE\\.assets\\Grundlagen der Zusammenarbeit.pdf";
const pdftocairoPath = "C:\\Users\\karz\\ARE\\.mcp\\pdf2img\\node_modules\\pdf-poppler\\lib\\win\\poppler-0.51\\bin\\pdftocairo.exe";
const pdfinfoPath = "C:\\Users\\karz\\ARE\\.mcp\\pdf2img\\node_modules\\pdf-poppler\\lib\\win\\poppler-0.51\\bin\\pdfinfo.exe";

async function extractPage(pageNumber, dpi = 300) {
    console.log(`\\n🔍 Extracting page ${pageNumber}...`);

    // Get total pages first
    const { stdout: infoOutput } = await execAsync(`"${pdfinfoPath}" "${pdfPath}"`);
    const pageMatch = infoOutput.match(/Pages:\s+(\d+)/);
    const totalPages = pageMatch ? parseInt(pageMatch[1]) : 1;

    if (pageNumber < 1 || pageNumber > totalPages) {
        throw new Error(`Invalid page number ${pageNumber}. PDF has ${totalPages} pages.`);
    }

    // Create temp directory
    const tempDir = path.join(os.tmpdir(), `pdf2img-page-test-${uuidv4()}`);
    await fs.ensureDir(tempDir);

    try {
        // Convert the specific page
        const outputPrefix = path.join(tempDir, `page-${pageNumber}`);
        const cmd = `"${pdftocairoPath}" -png -f ${pageNumber} -l ${pageNumber} -r ${dpi} "${pdfPath}" "${outputPrefix}"`;

        console.log('Command:', cmd);
        const result = await execAsync(cmd);

        // The file will have the format page-X-XX.png
        const actualOutputFile = `${outputPrefix}-${pageNumber.toString().padStart(2, '0')}.png`;

        if (!await fs.pathExists(actualOutputFile)) {
            throw new Error(`Failed to create page image: ${actualOutputFile}`);
        }

        // Create output in .assets directory
        const workspaceRoot = process.cwd().replace('\\\\.mcp\\\\pdf2img', '');
        const assetsDir = path.join(workspaceRoot, '.assets');
        await fs.ensureDir(assetsDir);

        const pdfBasename = path.basename(pdfPath, path.extname(pdfPath));
        const sanitizedName = pdfBasename.replace(/[^a-zA-Z0-9_-]/g, '_').toLowerCase();
        const finalOutputPath = path.join(assetsDir, `${sanitizedName}_page_${pageNumber}.png`);

        // Copy to final location
        await fs.copy(actualOutputFile, finalOutputPath);

        // Get file info
        const stats = await fs.stat(finalOutputPath);
        const fileSizeMB = (stats.size / (1024 * 1024)).toFixed(2);

        // Read image dimensions
        const image = await Jimp.read(finalOutputPath);
        const width = image.getWidth();
        const height = image.getHeight();

        console.log('✅ Success!');
        console.log(`📄 Source: ${pdfPath}`);
        console.log(`📑 Page: ${pageNumber} of ${totalPages}`);
        console.log(`🖼️ Output: ${finalOutputPath}`);
        console.log(`📏 Dimensions: ${width}x${height} pixels`);
        console.log(`🎯 DPI: ${dpi}`);
        console.log(`📦 Size: ${fileSizeMB} MB`);

        return finalOutputPath;

    } finally {
        // Cleanup
        await fs.remove(tempDir);
    }
}

// Test extracting different pages
async function testExtraction() {
    try {
        console.log('🧪 Testing page extraction...');

        // Test page 1 (title page)
        await extractPage(1);

        // Test page 10 (last page with signature)
        await extractPage(10);

        // Test page 5 (middle page)
        await extractPage(5);

        console.log('\\n🎉 All page extractions completed successfully!');

    } catch (error) {
        console.error('❌ Error:', error.message);
    }
}

testExtraction();