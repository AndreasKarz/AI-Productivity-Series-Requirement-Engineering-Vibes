const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');

class EnhancedHybridConverter {
    constructor() {
        this.mcpImageExtractor = null;
    }

    /**
     * Setzt den MCP Image Extractor für die Bildextraktion
     */
    setMCPImageExtractor(extractor) {
        this.mcpImageExtractor = extractor;
    }

    /**
     * Konvertiert PDF zu AsciiDoc mit verbesserter MCP-Integration
     */
    async convertPDFToAsciiDoc(pdfPath, outputDir) {
        const results = {
            asciidocPath: null,
            extractedImages: [],
            textSections: [],
            status: 'success',
            errors: []
        };

        try {
            // 1. Erstelle Output-Verzeichnis
            const imagesDir = path.join(outputDir, 'images');
            fs.mkdirSync(outputDir, { recursive: true });
            fs.mkdirSync(imagesDir, { recursive: true });

            // 2. PDF-Analyse mit MCP Tools
            const pdfInfo = await this.analyzePDFWithMCP(pdfPath);
            console.log(`📊 PDF analysiert: ${pdfInfo.pages} Seiten, ${pdfInfo.size}MB`);

            // 3. Text-Extraktion versuchen
            const textContent = await this.extractTextContent(pdfPath);

            // 4. Bilder extrahieren mit MCP
            const extractedImages = await this.extractImagesWithMCP(pdfPath, imagesDir, pdfInfo.pages);
            results.extractedImages = extractedImages;

            // 5. Intelligente AsciiDoc-Generierung
            const asciidocContent = this.generateIntelligentAsciiDoc(textContent, extractedImages, pdfInfo);

            // 6. AsciiDoc-Datei speichern
            const asciidocPath = path.join(outputDir, 'document.adoc');
            fs.writeFileSync(asciidocPath, asciidocContent, 'utf8');
            results.asciidocPath = asciidocPath;

            console.log(`✅ Konvertierung abgeschlossen: ${asciidocPath}`);
            return results;

        } catch (error) {
            results.status = 'error';
            results.errors.push(error.message);
            console.error('❌ Fehler bei der Konvertierung:', error);
            return results;
        }
    }

    /**
     * Analysiert PDF mit MCP Tools
     */
    async analyzePDFWithMCP(pdfPath) {
        if (this.mcpImageExtractor && this.mcpImageExtractor.getPDFInfo) {
            try {
                return await this.mcpImageExtractor.getPDFInfo(pdfPath);
            } catch (error) {
                console.warn('⚠️ MCP PDF-Analyse fehlgeschlagen, verwende Fallback');
            }
        }

        // Fallback: Statische Analyse
        const stats = fs.statSync(pdfPath);
        return {
            pages: 10, // Geschätzt
            size: (stats.size / 1024 / 1024).toFixed(2),
            dimensions: '2480x3508',
            dpi: 150
        };
    }

    /**
     * Extrahiert Text-Inhalt aus PDF
     */
    async extractTextContent(pdfPath) {
        // Versuche verschiedene Text-Extraktions-Methoden
        const methods = [
            () => this.extractWithPDFToText(pdfPath),
            () => this.extractWithPDFParse(pdfPath),
            () => this.generateStructuredFallback(pdfPath)
        ];

        for (const method of methods) {
            try {
                const result = await method();
                if (result && result.trim().length > 100) {
                    return result;
                }
            } catch (error) {
                console.warn('⚠️ Text-Extraktions-Methode fehlgeschlagen:', error.message);
            }
        }

        return this.generateStructuredFallback(pdfPath);
    }

    /**
     * Extrahiert Text mit pdftotext (System-Tool)
     */
    async extractWithPDFToText(pdfPath) {
        return new Promise((resolve, reject) => {
            const process = spawn('pdftotext', ['-layout', pdfPath, '-'], {
                stdio: ['pipe', 'pipe', 'pipe']
            });

            let output = '';
            let error = '';

            process.stdout.on('data', (data) => {
                output += data.toString();
            });

            process.stderr.on('data', (data) => {
                error += data.toString();
            });

            process.on('close', (code) => {
                if (code === 0 && output.trim()) {
                    resolve(output);
                } else {
                    reject(new Error(`pdftotext fehlgeschlagen: ${error}`));
                }
            });

            process.on('error', (err) => {
                reject(new Error(`pdftotext nicht verfügbar: ${err.message}`));
            });
        });
    }

    /**
     * Extrahiert Text mit pdf-parse Bibliothek
     */
    async extractWithPDFParse(pdfPath) {
        try {
            const pdfParse = require('pdf-parse');
            const dataBuffer = fs.readFileSync(pdfPath);
            const data = await pdfParse(dataBuffer);
            return data.text;
        } catch (error) {
            throw new Error(`pdf-parse fehlgeschlagen: ${error.message}`);
        }
    }

    /**
     * Generiert strukturierten Fallback-Text
     */
    generateStructuredFallback(pdfPath) {
        const filename = path.basename(pdfPath, '.pdf');
        return `= ${filename}

== Dokumenteninhalt

⚠️ *Automatische Text-Extraktion nicht verfügbar*

Dieses Dokument wurde aus einer PDF-Datei konvertiert, aber der Text konnte nicht automatisch extrahiert werden.

=== Manuelle Text-Extraktion erforderlich

Bitte führen Sie eine der folgenden Aktionen durch:

1. **Text manuell hinzufügen**: Kopieren Sie den Text aus der Original-PDF und fügen Sie ihn in die entsprechenden Abschnitte ein.

2. **OCR verwenden**: Nutzen Sie ein OCR-Tool, um Text aus den extrahierten Bildern zu erkennen.

3. **System-Tools installieren**: Installieren Sie \`pdftotext\` für eine bessere Text-Extraktion:
   \`\`\`bash
   # Windows (mit Chocolatey)
   choco install xpdf-utils
   
   # macOS (mit Homebrew)
   brew install poppler
   
   # Linux (Ubuntu/Debian)
   sudo apt-get install poppler-utils
   \`\`\`

=== Bildinhalt

Die extrahierten Bilder finden Sie im \`images/\` Verzeichnis und sind bereits in diesem Dokument referenziert.
`;
    }

    /**
     * Extrahiert Bilder mit MCP Tools
     */
    async extractImagesWithMCP(pdfPath, imagesDir, totalPages) {
        const extractedImages = [];

        if (!this.mcpImageExtractor || !this.mcpImageExtractor.extractPage) {
            console.warn('⚠️ MCP Image Extractor nicht verfügbar');
            return extractedImages;
        }

        for (let page = 1; page <= totalPages; page++) {
            try {
                const imagePath = path.join(imagesDir, `page_${page.toString().padStart(2, '0')}.png`);

                const result = await this.mcpImageExtractor.extractPage(pdfPath, page, {
                    outputPath: imagePath,
                    dpi: 150
                });

                extractedImages.push({
                    page: page,
                    path: imagePath,
                    relativePath: `images/page_${page.toString().padStart(2, '0')}.png`,
                    size: result.size,
                    dimensions: result.dimensions
                });

                console.log(`🖼️ Seite ${page} extrahiert: ${result.size}`);

            } catch (error) {
                console.error(`❌ Fehler bei Seite ${page}:`, error.message);
                extractedImages.push({
                    page: page,
                    path: null,
                    relativePath: null,
                    error: error.message
                });
            }
        }

        return extractedImages;
    }

    /**
     * Generiert intelligente AsciiDoc-Ausgabe
     */
    generateIntelligentAsciiDoc(textContent, extractedImages, pdfInfo) {
        const filename = path.basename(pdfInfo.path || 'document', '.pdf');
        let content = `= ${filename}\n:doctype: book\n:toc:\n:toclevels: 3\n:sectnums:\n:imagesdir: images\n\n`;

        // Dokument-Metadaten
        content += `== Dokument-Information\n\n`;
        content += `* *Seiten*: ${pdfInfo.pages}\n`;
        content += `* *Größe*: ${pdfInfo.size} MB\n`;
        content += `* *Auflösung*: ${pdfInfo.dimensions} pixels\n`;
        content += `* *Generiert*: ${new Date().toLocaleString('de-DE')}\n\n`;

        // Text-Inhalt verarbeiten
        if (textContent && textContent.trim().length > 100) {
            content += this.processTextToAsciiDoc(textContent);
        } else {
            content += `== Hauptinhalt\n\n`;
            content += `⚠️ *Text konnte nicht automatisch extrahiert werden*\n\n`;
            content += `Bitte fügen Sie den Dokumenteninhalt manuell hinzu oder verwenden Sie OCR-Tools für die extrahierten Bilder.\n\n`;
        }

        // Bild-Referenzen hinzufügen
        if (extractedImages.length > 0) {
            content += `== Extrahierte Seiten\n\n`;

            for (const image of extractedImages) {
                if (image.relativePath) {
                    content += `=== Seite ${image.page}\n\n`;
                    content += `image::${image.relativePath}[Seite ${image.page}, align="center"]\n\n`;
                    if (image.size) {
                        content += `_Größe: ${image.size}, Auflösung: ${image.dimensions}_\n\n`;
                    }
                } else {
                    content += `=== Seite ${image.page} (Fehler)\n\n`;
                    content += `❌ Extraktion fehlgeschlagen: ${image.error}\n\n`;
                }
            }
        }

        // Anhang mit technischen Details
        content += `== Anhang\n\n`;
        content += `=== Konvertierungs-Details\n\n`;
        content += `* *Konvertierungs-Tool*: Enhanced Hybrid Converter\n`;
        content += `* *Text-Extraktion*: ${textContent && textContent.trim().length > 100 ? 'Erfolgreich' : 'Fallback'}\n`;
        content += `* *Bild-Extraktion*: ${extractedImages.filter(img => img.relativePath).length}/${extractedImages.length} erfolgreich\n`;
        content += `* *MCP-Integration*: ${this.mcpImageExtractor ? 'Aktiv' : 'Nicht verfügbar'}\n\n`;

        return content;
    }

    /**
     * Verarbeitet extrahierten Text zu AsciiDoc-Format
     */
    processTextToAsciiDoc(text) {
        let content = `== Dokumenteninhalt\n\n`;

        // Text in Zeilen aufteilen und verarbeiten
        const lines = text.split('\n');
        let inCodeBlock = false;
        let currentSection = '';

        for (let line of lines) {
            line = line.trim();

            if (!line) {
                content += '\n';
                continue;
            }

            // Überschriften erkennen
            if (this.looksLikeHeading(line)) {
                const level = this.getHeadingLevel(line);
                content += `${'='.repeat(level + 2)} ${line}\n\n`;
                continue;
            }

            // Listen erkennen
            if (this.looksLikeListItem(line)) {
                content += `* ${line.replace(/^[-*•]\s*/, '')}\n`;
                continue;
            }

            // Nummerierte Listen erkennen
            if (this.looksLikeNumberedListItem(line)) {
                content += `. ${line.replace(/^\d+\.\s*/, '')}\n`;
                continue;
            }

            // Code-Blöcke erkennen
            if (line.includes('```') || line.includes('```')) {
                inCodeBlock = !inCodeBlock;
                content += inCodeBlock ? '```\n' : '```\n\n';
                continue;
            }

            // Normaler Text
            if (inCodeBlock) {
                content += `${line}\n`;
            } else {
                content += `${line}\n\n`;
            }
        }

        return content;
    }

    /**
     * Hilfsmethoden für Text-Strukturerkennung
     */
    looksLikeHeading(line) {
        return /^[A-ZÄÖÜ][^.!?]*$/.test(line) &&
            line.length < 100 &&
            !line.includes(',') &&
            line.split(' ').length < 8;
    }

    getHeadingLevel(line) {
        if (line.length < 20) return 1;
        if (line.length < 40) return 2;
        return 3;
    }

    looksLikeListItem(line) {
        return /^[-*•]\s+/.test(line);
    }

    looksLikeNumberedListItem(line) {
        return /^\d+\.\s+/.test(line);
    }
}

module.exports = EnhancedHybridConverter;