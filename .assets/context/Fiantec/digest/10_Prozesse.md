# Fachprozesse

**Source:** `RAW/01_Handbücher/FiANTEC Systemdoku/00 Architektur_und_Prozesse/` + `Fachprozesse & Anleitungen/`
**→ Digest:** [01 Handbücher](01_Handbücher.md) | **Prozessarchitektur:** `Prozessarchitektur FiANTEC_v01.04.xlsx`

## Prozesslandschaft FiANTEC v4

Die FiANTEC-Prozesse sind in vier Kategorien gegliedert. Jede Kategorie hat einen eigenen Ordner im RAW unter `00 Architektur_und_Prozesse/`:

### K — Konfigurationsprozesse (Systemaufbau)

| ID | Prozess | RAW-Ordner | Beschreibung |
| --- | --- | --- | --- |
| K_01 | Mandant/Absatzkanal einrichten | `010_K_01_Mandant_Absatzkanal einrichten/` | Ersteinrichtung von Mandanten und Absatzkanälen |
| K_02 | Fabriken/Produktbereiche einrichten | `020_K_02_Fabriken_Produktbereiche_einrichten/` | Factories und Produktbereiche konfigurieren |
| K_03 | Provisionskonfiguration einrichten | `030_K_03_Provisionskonfiguration einrichten/` | Provisionsarten, Staffeln, Vergütungsregeln |

### SV — Setup Vertriebsorganisation

| ID | Prozess | RAW-Ordner | Beschreibung |
| --- | --- | --- | --- |
| SV_01 | Vertriebsorganisation einrichten | `040_SV_01_Vertriebsorganisation einrichten/` | VOE, Aufbauorga, Gebiete, VMA initialisieren |

### OP — Operative Prozesse (Tagesgeschäft)

| ID | Prozess | RAW-Ordner | Beschreibung |
| --- | --- | --- | --- |
| OP_01 | Erstbetreuung anlegen | `050_OP_01_Erstbetreuung_anlegen/` | Zuweisung eines Vertrags/Kunden an eine Vertriebseinheit |
| OP_02 | Leistungsträgersatz anlegen/ändern | `060_OP_02_Leistungsträgersatz anlegen_ändern/` | Definition und Mutation von Leistungsträgern |
| OP_03 | Mutation anlegen | `070_OP_03_Mutation anlegen/` | Änderungen an Vertrags- und Stammdaten |
| OP_04 | Provision berechnen | `080_OP_04_Provision berechnen/` | Kernprozess: Provisionsberechnung auf Basis von GeVo/FE/FFE |
| OP_05 | Tagesendverarbeitung (TEV) | `090_OP_05_Tagesendverarbeitung/` | Nightly Batch: Provisionsberechnungen abschliessen |
| OP_06 | Spezialprozesse periodisch | `100_OP_06_Spezialprozesse_periodisch/` | Periodische Jobs (z.B. JEVE, RAD, EGR) |
| OP_07 | Monatsendverarbeitung (MEV) | `110_OP_07_Monatsendverarbeitung_durchführen/` | Monatlicher Batch: Abrechnungen, SAP-Export, Berichte |
| OP_08 | Betreuungen umteilen | `120_OP_08_Betreuungen_Umteilen/` | Portfoliomigration, Gebietsänderungen |

### SP — Stammdatenpflege

| ID | Prozess | RAW-Ordner | Beschreibung |
| --- | --- | --- | --- |
| SP_01 | Vertriebsorganisation pflegen | `130_SP_01_Vertriebsorganisation pflegen/` | Laufende Anpassungen an VOE, VMA, Gebieten |
| SP_02 | Mandant/Absatzkanal pflegen | `140_SP_02_Mandant_Absatzkanal_pflegen/` | Änderungen an Mandantenkonfiguration |
| SP_03 | Provisionskonfiguration pflegen | `150_SP_03_Provisionskonfiguration pflegen/` | Anpassungen Vergütungsregeln, Staffeln, Prov.art-Konfig |
| SP_04 | OREC (Operational Risk) | `160_SP_04_Operational Risk Event Collection (OREC)/` | Risikomanagement und IKS-Prozesse |

> **Alle RAW-Pfade:** Relativ zu `RAW/01_Handbücher/FiANTEC Systemdoku/00 Architektur_und_Prozesse/`

## Kernprozessbereiche (Querschnitt)

### Provisionsverarbeitung
- **Provisionsberechnung:** OP_04 → Kernprozess, ausgelöst durch GeVo-Import, Fabrikereignisse (FE) oder Fremdfabrikereignisse (FFE)
- **Batch-Verarbeitung:** OP_05 (TEV, täglich), OP_07 (MEV, monatlich), OP_06 (JEVE, jährlich)
- **Provisionsabstimmung:** Ergebnis der MEV, Export nach SAP-FSCD/SAP-FI
- **Detaillierte Businesslogik:** `FIA 03 BusinessLogik_v01.45.docx` in `03 Business Logik und Vertriebsorganisation/`

### Vertragsmanagement
- Policen-Erstellung und -Änderung (OP_03)
- Vertragsbetreuung und Portfoliozuweisung (OP_01, OP_08)
- Portfolio-Verwaltung (SP_01)

### Datenverarbeitung
- GeVo-Import, SEPA-Export, SAP FI/HCM-Export
- Batch-Jobs: TEV (OP_05), MEV (OP_07), JEVE (OP_06)
- Schnittstellenmanagement → siehe [01 Handbücher](01_Handbücher.md) → Schnittstellen-Navigation

### Reporting
- Standardreports und Crystal Reports
- Recherchen: Listen-, System-, Anwenderrecherchen
- Recherchedesigner (Lizenzerweiterung, siehe FiANTEC v4 Handbuch)

## Prozessmodellierung (Tools)

| Tool | Verwendung | RAW-Pfad |
| --- | --- | --- |
| **ADONIS** | Offizielle Prozessmodellierung Swiss Life | `Fachprozesse & Anleitungen/ADONIS, Camunda und BPMN/` |
| **Camunda Modeler** | BPMN 2.0 Modellierung mit Token-Simulation | `Fachprozesse & Anleitungen/ADONIS, Camunda und BPMN/camunda modeler mit Tokensimulator/` |

> **Schulungsmaterial:** ADONIS Schulung für Modellierer, BPMN 2.0 Poster, Prozess-Steckbrief Vorlage (PPTX)
> Weitere prozessrelevante Dokumente: [01 Handbücher](01_Handbücher.md) → Abschnitt 03 Business Logik
