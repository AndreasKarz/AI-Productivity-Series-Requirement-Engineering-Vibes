import { convert } from 'pdf-poppler';
import path from 'path';
import fs from 'fs-extra';

async function testConvert() {
    const pdfPath = path.resolve('C:/Users/karz/ARE/.assets/Grundlagen der Zusammenarbeit.pdf');
    console.log('Testing PDF path:', pdfPath);
    console.log('File exists:', await fs.pathExists(pdfPath));

    try {
        const options = {
            format: 'png',
            out_dir: '.',
            out_prefix: 'debug',
            page: 1,
            scale: 1.0,
            quality: 100
        };

        console.log('Options:', options);
        const result = await convert(pdfPath, options);
        console.log('Result:', result);
    } catch (error) {
        console.error('Error details:', error);
        console.error('Error command:', error.cmd);
    }
}

testConvert();