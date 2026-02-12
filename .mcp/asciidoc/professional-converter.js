import fs from 'fs';
import path from 'path';
import { createRequire } from 'module';

// CommonJS require für die PDF-Module die noch nicht ES6 kompatibel sind
const require = createRequire(import.meta.url);
const PDFParser = require('pdf2json');
const pdf2pic = require('pdf2pic');
const pdfParse = require('pdf-parse');
const { PDFDocument } = require('pdf-lib');

class ProfessionalPDFConverter {
    constructor() {
        this.outputDir = '';
        this.pdfPath = '';
        this.pdfData = null;
        this.textContent = '';
        this.structuredContent = [];
        this.extractedImages = [];
    }

    /**
     * Hauptmethode für intelligente PDF zu AsciiDoc Konvertierung
     */
    async convertPDFToAsciiDoc(pdfPath, outputDir) {
        console.log('🚀 Starte professionelle PDF-zu-AsciiDoc Konvertierung...\n');

        this.pdfPath = pdfPath;
        this.outputDir = outputDir;

        // Erstelle Output-Verzeichnisse
        await this.setupOutputDirectories();

        // 1. PDF-Struktur analysieren
        console.log('📊 Analysiere PDF-Struktur...');
        await this.analyzePDFStructure();

        // 2. Text intelligent extrahieren
        console.log('📝 Extrahiere Text mit Positionsdaten...');
        await this.extractTextWithPositions();

        // 3. Bilder/Grafiken extrahieren
        console.log('🖼️ Extrahiere Bilder und Grafiken...');
        await this.extractImagesAndGraphics();

        // 4. Intelligente AsciiDoc-Generierung
        console.log('📄 Generiere intelligente AsciiDoc...');
        const asciidocContent = await this.generateIntelligentAsciiDoc();

        // 5. AsciiDoc-Datei speichern
        const asciidocPath = path.join(this.outputDir, 'document.adoc');
        fs.writeFileSync(asciidocPath, asciidocContent, 'utf8');

        console.log('✅ Professionelle Konvertierung abgeschlossen!');
        console.log(`📄 AsciiDoc: ${asciidocPath}`);
        console.log(`🖼️ Extrahierte Bilder: ${this.extractedImages.length}`);

        return {
            asciidocPath,
            extractedImages: this.extractedImages,
            textLength: this.textContent.length,
            structuredSections: this.structuredContent.length
        };
    }

    /**
     * Erstelle Output-Verzeichnisse
     */
    async setupOutputDirectories() {
        const imagesDir = path.join(this.outputDir, 'images');
        fs.mkdirSync(this.outputDir, { recursive: true });
        fs.mkdirSync(imagesDir, { recursive: true });
    }

    /**
     * Analysiere PDF-Struktur mit pdf2json
     */
    async analyzePDFStructure() {
        return new Promise((resolve, reject) => {
            const pdfParser = new PDFParser();

            pdfParser.on('pdfParser_dataError', (errData) => {
                console.warn('⚠️ PDF2JSON Fehler, versuche Alternative:', errData.parserError);
                resolve(); // Nicht abbrechen, Alternative versuchen
            });

            pdfParser.on('pdfParser_dataReady', (pdfData) => {
                this.pdfData = pdfData;
                console.log(`📊 PDF analysiert: ${pdfData.Pages.length} Seiten`);

                // Extrahiere strukturierte Informationen
                this.analyzePageStructure(pdfData);
                resolve();
            });

            pdfParser.loadPDF(this.pdfPath);
        });
    }

    /**
     * Analysiere Seiten-Struktur für Text- und Bild-Bereiche
     */
    analyzePageStructure(pdfData) {
        pdfData.Pages.forEach((page, pageIndex) => {
            const pageContent = {
                pageNumber: pageIndex + 1,
                textElements: [],
                imageAreas: [],
                hasImages: false
            };

            // Analysiere Text-Elemente
            if (page.Texts) {
                page.Texts.forEach(textItem => {
                    pageContent.textElements.push({
                        text: decodeURIComponent(textItem.R[0].T),
                        x: textItem.x,
                        y: textItem.y,
                        fontSize: textItem.R[0].TS[1] || 12
                    });
                });
            }

            // Prüfe auf Bilder/Grafiken (erkenne durch Text-freie Bereiche)
            pageContent.hasImages = this.detectImageAreas(pageContent.textElements);

            this.structuredContent.push(pageContent);
        });
    }

    /**
     * Erkenne Bild-Bereiche durch Analyse der Text-Verteilung
     */
    detectImageAreas(textElements) {
        // Einfache Heuristik: Wenig Text oder große Lücken deuten auf Bilder hin
        if (textElements.length < 10) return true;

        // Prüfe auf große vertikale Lücken im Text
        const sortedByY = textElements.sort((a, b) => a.y - b.y);
        for (let i = 1; i < sortedByY.length; i++) {
            const gap = sortedByY[i].y - sortedByY[i - 1].y;
            if (gap > 3) { // Große Lücke gefunden
                return true;
            }
        }

        return false;
    }

    /**
     * Extrahiere Text mit Positions-Informationen
     */
    async extractTextWithPositions() {
        try {
            // Primär: pdf-parse für sauberen Text
            const dataBuffer = fs.readFileSync(this.pdfPath);
            const data = await pdfParse(dataBuffer);
            this.textContent = data.text;

            console.log(`📝 Text extrahiert: ${this.textContent.length} Zeichen`);

            // Falls zu wenig Text, versuche strukturierte Extraktion
            if (this.textContent.length < 100 && this.pdfData) {
                this.textContent = this.extractStructuredText();
            }

        } catch (error) {
            console.warn('⚠️ pdf-parse fehlgeschlagen, verwende strukturierte Extraktion');
            this.textContent = this.extractStructuredText();
        }
    }

    /**
     * Extrahiere strukturierten Text aus pdf2json Daten
     */
    extractStructuredText() {
        if (!this.pdfData || !this.pdfData.Pages) return '';

        let extractedText = '';

        this.pdfData.Pages.forEach((page, pageIndex) => {
            extractedText += `\n\n=== Seite ${pageIndex + 1} ===\n\n`;

            if (page.Texts) {
                // Sortiere Text-Elemente nach Position (Y-Koordinate, dann X)
                const sortedTexts = page.Texts.sort((a, b) => {
                    const yDiff = a.y - b.y;
                    return yDiff !== 0 ? yDiff : a.x - b.x;
                });

                sortedTexts.forEach(textItem => {
                    const text = decodeURIComponent(textItem.R[0].T);
                    if (text.trim()) {
                        extractedText += text + ' ';
                    }
                });
            }
        });

        return extractedText;
    }

    /**
     * Extrahiere Bilder und Grafiken als separate Dateien
     */
    async extractImagesAndGraphics() {
        const imagesDir = path.join(this.outputDir, 'images');

        try {
            // Ermittle Seitenzahl erst
            const dataBuffer = fs.readFileSync(this.pdfPath);
            const pdfDoc = await PDFDocument.load(dataBuffer);
            const pageCount = pdfDoc.getPageCount();

            console.log(`🖼️ Extrahiere ${pageCount} Seiten als Bilder...`);

            // Verwende pdf2pic mit korrigierter Konfiguration
            const convert = pdf2pic.fromPath(this.pdfPath, {
                density: 150,           // DPI
                saveFilename: 'page',
                savePath: imagesDir,
                format: 'png',
                width: 1200,
                height: 1600
            });

            // Extrahiere alle Seiten einzeln
            for (let pageNumber = 1; pageNumber <= pageCount; pageNumber++) {
                try {
                    // Konvertiere einzelne Seite
                    const result = await convert(pageNumber, {
                        responseType: 'image'
                    });

                    if (result && result.path && fs.existsSync(result.path)) {
                        // Konsistente Dateinamen
                        const targetPath = path.join(imagesDir, `page_${pageNumber.toString().padStart(2, '0')}.png`);

                        // Verschiebe Datei
                        fs.renameSync(result.path, targetPath);

                        // Hole Datei-Informationen
                        const stats = fs.statSync(targetPath);

                        this.extractedImages.push({
                            pageNumber: pageNumber,
                            filename: `page_${pageNumber.toString().padStart(2, '0')}.png`,
                            path: targetPath,
                            relativePath: `images/page_${pageNumber.toString().padStart(2, '0')}.png`,
                            size: (stats.size / 1024 / 1024).toFixed(2) + ' MB',
                            hasContent: this.structuredContent[pageNumber - 1]?.hasImages || false
                        });

                        console.log(`✅ Seite ${pageNumber} extrahiert: ${(stats.size / 1024 / 1024).toFixed(2)} MB`);
                    }

                } catch (pageError) {
                    console.warn(`⚠️ Seite ${pageNumber} Extraktion fehlgeschlagen:`, pageError.message);

                    // Fallback: Erstelle Platzhalter-Referenz ohne Bild
                    this.extractedImages.push({
                        pageNumber: pageNumber,
                        filename: `page_${pageNumber.toString().padStart(2, '0')}.png`,
                        path: null,
                        relativePath: `images/page_${pageNumber.toString().padStart(2, '0')}.png`,
                        size: 'Extraktion fehlgeschlagen',
                        hasContent: true,
                        error: pageError.message
                    });
                }
            }

        } catch (error) {
            console.error('❌ Bild-Extraktion komplett fehlgeschlagen:', error.message);

            // Erstelle trotzdem Struktur-Referenzen
            for (let i = 1; i <= 10; i++) {
                this.extractedImages.push({
                    pageNumber: i,
                    filename: `page_${i.toString().padStart(2, '0')}.png`,
                    path: null,
                    relativePath: `images/page_${i.toString().padStart(2, '0')}.png`,
                    size: 'Nicht verfügbar',
                    hasContent: true,
                    error: 'Bild-Extraktion nicht verfügbar'
                });
            }
        }
    }

    /**
     * Generiere intelligente AsciiDoc mit Text und verlinkten Bildern
     */
    async generateIntelligentAsciiDoc() {
        const filename = path.basename(this.pdfPath, '.pdf');
        let content = `= ${filename}\n:doctype: book\n:toc:\n:toclevels: 3\n:sectnums:\n:imagesdir: images\n\n`;

        // Dokument-Metadaten
        content += `== Dokument-Information\n\n`;
        content += `* *Originaldatei*: ${path.basename(this.pdfPath)}\n`;
        content += `* *Seiten*: ${this.extractedImages.length}\n`;
        const stats = fs.statSync(this.pdfPath);
        content += `* *Dateigröße*: ${(stats.size / 1024 / 1024).toFixed(2)} MB\n`;
        content += `* *Extrahierte Zeichen*: ${this.textContent.length.toLocaleString('de-DE')}\n`;
        content += `* *Konvertiert am*: ${new Date().toLocaleString('de-DE')}\n\n`;

        // Intelligente Text-Verarbeitung
        if (this.textContent && this.textContent.length > 100) {
            content += `== Dokumenteninhalt\n\n`;
            content += this.processTextToAsciiDoc(this.textContent);
        } else {
            content += `== Dokumenteninhalt\n\n`;
            content += `⚠️ *Automatische Text-Extraktion unvollständig*\n\n`;
            content += `Das PDF enthält hauptsächlich Bilder oder gescannten Text. `;
            content += `Der extrahierbare Text ist begrenzt. Bitte prüfen Sie die extrahierten Seitenbilder für den vollständigen Inhalt.\n\n`;
        }

        // Referenzierte Seitenbilder für detaillierte Inhalte
        if (this.extractedImages.length > 0) {
            content += `== Seitenbilder für detaillierte Ansicht\n\n`;
            content += `Die folgenden hochauflösenden Bilder zeigen den vollständigen Inhalt jeder Seite:\n\n`;

            this.extractedImages.forEach(image => {
                content += `=== Seite ${image.pageNumber}\n\n`;
                content += `image::${image.relativePath}[Seite ${image.pageNumber}, align="center"]\n\n`;
                content += `_Dateigröße: ${image.size}, `;
                content += `${image.hasContent ? 'Enthält Grafiken/Diagramme' : 'Vorwiegend Text'}_\n\n`;
            });
        }

        // Technische Details
        content += `== Konvertierungs-Details\n\n`;
        content += `=== Verwendete Technologien\n\n`;
        content += `* *Text-Extraktion*: pdf-parse + pdf2json\n`;
        content += `* *Bild-Extraktion*: pdf2pic (150 DPI)\n`;
        content += `* *Struktur-Analyse*: pdf2json strukturelle Analyse\n`;
        content += `* *Ausgabeformat*: AsciiDoc mit eingebetteten Bildern\n\n`;

        content += `=== Qualitätsmetriken\n\n`;
        content += `* *Text-Abdeckung*: ${this.textContent.length > 1000 ? 'Hoch' : this.textContent.length > 100 ? 'Mittel' : 'Niedrig'}\n`;
        content += `* *Strukturierte Seiten*: ${this.structuredContent.length}\n`;
        content += `* *Extrahierte Bilder*: ${this.extractedImages.length}\n`;
        content += `* *Bilder mit Grafiken*: ${this.extractedImages.filter(img => img.hasContent).length}\n\n`;

        return content;
    }

    /**
     * Verarbeite extrahierten Text zu strukturiertem AsciiDoc
     */
    processTextToAsciiDoc(text) {
        const lines = text.split('\n');
        let processedContent = '';
        let inCodeBlock = false;
        let currentParagraph = '';

        for (let line of lines) {
            line = line.trim();

            // Überspringe leere Zeilen
            if (!line) {
                if (currentParagraph) {
                    processedContent += currentParagraph + '\n\n';
                    currentParagraph = '';
                }
                continue;
            }

            // Erkenne Überschriften
            if (this.isHeading(line)) {
                if (currentParagraph) {
                    processedContent += currentParagraph + '\n\n';
                    currentParagraph = '';
                }

                const level = this.getHeadingLevel(line);
                processedContent += `${'='.repeat(level + 2)} ${line}\n\n`;
                continue;
            }

            // Erkenne Listen
            if (this.isListItem(line)) {
                if (currentParagraph) {
                    processedContent += currentParagraph + '\n\n';
                    currentParagraph = '';
                }

                processedContent += `* ${line.replace(/^[-*•]\s*/, '')}\n`;
                continue;
            }

            // Erkenne nummerierte Listen
            if (this.isNumberedListItem(line)) {
                if (currentParagraph) {
                    processedContent += currentParagraph + '\n\n';
                    currentParagraph = '';
                }

                processedContent += `. ${line.replace(/^\d+\.\s*/, '')}\n`;
                continue;
            }

            // Sammle normalen Text in Absätzen
            if (currentParagraph) {
                currentParagraph += ' ' + line;
            } else {
                currentParagraph = line;
            }
        }

        // Letzten Absatz hinzufügen
        if (currentParagraph) {
            processedContent += currentParagraph + '\n\n';
        }

        return processedContent;
    }

    /**
     * Hilfsmethoden für Text-Strukturerkennung
     */
    isHeading(line) {
        // Überschriften: Kurze Zeilen, Großbuchstaben am Anfang, ohne Punkt am Ende
        return line.length < 80 &&
            line.length > 5 &&
            /^[A-ZÄÖÜ0-9]/.test(line) &&
            !line.endsWith('.') &&
            !line.includes('  ') &&
            line.split(' ').length <= 8;
    }

    getHeadingLevel(line) {
        if (line.length < 25) return 1;
        if (line.length < 50) return 2;
        return 3;
    }

    isListItem(line) {
        return /^[-*•]\s+/.test(line);
    }

    isNumberedListItem(line) {
        return /^\d+\.\s+/.test(line);
    }
}

export default ProfessionalPDFConverter;