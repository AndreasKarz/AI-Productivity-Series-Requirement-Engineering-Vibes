import { exec } from 'child_process';
import { promisify } from 'util';
import path from 'path';
import fs from 'fs-extra';
import os from 'os';
import { v4 as uuidv4 } from 'uuid';

const execAsync = promisify(exec);

const pdfPath = 'C:\\Users\\karz\\ARE\\.assets\\Grundlagen der Zusammenarbeit.pdf';
const pdftocairoPath = 'C:\\Users\\karz\\ARE\\.mcp\\pdf2img\\node_modules\\pdf-poppler\\lib\\win\\poppler-0.51\\bin\\pdftocairo.exe';

// Create temp directory
const tempDir = path.join(os.tmpdir(), `pdf2img-debug-${uuidv4()}`);
await fs.ensureDir(tempDir);

console.log(`Temp directory: ${tempDir}`);

// Test first 3 pages only
for (let pageNum = 1; pageNum <= 3; pageNum++) {
    console.log(`\nConverting page ${pageNum}...`);
    const outputPrefix = path.join(tempDir, `page-${pageNum}`);

    // Convert single page
    const cmd = `"${pdftocairoPath}" -png -f ${pageNum} -l ${pageNum} -r 300 "${pdfPath}" "${outputPrefix}"`;
    console.log('Command:', cmd);

    try {
        const result = await execAsync(cmd);
        console.log('Success:', result);

        // List what files were created
        const files = await fs.readdir(tempDir);
        console.log('Files in temp dir:', files);

        // Look for the actual file
        const expectedFile = `${outputPrefix}-01.png`;
        const exists = await fs.pathExists(expectedFile);
        console.log(`Expected file ${expectedFile} exists: ${exists}`);

        if (exists) {
            const stats = await fs.stat(expectedFile);
            console.log(`File size: ${stats.size} bytes`);
        }

    } catch (error) {
        console.error('Error:', error);
    }
}

console.log(`\nFinal temp directory contents:`);
const allFiles = await fs.readdir(tempDir);
console.log(allFiles);

// Don't cleanup so we can inspect
console.log(`\nTemp directory preserved: ${tempDir}`);