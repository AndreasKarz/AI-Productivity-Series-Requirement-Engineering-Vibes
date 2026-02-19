# 01 Handbücher

**RAW:** `RAW/01_Handbücher` | **Files:** 1'351 | **Size:** ~7.3 GB | **Letzte Aktualisierung:** 2026-02-18

**Stichwörter:** Architektur, Datenmodell, Referenzdaten, Schnittstellen, SOAP, REST, WSDL, XSD, Webservice, Vertriebsstruktur, Vertriebsorganisation, Geschäftspartner, Vermittler, Geschäftslogik, IAM, Berechtigungen, Konfiguration, GUI-Dokumentation, Masken, Prozessübersicht, BPMN, ADONIS, Camunda, Verträge, SLA, Vorlagen, Templates, Visio, Zeitscheiben, Historisierung, ProvFia WebClient, Recherchedesigner

## Wann hier suchen?

*   **Systemdokumentation** — Architektur, Geschäftslogik, Schnittstellen, Datenmodell (FiANTEC Systemdoku, 14 Abschnitte)
*   **Fachprozessanleitungen** — Schritt-für-Schritt-Anleitungen für operative Aufgaben
*   **Begriffe & Abkürzungen** — Zentrales Glossar als XLSX
*   **Verträge & SLA** — Vertragliche Rahmenbedingungen mit dem Hersteller

## Navigationshinweise

| Informationsbedarf | Wo suchen |
| --- | --- |
| Architektur, Prozessübersichten | `FiANTEC Systemdoku/00 Architektur_und_Prozesse` |
| Geschäftsregeln, Vertriebsstrukturen | `FiANTEC Systemdoku/03 Business Logik und Vertriebsorganisation` |
| Schnittstellen (SOAP/REST, WSDL, XSD) | `FiANTEC Systemdoku/04 Schnittstellen` |
| Datenmodell, Referenzdaten | `FiANTEC Systemdoku/08 Fachliches Datenmodell_und_Referenzdaten` |
| IAM, Berechtigungskonzepte | `FiANTEC Systemdoku/05 Identity and Access Management` |
| Operative Anleitungen | `Fachprozesse & Anleitungen` |

## Entity-Übersicht (Datenmodell-Navigation)

FiANTEC verwaltet vier Kern-Domänen. Die folgende Tabelle zeigt, **wo im RAW** die Details zu jeder Entity liegen:

### Vertriebsorganisation

| Entity | Schlüssel-Dokumente | RAW-Pfad |
| --- | --- | --- |
| **Geschäftspartner / VMA** | VER-E236 spec Definition Vertriebsorganisation v04.03.doc | `03 Business Logik und Vertriebsorganisation/` |
| **Aufbauorga / VOE** | VER-E236 Vertriebsorganisation FiANTEC_V01.08.vsdx | `03 Business Logik und Vertriebsorganisation/` |
| **Gebiet / Portefeuille** | VER-E134 Datenmodell-Vertriebsstammdaten-Felder v02.00.xls | `08 Fachliches Datenmodell_und_Referenzdaten/Aus Projekt V4/` |
| **Berufsbilder (BB)** | VER-E236 BB-Code Gesamtuebersicht v03 03.xls | `03 Business Logik und Vertriebsorganisation/` |

### Vergütung & Provisionierung

| Entity | Schlüssel-Dokumente | RAW-Pfad |
| --- | --- | --- |
| **Vergütungsvertrag / -regel / -element** | FIA 03 BusinessLogik_v01.45.docx (aktuellste) | `03 Business Logik und Vertriebsorganisation/` |
| **Provisionsart-Konfiguration** | FIA 03 BusinessLogik_v01.45.docx | `03 Business Logik und Vertriebsorganisation/` |
| **Provisionsstaffel** | FIA 03 BusinessLogik_v01.45.docx | `03 Business Logik und Vertriebsorganisation/` |
| **Buchungslogik** | Doku Buchungslogik FiANTEC/ (Unterordner) | `03 Business Logik und Vertriebsorganisation/Doku Buchungslogik FiANTEC/` |
| **Provisionsmodell** | Provisionsmodell (VER-E125)/ (Unterordner) | `03 Business Logik und Vertriebsorganisation/Provisionsmodell (VER-E125)/` |

### Datenmodell & Referenzdaten

| Entity | Schlüssel-Dokumente | RAW-Pfad |
| --- | --- | --- |
| **Datenmodell (Gesamtübersicht)** | 2021-09-27_Datenmodell_FiANTEC v00.02.xlsx | `08 Fachliches Datenmodell_und_Referenzdaten/Aus Projekt V4/` |
| **Datenmodell Provisionierung** | Datenmodell Provisionierung (FiANTEC v4) - v01.00.jpg | `08 Fachliches Datenmodell_und_Referenzdaten/` |
| **Datenmodell Vertriebsstammdaten** | Datenmodell Vertriebsstammdaten (FiANTEC v4) - v01.00.jpg | `08 Fachliches Datenmodell_und_Referenzdaten/` |
| **Feldvalidierungen** | VER-E134 Datenmodell-Vertriebsstammdaten-Validierungen v02.02.xls | `08 Fachliches Datenmodell_und_Referenzdaten/Aus Projekt V4/` |
| **CTR-Änderungen (Codetabellen)** | VER-E234 spec Änderungen CTR v02.71_tagged.xlsx | `08 Fachliches Datenmodell_und_Referenzdaten/Aus Projekt V4/` |
| **Referenzdaten (Detail)** | ~257 XLS/XLSX Einzeldateien (Codetabellen, Referenzwerte) | `08 Fachliches Datenmodell_und_Referenzdaten/Aus V3/` |

> **Hinweis:** Die 2 JPG-Dateien (Datenmodelle) sind visuelle Übersichten — unbedingt ansehen für das Verständnis der Entity-Beziehungen!

## Schnittstellen-Navigation

### Übersichtsdokumente

| Dokument | Version | Beschreibung | RAW-Pfad |
| --- | --- | --- | --- |
| **FIA040_Fachliche Systemgrenzen** | v02.13 (.vsd) | Visio-Diagramm aller Systemgrenzen und Datenflüsse | `04 Schnittstellen/Tabellen und Grafiken/` |
| **FIA040_Fachliche Systemgrenzen** | v02.11 (.pdf) | PDF-Export (etwas älter, aber lesbar) | `04 Schnittstellen/Tabellen und Grafiken/` |
| **FIA040_SST Kontext2014** | v02.42 (.vsd) | Systemkontext-Diagramm | `04 Schnittstellen/Tabellen und Grafiken/` |
| **FiA04 Schnittstellen** | v1.84 (.docx) | Hauptdokument Schnittstellenbeschreibung | `04 Schnittstellen/` |
| **Verwendungsnachweise** | v01.47 (.xlsx) | Übersicht Schnittstellenverwendung | `04 Schnittstellen/Tabellen und Grafiken/` |
| **Ansprechpartner Dritte** | v01.02 (.xlsx) | Kontaktdaten externe Partner | `04 Schnittstellen/` |

### Technische Schnittstellen (WSDL/XSD)

| Paket | Version | Beschreibung | RAW-Pfad |
| --- | --- | --- | --- |
| **ProvFia-wsdl** | 2025.11.001 | SOAP-Services für Provisionierung | `04 Schnittstellen/WSDL/` |
| **VSDS-wsdl** | 2025.11.001 | SOAP-Services Legacy-Schnittstelle | `04 Schnittstellen/WSDL/` |

### Spezifische Interface-Dokumentation

| Schnittstelle | RAW-Pfad |
| --- | --- |
| **APRICOS** (Dokumentendruck) | `04 Schnittstellen/117_Apricos - Struktur/` |
| **SAP-FI / CAS-FINT** | `04 Schnittstellen/131_SAP-FI CAS-FINT - Struktur/` |
| **GPV2 Postdaten** | `04 Schnittstellen/GPV2 Postdaten Struktur/` |
| **HCM-Export** | `03 Business Logik und Vertriebsorganisation/Doku HCM-Export FiANTEC/` |

> **Alle RAW-Pfade:** Relativ zu `RAW/01_Handbücher/FiANTEC Systemdoku/`
> **Offizielle Systemgrenzen:** Immer FIA040 v02.13 als Referenz verwenden!

## FIA040 Fachliche Systemgrenzen FIANTEC V4

**Version:** V02.13 vom 01.10.2025
**RAW-Quelle:** `04 Schnittstellen/Tabellen und Grafiken/FIA040_Fachliche Systemgrenzen v02.13.vsd`

> Die folgende MD-Darstellung bildet das offizielle Visio-Diagramm ab. Pfeilrichtung = Informationsfluss.

### FiANTEC Kern-Entities (gelber Bereich)

```
┌─────────────────────────────────────────┐
│              FIANTEC                    │
│                                         │
│  Vertriebskanal    Portefeuille         │
│  Verträge          Bewegungsdaten       │
│  Vertriebsorganisation                  │
│  Gebiete           Kunden               │
│  Vertriebsmitarbeiter                   │
│  Provisionsregelung                     │
│  Konfigurationen                        │
└─────────────────────────────────────────┘
```

### Umsysteme und Datenflüsse

#### Eigene Fabriken Privatkunden
**Systeme:** OFE, BPROF, GPV, VWS, NEO, ODW

| Richtung | Datenobjekte |
| --- | --- |
| **→ FiANTEC** | Erstbetreuung, VertragsAssets & Fondsanteile, Abschlussdaten, Kunden/Verträge, FE Bewegung, Leistungsträger |
| **← FiANTEC** | Leistungsträger, Vertriebsmitarbeiter, Vertriebsorganisation, Betreuungen, Benutzer, Provisionssimulation |

#### Eigene Fabriken Unternehmensgeschäft
**Systeme:** DIGIS (bis 31.12.2025), COPS (ab 01.01.2026), MyLife, Offerte-MyLife
**Adapter:** KVVSA (KollektivVertragsStammAdapter)

| Richtung | Datenobjekte |
| --- | --- |
| **→ FiANTEC** | Kunde, Vertrag (via KVVSA) |
| **← FiANTEC** | Vertriebsmitarbeiter, Vertriebsorganisation, Betreuungen, Gebiet, Abschlussdaten Plausi, Provisionssimulation |

#### Eigener Vertrieb
**Systeme:** Marktplatz, MyCockpit, SelectCockpit (SAP-Cockpit), PROVFIA-WebClient

| Richtung | Datenobjekte |
| --- | --- |
| **→ FiANTEC** | Erstbetreuer, Betreuungen, FE Bewegung, Bewegung, Abschlussdaten, Leistungsträger |
| **← FiANTEC** | Vertriebsmitarbeiter, Vertriebsorganisation, Betreuung, Gebiet, Provisionssimulation, Provisionsbeauskunftung, Abschlussdaten, Systematische Kundenbetreuung |

#### Fremde Factories (mit aktiven Verträgen)
**Systeme:** SSO, Mobiliar, Sanitas, Helsana DAS, SL Hypotheken, LPZ/IBL, SLAM, CS/SLPS/UBS/NAB, 3a-Start, SLIA, IMMO, SLSERV, Valiant, Vaudoise, CAP, SwissFEX, Group Mutuel

| Richtung | Datenobjekte |
| --- | --- |
| **→ FiANTEC** | Kunde, Verträge, Erstbetreuung, Nummern Fremdsystem, FFE (via FFEK) |
| **← FiANTEC** | FFE Bruttoprovision, FFE Betreuungsentschädigung, Leistungsträger, Vertriebsmitarbeiter, Provisionsabrechnungen, Betreuungen |

#### Vertriebspartner (fremde Kanäle)
**Systeme:** SL Select, SL Select AT, Vaudoise, Broker/Banken, Deutschland, Österreich

| Richtung | Datenobjekte |
| --- | --- |
| **← FiANTEC** | Provisionsabrechnungen, Vertriebsmitarbeiter, Vertriebsorganisation, Gebiete |

#### HR, Finanzen und Aktuariat
**Systeme:** SAP-FSCD, SAP-FI, SAP-HCM, CSFM

| Richtung | Datenobjekte |
| --- | --- |
| **→ FiANTEC** | Betreuungen, Vertriebsmitarbeiter, Vertriebsorganisation, Lohndaten |
| **← FiANTEC** | Betreuungen, Vertriebsmitarbeiter, Vertriebsorganisation, Provisionsbeauskunftung, Provisionsabrechnung, Zahlung, Provisionsmeldung |

#### Marketing
**Systeme:** MDB

| Richtung | Datenobjekte |
| --- | --- |
| **← FiANTEC** | Vertriebsmitarbeiter, Vertriebsorganisation, Fondsanteile, Provisionen, Forecast |

#### Multichannel Management
**Systeme:** PartnerNet, IMMOVS

| Richtung | Datenobjekte |
| --- | --- |
| **← FiANTEC** | Betreuungen, Vertriebsmitarbeiter, Vertriebsorganisation |

#### Infrastruktur
**Systeme:** APRICOS, CTR, SRF, DWH/EV, DataHUB, OnIdentity, Cloudablage-Druck, Schweiz. Post

| Richtung | Datenobjekte |
| --- | --- |
| **← FiANTEC** | Vertriebsmitarbeiter, Vertriebsorganisation, Betreuung, Berechtigungen, Provisionen, Daten Provisionsabrechnung, Logins, Referenzdaten, Provisionsabrechnungen, PLZ, Strassen |

### Legende

| Abkürzung | Bedeutung |
| --- | --- |
| **FE** | Fabrikereignis |
| **FFE** | Fremdfabrikereignis |
| **FFEK** | Fremdfabrikereignis-Konnektor |
| **KVVSA** | KollektivVertragsStammAdapter |
| **→ FiANTEC** | Datenfluss IN FiANTEC (Umsystem liefert) |
| **← FiANTEC** | Datenfluss AUS FiANTEC (FiANTEC liefert) |

## Dateitypen

| Extension | Anzahl | Beschreibung |
| --- | --- | --- |
| .xlsx | 352 | Hauptformat für Recherchen, DMV, Canossa etc. |
| .xls | 205 | Ältere Excel-Dateien |
| .docx | 204 | Word-Dokumente (Spezifikationen, Anleitungen) |
| .vsd | 177 | Visio-Diagramme (Prozesse, Architektur) |
| .doc | 143 | Ältere Word-Dokumente |
| .pdf | 67 | PDFs (Reglemente, signierte Dokumente) |
| .xlsm | 59 | Excel mit Makros |
| .pak | 57 | FiANTEC-Paketdateien |
| .xsd | 20 | XML-Schemadefinitionen |
| .wsdl | 11 | Webservice-Beschreibungen |
| .pptx | 7 | Präsentationen |
| .msg | 7 | Outlook-Nachrichten |

## Unterordner

### Fachprozesse & Anleitungen (73 Dateien, 249 MB)

Anleitungen und Prozessdokumentationen für den Fachbereich.

*   **ADONIS, Camunda und BPMN/** — 73 Dateien, Prozessmodelle und -dokumentationen

### FiANTEC Systemdoku (1'230 Dateien, 7.0 GB)

Kerndokumentation des FiANTEC-Systems, gegliedert in nummerierte Kapitel:

| Ordner | Dateien | Thema |
| --- | --- | --- |
| 00 Architektur\_und\_Prozesse | 190 | Systemarchitektur, Prozessübersichten |
| 01 Benutzerhandbuch | 2 | Benutzerhandbuch |
| 02 GUI Dokumentation | 51 | Masken- und Oberflächenbeschreibungen |
| 03 Business Logik und Vertriebsorganisation | 208 | Geschäftsregeln, Vertriebsstrukturen |
| 04 Schnittstellen | 141 | SOAP/REST-Interfaces, WSDL, XSD |
| 05 Identity and Access Management | 107 | IAM, Berechtigungskonzepte |
| 06 Testmanagement | 2 | Testbezogene Systemdoku |
| 07 Abrechnung Recherchen Reporte | 5 | Abrechnungsreporte |
| 08 Fachliches Datenmodell\_und\_Referenzdaten | 265 | Datenmodelle, Referenzdaten — grösster Bereich |
| 09 ProvFia WebClient | 2 | WebClient-Dokumentation |
| 10 Historisierung und Zeitscheiben | 1 | Zeitscheibenkonzept |
| 11 Betriebshandbuch | 0 | (leer) |
| 99 Review | 8 | Review-Dokumente |
| \_\_ Archive | 244 | Archivierte/veraltete Dokumente |

### Verträge & SLA FiANTEC (43 Dateien, 14 MB)

Vertragsdokumente und Service Level Agreements mit FiANTEC DE.

### Vorlagen & Templates (5 Dateien, 0.6 MB)

Dokumentvorlagen (Word, Excel) für standardisierte Artefakte.

## Siehe auch

*   [10 Prozesse](10_Prozesse.md) — Fachprozesse quer über alle Bereiche