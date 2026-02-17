# Power Query M — Transformationen und Patterns

## Inhaltsverzeichnis
- [Grundstruktur](#grundstruktur)
- [Datenquellen](#datenquellen)
- [Häufige Transformationen](#häufige-transformationen)
- [Fortgeschrittene Patterns](#fortgeschrittene-patterns)
- [Performance-Optimierung](#performance-optimierung)
- [Fehlerbehandlung](#fehlerbehandlung)

---

## Grundstruktur

Jede Power-Query-Abfrage folgt dem `let ... in`-Pattern:

```powerquery
let
    Source = ...,
    Step1 = Table.Transform...(Source, ...),
    Step2 = Table.AddColumn(Step1, ...),
    Final = Table.SelectRows(Step2, ...)
in
    Final
```

Regeln:
- Jeder Schritt referenziert den vorherigen
- Letzte Variable nach `in` = Ergebnis
- Schritte benennen: beschreibend, keine generischen Namen wie `#"Step 1"`

---

## Datenquellen

### SQL Server (DWH)

```powerquery
// Standard-Verbindung
let
    Source = Sql.Database("ServerName", "Fusion_DWH"),
    Tabelle = Source{[Schema="dbo", Item="vw_Umsatz"]}[Data]
in
    Tabelle

// Mit nativem SQL (Query Folding aktiv halten!)
let
    Source = Sql.Database("ServerName", "Fusion_DWH", [
        Query = "SELECT * FROM dbo.vw_Umsatz WHERE Jahr >= 2024"
    ])
in
    Source
```

### MongoDB (via ODBC oder vorbereitete Views)

MongoDB-Daten werden in der Regel über den DWH-Staging-Layer bereitgestellt.
Falls Direktzugriff nötig:

```powerquery
// Via ODBC-Connector (MongoDB BI Connector)
let
    Source = Odbc.DataSource("DSN=MongoDB_BI", [
        HierarchicalNavigation = true
    ]),
    DB = Source{[Name="operativ"]}[Data],
    Collection = DB{[Name="customers"]}[Data]
in
    Collection
```

### Parameter verwenden

```powerquery
// Parameter für Server-Wechsel (Dev/Test/Prod)
let
    Source = Sql.Database(Fusion_DWH_Server, "Fusion_DWH")
in
    Source
```

---

## Häufige Transformationen

### Spalten bearbeiten

```powerquery
// Spalten entfernen
Table.RemoveColumns(Source, {"SpalteA", "SpalteB"})

// Spalten umbenennen
Table.RenameColumns(Source, {{"Alte_Spalte", "Neue_Spalte"}})

// Spaltentyp ändern
Table.TransformColumnTypes(Source, {
    {"Datum", type date},
    {"Betrag", type number},
    {"Name", type text}
})

// Text in Grossbuchstaben
Table.TransformColumns(Source, {{"Sprache", Text.Upper, type text}})

// Werte ersetzen
Table.ReplaceValue(Source, "iv", "de", Replacer.ReplaceValue, {"Language"})
```

### Zeilen filtern

```powerquery
// Zeilen filtern (Bedingung)
Table.SelectRows(Source, each [Status] = "Aktiv")

// Mehrere Bedingungen
Table.SelectRows(Source, each [Status] = "Aktiv" and [Land] = "CH")

// Nullwerte entfernen
Table.SelectRows(Source, each [Betrag] <> null)

// Top N Zeilen
Table.FirstN(Source, 1000)

// Duplikate entfernen
Table.Distinct(Source, {"KundenID"})
```

### Spalten hinzufügen

```powerquery
// Berechnete Spalte
Table.AddColumn(Source, "Volljährig", each [Alter] >= 18, type logical)

// Bedingte Spalte (if/then/else)
Table.AddColumn(Source, "Altersgruppe", each
    if [Alter] = null then "Unbekannt"
    else if [Alter] < 55 then "Unter 55"
    else if [Alter] <= 60 then "55–60"
    else if [Alter] <= 65 then "61–65"
    else if [Alter] <= 70 then "66–70"
    else "70+",
    type text
)

// Sortierspalte für Slicer
Table.AddColumn(Source, "AltersgruppeSortierung", each
    if [Altersgruppe] = "Unter 55" then 1
    else if [Altersgruppe] = "55–60" then 2
    else if [Altersgruppe] = "61–65" then 3
    else if [Altersgruppe] = "66–70" then 4
    else if [Altersgruppe] = "70+" then 5
    else 99,
    Int64.Type
)

// Datum aus Komponenten
Table.AddColumn(Source, "Datum", each
    #date([Jahr], [Monat], 1),
    type date
)
```

### Gruppieren und Aggregieren

```powerquery
// Einfache Gruppierung
Table.Group(Source, {"Kategorie"}, {
    {"Anzahl", each Table.RowCount(_), Int64.Type},
    {"Gesamtbetrag", each List.Sum([Betrag]), type number}
})

// Mehrfache Gruppierungen
Table.Group(Source, {"Kategorie", "Jahr"}, {
    {"Anzahl", each Table.RowCount(_), Int64.Type},
    {"Min", each List.Min([Betrag]), type number},
    {"Max", each List.Max([Betrag]), type number},
    {"Avg", each List.Average([Betrag]), type number}
})
```

### Pivot / Unpivot

```powerquery
// Spalten entpivotieren (Wide → Long)
Table.UnpivotOtherColumns(Source, {"ID", "Name"}, "Attribut", "Wert")

// Pivotieren (Long → Wide)
Table.Pivot(Source, List.Distinct(Source[Kategorie]), "Kategorie", "Wert", List.Sum)
```

### Tabellen zusammenführen

```powerquery
// Left Join
Table.NestedJoin(Source, {"KundenID"}, DimKunde, {"ID"}, "Kunde", JoinKind.LeftOuter)

// Inner Join
Table.NestedJoin(Source, {"KundenID"}, DimKunde, {"ID"}, "Kunde", JoinKind.Inner)

// Expandieren nach Join
Table.ExpandTableColumn(Joined, "Kunde", {"Name", "Land"})

// Append (Tabellen untereinander)
Table.Combine({Tabelle1, Tabelle2, Tabelle3})
```

---

## Fortgeschrittene Patterns

### Dynamische Datumsbereiche

```powerquery
// Letzte 12 Monate
Table.SelectRows(Source, each [Datum] >= Date.AddMonths(DateTime.Date(DateTime.LocalNow()), -12))

// Laufendes Jahr
Table.SelectRows(Source, each Date.Year([Datum]) = Date.Year(DateTime.Date(DateTime.LocalNow())))
```

### Null-sichere Berechnungen

```powerquery
// Null durch Ersatzwert ersetzen
Table.ReplaceValue(Source, null, 0, Replacer.ReplaceValue, {"Betrag"})

// Null-Prüfung in berechneter Spalte
Table.AddColumn(Source, "BetragClean", each
    if [Betrag] = null then 0 else [Betrag],
    type number
)
```

### Benutzerdefinierte Funktionen

```powerquery
// Funktion definieren
let
    AltersGruppe = (alter as nullable number) as text =>
        if alter = null then "Unbekannt"
        else if alter < 55 then "Unter 55"
        else if alter <= 60 then "55–60"
        else if alter <= 65 then "61–65"
        else if alter <= 70 then "66–70"
        else "70+"
in
    AltersGruppe

// Funktion aufrufen
Table.AddColumn(Source, "Altersgruppe", each AltersGruppe([Alter]), type text)
```

---

## Performance-Optimierung

| Technik | Wirkung |
|---------|---------|
| **Query Folding aktiv halten** | SQL Server führt Transformation aus, nicht PowerBI |
| **Native SQL verwenden** bei komplexen Abfragen | Volle Kontrolle über Query Plan |
| **Nicht benötigte Spalten** früh entfernen | Weniger Daten laden |
| **Filterung so früh wie möglich** | Datenvolumen reduzieren |
| **Staging-Abfragen** deaktivieren (Laden deaktivieren) | Kein unnötiges Laden in Modell |

### Query Folding prüfen

Rechtsklick auf einen Schritt → "Native Abfrage anzeigen":
- Verfügbar = ✅ Query Folding aktiv
- Ausgegraut = ❌ Query Folding unterbrochen ab diesem Schritt

Query Folding unterbrechende Operationen:
- `Table.AddColumn` mit M-Funktionen
- `Table.Buffer`
- Zugriff auf andere Datenquellen im selben Schritt

---

## Fehlerbehandlung

```powerquery
// Fehler pro Zelle abfangen
Table.AddColumn(Source, "SicheresAlter", each
    try [Alter] otherwise null,
    type nullable number
)

// Fehlerhafte Zeilen filtern
Table.RemoveRowsWithErrors(Source, {"Spalte1", "Spalte2"})

// Fehler durch Wert ersetzen
Table.ReplaceErrorValues(Source, {{"Betrag", 0}, {"Datum", null}})
```
