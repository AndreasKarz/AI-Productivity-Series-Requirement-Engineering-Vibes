import { exec } from 'child_process';
import { promisify } from 'util';
import path from 'path';
import fs from 'fs-extra';
import os from 'os';
import { v4 as uuidv4 } from 'uuid';

const execAsync = promisify(exec);

const pdfPath = 'C:\\Users\\karz\\ARE\\.assets\\Grundlagen der Zusammenarbeit.pdf';
const pdftocairoPath = 'C:\\Users\\karz\\ARE\\.mcp\\pdf2img\\node_modules\\pdf-poppler\\lib\\win\\poppler-0.51\\bin\\pdftocairo.exe';
const outputPath = 'C:\\Users\\karz\\ARE\\last_page_signature.png';

console.log('Extracting last page (page 10) for signature analysis...');

// Create temp directory
const tempDir = path.join(os.tmpdir(), `pdf2img-signature-${uuidv4()}`);
await fs.ensureDir(tempDir);

// Convert only last page (page 10) at high resolution for better analysis
const outputPrefix = path.join(tempDir, 'signature-page');
const cmd = `"${pdftocairoPath}" -png -f 10 -l 10 -r 300 "${pdfPath}" "${outputPrefix}"`;

console.log('Command:', cmd);
const result = await execAsync(cmd);
console.log('Conversion result:', result);

// The file will be named signature-page-10.png
const tempFile = `${outputPrefix}-10.png`;

// Copy to final location
await fs.copy(tempFile, outputPath);

// Get file stats
const stats = await fs.stat(outputPath);
const fileSizeMB = (stats.size / (1024 * 1024)).toFixed(2);

console.log(`✅ Last page extracted successfully!`);
console.log(`📄 Source: Page 10 of ${pdfPath}`);
console.log(`🖼️ Output: ${outputPath}`);
console.log(`📦 Size: ${fileSizeMB} MB`);

// Cleanup temp directory
await fs.remove(tempDir);

console.log(`\n🔍 Ready for signature analysis!`);
console.log(`You can now examine the signature on: ${outputPath}`);