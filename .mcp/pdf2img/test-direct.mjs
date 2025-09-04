import { exec } from 'child_process';
import { promisify } from 'util';
import path from 'path';
import { fileURLToPath } from 'url';

const execAsync = promisify(exec);
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function testDirect() {
    const pdfPath = "C:\\Users\\karz\\ARE\\.assets\\Grundlagen der Zusammenarbeit.pdf";
    const pdfInfoPath = path.join(__dirname, 'node_modules', 'pdf-poppler', 'lib', 'win', 'poppler-0.51', 'bin', 'pdfinfo.exe');

    console.log('pdfinfo path:', pdfInfoPath);
    console.log('PDF path:', pdfPath);

    try {
        const { stdout } = await execAsync(`"${pdfInfoPath}" "${pdfPath}"`);
        console.log('PDF Info output:');
        console.log(stdout);

        const pageMatch = stdout.match(/Pages:\s+(\d+)/);
        const sizeMatch = stdout.match(/Page size:\s+([\d.]+) x ([\d.]+) pts/);

        console.log('Pages:', pageMatch ? pageMatch[1] : 'not found');
        console.log('Size:', sizeMatch ? `${sizeMatch[1]} x ${sizeMatch[2]}` : 'not found');

    } catch (error) {
        console.error('Error:', error);
    }
}

testDirect();