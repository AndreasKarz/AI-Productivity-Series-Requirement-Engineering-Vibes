# PDF2IMG MCP Server

Ein Model Context Protocol (MCP) Server für die Konvertierung von PDF-Dateien in hochqualitative PNG-Bilder, optimiert für OCR-Verarbeitung.

## Features

- **Hochqualitative PDF-zu-PNG Konvertierung**: Verwendet pdf-poppler für pixelgenaue Renderqualität
- **Multi-Page Support**: Kombiniert alle PDF-Seiten in ein einziges langes PNG-Bild
- **OCR-optimiert**: Standard 300 DPI für beste OCR-Ergebnisse
- **Visuelle Integrität**: Erhält alle visuellen Elemente (Bilder, Grafiken, Unterschriften) exakt an der richtigen Position
- **Flexible Ausgabe**: Unterstützt PNG und JPEG Formate
- **Automatische Bereinigung**: Temporäre Dateien werden automatisch gelöscht

## Installation

```bash
cd .mcp/pdf2img
npm install
```

## Tools

### `convert_pdf_to_png`
Konvertiert eine PDF-Datei in ein hochqualitatives PNG-Bild.

**Parameter:**
- `pdfPath` (erforderlich): Absoluter Pfad zur PDF-Datei
- `outputPath` (optional): Ausgabepfad für das PNG-Bild
- `dpi` (optional): DPI für die Konvertierung (Standard: 300)
- `format` (optional): Ausgabeformat - 'png' oder 'jpeg' (Standard: 'png')

**Beispiel:**
```json
{
  "pdfPath": "C:\\Users\\karz\\ARE\\.assets\\Grundlagen der Zusammenarbeit.pdf",
  "outputPath": "C:\\Users\\karz\\Documents\\converted.png",
  "dpi": 300
}
```

### `get_pdf_info`
Liefert Informationen über eine PDF-Datei einschließlich Seitenanzahl und geschätzte Ausgabedimensionen.

**Parameter:**
- `pdfPath` (erforderlich): Absoluter Pfad zur PDF-Datei

## Technische Details

- **PDF-Rendering**: pdf-poppler (Node.js Wrapper für Poppler)
- **Bildbearbeitung**: Jimp für das Zusammenfügen der Seiten
- **Ausgabequalität**: 300 DPI Standard für OCR-Tauglichkeit
- **Unterstützte Formate**: PNG (verlustfrei), JPEG (komprimiert)

## Integration in ARE Project

Der MCP Server ist bereits in die `.vscode/mcp.json` Konfiguration integriert und kann direkt über GitHub Copilot verwendet werden.

## Verwendung

Nach der Integration kann der MCP Server über GitHub Copilot verwendet werden:

1. "Konvertiere diese PDF-Datei zu einem PNG-Bild"
2. "Zeige mir Informationen über diese PDF-Datei"
3. "Erstelle ein OCR-taugliches Bild aus diesem PDF"

## Systemanforderungen

- Node.js >= 18
- Poppler (wird automatisch mit pdf-poppler installiert)
- Ausreichend Speicherplatz für temporäre Dateien

## Troubleshooting

- **Fehler bei der Installation**: Stelle sicher, dass Node.js >= 18 installiert ist
- **Konvertierungsfehler**: Überprüfe, ob die PDF-Datei nicht beschädigt oder passwortgeschützt ist
- **Speicherprobleme**: Reduziere die DPI für sehr große PDF-Dateien