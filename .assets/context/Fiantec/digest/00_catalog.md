# FiANTEC Context Catalog

**Last Updated:** 2026-02-18  
**Source:** `.assets/context/Fiantec/RAW`  
**Ansatz:** Originaldateien (keine Konvertierung zu Markdown)

## Zusammenfassung

| Metrik | Wert |
| --- | --- |
| **Originaldateien** | 9'030 |
| **Gesamtgrösse** | ~8.3 GB |
| **RAW-Ordner** | 6 |
| **Digest-Dateien** | 11 |

## Schnellnavigation

### Nach Ordner (RAW-Spiegel)

| Ordner | Beschreibung | Dateien | Grösse | Digest |
| --- | --- | --- | --- | --- |
| 01\_Handbücher | Handbücher, Systemdoku, Anleitungen | 1'351 | 7.3 GB | [→](01_Handb%C3%BCcher.md) |
| 02\_Change Management | Releases, Zertifikate, CRs | 961 | 250 MB | [→](02_Change_Management.md) |
| 03\_Reglemente | Vergütungsreglemente (KRITISCH) | 25 | 7.6 MB | [→](03_Reglemente.md) |
| 04\_Testmanagement | Testcode & Testdokumentation | 6'692 | 769 MB | [→](04_Testmanagement.md) |
| 05\_FiANTEC\_v4\_Handbuch | Offizielles Benutzerhandbuch (PDF) | 1 | 31.5 MB | [→](05_FiANTEC_v4_Handbuch.md) |
| 06\_test\_mit\_bildern | FiANTEC GUI-Screenshots (laufend befüllt) | 0+ | dynamisch | [→](06_test_mit_bildern.md) |

### Querschnittsthemen

- [10 Prozesse](10_Prozesse.md) — Fachprozesse quer über alle Bereiche
- [11 Releases](11_Releases.md) — Namenskonventionen und Release-Typen

### Referenz

- [Glossar](00_glossary.md) — 160 Abkürzungen, 53 Fachbegriffe
- [Entscheidungen](00_decisions.md) — Dokumentierte Entscheide und Constraints

## Dateiformate im RAW

| Format | Anzahl | Vorkommen |
| --- | --- | --- |
| java | 2'035 | 04\_Testmanagement (SOAP UI) |
| feature | 1'025 | 04\_Testmanagement (SpecFlow) |
| cs | 795 | 04\_Testmanagement (SpecFlow) |
| dll | 707 | 04\_Testmanagement (SpecFlow) |
| xlsx | 432+ | 01\_Handbücher, 02\_Change Management |
| docx | 482+ | 01\_Handbücher, 02\_Change Management |
| pdf | 384+ | Alle Ordner |
| doc | 288+ | 01\_Handbücher, 02\_Change Management |
| xls | 205 | 01\_Handbücher |
| vsd | 177 | 01\_Handbücher (Visio-Diagramme) |

> **Hinweis:** Code-Artefakte (java, feature, cs, dll) machen >60% der Dateien aus, sind aber für die ARE-Arbeit weniger relevant. Die ~1'800 Office-Dokumente (xlsx, docx, pdf, doc, xls, vsd, pptx) sind der Kernbestand.

## Zugriff auf Originaldateien

| Format | Skill | Tool |
| --- | --- | --- |
| PDF | pdf | pdfplumber |
| DOCX | docx | unpack.py (XML-basiert) |
| XLSX | xlsx | pandas + openpyxl |
| PPTX | pptx | markitdown |

> Für .doc, .xls, .vsd und andere Legacy-Formate steht kein direkter Skill bereit.
