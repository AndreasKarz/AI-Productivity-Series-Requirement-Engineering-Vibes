---
name: sharepoint
description: "Zugriff auf SharePoint-Dokumente und -Seiten via Playwright MCP Server. Verwende diesen Skill immer, wenn der Benutzer auf SharePoint-Ressourcen zugreifen, SharePoint-Seiten lesen, Dokumente von SharePoint herunterladen oder SharePoint-Inhalte analysieren moechte. Triggers: SharePoint, SharePoint-Seite, SharePoint-Dokument, SP-Link, .sharepoint.com URL, Intranet-Dokument, SharePoint-Wiki, SharePoint-Liste."
---

# SharePoint Access via Playwright

Zugriff auf SharePoint-Dokumente und -Seiten ueber den Playwright MCP Server mit automatischer Microsoft-Authentifizierung.

## Voraussetzungen

- **Playwright MCP Server** muss aktiv sein (siehe `.vscode/mcp.json`)
- **Azure CLI Login** muss bestehen (`az login` bereits durchgefuehrt)
- Dokumente werden bei Bedarf unter `.assets/` zwischengespeichert

## Workflow

### Schritt 1: Login-Identitaet ermitteln

Vor dem SharePoint-Zugriff die E-Mail-Adresse des angemeldeten Benutzers abfragen:

```powershell
az ad signed-in-user show --query "mail" -o tsv
```

Aus der E-Mail die **Domain** extrahieren (z.B. `user@contoso.com` ergibt `contoso.com`).
Den **Login-Namen** (volle E-Mail) fuer die Authentifizierung merken.

### Schritt 2: SharePoint-Seite navigieren

```
mcp_playwright_browser_navigate -> URL der SharePoint-Seite
```

### Schritt 3: Microsoft-Login behandeln

Nach Navigation pruefen, ob eine Microsoft-Login-Seite erscheint:

1. `mcp_playwright_browser_snapshot` ausfuehren
2. Nach Account-Auswahlbuttons suchen, die die ermittelte E-Mail-Domain enthalten
3. Den passenden Account-Button anklicken:
   ```
   mcp_playwright_browser_click -> auf den Account-Button mit der erkannten E-Mail
   ```
4. Warten bis die SharePoint-Seite vollstaendig geladen ist:
   ```
   mcp_playwright_browser_wait_for -> Seiteninhalt sichtbar
   ```

**Wichtig:** Falls kein Account-Button erscheint und stattdessen ein E-Mail-Eingabefeld:
1. E-Mail-Adresse eingeben via `mcp_playwright_browser_fill_form`
2. "Weiter"/"Next" anklicken
3. Warten bis SSO/SAML-Redirect abgeschlossen ist

### Schritt 4: Inhalte extrahieren

Fuer Detail-Workflows zur Inhaltsextraktion siehe [references/content-extraction.md](references/content-extraction.md).

**Kurzuebersicht:**

| Inhaltstyp | Vorgehen |
|------------|----------|
| **Seitentext** | `mcp_playwright_browser_snapshot` - Text, Ueberschriften, Links extrahieren |
| **Navigation** | Snapshot analysieren, Unterpunkte identifizieren |
| **Listen/Tabellen** | Snapshot, strukturierte Daten als Markdown aufbereiten |
| **Binaerdokumente** | Siehe Schritt 5 |

### Schritt 5: Dokumente herunterladen und zwischenspeichern

Fuer den vollstaendigen Dokument-Handling-Workflow siehe [references/document-handling.md](references/document-handling.md).

**Kurzuebersicht:**

Dokumente werden im Ordner `.assets/` zwischengespeichert. Struktur:

```
.assets/
  SharePoint/
    <site-name>/
      dokument1.pdf
      dokument2.xlsx
      ...
```

**Download-Ablauf:**

1. **Link identifizieren** - Dokument-URL aus dem Snapshot extrahieren
2. **Dateityp pruefen** - PDF, DOCX, XLSX, PPTX, etc.
3. **Im Browser oeffnen** - Link anklicken, SharePoint-Viewer oeffnet sich
4. **Screenshot erstellen** - `mcp_playwright_browser_take_screenshot` fuer visuellen Kontext
5. **Download-URL extrahieren** - Download-Button im SharePoint-Viewer suchen und Direktlink ermitteln
6. **Lokal speichern** - Via PowerShell-Terminal herunterladen:

```powershell
# Zielverzeichnis sicherstellen
New-Item -ItemType Directory -Force -Path ".assets/SharePoint/<site-name>"

# Download via Invoke-WebRequest (Cookie-basiert, wenn noetig)
Invoke-WebRequest -Uri "<direkter-download-link>" -OutFile ".assets/SharePoint/<site-name>/<dateiname>"
```

**Alternativ bei authentifiziertem Zugriff ueber PnP PowerShell:**

```powershell
# Falls PnP.PowerShell verfuegbar
Connect-PnPOnline -Url "https://<tenant>.sharepoint.com/sites/<site>" -Interactive
Get-PnPFile -Url "/sites/<site>/Shared Documents/<dateiname>" -Path ".assets/SharePoint/<site-name>" -AsFile
```

### Schritt 6: Inhalt analysieren und zusammenfassen

Nach dem Zugriff:
- **Strukturierte Zusammenfassung** der gefundenen Inhalte erstellen
- **Navigationsstruktur** und wichtige Links dokumentieren
- **Kontaktinformationen** hervorheben
- **Quellenangabe** mit SharePoint-URL angeben

## Fehlerbehandlung

| Problem | Loesung |
|---------|---------|
| Login-Seite erscheint nicht | URL pruefen, ggf. Tenant-spezifische URL verwenden |
| Account wird nicht erkannt | E-Mail manuell eingeben statt Account-Button |
| Seite laedt nicht | `mcp_playwright_browser_wait_for` mit laengerem Timeout |
| Download schlaegt fehl | PnP PowerShell als Alternative nutzen |
| MFA-Prompt erscheint | Benutzer informieren, manuell bestaetigen lassen |
| Dokument nicht lesbar | Screenshot erstellen und visuell analysieren |

## Einschraenkungen

- **Keine Passwort-Eingabe** - Nur SSO/Account-Picker-basierte Authentifizierung
- **MFA** erfordert ggf. manuelle Benutzerinteraktion
- **Grosse Dateien** (>50 MB) koennen beim Download laenger dauern
- **DRM-geschuetzte Dokumente** koennen nicht heruntergeladen werden
