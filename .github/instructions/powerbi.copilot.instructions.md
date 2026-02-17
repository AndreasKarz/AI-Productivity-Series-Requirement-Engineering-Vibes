---
name: 'PowerBI Konventionen'
description: 'Namenskonventionen, Formatierungsstandards und Projektregeln für PowerBI-Reports, DAX-Measures und Power-Query-Abfragen.'
applyTo: '**'
---

# PowerBI Konventionen

## Namenskonventionen

### Tabellen

| Typ | Prefix | Beispiel |
|-----|--------|----------|
| Fakttabelle | `Fakt_` oder `f_` | `Fakt_Umsatz`, `f_Transaktionen` |
| Dimensionstabelle | `Dim_` oder `d_` | `Dim_Kunde`, `d_Datum` |
| Hilfstabelle (kein Laden) | `_` Prefix | `_Parameter`, `_Staging` |
| Berechnete Tabelle | `Calc_` | `Calc_AltersGruppen` |

### Measures

| Typ | Pattern | Beispiel |
|-----|---------|----------|
| Basis-Aggregation | `[Substantiv]` | `[Umsatz]`, `[Anzahl Kunden]` |
| Zeitvergleich | `[Basis VJ]` / `[Basis YTD]` | `[Umsatz VJ]`, `[Umsatz YTD]` |
| Prozent | `[Basis %]` | `[Marge %]`, `[Anteil %]` |
| Formatiert | `[Basis Display]` | `[Umsatz Display]` |
| Hilfs-Measure (nicht sichtbar) | `_` Prefix | `_Zwischenwert` |

### Spalten

- Power-Query-Spalten: `PascalCase` (`KundenID`, `Geburtsdatum`, `LandCode`)
- Berechnete Spalten (DAX): `PascalCase` mit Suffix `Calc` wenn nötig (`AltersGruppeCalc`)
- Sortierspalten: `[Anzeigespalte]Sort` (`AltersGruppeSort`)

## Formatierung

### DAX

```dax
// Measure-Name in eigener Zeile, VAR-Deklarationen eingerückt
MeasureName =
    VAR Wert1 = SUM( Tabelle[Spalte] )
    VAR Wert2 = CALCULATE( [Basis], Filter )
    RETURN
        DIVIDE( Wert1, Wert2, 0 )
```

Regeln:
- Leerzeichen in Tabellenreferenzen: `SUM( Tabelle[Spalte] )` (nicht `SUM(Tabelle[Spalte])`)
- Jeder `VAR` auf eigener Zeile
- `RETURN` auf eigener Zeile
- `CALCULATE`-Filter jeweils auf eigener Zeile bei > 1 Filter
- Immer `DIVIDE()` statt `/`

### Power Query M

```powerquery
let
    Source = ...,
    #"Beschreibender Schrittname" = Table.Transform...(Source, ...),
    Final = Table.SelectRows(...)
in
    Final
```

Regeln:
- Beschreibende Schrittnamen (keine generischen `#"Step 1"`)
- Typ-Deklaration bei `Table.AddColumn` immer angeben
- Nicht benötigte Spalten so früh wie möglich entfernen

## Lokalisierung (Schweiz / Deutsch)

| Element | Format | Beispiel |
|---------|--------|---------|
| Zahlen | Schweizer Tausendertrennzeichen (Apostroph) | `1'234'567.89` |
| Datum | `dd.MM.yyyy` oder `MMMM yyyy` | `17.02.2026` |
| Währung | `CHF` Prefix | `CHF 1'234.50` |
| Prozent | Nachkommastelle mit Punkt | `42.3%` |
| Sprachcode | Grossbuchstaben | `DE`, `FR`, `IT` |

## Datenquellen-Parameter

Server- und Datenbank-Verbindungen als PowerBI-Parameter definieren:
- `Fusion_DWH_Server` — SQL Server Hostname
- `Fusion_DWH` — Datenbankname
- Umgebungen: DEV / TEST / PROD über Parameter wechselbar
