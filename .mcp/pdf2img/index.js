#!/usr/bin/env node

import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import {
    CallToolRequestSchema,
    ListToolsRequestSchema,
} from '@modelcontextprotocol/sdk/types.js';
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

class PDF2ImgMCP {
    constructor() {
        this.server = new Server(
            {
                name: 'pdf2img-mcp',
                version: '1.0.0',
            },
            {
                capabilities: {
                    tools: {},
                },
            }
        );

        this.setupToolHandlers();
        this.setupErrorHandling();
    }

    setupToolHandlers() {
        this.server.setRequestHandler(ListToolsRequestSchema, async () => {
            return {
                tools: [
                    {
                        name: 'convert_pdf_to_png',
                        description: 'Converts a PDF file to a high-quality PNG image. For multi-page PDFs, creates a single long image containing all pages. Optimized for OCR processing.',
                        inputSchema: {
                            type: 'object',
                            properties: {
                                pdfPath: {
                                    type: 'string',
                                    description: 'Absolute path to the PDF file to convert'
                                },
                                outputPath: {
                                    type: 'string',
                                    description: 'Absolute path where the PNG image should be saved (optional, will use temp directory if not provided)'
                                },
                                dpi: {
                                    type: 'number',
                                    description: 'DPI for the conversion (default: 300, higher values for better OCR quality)',
                                    default: 300
                                },
                                format: {
                                    type: 'string',
                                    description: 'Output format (png or jpeg)',
                                    enum: ['png', 'jpeg'],
                                    default: 'png'
                                }
                            },
                            required: ['pdfPath']
                        }
                    },
                    {
                        name: 'get_pdf_info',
                        description: 'Gets information about a PDF file including number of pages and estimated output dimensions',
                        inputSchema: {
                            type: 'object',
                            properties: {
                                pdfPath: {
                                    type: 'string',
                                    description: 'Absolute path to the PDF file'
                                }
                            },
                            required: ['pdfPath']
                        }
                    },
                    {
                        name: 'extract_pdf_page',
                        description: 'Extracts a specific page from a PDF as a PNG image',
                        inputSchema: {
                            type: 'object',
                            properties: {
                                pdfPath: {
                                    type: 'string',
                                    description: 'Absolute path to the PDF file'
                                },
                                pageNumber: {
                                    type: 'number',
                                    description: 'Page number to extract (1-based)'
                                },
                                outputPath: {
                                    type: 'string',
                                    description: 'Absolute path where the PNG image should be saved (optional, will use .assets directory if not provided)'
                                },
                                dpi: {
                                    type: 'number',
                                    description: 'DPI for the conversion (default: 300)',
                                    default: 300
                                }
                            },
                            required: ['pdfPath', 'pageNumber']
                        }
                    }
                ]
            };
        });

        this.server.setRequestHandler(CallToolRequestSchema, async (request) => {
            const { name, arguments: args } = request.params;

            try {
                if (name === 'convert_pdf_to_png') {
                    return await this.convertPdfToPng(args);
                } else if (name === 'get_pdf_info') {
                    return await this.getPdfInfo(args);
                } else if (name === 'extract_pdf_page') {
                    return await this.extractPdfPage(args);
                } else {
                    throw new Error(`Unknown tool: ${name}`);
                }
            } catch (error) {
                const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
                return {
                    content: [
                        {
                            type: 'text',
                            text: `Error: ${errorMessage}`
                        }
                    ],
                    isError: true
                };
            }
        });
    }

    async convertPdfToPng(args) {
        const { pdfPath, outputPath, dpi = 300, format = 'png' } = args;

        // Validate input file exists
        if (!await fs.pathExists(pdfPath)) {
            throw new Error(`PDF file does not exist: ${pdfPath}`);
        }

        // Create temporary directory for individual page images
        const tempDir = path.join(os.tmpdir(), `pdf2img-${uuidv4()}`);
        await fs.ensureDir(tempDir);

        try {
            // Get path to pdftocairo
            const popplerPath = path.join(__dirname, 'node_modules', 'pdf-poppler', 'lib', 'win', 'poppler-0.51', 'bin', 'pdftocairo.exe');

            if (!await fs.pathExists(popplerPath)) {
                throw new Error(`pdftocairo not found at: ${popplerPath}`);
            }

            console.error(`Converting PDF: ${pdfPath} with DPI: ${dpi}`);

            // First, get the number of pages
            const pdfinfoPath = path.join(__dirname, 'node_modules', 'pdf-poppler', 'lib', 'win', 'poppler-0.51', 'bin', 'pdfinfo.exe');
            const { stdout: infoOutput } = await execAsync(`"${pdfinfoPath}" "${pdfPath}"`);
            const pageMatch = infoOutput.match(/Pages:\s+(\d+)/);
            const totalPages = pageMatch ? parseInt(pageMatch[1]) : 1;

            console.error(`PDF has ${totalPages} pages`);

            // Convert each page individually
            const pageImages = [];
            let maxWidth = 0;
            let totalHeight = 0;

            for (let pageNum = 1; pageNum <= totalPages; pageNum++) {
                console.log(`Converting page ${pageNum}...`);
                const outputPrefix = path.join(tempDir, `page-${pageNum}`);

                // Convert single page with pdftocairo at specified DPI
                const cmd = `"${popplerPath}" -png -f ${pageNum} -l ${pageNum} -r ${dpi} "${pdfPath}" "${outputPrefix}"`;

                const result = await execAsync(cmd);

                // pdftocairo uses a running counter: page-1-1.png, page-2-2.png, etc.
                const actualOutputFile = `${outputPrefix}-${pageNum}.png`;

                // Read the generated image
                const image = await Jimp.read(actualOutputFile);
                pageImages.push(image);
                totalHeight += image.getHeight();
                maxWidth = Math.max(maxWidth, image.getWidth());
            }

            console.error(`Converted ${totalPages} pages`);

            // Create combined image
            const combinedImage = new Jimp(maxWidth, totalHeight);
            let currentY = 0;

            for (const pageImage of pageImages) {
                // Center the page if it's narrower than the maximum width
                const x = Math.floor((maxWidth - pageImage.getWidth()) / 2);
                combinedImage.composite(pageImage, x, currentY);
                currentY += pageImage.getHeight();
            }

            // Determine output path - default to .assets directory
            let finalOutputPath;
            if (outputPath) {
                finalOutputPath = outputPath;
            } else {
                // Default to .assets directory in workspace root
                const workspaceRoot = process.cwd();
                const assetsDir = path.join(workspaceRoot, '.assets');
                await fs.ensureDir(assetsDir);

                // Generate filename from PDF name
                const pdfBasename = path.basename(pdfPath, path.extname(pdfPath));
                const sanitizedName = pdfBasename.replace(/[^a-zA-Z0-9_-]/g, '_').toLowerCase();
                finalOutputPath = path.join(assetsDir, `${sanitizedName}_converted.${format}`);
            }
            await fs.ensureDir(path.dirname(finalOutputPath));

            // Save the combined image
            if (format === 'png') {
                await combinedImage.writeAsync(finalOutputPath);
            } else {
                await combinedImage.quality(95).writeAsync(finalOutputPath);
            }

            // Get file info
            const stats = await fs.stat(finalOutputPath);
            const fileSizeMB = (stats.size / (1024 * 1024)).toFixed(2);

            return {
                content: [
                    {
                        type: 'text',
                        text: `Successfully converted PDF to ${format.toUpperCase()}\n\n` +
                            `📄 Source: ${pdfPath}\n` +
                            `🖼️ Output: ${finalOutputPath}\n` +
                            `📏 Dimensions: ${maxWidth}x${totalHeight} pixels\n` +
                            `📊 Pages combined: ${totalPages}\n` +
                            `🎯 DPI: ${dpi}\n` +
                            `📦 File size: ${fileSizeMB} MB\n\n` +
                            `The image is optimized for OCR processing and maintains all visual elements ` +
                            `(text, images, graphics, signatures) in their original positions.`
                    }
                ]
            };

        } finally {
            // Cleanup temporary directory
            try {
                await fs.remove(tempDir);
            } catch (cleanupError) {
                console.error('Warning: Could not cleanup temp directory:', cleanupError);
            }
        }
    }

    async getPdfInfo(args) {
        const { pdfPath } = args;

        if (!await fs.pathExists(pdfPath)) {
            throw new Error(`PDF file does not exist: ${pdfPath}`);
        }

        try {
            // Get path to pdfinfo
            const pdfinfoPath = path.join(__dirname, 'node_modules', 'pdf-poppler', 'lib', 'win', 'poppler-0.51', 'bin', 'pdfinfo.exe');

            if (!await fs.pathExists(pdfinfoPath)) {
                throw new Error(`pdfinfo not found at: ${pdfinfoPath}`);
            }

            // Get PDF information
            const { stdout } = await execAsync(`"${pdfinfoPath}" "${pdfPath}"`);

            // Parse output
            const pageMatch = stdout.match(/Pages:\s+(\d+)/);
            const sizeMatch = stdout.match(/Page size:\s+([\d.]+) x ([\d.]+) pts/);

            const totalPages = pageMatch ? parseInt(pageMatch[1]) : 0;
            const pageWidthPts = sizeMatch ? parseFloat(sizeMatch[1]) : 595;
            const pageHeightPts = sizeMatch ? parseFloat(sizeMatch[2]) : 842;

            // Calculate dimensions at 300 DPI
            const dpi = 300;
            const pageWidth = Math.round((pageWidthPts / 72) * dpi);
            const pageHeight = Math.round((pageHeightPts / 72) * dpi);
            const estimatedHeight = pageHeight * totalPages;

            const stats = await fs.stat(pdfPath);
            const fileSizeMB = (stats.size / (1024 * 1024)).toFixed(2);

            return {
                content: [
                    {
                        type: 'text',
                        text: `PDF Information\n\n` +
                            `📄 File: ${pdfPath}\n` +
                            `📦 File size: ${fileSizeMB} MB\n` +
                            `📑 Total pages: ${totalPages}\n` +
                            `📏 Page dimensions: ${pageWidth}x${pageHeight} pixels (at 300 DPI)\n` +
                            `📐 Estimated output: ${pageWidth}x${estimatedHeight} pixels\n` +
                            `🎯 Recommended DPI: 300 (for OCR) or 150 (for display)\n\n` +
                            `Note: The final combined image will be ${pageWidth} pixels wide and ` +
                            `${estimatedHeight} pixels tall, containing all ${totalPages} pages stacked vertically.`
                    }
                ]
            };

        } catch (error) {
            throw new Error(`Could not read PDF information: ${error instanceof Error ? error.message : 'Unknown error'}`);
        }
    }

    async extractPdfPage(args) {
        const { pdfPath, pageNumber, outputPath, dpi = 300 } = args;

        if (!await fs.pathExists(pdfPath)) {
            throw new Error(`PDF file does not exist: ${pdfPath}`);
        }

        // Get path to poppler tools
        const popplerPath = path.join(__dirname, 'node_modules', 'pdf-poppler', 'lib', 'win', 'poppler-0.51', 'bin', 'pdftocairo.exe');
        const pdfinfoPath = path.join(__dirname, 'node_modules', 'pdf-poppler', 'lib', 'win', 'poppler-0.51', 'bin', 'pdfinfo.exe');

        if (!await fs.pathExists(popplerPath)) {
            throw new Error(`pdftocairo not found at: ${popplerPath}`);
        }

        // First, get the total number of pages to validate the page number
        const { stdout: infoOutput } = await execAsync(`"${pdfinfoPath}" "${pdfPath}"`);
        const pageMatch = infoOutput.match(/Pages:\s+(\d+)/);
        const totalPages = pageMatch ? parseInt(pageMatch[1]) : 1;

        if (pageNumber < 1 || pageNumber > totalPages) {
            throw new Error(`Invalid page number ${pageNumber}. PDF has ${totalPages} pages.`);
        }

        console.error(`Extracting page ${pageNumber} of ${totalPages} from PDF: ${pdfPath}`);

        // Create temporary directory
        const tempDir = path.join(os.tmpdir(), `pdf2img-page-${uuidv4()}`);
        await fs.ensureDir(tempDir);

        try {
            // Convert the specific page
            const outputPrefix = path.join(tempDir, `page-${pageNumber}`);
            const cmd = `"${popplerPath}" -png -f ${pageNumber} -l ${pageNumber} -r ${dpi} "${pdfPath}" "${outputPrefix}"`;

            const result = await execAsync(cmd);

            // The file will have the format page-X-X.png where X is the page number
            const actualOutputFile = `${outputPrefix}-${pageNumber}.png`;

            if (!await fs.pathExists(actualOutputFile)) {
                throw new Error(`Failed to create page image: ${actualOutputFile}`);
            }

            // Determine final output path
            let finalOutputPath;
            if (outputPath) {
                finalOutputPath = outputPath;
            } else {
                // Default to .assets directory in workspace root
                const workspaceRoot = process.cwd();
                const assetsDir = path.join(workspaceRoot, '.assets');
                await fs.ensureDir(assetsDir);

                // Generate filename from PDF name and page number
                const pdfBasename = path.basename(pdfPath, path.extname(pdfPath));
                const sanitizedName = pdfBasename.replace(/[^a-zA-Z0-9_-]/g, '_').toLowerCase();
                finalOutputPath = path.join(assetsDir, `${sanitizedName}_page_${pageNumber}.png`);
            }

            await fs.ensureDir(path.dirname(finalOutputPath));

            // Copy the image to final location
            await fs.copy(actualOutputFile, finalOutputPath);

            // Get file info
            const stats = await fs.stat(finalOutputPath);
            const fileSizeMB = (stats.size / (1024 * 1024)).toFixed(2);

            // Read image dimensions
            const image = await Jimp.read(finalOutputPath);
            const width = image.getWidth();
            const height = image.getHeight();

            return {
                content: [
                    {
                        type: 'text',
                        text: `Successfully extracted page ${pageNumber} from PDF\\n\\n` +
                            `📄 Source: ${pdfPath}\\n` +
                            `📑 Page: ${pageNumber} of ${totalPages}\\n` +
                            `🖼️ Output: ${finalOutputPath}\\n` +
                            `📏 Dimensions: ${width}x${height} pixels\\n` +
                            `🎯 DPI: ${dpi}\\n` +
                            `📦 Size: ${fileSizeMB} MB`
                    }
                ]
            };

        } finally {
            // Cleanup temporary directory
            await fs.remove(tempDir);
        }
    }

    setupErrorHandling() {
        this.server.onerror = (error) => {
            console.error('[MCP Error]', error);
        };

        process.on('SIGINT', async () => {
            await this.server.close();
            process.exit(0);
        });
    }

    async run() {
        const transport = new StdioServerTransport();
        await this.server.connect(transport);
        console.error('PDF2Img MCP Server running on stdio');
    }
}

const server = new PDF2ImgMCP();
server.run().catch((error) => {
    console.error('Failed to start server:', error);
    process.exit(1);
});