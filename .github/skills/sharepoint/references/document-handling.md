# SharePoint Document Handling - Detailreferenz

## Inhaltsverzeichnis

1. [Ablagestruktur](#ablagestruktur)
2. [Download-Strategien nach Dateityp](#download-strategien-nach-dateityp)
3. [Authentifizierter Download](#authentifizierter-download)
4. [Dokumente im Browser analysieren](#dokumente-im-browser-analysieren)
5. [Weiterverarbeitung mit anderen Skills](#weiterverarbeitung-mit-anderen-skills)

---

## Ablagestruktur

Alle heruntergeladenen Dokumente werden unter `.assets/SharePoint/` gespeichert:

```
.assets/
  SharePoint/
    <site-name>/                    # SharePoint-Site-Name (z.B. "CoA", "ProjectX")
      <dokument1.pdf>
      <dokument2.xlsx>
      subfolder/                    # Optional, wenn Ordnerstruktur beibehalten wird
        <dokument3.docx>
```

### Verzeichnis anlegen

```powershell
# Zielverzeichnis erstellen (idempotent)
$siteName = "<site-name>"
$targetDir = ".assets/SharePoint/$siteName"
New-Item -ItemType Directory -Force -Path $targetDir
```

### Namenskonventionen

| Regel | Beispiel |
|-------|---------|
| Originalnamen beibehalten | `Architektur-Review_2025.pdf` |
| Sonderzeichen ersetzen | `Bericht (final)` wird zu `Bericht_final` |
| Duplikate vermeiden | `_2` anhaengen bei Namenskollision |
| Datum voranstellen bei Bedarf | `2025-01-15_Report.pdf` |

---

## Download-Strategien nach Dateityp

### PDF-Dokumente

1. **Im SharePoint-Viewer oeffnen** - Link anklicken
2. **Download-Button suchen** - SharePoint zeigt einen Download-Button im Viewer
3. **Alternativ**: Direkte URL konstruieren:
   ```
   Original: https://<tenant>.sharepoint.com/sites/<site>/_layouts/15/Doc.aspx?sourcedoc=...
   Download: URL des "Download"-Buttons aus dem Snapshot extrahieren
   ```
4. **Via Terminal herunterladen:**
   ```powershell
   Invoke-WebRequest -Uri "<download-url>" -OutFile ".assets/SharePoint/<site>/<datei>.pdf"
   ```

### Office-Dokumente (DOCX, XLSX, PPTX)

Office-Dokumente werden in Office Online geoeffnet. Download-Optionen:

1. **Screenshot im Browser** - Fuer schnelle visuelle Analyse
2. **Download via SharePoint UI:**
   ```
   mcp_playwright_browser_snapshot -> Download-Button finden
   mcp_playwright_browser_click -> Download-Button anklicken
   ```
3. **Direkte Download-URL:** Meistens in der Form:
   ```
   https://<tenant>.sharepoint.com/sites/<site>/_layouts/15/download.aspx?SourceUrl=<encoded-path>
   ```

### Bilder (PNG, JPG, SVG)

```
1. Bild-URL aus Snapshot oder Seitenquelltext extrahieren
2. Direkt herunterladen:
   Invoke-WebRequest -Uri "<bild-url>" -OutFile ".assets/SharePoint/<site>/<bild>.png"
```

### Andere Dateitypen

Fuer ZIP, CSV, TXT und andere Formate:
- Download-Link aus der Dokumentenbibliothek extrahieren
- Via `Invoke-WebRequest` herunterladen

---

## Authentifizierter Download

### Methode 1: PnP PowerShell (bevorzugt)

PnP PowerShell nutzt den bestehenden Azure-Login:

```powershell
# Verbindung herstellen (nutzt Azure AD Login)
Connect-PnPOnline -Url "https://<tenant>.sharepoint.com/sites/<site>" -Interactive

# Einzelne Datei herunterladen
Get-PnPFile -Url "/sites/<site>/Shared Documents/<ordner>/<datei>" `
  -Path ".assets/SharePoint/<site>" `
  -AsFile

# Mehrere Dateien aus einem Ordner
$files = Get-PnPFolderItem -FolderSiteRelativeUrl "Shared Documents/<ordner>"
foreach ($file in $files) {
    Get-PnPFile -Url $file.ServerRelativeUrl `
      -Path ".assets/SharePoint/<site>" `
      -AsFile
}

# Verbindung trennen
Disconnect-PnPOnline
```

### Methode 2: Azure CLI + Graph API

```powershell
# Access Token holen
$token = az account get-access-token --resource "https://graph.microsoft.com" --query accessToken -o tsv

# Site-ID ermitteln
$siteHost = "<tenant>.sharepoint.com"
$sitePath = "/sites/<site>"
$siteInfo = Invoke-RestMethod -Uri "https://graph.microsoft.com/v1.0/sites/${siteHost}:${sitePath}" `
  -Headers @{ Authorization = "Bearer $token" }

# Drive-ID ermitteln
$drives = Invoke-RestMethod -Uri "https://graph.microsoft.com/v1.0/sites/$($siteInfo.id)/drives" `
  -Headers @{ Authorization = "Bearer $token" }
$driveId = $drives.value[0].id

# Datei herunterladen
$filePath = "<ordner>/<dateiname>"
$encodedPath = [System.Uri]::EscapeDataString($filePath)
$downloadUrl = Invoke-RestMethod -Uri "https://graph.microsoft.com/v1.0/drives/$driveId/root:/${encodedPath}:/" `
  -Headers @{ Authorization = "Bearer $token" }

Invoke-WebRequest -Uri $downloadUrl.'@microsoft.graph.downloadUrl' `
  -OutFile ".assets/SharePoint/<site>/<dateiname>"
```

### Methode 3: Browser-basierter Download (Fallback)

Wenn kein programmatischer Zugriff moeglich ist:

```
1. mcp_playwright_browser_navigate -> Dokument-URL
2. mcp_playwright_browser_snapshot -> Download-Button suchen
3. mcp_playwright_browser_click -> Download-Button
4. Datei wird im Standard-Download-Ordner gespeichert
5. Via PowerShell in .assets/ verschieben:
   Move-Item "$env:USERPROFILE\Downloads\<datei>" ".assets/SharePoint/<site>\"
```

---

## Dokumente im Browser analysieren

Wenn kein Download noetig ist, koennen Dokumente direkt im SharePoint-Viewer analysiert werden:

### PDF im Viewer

```
1. mcp_playwright_browser_navigate -> PDF-URL
2. Warten bis Viewer geladen
3. mcp_playwright_browser_take_screenshot -> Visuelle Erfassung
4. mcp_playwright_browser_snapshot -> Text extrahieren (falls moeglich)
5. Bei mehrseitigen PDFs: Scrollen/Blaettern und weitere Screenshots
```

### Office-Dokumente in Office Online

```
1. mcp_playwright_browser_navigate -> Dokument-URL
2. Warten bis Office Online geladen
3. mcp_playwright_browser_take_screenshot -> Sichtbaren Inhalt erfassen
4. mcp_playwright_browser_snapshot -> Text und Struktur lesen
5. Durch Seiten/Sheets navigieren fuer vollstaendigen Inhalt
```

### Tipps fuer Browser-Analyse

| Aspekt | Empfehlung |
|--------|------------|
| **Mehrseitige PDFs** | Seite fuer Seite scrollen, je Seite Screenshot |
| **Excel-Arbeitsmappen** | Alle relevanten Sheets/Tabs durchklicken |
| **PowerPoint** | Alle Folien durchgehen via Foliennavigation |
| **Grosse Tabellen** | Horizontal und vertikal scrollen |

---

## Weiterverarbeitung mit anderen Skills

Nach dem Download koennen die Dateien mit den passenden Skills weiterverarbeitet werden:

| Dateityp | Skill | Beispiel |
|----------|-------|---------|
| `.pdf` | `pdf` | Text extrahieren, Seiten zusammenfuegen |
| `.docx` | `docx` | Inhalt lesen, bearbeiten, Aenderungen verfolgen |
| `.xlsx` | `xlsx` | Daten analysieren, Diagramme erstellen |
| `.pptx` | `pptx` | Folien lesen, bearbeiten, erstellen |

### Workflow-Beispiel: PDF von SharePoint analysieren

```
1. [sharepoint] Dokument herunterladen nach .assets/SharePoint/<site>/report.pdf
2. [pdf] Text extrahieren: pdfplumber.open(".assets/SharePoint/<site>/report.pdf")
3. Inhalt analysieren und Zusammenfassung erstellen
```

---

## Fehlerbehebung

| Problem | Loesung |
|---------|---------|
| `403 Forbidden` | Berechtigungen pruefen, ggf. Site-Admin kontaktieren |
| `404 Not Found` | URL pruefen, Datei existiert moeglicherweise nicht mehr |
| PnP nicht installiert | `Install-Module PnP.PowerShell -Scope CurrentUser` |
| Token abgelaufen | `az login` erneut ausfuehren |
| Grosse Datei haengt | Timeout erhoehen oder in Chunks herunterladen |
| Download-Button nicht gefunden | Rechtsklick-Menue oder "..." fuer weitere Optionen pruefen |
