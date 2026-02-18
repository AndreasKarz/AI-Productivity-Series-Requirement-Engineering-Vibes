# FiANTEC Context — Ordnerstruktur

**Stand:** 2026-02-18 | **Dateien:** 9'030 | **Grösse:** ~8.3 GB

```
.assets/context/Fiantec/
│
├── STRUKTUR.md                          ← Diese Datei
│
├── digest/                              ── INDEX (11 Dateien, ~29 KB)
│   │
│   │  ── Meta ──────────────────────────────────────────────
│   ├── 00_catalog.md                    Einstiegspunkt & Schnellnavigation
│   ├── 00_glossary.md                   160 Abkürzungen, 53 Fachbegriffe
│   ├── 00_decisions.md                  Entscheide, Constraints, Do-Not-Dos
│   │
│   │  ── Pro RAW-Ordner ───────────────────────────────────
│   ├── 01_Handbücher.md                 → RAW/01_Handbücher
│   ├── 02_Change_Management.md          → RAW/02_Change Management
│   ├── 03_Reglemente.md                 → RAW/03_Reglemente ⚠️ Fundament
│   ├── 04_Testmanagement.md             → RAW/04_Testmanagement
│   ├── 05_FiANTEC_v4_Handbuch.md        → RAW/05_FiANTEC_v4_Handbuch
│   ├── 06_test_mit_bildern.md           → RAW/06_test_mit_bildern
│   │
│   │  ── Querschnitt ──────────────────────────────────────
│   ├── 10_Prozesse.md                   Fachprozesse (aus 01_Handbücher)
│   └── 11_Releases.md                   Namenskonventionen & Release-Typen
│
└── RAW/                                 ── ORIGINALDATEIEN (9'030 Dateien, ~8.3 GB)
    │
    ├── 01_Handbücher/                   1'351 Dateien, ~7.3 GB
    │   ├── Fachprozesse & Anleitungen/       73 Dateien
    │   ├── FiANTEC Systemdoku/            1'230 Dateien
    │   ├── Verträge & SLA FiANTEC/           43 Dateien
    │   └── Vorlagen & Templates/              5 Dateien
    │
    ├── 02_Change Management/            961 Dateien, ~250 MB
    │   ├── 14.-tgl. & Mev/                   1 Datei
    │   ├── Bugs/                              2 Dateien
    │   ├── Dokumente zu Produktivsetzungen/ 860 Dateien
    │   ├── Features/                         98 Dateien
    │   ├── Incidents/                         — (leer)
    │   └── Reports/                           — (leer)
    │
    ├── 03_Reglemente/                   25 Dateien, ~8 MB ⚠️ FUNDAMENT
    │   └── 2026 02 04_Reglemente Full Export/  25 Dateien
    │
    ├── 04_Testmanagement/               6'692 Dateien, ~769 MB
    │   ├── Anleitungen Testing/              56 Dateien
    │   ├── Azure DevOps/                      6 Dateien
    │   ├── Release-Dokumentation/             1 Datei
    │   ├── SOAP UI/                       3'106 Dateien
    │   ├── SpecFlow/                      3'522 Dateien
    │   └── XMLInterface/                      — (leer)
    │
    ├── 05_FiANTEC_v4_Handbuch/          1 Datei, ~32 MB
    │   └── FiANTEC_v4_Handbuch.pdf
    │
    └── 06_test_mit_bildern/             0+ Dateien, dynamisch
        └── (wird laufend mit GUI-Screenshots befüllt)
```

## Legende

| Symbol | Bedeutung |
| --- | --- |
| `→` | Digest verweist auf diesen RAW-Ordner |
| `⚠️` | Kritisch — immer zuerst prüfen |
| `—` | Leer (noch keine Dateien) |

## Nummern-Logik

| Bereich | Zweck |
| --- | --- |
| `00_*` | Meta-Dateien (Katalog, Glossar, Entscheide) |
| `01–06_*` | Je eine Digest-Datei pro RAW-Ordner |
| `07–09` | Reserviert für zukünftige RAW-Ordner |
| `10–11_*` | Querschnittsthemen (ordnerübergreifend) |