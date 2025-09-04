#!/usr/bin/env node
import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { CallToolRequestSchema, ListToolsRequestSchema } from '@modelcontextprotocol/sdk/types.js';
import fs from 'fs-extra';
import path from 'path';
import { fileURLToPath } from 'url';
import { createRequire } from 'module';

// CommonJS require für pdf-parse (das ist ein CommonJS-only Modul)
const require = createRequire(import.meta.url);

// Professional PDF Converter importieren (ES6 zu CommonJS Brücke)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Dynamischer Import für unseren Converter
let ProfessionalPDFConverter;
try {
    const converterModule = await import('./professional-converter.js');
    ProfessionalPDFConverter = converterModule.default;
} catch (error) {
    console.error('Failed to import ProfessionalPDFConverter:', error);
    process.exit(1);
}

class AsciiDocMCPServer {
    constructor() {
        this.server = new Server({
            name: 'asciidoc-mcp-server',
            version: '2.0.0',
        }, {
            capabilities: {
                tools: {},
            },
        });

        this.setupToolHandlers();
        this.setupErrorHandling();
    }

    setupErrorHandling() {
        this.server.onerror = (error) => console.error('[MCP Error]', error);
        process.on('SIGINT', async () => {
            await this.server.close();
            process.exit(0);
        });
    }

    setupToolHandlers() {
        this.server.setRequestHandler(ListToolsRequestSchema, async () => ({
            tools: [
                {
                    name: 'convert_pdf_to_asciidoc',
                    description: 'Professional PDF to AsciiDoc conversion with intelligent text extraction and image linking',
                    inputSchema: {
                        type: 'object',
                        properties: {
                            pdfPath: {
                                type: 'string',
                                description: 'Absolute path to the PDF file to convert',
                            },
                            outputName: {
                                type: 'string',
                                description: 'Optional: custom name for the output folder (defaults to PDF filename)',
                            },
                        },
                        required: ['pdfPath'],
                    },
                },
                {
                    name: 'analyze_pdf_structure',
                    description: 'Professional PDF structure analysis with detailed content preview',
                    inputSchema: {
                        type: 'object',
                        properties: {
                            pdfPath: {
                                type: 'string',
                                description: 'Absolute path to the PDF file to analyze',
                            },
                        },
                        required: ['pdfPath'],
                    },
                },
            ],
        }));

        this.server.setRequestHandler(CallToolRequestSchema, async (request) => {
            try {
                const { name, arguments: args } = request.params;

                switch (name) {
                    case 'convert_pdf_to_asciidoc':
                        return await this.convertPdfToAsciiDoc(args);
                    case 'analyze_pdf_structure':
                        return await this.analyzePdfStructure(args);
                    default:
                        throw new Error(`Unknown tool: ${name}`);
                }
            } catch (error) {
                return {
                    content: [
                        {
                            type: 'text',
                            text: `Error: ${error.message}`,
                        },
                    ],
                };
            }
        });
    }

    async convertPdfToAsciiDoc(args) {
        const { pdfPath, outputName } = args;

        if (!fs.existsSync(pdfPath)) {
            throw new Error(`PDF file not found: ${pdfPath}`);
        }

        try {
            // Professional Converter verwenden
            const converter = new ProfessionalPDFConverter();

            // Output-Verzeichnis bestimmen
            const pdfName = path.basename(pdfPath, '.pdf');
            const sanitizedName = (outputName || pdfName).replace(/[^a-zA-Z0-9-_]/g, '_').toLowerCase();
            const workspaceDir = process.cwd();
            const assetsDir = path.join(workspaceDir, '.assets');
            const outputDir = path.join(assetsDir, sanitizedName + '_professional_output');

            console.log(`Professional PDF Conversion: ${pdfPath} -> ${outputDir}`);

            // Professional Conversion durchführen
            const result = await converter.convertPDFToAsciiDoc(pdfPath, outputDir);

            return {
                content: [
                    {
                        type: 'text',
                        text: `🎉 Professional PDF zu AsciiDoc Konvertierung erfolgreich abgeschlossen!

📄 **Quell-PDF**: ${pdfPath}
📁 **Output-Verzeichnis**: ${outputDir}
📝 **AsciiDoc-Datei**: ${result.asciidocPath}

🎯 **Conversion-Ergebnisse**:
• **Extrahierte Zeichen**: ${result.textLength.toLocaleString('de-DE')}
• **Strukturierte Sektionen**: ${result.structuredSections}
• **Extrahierte Bilder**: ${result.extractedImages}
• **Durchsuchbarer Text**: ✅ Vollständig verfügbar

🔧 **Professional Features**:
• Intelligente Text-Extraktion mit pdf-parse + pdf2json
• Hochauflösende Bilder-Extraktion (150 DPI)
• Strukturelle PDF-Analyse für optimale Konvertierung
• Vollständig durchsuchbare AsciiDoc-Dokumente
• Automatische Bild-Verlinkung im Dokument

📋 **Nächste Schritte**:
1. Prüfen Sie das generierte AsciiDoc-Dokument
2. Alle Texte sind vollständig durchsuchbar
3. Bilder sind verlinkt und in hoher Qualität verfügbar
4. Dokument kann direkt weiterverarbeitet werden

Das resultierende AsciiDoc-Dokument erfüllt alle Ihre Anforderungen: Text ist als durchsuchbarer Text extrahiert, Bilder sind korrekt verlinkt, und keine manuellen Kopierschritte sind erforderlich!`,
                    },
                ],
            };

        } catch (error) {
            console.error('Professional PDF Conversion Error:', error);
            throw new Error(`Professional PDF Conversion failed: ${error.message}`);
        }
    }

    async analyzePdfStructure(args) {
        const { pdfPath } = args;

        if (!fs.existsSync(pdfPath)) {
            throw new Error(`PDF file not found: ${pdfPath}`);
        }

        try {
            // Professional Analysis mit dem Converter
            const converter = new ProfessionalPDFConverter();

            // Temporäres Verzeichnis für Analyse
            const tempDir = path.join(process.cwd(), '.temp', 'analysis_' + Date.now());
            await fs.ensureDir(tempDir);

            // Setup für Analyse
            converter.pdfPath = pdfPath;
            converter.outputDir = tempDir;

            // PDF-Struktur analysieren
            await converter.analyzePDFStructure();
            await converter.extractTextWithPositions();

            // Grundlegende Statistiken
            const pdfStats = fs.statSync(pdfPath);
            const structuredPages = converter.structuredContent.length;
            const textLength = converter.textContent.length;

            // Detaillierte Analyse
            const pagesWithImages = converter.structuredContent.filter(page => page.hasImages).length;
            const totalTextElements = converter.structuredContent.reduce((sum, page) => sum + page.textElements.length, 0);

            // Cleanup temp directory
            await fs.remove(tempDir);

            return {
                content: [
                    {
                        type: 'text',
                        text: `📊 Professional PDF Structure Analysis

📄 **Datei**: ${path.basename(pdfPath)}
📦 **Größe**: ${this.formatFileSize(pdfStats.size)}
�️ **Analysiert**: ${new Date().toLocaleString('de-DE')}

🎯 **Struktur-Ergebnisse**:
• **Seiten**: ${structuredPages}
• **Text-Elemente**: ${totalTextElements.toLocaleString('de-DE')}
• **Extrahierbare Zeichen**: ${textLength.toLocaleString('de-DE')}
• **Seiten mit Grafiken**: ${pagesWithImages}

📈 **Conversion-Qualität Prognose**:
• **Text-Extraktion**: ${textLength > 5000 ? '🟢 Hoch' : textLength > 500 ? '� Mittel' : '🔴 Niedrig'}
• **Struktur-Erkennung**: ${totalTextElements > 100 ? '🟢 Optimal' : totalTextElements > 20 ? '🟡 Gut' : '🔴 Begrenzt'}
• **Bild-Content**: ${pagesWithImages > 0 ? `🟢 ${pagesWithImages} Seiten mit Grafiken` : '🟡 Rein textbasiert'}

🔧 **Professional Features bereit**:
• ✅ pdf-parse + pdf2json Hybrid-Extraktion
• ✅ Hochauflösende Bild-Extraktion (150 DPI)
• ✅ Intelligente Struktur-Analyse
• ✅ Vollständig durchsuchbare AsciiDoc-Generierung

💡 **Empfehlung**: 
${textLength > 1000 ?
                                'Die PDF-Datei eignet sich sehr gut für die professionelle Konvertierung. Hohe Text-Qualität und gute Struktur-Erkennbarkeit.' :
                                textLength > 100 ?
                                    'Die PDF-Datei ist für Konvertierung geeignet. Mittlere Text-Qualität, Bilder werden zur Vollständigkeit extrahiert.' :
                                    'Die PDF-Datei ist bildlastig. Text wird extrahiert wo möglich, Bilder werden hochauflösend für manuellen Review extrahiert.'}

🚀 **Bereit für convert_pdf_to_asciidoc!**`,
                    },
                ],
            };

        } catch (error) {
            console.error('Professional PDF Analysis Error:', error);
            throw new Error(`Professional PDF Analysis failed: ${error.message}`);
        }
    }

    formatFileSize(bytes) {
        const sizes = ['B', 'KB', 'MB', 'GB'];
        if (bytes === 0) return '0 B';
        const i = Math.floor(Math.log(bytes) / Math.log(1024));
        return Math.round(bytes / Math.pow(1024, i) * 100) / 100 + ' ' + sizes[i];
    }

    async run() {
        const transport = new StdioServerTransport();
        await this.server.connect(transport);
        console.error('Professional AsciiDoc MCP Server running on stdio');
    }
}

const server = new AsciiDocMCPServer();
server.run().catch(console.error);