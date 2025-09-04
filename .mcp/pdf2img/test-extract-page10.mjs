// Simple test for the new extract_pdf_page functionality
import { exec } from 'child_process';
import { promisify } from 'util';
import path from 'path';
import fs from 'fs-extra';
import os from 'os';
import { v4 as uuidv4 } from 'uuid';
import Jimp from 'jimp';

const execAsync = promisify(exec);

const pdfPath = "C:\\Users\\karz\\ARE\\.assets\\Grundlagen der Zusammenarbeit.pdf";
const pageNumber = 10; // Last page with signature
const dpi = 300;

// Simulate the extractPdfPage function
async function extractPdfPageSimulation() {
    console.log(`🔍 Extracting page ${pageNumber} from PDF...`);

    const popplerPath = path.join(process.cwd(), 'node_modules', 'pdf-poppler', 'lib', 'win', 'poppler-0.51', 'bin', 'pdftocairo.exe');
    const pdfinfoPath = path.join(process.cwd(), 'node_modules', 'pdf-poppler', 'lib', 'win', 'poppler-0.51', 'bin', 'pdfinfo.exe');

    // Get total pages
    const { stdout: infoOutput } = await execAsync(`"${pdfinfoPath}" "${pdfPath}"`);
    const pageMatch = infoOutput.match(/Pages:\s+(\d+)/);
    const totalPages = pageMatch ? parseInt(pageMatch[1]) : 1;

    console.log(`PDF has ${totalPages} pages`);

    if (pageNumber < 1 || pageNumber > totalPages) {
        throw new Error(`Invalid page number ${pageNumber}. PDF has ${totalPages} pages.`);
    }

    // Create temp directory
    const tempDir = path.join(os.tmpdir(), `pdf2img-extract-${uuidv4()}`);
    await fs.ensureDir(tempDir);

    try {
        // Convert the specific page
        const outputPrefix = path.join(tempDir, `page-${pageNumber}`);
        const cmd = `"${popplerPath}" -png -f ${pageNumber} -l ${pageNumber} -r ${dpi} "${pdfPath}" "${outputPrefix}"`;

        console.log('Executing:', cmd);
        await execAsync(cmd);

        // The file will have the format page-X-XX.png
        const actualOutputFile = `${outputPrefix}-${pageNumber.toString().padStart(2, '0')}.png`;

        if (!await fs.pathExists(actualOutputFile)) {
            throw new Error(`Failed to create page image: ${actualOutputFile}`);
        }

        // Create output in correct .assets directory
        const workspaceRoot = path.resolve('../../'); // Go up two levels from .mcp/pdf2img
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

extractPdfPageSimulation().catch(console.error);