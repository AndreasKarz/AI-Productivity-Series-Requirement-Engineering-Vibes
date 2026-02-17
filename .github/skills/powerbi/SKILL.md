---
name: powerbi
description: "Umfassende Unterstützung für PowerBI-Reporterstellung von A bis Z: ETL-Pipelines (MongoDB, SQL Server DWH), Datenmodellierung (Star Schema), DAX-Berechnungen, Power Query M-Transformationen und Visualisierungen. Verwende diesen Skill immer, wenn der Benutzer PowerBI-Reports erstellt, Datenmodelle entwirft, DAX-Measures schreibt, Power-Query-Abfragen optimiert oder ETL-Pipelines für PowerBI plant. Triggers: PowerBI, Power BI, DAX, Power Query, M-Abfrage, Measure, Slicer, Datenschnitt, Datenmodell, Star Schema, ETL, Dashboard, KPI, Visualisierung, Berichtsdesign."
---

# PowerBI Report Engineering

Unterstütze bei der professionellen Erstellung von PowerBI-Reports — von der Datenquelle bis zur fertigen Visualisierung.

## Datenquellen-Infrastruktur

| Quelle | Technologie | MCP Server | Zugriffsmuster |
|--------|------------|------------|----------------|
| Operative Daten | MongoDB | `mcp_mongodb_*` | Aggregation Pipelines, Schema-Analyse |
| Data Warehouse | SQL Server | `mcp_mssql_*` | Views, Stored Procedures, Direktabfragen |
| Dokumentation | Microsoft Docs | `mcp_microsoft_doc_*` | DAX/M-Referenz, Best Practices |

## MCP-Server-Nutzung

### MongoDB (Quelldaten erkunden)

```
1. mcp_mongodb_list-databases          → Verfügbare Datenbanken
2. mcp_mongodb_list-collections        → Collections in DB
3. mcp_mongodb_collection-schema       → Feldstruktur verstehen
4. mcp_mongodb_aggregate               → Daten aggregieren/transformieren
5. mcp_mongodb_find                    → Stichproben ziehen
6. mcp_mongodb_count                   → Datenvolumen prüfen
```

### SQL Server (DWH erkunden)

```
1. mcp_mssql_list_databases            → Verfügbare Datenbanken
2. mcp_mssql_list_tables               → Tabellen im DWH
3. mcp_mssql_describe_table            → Spalten, Typen, Constraints
4. mcp_mssql_get_relationships         → Fremdschlüssel-Beziehungen
5. mcp_mssql_sample_data               → Stichproben prüfen
6. mcp_mssql_list_views                → Verfügbare Views
7. mcp_mssql_analyze_data_distribution → Werteverteilung analysieren
8. mcp_mssql_list_indexes              → Performance-relevante Indizes
```

### Microsoft Docs (Referenz)

```
1. mcp_microsoft_doc_microsoft_docs_search   → DAX/M-Funktionen suchen
2. mcp_microsoft_doc_microsoft_code_sample_search → Code-Beispiele finden
3. mcp_microsoft_doc_microsoft_docs_fetch    → Vollständige Dokumentation laden
```

## ETL-Pipeline-Design

### Schichtenarchitektur (MongoDB → DWH → PowerBI)

```
┌─────────────┐    ┌──────────────────┐    ┌──────────────────┐
│  MongoDB     │───▶│  SQL Server DWH  │───▶│  PowerBI Report  │
│  (Operativ)  │    │  (Staging/Facts) │    │  (Import/DQ)     │
└─────────────┘    └──────────────────┘    └──────────────────┘
     Source              Transform              Present
```

| Schicht | Verantwortung | Werkzeug |
|---------|--------------|----------|
| **Bronze** (Raw) | 1:1 Kopie aus MongoDB | DataPump / Staging |
| **Silver** (Clean) | Bereinigt, typisiert, dedupliziert | SQL Server Views/SP |
| **Gold** (Serve) | Star Schema, Measures, KPIs | PowerBI Datenmodell |

### Entscheidung: Import vs. DirectQuery

| Kriterium | Import | DirectQuery |
|-----------|--------|-------------|
| Datenvolumen < 1 GB | ✅ Bevorzugt | Möglich |
| Echtzeit nötig | ❌ | ✅ Bevorzugt |
| Komplexe DAX-Berechnungen | ✅ Performant | ⚠️ Langsam |
| Datenvolumen > 1 GB | ⚠️ Prüfen | ✅ Bevorzugt |

## Datenmodellierung

### Star Schema (Goldstandard)

```
         ┌──────────┐
         │ DimDatum  │
         └─────┬────┘
               │
┌──────────┐   │   ┌──────────┐
│ DimKunde ├───┼───┤ DimProdukt│
└──────────┘   │   └──────────┘
               │
         ┌─────┴────┐
         │ FaktTabelle│
         └───────────┘
```

Regeln:
- Fakttabellen enthalten nur Schlüssel und Messwerte (numerisch)
- Dimensionstabellen enthalten beschreibende Attribute
- Beziehungen: Dimension (1) → Fakt (*)
- Filterrichtung: Einseitig (Dimension → Fakt)
- Bidirektionale Filter nur bei M:M-Brücken (und dann mit Vorsicht)

### Detaillierte Referenzen

- **DAX-Patterns und Funktionsreferenz:** Siehe [references/dax-patterns.md](references/dax-patterns.md)
- **Power Query M Transformationen:** Siehe [references/power-query-m.md](references/power-query-m.md)
- **Visualisierungen und Report-Design:** Siehe [references/visualisierungen.md](references/visualisierungen.md)

## Qualitätsprüfung

Vor Abschluss jedes Reports prüfen:

| # | Prüfpunkt | Methode |
|---|-----------|---------|
| 1 | Datenmodell: Star Schema korrekt? | Modellansicht prüfen |
| 2 | Beziehungen: Keine Ambiguität? | Alle Pfade eindeutig |
| 3 | Measures: Filterkontext korrekt? | Mit Testdaten validieren |
| 4 | Performance: Keine unnötigen Spalten importiert? | Performance Analyzer |
| 5 | Slicer: Sortierung korrekt? | Sortierspalte zugewiesen |
| 6 | Formatierung: Zahlen/Datum/Währung im CH-Format? | Stichproben prüfen |
| 7 | Farben: Corporate Design eingehalten? | Farbpalette prüfen |
| 8 | Barrierefreiheit: Alt-Texte vorhanden? | Jedes Visual prüfen |
