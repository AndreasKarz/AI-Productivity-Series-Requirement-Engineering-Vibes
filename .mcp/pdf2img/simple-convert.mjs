import { exec } from 'child_process';
import { promisify } from 'util';
import Jimp from 'jimp';
import fs from 'fs-extra';
import path from 'path';
import os from 'os';
import { v4 as uuidv4 } from 'uuid';
import { fileURLToPath } from 'url';

const execAsync = promisify(exec);
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function convertPdfToPng() {
    const pdfPath = "C:\\Users\\karz\\ARE\\.assets\\Grundlagen der Zusammenarbeit.pdf";

    // Create output in .assets directory
    const workspaceRoot = process.cwd().replace('\\.mcp\\pdf2img', ''); // Go back to root
    const assetsDir = path.join(workspaceRoot, '.assets');
    await fs.ensureDir(assetsDir);

    // Generate filename from PDF
    const pdfBasename = path.basename(pdfPath, path.extname(pdfPath));
    const sanitizedName = pdfBasename.replace(/[^a-zA-Z0-9_-]/g, '_').toLowerCase();
    const outputPath = path.join(assetsDir, `${sanitizedName}_converted.png`);

    const dpi = 300;

    // Create temporary directory
    const tempDir = path.join(os.tmpdir(), `pdf2img-${uuidv4()}`);
    await fs.ensureDir(tempDir);

    try {
        // Path to poppler binaries
        const popplerDir = path.join(__dirname, 'node_modules', 'pdf-poppler', 'lib', 'win', 'poppler-0.51', 'bin');
        const pdfInfoPath = path.join(popplerDir, 'pdfinfo.exe');
        const pdftocairoPath = path.join(popplerDir, 'pdftocairo.exe');

        console.log('Getting PDF info...');
        const { stdout } = await execAsync(`"${pdfInfoPath}" "${pdfPath}"`);
        console.log('PDF Info:', stdout);
        const pageMatch = stdout.match(/Pages:\s+(\d+)/);
        const totalPages = pageMatch ? parseInt(pageMatch[1]) : 1;

        console.log(`PDF has ${totalPages} pages`);

        // Convert each page
        const pageImages = [];
        let maxWidth = 0;
        let totalHeight = 0;

        for (let pageNum = 1; pageNum <= totalPages; pageNum++) {
            console.log(`Converting page ${pageNum}...`);
            const outputPrefix = path.join(tempDir, `page-${pageNum}`);

            // Convert single page
            const cmd = `"${pdftocairoPath}" -png -f ${pageNum} -l ${pageNum} -r ${dpi} "${pdfPath}" "${outputPrefix}"`;

            console.log('Command:', cmd);
            const result = await execAsync(cmd);
            console.log('Result:', result);

            // pdftocairo uses a running counter: page-1-01.png, page-2-02.png, etc.
            const actualOutputFile = `${outputPrefix}-${pageNum.toString().padStart(2, '0')}.png`;

            // Read the image
            const image = await Jimp.read(actualOutputFile);
            pageImages.push(image);
            totalHeight += image.getHeight();
            maxWidth = Math.max(maxWidth, image.getWidth());
        }

        console.log(`Combining ${totalPages} pages...`);

        // Create combined image
        const combinedImage = new Jimp(maxWidth, totalHeight);
        let currentY = 0;

        for (const pageImage of pageImages) {
            const x = Math.floor((maxWidth - pageImage.getWidth()) / 2);
            combinedImage.composite(pageImage, x, currentY);
            currentY += pageImage.getHeight();
        }

        // Save
        await combinedImage.writeAsync(outputPath);

        const stats = await fs.stat(outputPath);
        const fileSizeMB = (stats.size / (1024 * 1024)).toFixed(2);

        console.log(`✅ Success!`);
        console.log(`📄 Source: ${pdfPath}`);
        console.log(`🖼️ Output: ${outputPath}`);
        console.log(`📏 Dimensions: ${maxWidth}x${totalHeight} pixels`);
        console.log(`📊 Pages: ${totalPages}`);
        console.log(`🎯 DPI: ${dpi}`);
        console.log(`📦 Size: ${fileSizeMB} MB`);

    } catch (error) {
        console.error('Error:', error);
    } finally {
        // Cleanup
        await fs.remove(tempDir);
    }
}

convertPdfToPng();