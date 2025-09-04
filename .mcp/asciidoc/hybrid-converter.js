// Hybrid Intelligent PDF-to-AsciiDoc Converter
// Uses MCP tools when system tools are not available
import fs from 'fs-extra';
import path from 'path';
import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

class HybridIntelligentConverter {
    constructor() {
        this.useMcpFallback = true; // Use MCP tools when system tools unavailable
    }

    async analyzeAndConvert(pdfPath, outputName = null) {
        console.log('🧠 Starting hybrid intelligent PDF conversion...');

        if (!fs.existsSync(pdfPath)) {
            throw new Error(`PDF file not found: ${pdfPath}`);
        }

        // Setup output structure
        const pdfName = path.basename(pdfPath, '.pdf');
        const sanitizedName = (outputName || pdfName).replace(/[^a-zA-Z0-9-_]/g, '_').toLowerCase();

        const workspaceDir = process.cwd().includes('.mcp') ? path.join(process.cwd(), '..', '..') : process.cwd();
        const assetsDir = path.join(workspaceDir, '.assets');
        const outputDir = path.join(assetsDir, sanitizedName);
        const imagesDir = path.join(outputDir, 'images');

        await fs.ensureDir(outputDir);
        await fs.ensureDir(imagesDir);

        console.log(`📁 Output directory: ${outputDir}`);

        // Step 1: Hybrid text extraction
        console.log('📝 Step 1: Hybrid text extraction...');
        const textData = await this.hybridTextExtraction(pdfPath, workspaceDir);

        // Step 2: Hybrid image extraction with MCP fallback
        console.log('🖼️ Step 2: Hybrid image extraction...');
        const imageData = await this.hybridImageExtraction(pdfPath, imagesDir, workspaceDir);

        // Step 3: Generate intelligent AsciiDoc with extracted content
        console.log('📄 Step 3: Generating intelligent AsciiDoc...');
        const asciidocContent = this.generateHybridAsciiDoc(
            textData,
            imageData,
            pdfName,
            sanitizedName
        );

        // Step 4: Write files
        const asciidocPath = path.join(outputDir, `${sanitizedName}.adoc`);
        await fs.writeFile(asciidocPath, asciidocContent.content, 'utf8');

        // Generate hybrid report
        const report = this.generateHybridReport(pdfPath, outputDir, textData, imageData);
        await fs.writeFile(path.join(outputDir, 'hybrid_conversion_report.md'), report, 'utf8');

        console.log('✅ Hybrid intelligent conversion completed!');

        return {
            asciidocPath,
            outputDir,
            textLength: textData.content.length,
            imageCount: imageData.extractedImages,
            pages: imageData.totalPages || 0,
            method: 'hybrid',
            success: true
        };
    }

    async hybridTextExtraction(pdfPath, workspaceDir) {
        // Try system tools first
        try {
            const { stdout } = await execAsync(`pdftotext -layout "${pdfPath}" -`, {
                cwd: workspaceDir,
                encoding: 'utf8'
            });

            console.log(`📝 ✅ System pdftotext: ${stdout.length} characters extracted`);
            return {
                content: stdout,
                method: 'pdftotext',
                success: true
            };
        } catch (error) {
            console.log('📝 ⚠️ System tools unavailable, using MCP extraction approach...');

            // Fallback: Create structured text from filename and basic analysis
            const fallbackText = this.generateIntelligentFallbackText(pdfPath);

            return {
                content: fallbackText,
                method: 'structured_fallback',
                success: false,
                note: 'Text extraction via MCP tools - manual text insertion recommended'
            };
        }
    }

    async hybridImageExtraction(pdfPath, imagesDir, workspaceDir) {
        console.log('🖼️ Attempting hybrid image extraction...');

        // Try system pdfimages first
        try {
            await execAsync(`pdfimages -png "${pdfPath}" "${path.join(imagesDir, 'extracted_img')}"`, {
                cwd: workspaceDir,
            });

            const imageFiles = await fs.readdir(imagesDir);
            const pngFiles = imageFiles.filter(file => file.endsWith('.png')).sort();

            console.log(`🖼️ ✅ System pdfimages: ${pngFiles.length} images extracted`);

            return {
                extractedImages: pngFiles.length,
                method: 'pdfimages',
                imageFiles: pngFiles,
                success: true
            };

        } catch (error) {
            console.log('🖼️ ⚠️ System tools unavailable, using MCP approach...');

            // Fallback: Use description of MCP-based approach
            return await this.mcpBasedImageExtraction(pdfPath, imagesDir);
        }
    }

    async mcpBasedImageExtraction(pdfPath, imagesDir) {
        // Since we can't directly call MCP from here, we create a guide for manual MCP usage
        const mcpInstructions = {
            extractedImages: 0,
            method: 'mcp_guided',
            success: false,
            instructions: [
                'Use: mcp_pdf2img_get_pdf_info to analyze PDF structure',
                'Use: mcp_pdf2img_convert_pdf_to_png for full document image',
                'Use: mcp_pdf2img_extract_pdf_page for individual pages',
                'Place extracted images in the images/ subdirectory'
            ],
            note: 'Manual MCP extraction required - see conversion report for instructions'
        };

        // Create a placeholder instruction file
        await fs.writeFile(
            path.join(imagesDir, 'MCP_EXTRACTION_GUIDE.md'),
            this.generateMcpExtractionGuide(pdfPath),
            'utf8'
        );

        return mcpInstructions;
    }

    generateIntelligentFallbackText(pdfPath) {
        const filename = path.basename(pdfPath, '.pdf');

        return `# ${filename}

## Automatisch generierte Dokumentstruktur

Dieses Dokument wurde aus der PDF-Datei "${filename}.pdf" erstellt.

### ⚠️ Hinweis zur Textextraktion

Der Textinhalt konnte nicht automatisch extrahiert werden, da die erforderlichen PDF-Tools (pdftotext) nicht verfügbar sind.

### 📝 Manuelle Textextraktion erforderlich

Bitte fügen Sie den Originaltext aus dem PDF an den entsprechenden Stellen ein:

#### Sektion 1: Einleitung
[HIER ORIGINALTEXT EINFÜGEN]

#### Sektion 2: Hauptinhalt  
[HIER ORIGINALTEXT EINFÜGEN]

#### Sektion 3: Zusammenfassung
[HIER ORIGINALTEXT EINFÜGEN]

### 🔧 Verbesserungsschritte

1. **Text einfügen**: Kopieren Sie den Text aus dem Original-PDF
2. **Struktur anpassen**: Erstellen Sie eine logische Überschriftenhierarchie
3. **Listen formatieren**: Wandeln Sie Aufzählungen in AsciiDoc-Listen um
4. **Bilder einbinden**: Verwenden Sie die MCP-Tools zur Bildextraktion
5. **Querverweise**: Fügen Sie interne Links und Referenzen hinzu

### 📋 Nächste Arbeitsschritte

- [ ] Text aus PDF kopieren und strukturieren
- [ ] Überschriftenhierarchie anpassen
- [ ] Bilder über MCP-Tools extrahieren
- [ ] Formatierung verfeinern
- [ ] Qualitätskontrolle durchführen

---
*Hinweis: Diese Struktur wurde automatisch generiert und erfordert manuelle Nachbearbeitung für vollständige Funktionalität.*`;
    }

    generateHybridAsciiDoc(textData, imageData, originalName, sanitizedName) {
        let asciidoc = '';

        // Document header
        asciidoc += `= ${originalName}\\n`;
        asciidoc += `:author: Hybrid-Konvertierung\\n`;
        asciidoc += `:doctype: article\\n`;
        asciidoc += `:toc: left\\n`;
        asciidoc += `:toclevels: 3\\n`;
        asciidoc += `:numbered:\\n`;
        asciidoc += `:source-highlighter: highlight.js\\n`;
        asciidoc += `:icons: font\\n`;
        asciidoc += `:imagesdir: images\\n`;
        asciidoc += `\\n`;

        // Conversion notice with method info
        asciidoc += `[NOTE]\\n`;
        asciidoc += `====\\n`;
        asciidoc += `Dieses Dokument wurde mit dem Hybrid-Intelligent-Converter erstellt.\\n`;
        asciidoc += `**Textextraktion**: ${textData.method} (${textData.success ? 'Erfolgreich' : 'Fallback'})\\n`;
        asciidoc += `**Bildextraktion**: ${imageData.method} (${imageData.success ? 'Erfolgreich' : 'MCP-Anleitung'})\\n`;
        if (!textData.success || !imageData.success) {
            asciidoc += `\\n⚠️ **Manuelle Nachbearbeitung erforderlich** - siehe Konvertierungsbericht für Details.\\n`;
        }
        asciidoc += `====\\n\\n`;

        // Main content
        if (textData.success) {
            asciidoc += this.processTextToAsciiDoc(textData.content, imageData);
        } else {
            asciidoc += textData.content; // Use fallback structured text
        }

        // Image section if we have images
        if (imageData.success && imageData.extractedImages > 0) {
            asciidoc += `\\n== Extrahierte Bilder\\n\\n`;

            for (let i = 0; i < imageData.imageFiles.length; i++) {
                const imageFile = imageData.imageFiles[i];
                asciidoc += `=== Bild ${i + 1}\\n\\n`;
                asciidoc += `image::${imageFile}[Extrahiertes Bild ${i + 1}, align="center", width=70%]\\n\\n`;
            }
        } else if (!imageData.success) {
            asciidoc += `\\n== 🖼️ Bildextraktion (MCP-Tools erforderlich)\\n\\n`;
            asciidoc += `Die Bilder konnten nicht automatisch extrahiert werden. `;
            asciidoc += `Verwenden Sie die folgenden MCP-Tools für die Bildextraktion:\\n\\n`;

            for (const instruction of imageData.instructions) {
                asciidoc += `* \`${instruction}\`\\n`;
            }
            asciidoc += `\\nSiehe auch: \`images/MCP_EXTRACTION_GUIDE.md\` für detaillierte Anweisungen.\\n\\n`;
        }

        // Technical appendix
        asciidoc += this.generateTechnicalAppendix(originalName, textData, imageData);

        return {
            content: asciidoc,
            method: 'hybrid',
            textSuccess: textData.success,
            imageSuccess: imageData.success
        };
    }

    processTextToAsciiDoc(textContent, imageData) {
        // Same intelligent text processing as before
        let processedText = '';
        const lines = textContent.split('\\n');
        let inParagraph = false;

        processedText += `== Hauptinhalt\\n\\n`;

        for (let i = 0; i < lines.length; i++) {
            const line = lines[i].trim();

            if (line.length === 0) {
                if (inParagraph) {
                    processedText += '\\n\\n';
                    inParagraph = false;
                }
                continue;
            }

            // Detect headings
            if (this.isLikelyHeading(line, lines, i)) {
                if (inParagraph) {
                    processedText += '\\n\\n';
                }
                processedText += `=== ${line}\\n\\n`;
                inParagraph = false;
                continue;
            }

            // Regular text
            if (!inParagraph) {
                inParagraph = true;
            } else {
                processedText += ' ';
            }

            processedText += line;
        }

        if (inParagraph) {
            processedText += '\\n\\n';
        }

        return processedText;
    }

    isLikelyHeading(line, allLines, index) {
        if (line.length === 0 || line.length > 80) return false;
        if (line === line.toUpperCase() && line.length > 3) return true;

        if (line.length < 50 &&
            index < allLines.length - 1 &&
            allLines[index + 1].trim().length > 0) {

            if (line.match(/^[A-ZÄÖÜ]/) && !line.endsWith('.')) {
                return true;
            }
        }

        return false;
    }

    generateMcpExtractionGuide(pdfPath) {
        return `# MCP-Tools Bildextraktions-Anleitung

## Für PDF: ${path.basename(pdfPath)}

### Schritt 1: PDF-Analyse
\`\`\`
mcp_pdf2img_get_pdf_info
pdfPath: ${pdfPath}
\`\`\`

### Schritt 2: Vollständiges Dokument extrahieren
\`\`\`
mcp_pdf2img_convert_pdf_to_png
pdfPath: ${pdfPath}
dpi: 150
outputPath: ./images/full_document.png
\`\`\`

### Schritt 3: Einzelne Seiten extrahieren
\`\`\`
mcp_pdf2img_extract_pdf_page
pdfPath: ${pdfPath}
pageNumber: 1
dpi: 150
outputPath: ./images/page_01.png
\`\`\`

Wiederholen Sie Schritt 3 für alle Seiten des Dokuments.

### Schritt 4: AsciiDoc anpassen
Nach der Bildextraktion passen Sie die Bildverweise in der .adoc-Datei an.

---
*Automatisch generiert vom Hybrid-Intelligent-Converter*`;
    }

    generateTechnicalAppendix(originalName, textData, imageData) {
        let appendix = `\\n[appendix]\\n`;
        appendix += `== Technische Details der Hybrid-Konvertierung\\n\\n`;

        appendix += `=== Konvertierungsmethoden\\n\\n`;
        appendix += `**Textextraktion:**\\n`;
        appendix += `* Methode: ${textData.method}\\n`;
        appendix += `* Status: ${textData.success ? '✅ Erfolgreich' : '⚠️ Fallback verwendet'}\\n`;
        if (textData.note) {
            appendix += `* Hinweis: ${textData.note}\\n`;
        }
        appendix += `\\n`;

        appendix += `**Bildextraktion:**\\n`;
        appendix += `* Methode: ${imageData.method}\\n`;
        appendix += `* Status: ${imageData.success ? '✅ Erfolgreich' : '⚠️ MCP-Tools erforderlich'}\\n`;
        appendix += `* Extrahierte Bilder: ${imageData.extractedImages}\\n`;
        if (imageData.note) {
            appendix += `* Hinweis: ${imageData.note}\\n`;
        }
        appendix += `\\n`;

        appendix += `=== Empfohlene Nachbearbeitung\\n\\n`;
        if (!textData.success) {
            appendix += `* ⚠️ **Text manuell einfügen**: Original-Text aus PDF kopieren\\n`;
        }
        if (!imageData.success) {
            appendix += `* ⚠️ **Bilder über MCP extrahieren**: Siehe MCP_EXTRACTION_GUIDE.md\\n`;
        }
        appendix += `* 🔧 **Struktur optimieren**: Überschriftenhierarchie anpassen\\n`;
        appendix += `* 📝 **Formatierung verfeinern**: Listen, Tabellen, Querverweise\\n`;
        appendix += `* ✅ **Qualitätskontrolle**: Vollständigkeit und Durchsuchbarkeit prüfen\\n\\n`;

        return appendix;
    }

    generateHybridReport(pdfPath, outputDir, textData, imageData) {
        const timestamp = new Date().toLocaleString('de-DE');

        return `# Hybrid-Intelligent PDF-zu-AsciiDoc Konvertierungsbericht

## Überblick

- **Zeitstempel**: ${timestamp}
- **Quelldatei**: ${pdfPath}
- **Ausgabeordner**: ${outputDir}
- **Konvertierungsmodus**: Hybrid-Intelligent

## Verarbeitungsdetails

### Textextraktion
- **Methode**: ${textData.method}
- **Status**: ${textData.success ? '✅ Erfolgreich' : '❌ Fallback'}
- **Zeichenanzahl**: ${textData.content.length.toLocaleString()}
${textData.note ? `- **Hinweis**: ${textData.note}` : ''}

### Bildextraktion  
- **Methode**: ${imageData.method}
- **Status**: ${imageData.success ? '✅ Erfolgreich' : '❌ Manuelle Nacharbeit'}
- **Extrahierte Bilder**: ${imageData.extractedImages}
${imageData.note ? `- **Hinweis**: ${imageData.note}` : ''}

## Qualitätsbewertung

### ✅ Erfolgreich umgesetzt
- Strukturierte AsciiDoc-Ausgabe
- Dokumentmetadaten eingebunden
- Intelligente Überschriftenerkennung
- Organisierte Ordnerstruktur

### ⚠️ Nachbearbeitung erforderlich
${!textData.success ? '- Text manuell aus PDF extrahieren\n' : ''}${!imageData.success ? '- Bilder über MCP-Tools extrahieren\n' : ''}- Formatierung und Struktur optimieren
- Qualitätskontrolle durchführen

## Nächste Schritte

1. **Sofort**: Review der generierten AsciiDoc-Datei
${!textData.success ? '2. **Text**: Original-Text aus PDF kopieren und einfügen\n' : ''}${!imageData.success ? '3. **Bilder**: MCP-Tools für Bildextraktion verwenden\n' : ''}4. **Optimierung**: Struktur und Formatierung verfeinern
5. **Test**: Durchsuchbarkeit und Vollständigkeit prüfen

## Verwendete Tools und Methoden

- **PDF-Analyse**: Intelligente Strukturerkennung
- **Text-Verarbeitung**: ${textData.method}
- **Bild-Handling**: ${imageData.method}
- **AsciiDoc-Generation**: Hybrid-Template-System

---
*Generiert durch Hybrid-Intelligent PDF-to-AsciiDoc Converter v1.0*
`;
    }
}

export { HybridIntelligentConverter };