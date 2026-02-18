# 02 Change Management

**RAW:** `RAW/02_Change Management` | **Files:** 961 | **Size:** ~250 MB

**Stichwörter:** Release, Deployment, Produktivsetzung, GoLive, Change Request, CR, Zertifizierung, Release Bulletin, Zertifikat, ProvFia, DMV, Datenmigration, Canossa, Batchjobs, MEV, Datenbank, BI Reporting, Feature-Spezifikation, Impact-Analyse, Checkliste, Post-GoLive

## Wann hier suchen?

- **Release-Dokumentation** — Bulletins, Zertifikate, Checklisten pro Produktivsetzung
- **Change Requests** — Feature-Spezifikationen, Impact-Analysen
- **Historische Releases** — Was wurde wann deployt, welche Artefakte gehören dazu
- **Fachbereichs-Releases** — ProvFia, DMV, Canossa, Batchjobs, Schnittstellen, Datenbank, BI

## Prozessablauf

1. **CR erstellt** → Change Request im ADO erfasst
2. **Spezifikation** → Requirements in PBI/Feature dokumentiert
3. **Entwicklung** → FiANTEC DE implementiert
4. **Zertifizierung** → Test auf Teststufen (ST → UAT → PAV)
5. **Produktivsetzung** → Release-Paket wird deployt

## Artefakte pro Phase

| Phase | Artefakte | RAW-Bereich |
|-------|-----------|-------------|
| CR | Change Request, Impact-Analyse | Features/ |
| Spezifikation | PBI, Akzeptanzkriterien | ADO (nicht im RAW) |
| Entwicklung | Release Bulletin, Zertifikat | Produktivsetzungen/ |
| Test | Testfälle, Protokolle | → [04 Testmanagement](04_Testmanagement.md) |
| GoLive | Checkliste, Post-GoLive-Report | Produktivsetzungen/ |

## Dateitypen

| Extension | Anzahl | Beschreibung |
|-----------|--------|--------------|
| .xlsx | 427 | Hauptformat (Release Bulletins) |
| .xls | 153 | Ältere Excel-Dateien |
| .docx | 144 | Word-Dokumente |
| .msg | 81 | E-Mails |
| .pdf | 42 | PDFs (Zertifikate, Bulletins) |
| .doc | 27 | Ältere Word-Dateien |
| .pptx | 21 | Präsentationen |
| .xlsm | 5 | Excel mit Makros |
| .vsdx | 4 | Visio-Diagramme |
| .pak | 2 | FiANTEC-Paketdateien |

## Unterordner

### Produktivsetzungen (860 Dateien, 207 MB)

Release-Dokumentation gegliedert nach Fachbereichen:

| Bereich | Dateien |
|---------|---------|
| ProvFia | 215 |
| DMV (Datenmigration) | 143 |
| Canossa | 122 |
| Batchjobs | 81 |
| Schnittstellen | 78 |
| Datenbank | 55 |
| BI Reporting | 41 |
| Tools, Hilfsmittel | 25 |

### Features (98 Dateien, 34 MB)

Feature-Spezifikationen, Impact-Analysen, Change Requests.

### Bugs (2 Dateien)

Bug-Dokumentation (historisch, die meisten Bugs sind im ADO).

### 14-tgl. & Mev (1 Datei)

Zeitplan für 14-tägliche Releases und Monatsendverarbeitung.

### Incidents & Reports (leer)

Historischer Ordner, Incidents werden im ADO geführt.

## Siehe auch

- [11 Releases](11_Releases.md) — Namenskonventionen und Release-Typen
