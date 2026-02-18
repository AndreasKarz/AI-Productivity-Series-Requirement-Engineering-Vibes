# FiANTEC Decisions & Constraints

**Updated:** 2026-02-18

## Entscheidungen

### Dokumentenformat

- **Originaldateien behalten** — keine automatische Konvertierung nach Markdown
- RAW enthält die Originaldateien (PDF, DOCX, XLSX, PPTX, VSD, XLS etc.)
- Zugriff auf Inhalte erfolgt über ARE-Skills (pdf, docx, xlsx, pptx)

### Digest-Strategie

- Digest ist ein **Index** — zeigt WO relevante Infos im RAW liegen
- Digest reicht NIE als alleinige Quelle — immer im RAW nachschlagen
- Flache Struktur: eine Datei pro RAW-Ordner (Fachwissen + Dateistruktur kombiniert)

### Ordnerstruktur

- Originale SharePoint-Hierarchie wird beibehalten
- 6 Hauptordner: 01\_Handbücher, 02\_Change Management, 03\_Reglemente, 04\_Testmanagement, 05\_FiANTEC\_v4\_Handbuch, 06\_test\_mit\_bildern

### Glossar

- Angereichert aus XLSX-Quelle (160 Abkürzungen, 53 Fachbegriffe)
- Kategorisiert nach Themengebieten

## Constraints

- Digest-Dateien sind git-tracked — nicht random löschen, sauber überarbeiten
- Reglemente (03\_Reglemente) sind das **Fundament** — immer zuerst prüfen
- 06\_test\_mit\_bildern wird **schrittweise** mit FiANTEC-GUI-Screenshots befüllt — dynamischer Lernprozess für die KI
- Nur FiANTEC-Perspektive — nur systemspezifisch, nicht konzernweit
- **Keine Firmennamen im Digest** — weder Auftraggeber noch Partner namentlich erwähnen (Dateinamen aus RAW ausgenommen)
- **Keine Redundanzen** — jede Information hat genau einen Ort im Digest
- Quellenangaben nur im Chat, **nie** in Artefakten (Feature Descriptions, Acceptance Criteria)

## Sync

- SharePoint → Lokal via `scripts/sync-raw.ps1` (Manifest-basierte Änderungserkennung)
- SharePoint wird aktuell neu beladen — Sync noch nicht aktiv

## Do Not Do

- Keine automatische Konvertierung von Originaldateien
- Keine Annahmen ohne Quellenbeleg aus RAW-Dokumenten
- Keine RAW-Änderungen ohne explizite Anweisung
- Keine ADO-Änderungen ohne explizite Bestätigung
