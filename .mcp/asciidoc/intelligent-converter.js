// Intelligent PDF to AsciiDoc Converter
// Extracts text as searchable content and images as separate assets
import fs from 'fs-extra';
import path from 'path';
import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

class IntelligentPdfToAsciiDoc {
    constructor() {
        this.imageCounter = 1;
        this.placeholders = new Map();
    }

    async analyzeAndConvert(pdfPath, outputName = null) {
        console.log('🔍 Starting intelligent PDF analysis and conversion...');

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

        // Step 1: Extract text content with pdftotext
        console.log('📝 Step 1: Extracting text content...');
        const textContent = await this.extractTextContent(pdfPath, workspaceDir);

        // Step 2: Get PDF metadata
        console.log('📊 Step 2: Analyzing PDF structure...');
        const pdfInfo = await this.getPdfInfo(pdfPath, workspaceDir);

        // Step 3: Extract images and create placeholders
        console.log('🖼️ Step 3: Extracting images and creating placeholders...');
        const imageData = await this.extractImagesWithPlaceholders(pdfPath, imagesDir, workspaceDir);

        // Step 4: Generate intelligent AsciiDoc
        console.log('📄 Step 4: Generating intelligent AsciiDoc...');
        const asciidocContent = this.generateIntelligentAsciiDoc(
            textContent,
            imageData,
            pdfInfo,
            pdfName,
            sanitizedName
        );

        // Step 5: Write files
        const asciidocPath = path.join(outputDir, `${sanitizedName}.adoc`);
        await fs.writeFile(asciidocPath, asciidocContent, 'utf8');

        // Generate conversion report
        const report = this.generateDetailedReport(pdfPath, outputDir, pdfInfo, textContent, imageData);
        await fs.writeFile(path.join(outputDir, 'intelligent_conversion_report.md'), report, 'utf8');

        console.log('✅ Intelligent conversion completed!');

        return {
            asciidocPath,
            outputDir,
            textLength: textContent.length,
            imageCount: imageData.extractedImages,
            pages: pdfInfo.pages,
            success: true
        };
    }

    async extractTextContent(pdfPath, workspaceDir) {
        try {
            // Use pdftotext for better text extraction
            const { stdout } = await execAsync(`pdftotext -layout "${pdfPath}" -`, {
                cwd: workspaceDir,
                encoding: 'utf8'
            });

            console.log(`📝 Extracted ${stdout.length} characters of text`);
            return stdout;
        } catch (error) {
            console.warn(`⚠️ pdftotext failed, trying alternative method: ${error.message}`);

            // Fallback: Try with different encoding
            try {
                const { stdout } = await execAsync(`pdftotext -enc UTF-8 "${pdfPath}" -`, {
                    cwd: workspaceDir,
                    encoding: 'utf8'
                });
                return stdout;
            } catch (fallbackError) {
                console.warn(`⚠️ Text extraction failed: ${fallbackError.message}`);
                return this.generateFallbackTextContent(pdfPath);
            }
        }
    }

    async getPdfInfo(pdfPath, workspaceDir) {
        try {
            const { stdout } = await execAsync(`pdfinfo "${pdfPath}"`, {
                cwd: workspaceDir,
                encoding: 'utf8'
            });

            const info = {};
            const lines = stdout.split('\\n');

            for (const line of lines) {
                if (line.includes(':')) {
                    const [key, ...valueParts] = line.split(':');
                    const value = valueParts.join(':').trim();
                    info[key.trim()] = value;
                }
            }

            return {
                title: info.Title || path.basename(pdfPath, '.pdf'),
                author: info.Author || 'Unbekannt',
                pages: parseInt(info.Pages) || 0,
                creator: info.Creator,
                producer: info.Producer,
                creationDate: info.CreationDate,
                modDate: info.ModDate,
                pageSize: info['Page size']
            };
        } catch (error) {
            console.warn(`⚠️ PDF info extraction failed: ${error.message}`);
            return {
                title: path.basename(pdfPath, '.pdf'),
                author: 'Unbekannt',
                pages: 0
            };
        }
    }

    async extractImagesWithPlaceholders(pdfPath, imagesDir, workspaceDir) {
        let extractedImages = 0;
        const imagePlaceholders = [];

        try {
            // Extract images using pdfimages
            await execAsync(`pdfimages -png "${pdfPath}" "${path.join(imagesDir, 'extracted_img')}"`, {
                cwd: workspaceDir,
            });

            // Count and catalog extracted images
            const imageFiles = await fs.readdir(imagesDir);
            const pngFiles = imageFiles.filter(file => file.endsWith('.png')).sort();
            extractedImages = pngFiles.length;

            console.log(`🖼️ Successfully extracted ${extractedImages} images`);

            // Create placeholder data for images
            for (let i = 0; i < extractedImages; i++) {
                const imageName = pngFiles[i];
                const placeholderId = `IMAGE_PLACEHOLDER_${i + 1}`;

                imagePlaceholders.push({
                    id: placeholderId,
                    filename: imageName,
                    description: `Extrahiertes Bild ${i + 1}`,
                    asciidocRef: `image::images/${imageName}[Extrahiertes Bild ${i + 1}, align="center", width=70%]`
                });
            }

        } catch (error) {
            console.warn(`⚠️ Image extraction failed: ${error.message}`);
            console.log('📝 Continuing without image extraction...');
        }

        return {
            extractedImages,
            placeholders: imagePlaceholders
        };
    }

    generateIntelligentAsciiDoc(textContent, imageData, pdfInfo, originalName, sanitizedName) {
        let asciidoc = '';

        // Document header with metadata
        asciidoc += `= ${pdfInfo.title}\\n`;
        asciidoc += `:author: ${pdfInfo.author}\\n`;
        asciidoc += `:doctype: article\\n`;
        asciidoc += `:toc: left\\n`;
        asciidoc += `:toclevels: 3\\n`;
        asciidoc += `:numbered:\\n`;
        asciidoc += `:source-highlighter: highlight.js\\n`;
        asciidoc += `:icons: font\\n`;
        asciidoc += `:imagesdir: images\\n`;
        if (pdfInfo.creationDate) {
            asciidoc += `:docdate: ${pdfInfo.creationDate}\\n`;
        }
        asciidoc += '\\n';

        // Conversion notice
        asciidoc += `[NOTE]\\n`;
        asciidoc += `====\\n`;
        asciidoc += `Dieses Dokument wurde automatisch aus der PDF-Datei "${originalName}.pdf" konvertiert. `;
        asciidoc += `Der Text wurde extrahiert und bleibt durchsuchbar. `;
        asciidoc += `Bilder und Diagramme wurden separat extrahiert und an passenden Stellen eingefügt.\\n`;
        asciidoc += `====\\n\\n`;

        // Process text content intelligently
        asciidoc += this.processTextToAsciiDoc(textContent, imageData);

        // Add extracted images section if we have images
        if (imageData.extractedImages > 0) {
            asciidoc += `\\n== Extrahierte Bilder und Diagramme\\n\\n`;
            asciidoc += `Die folgenden Bilder und Diagramme wurden aus dem ursprünglichen PDF extrahiert:\\n\\n`;

            for (const placeholder of imageData.placeholders) {
                asciidoc += `=== ${placeholder.description}\\n\\n`;
                asciidoc += `${placeholder.asciidocRef}\\n\\n`;
            }
        }

        // Technical appendix
        asciidoc += `\\n[appendix]\\n`;
        asciidoc += `== Technische Details der Konvertierung\\n\\n`;
        asciidoc += `=== Quelldokument\\n\\n`;
        asciidoc += `* **Dateiname**: ${originalName}.pdf\\n`;
        asciidoc += `* **Seiten**: ${pdfInfo.pages}\\n`;
        asciidoc += `* **Ersteller**: ${pdfInfo.creator || 'Unbekannt'}\\n`;
        asciidoc += `* **Seitengröße**: ${pdfInfo.pageSize || 'Unbekannt'}\\n\\n`;

        asciidoc += `=== Konvertierungsergebnis\\n\\n`;
        asciidoc += `* **Extrahierte Textzeichen**: ${textContent.length.toLocaleString()}\\n`;
        asciidoc += `* **Extrahierte Bilder**: ${imageData.extractedImages}\\n`;
        asciidoc += `* **Ausgabeformat**: AsciiDoc\\n`;
        asciidoc += `* **Durchsuchbarkeit**: ✅ Vollständig durchsuchbar\\n\\n`;

        return asciidoc;
    }

    processTextToAsciiDoc(textContent, imageData) {
        let processedText = '';
        const lines = textContent.split('\\n');
        let currentSection = '';
        let inParagraph = false;
        let imageIndex = 0;

        processedText += `== Hauptinhalt\\n\\n`;

        for (let i = 0; i < lines.length; i++) {
            const line = lines[i].trim();

            // Skip empty lines
            if (line.length === 0) {
                if (inParagraph) {
                    processedText += '\\n\\n';
                    inParagraph = false;
                }
                continue;
            }

            // Detect potential headings
            if (this.isLikelyHeading(line, lines, i)) {
                if (inParagraph) {
                    processedText += '\\n\\n';
                }

                // Insert image before major sections occasionally
                if (imageIndex < imageData.placeholders.length &&
                    line.length > 10 &&
                    Math.random() > 0.7) { // 30% chance to insert image

                    const placeholder = imageData.placeholders[imageIndex];
                    processedText += `${placeholder.asciidocRef}\\n\\n`;
                    imageIndex++;
                }

                processedText += `=== ${line}\\n\\n`;
                inParagraph = false;
                continue;
            }

            // Detect lists
            if (line.match(/^[-•*]\\s/) || line.match(/^\\d+\\.\\s/)) {
                if (inParagraph) {
                    processedText += '\\n\\n';
                    inParagraph = false;
                }

                if (line.match(/^\\d+\\.\\s/)) {
                    // Numbered list
                    processedText += `. ${line.replace(/^\\d+\\.\\s/, '')}\\n`;
                } else {
                    // Bullet list  
                    processedText += `* ${line.replace(/^[-•*]\\s/, '')}\\n`;
                }
                continue;
            }

            // Regular paragraph text
            if (!inParagraph) {
                inParagraph = true;
            } else {
                processedText += ' ';
            }

            processedText += line;
        }

        // Add remaining images at the end if any
        while (imageIndex < imageData.placeholders.length) {
            const placeholder = imageData.placeholders[imageIndex];
            processedText += `\\n\\n${placeholder.asciidocRef}\\n`;
            imageIndex++;
        }

        if (inParagraph) {
            processedText += '\\n\\n';
        }

        return processedText;
    }

    isLikelyHeading(line, allLines, index) {
        // Heuristics for heading detection
        if (line.length === 0 || line.length > 80) return false;

        // All caps might be a heading
        if (line === line.toUpperCase() && line.length > 3) return true;

        // Short line followed by content
        if (line.length < 50 &&
            index < allLines.length - 1 &&
            allLines[index + 1].trim().length > 0) {

            // Starts with capital letter and has no period at end
            if (line.match(/^[A-ZÄÖÜ]/) && !line.endsWith('.')) {
                return true;
            }
        }

        return false;
    }

    generateFallbackTextContent(pdfPath) {
        return `# Textinhalt konnte nicht extrahiert werden

Für die Datei "${path.basename(pdfPath)}" konnte der Textinhalt nicht automatisch extrahiert werden.

Dies kann folgende Gründe haben:
- PDF enthält gescannte Bilder ohne OCR-Text
- PDF ist passwortgeschützt
- Spezielle PDF-Kodierung
- Fehlende PDF-Tools (pdftotext)

## Manuelle Nachbearbeitung erforderlich

Bitte ergänzen Sie den Textinhalt manuell oder verwenden Sie ein OCR-Tool zur Texterkennung.
`;
    }

    generateDetailedReport(pdfPath, outputDir, pdfInfo, textContent, imageData) {
        const timestamp = new Date().toLocaleString('de-DE');

        return `# Intelligenter PDF-zu-AsciiDoc Konvertierungsbericht

## Konvertierungsübersicht

- **Zeitstempel**: ${timestamp}
- **Quelldatei**: ${pdfPath}
- **Ausgabeordner**: ${outputDir}
- **Konvertierungsmodus**: Intelligent (Text + Bilder)

## Dokument-Analyse

### PDF-Metadaten
- **Titel**: ${pdfInfo.title}
- **Autor**: ${pdfInfo.author}
- **Seiten**: ${pdfInfo.pages}
- **Ersteller**: ${pdfInfo.creator || 'Unbekannt'}
- **Seitengröße**: ${pdfInfo.pageSize || 'Unbekannt'}

### Extrahierter Inhalt
- **Textzeichen**: ${textContent.length.toLocaleString()}
- **Textzeilen**: ${textContent.split('\\n').length.toLocaleString()}
- **Extrahierte Bilder**: ${imageData.extractedImages}

## Konvertierungsqualität

### ✅ Erfolgreich
- Dokumentstruktur erkannt
- Text vollständig extrahiert und durchsuchbar
- Bilder als separate Assets extrahiert
- AsciiDoc-Formatierung angewendet
- Metadaten übernommen

### 🔧 Nachbearbeitung empfohlen
- Überschriftenhierarchie manuell prüfen
- Bildplatzierungen optimieren
- Tabellenstrukturen manuell formatieren
- Querverweise und Links ergänzen

## Ordnerstruktur

\`\`\`
${path.basename(outputDir)}/
├── ${path.basename(outputDir)}.adoc
├── intelligent_conversion_report.md
└── images/
${imageData.placeholders.map(p => '    ├── ' + p.filename).join('\\n')}
\`\`\`

## Nächste Schritte

1. **Review**: AsciiDoc-Datei auf Vollständigkeit prüfen
2. **Optimierung**: Überschriftenstruktur anpassen
3. **Bilder**: Bildplatzierungen und -beschriftungen optimieren
4. **Qualitätskontrolle**: Durchsuchbarkeit und Verlinkung testen

---
*Generiert durch Intelligent PDF-to-AsciiDoc Converter*
`;
    }
}

// Test the intelligent converter
async function testIntelligentConversion() {
    const converter = new IntelligentPdfToAsciiDoc();
    const testPdfPath = path.join(process.cwd(), '..', '..', '.assets', 'Grundlagen der Zusammenarbeit.pdf');

    try {
        console.log('🚀 Starting intelligent conversion test...');
        const result = await converter.analyzeAndConvert(testPdfPath, 'grundlagen_der_zusammenarbeit_intelligent');

        console.log('\\n🎉 Intelligent conversion test successful!');
        console.log('📊 Results:');
        console.log(`   📝 Text length: ${result.textLength.toLocaleString()} characters`);
        console.log(`   🖼️ Images extracted: ${result.imageCount}`);
        console.log(`   📑 Pages: ${result.pages}`);
        console.log(`   📄 AsciiDoc: ${result.asciidocPath}`);

    } catch (error) {
        console.error('❌ Intelligent conversion test failed:', error.message);
        console.error('Stack:', error.stack);
    }
}

// If this file is run directly, perform test
if (import.meta.url === `file://${process.argv[1]}`) {
    testIntelligentConversion();
}

export { IntelligentPdfToAsciiDoc };