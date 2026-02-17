# DAX-Patterns und Funktionsreferenz

## Inhaltsverzeichnis
- [Grundlegende Measures](#grundlegende-measures)
- [Zeitintelligenz](#zeitintelligenz)
- [Filter-Manipulation](#filter-manipulation)
- [Tabellarische Funktionen](#tabellarische-funktionen)
- [Iteratoren vs. Aggregatoren](#iteratoren-vs-aggregatoren)
- [Häufige Fehler](#häufige-fehler)

---

## Grundlegende Measures

### Aggregationen

```dax
// Summe
Umsatz = SUM( Fakten[Betrag] )

// Anzahl (nur nicht-leere Werte)
Anzahl Kunden = DISTINCTCOUNT( Fakten[KundenID] )

// Durchschnitt
Durchschnittlicher Umsatz = AVERAGE( Fakten[Betrag] )

// Gewichteter Durchschnitt
Gewichteter Durchschnitt =
    DIVIDE(
        SUMX( Fakten, Fakten[Betrag] * Fakten[Gewicht] ),
        SUM( Fakten[Gewicht] ),
        0
    )
```

### DIVIDE statt /

```dax
// ✅ Korrekt — Division durch Null abgefangen
Marge % = DIVIDE( [Gewinn], [Umsatz], 0 )

// ❌ Fehleranfällig
Marge % = [Gewinn] / [Umsatz]
```

### Prozentuale Anteile

```dax
Anteil =
    DIVIDE(
        [Umsatz],
        CALCULATE( [Umsatz], REMOVEFILTERS( DimProdukt ) ),
        0
    )
```

---

## Zeitintelligenz

Voraussetzung: Eine vollständige Datumstabelle mit `MARK AS DATE TABLE`.

### Datumstabelle erstellen

```dax
DimDatum =
VAR StartDatum = DATE(2020, 1, 1)
VAR EndDatum = TODAY()
RETURN
ADDCOLUMNS(
    CALENDAR( StartDatum, EndDatum ),
    "Jahr", YEAR( [Date] ),
    "Monat", MONTH( [Date] ),
    "Monatsname", FORMAT( [Date], "MMMM" ),
    "Quartal", "Q" & FORMAT( [Date], "Q" ),
    "Jahr-Monat", FORMAT( [Date], "YYYY-MM" ),
    "Wochentag", FORMAT( [Date], "dddd" ),
    "KW", WEEKNUM( [Date], 21 )
)
```

### Vergleiche

```dax
// Vorjahr
Umsatz VJ = CALCULATE( [Umsatz], SAMEPERIODLASTYEAR( DimDatum[Date] ) )

// Veränderung zum Vorjahr
Umsatz VJ % =
    VAR Aktuell = [Umsatz]
    VAR Vorjahr = [Umsatz VJ]
    RETURN DIVIDE( Aktuell - Vorjahr, Vorjahr, 0 )

// Year-to-Date
Umsatz YTD = CALCULATE( [Umsatz], DATESYTD( DimDatum[Date] ) )

// Laufende Summe
Umsatz Laufend =
    CALCULATE(
        [Umsatz],
        FILTER(
            ALL( DimDatum[Date] ),
            DimDatum[Date] <= MAX( DimDatum[Date] )
        )
    )

// Vormonat
Umsatz VM = CALCULATE( [Umsatz], PREVIOUSMONTH( DimDatum[Date] ) )

// Gleitender 3-Monats-Durchschnitt
Umsatz 3M Avg =
    CALCULATE(
        [Umsatz],
        DATESINPERIOD( DimDatum[Date], MAX( DimDatum[Date] ), -3, MONTH )
    ) / 3
```

---

## Filter-Manipulation

### CALCULATE — Der Kern von DAX

```dax
// Grundprinzip: CALCULATE( <Ausdruck>, <Filter1>, <Filter2>, ... )

// Umsatz nur für die Schweiz
Umsatz CH =
    CALCULATE( [Umsatz], DimKunde[Land] = "CH" )

// Umsatz unabhängig vom Produktfilter
Umsatz Gesamt =
    CALCULATE( [Umsatz], REMOVEFILTERS( DimProdukt ) )

// Umsatz mit bestimmtem Kontext überschreiben
Umsatz Online =
    CALCULATE( [Umsatz], DimKanal[Typ] = "Online" )
```

### ALL / ALLEXCEPT / ALLSELECTED

```dax
// ALL — Alle Filter entfernen
Anteil am Gesamt =
    DIVIDE( [Umsatz], CALCULATE( [Umsatz], ALL( Fakten ) ) )

// ALLEXCEPT — Alle Filter entfernen ausser bestimmte
Anteil pro Land =
    DIVIDE(
        [Umsatz],
        CALCULATE( [Umsatz], ALLEXCEPT( Fakten, DimKunde[Land] ) )
    )

// ALLSELECTED — Nur Slicer-Selektion respektieren
Anteil Selektion =
    DIVIDE( [Umsatz], CALCULATE( [Umsatz], ALLSELECTED( Fakten ) ) )
```

### KEEPFILTERS

```dax
// Bestehende Filter beibehalten statt überschreiben
Umsatz Premium In Selektion =
    CALCULATE(
        [Umsatz],
        KEEPFILTERS( DimProdukt[Segment] = "Premium" )
    )
```

---

## Tabellarische Funktionen

### SUMMARIZE / SUMMARIZECOLUMNS

```dax
// Zusammenfassung nach Gruppierung
Umsatz pro Kunde =
    SUMMARIZECOLUMNS(
        DimKunde[Name],
        "Umsatz", [Umsatz],
        "Anzahl", [Anzahl Transaktionen]
    )
```

### TOPN

```dax
// Top 10 Kunden nach Umsatz
Top10 Kunden =
    CALCULATE(
        [Umsatz],
        TOPN( 10, ALL( DimKunde ), [Umsatz], DESC )
    )
```

---

## Iteratoren vs. Aggregatoren

| Aggregator | Iterator | Unterschied |
|-----------|----------|-------------|
| `SUM(Spalte)` | `SUMX(Tabelle, Ausdruck)` | SUMX iteriert zeilenweise |
| `AVERAGE(Spalte)` | `AVERAGEX(Tabelle, Ausdruck)` | AVERAGEX für berechnete Werte |
| `MIN(Spalte)` | `MINX(Tabelle, Ausdruck)` | MINX für berechnete Minima |
| `MAX(Spalte)` | `MAXX(Tabelle, Ausdruck)` | MAXX für berechnete Maxima |

```dax
// SUM reicht bei einfacher Spaltensumme
Umsatz = SUM( Fakten[Betrag] )

// SUMX nötig bei Berechnung pro Zeile
Umsatz Netto =
    SUMX( Fakten, Fakten[Menge] * Fakten[Einzelpreis] * (1 - Fakten[Rabatt]) )
```

---

## Häufige Fehler

| Fehler | Problem | Lösung |
|--------|---------|--------|
| `SUM` statt `SUMX` bei Zeilenberechnung | Falsche Ergebnisse | `SUMX` für Zeilen-Berechnungen verwenden |
| Division ohne `DIVIDE` | Division-durch-Null-Fehler | Immer `DIVIDE()` mit Alternativwert |
| Measure in Measure ohne `CALCULATE` | Filterkontext fehlt | `CALCULATE` bewusst einsetzen |
| `FILTER(ALL(...))` ohne Grund | Performance-Killer | Nur bei expliziter Filter-Manipulation |
| Datumstabelle nicht als solche markiert | Zeitintelligenz funktioniert nicht | `MARK AS DATE TABLE` setzen |
| Bidirektionale Filterung überall | Mehrdeutige Ergebnisse | Nur bei M:M-Brücken verwenden |
