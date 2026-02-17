# Visualisierungen und Report-Design

## Inhaltsverzeichnis
- [Visualisierungsauswahl](#visualisierungsauswahl)
- [Slicer (Datenschnitt)](#slicer-datenschnitt)
- [KPI-Karten](#kpi-karten)
- [Report-Layout](#report-layout)
- [Farbgestaltung](#farbgestaltung)
- [Interaktivität](#interaktivität)
- [Barrierefreiheit](#barrierefreiheit)

---

## Visualisierungsauswahl

| Ziel | Visual | Wann verwenden |
|------|--------|---------------|
| Einzelwert hervorheben | **Karte / KPI** | Umsatz, Anzahl, Trend-Indikator |
| Vergleich über Kategorien | **Balkendiagramm** (horizontal) | Umsatz pro Region, Top-Produkte |
| Zeitlicher Verlauf | **Liniendiagramm** | Monatlicher Umsatz, Trend |
| Teil vom Ganzen | **Gestapeltes Balkendiagramm** | Anteil pro Segment |
| Verteilung | **Histogramm / Boxplot** | Altersverteilung, Streuung |
| Rangfolge | **Balkendiagramm** (sortiert) | Top 10 Kunden |
| Zusammenhang (2 Variablen) | **Streudiagramm** | Umsatz vs. Marge |
| Geographisch | **Karte (Bing Maps)** | Umsatz pro Land/Region |
| Detaildaten | **Tabelle / Matrix** | Transaktionslisten |
| Fortschritt | **Messanzeige** | Zielerreichung % |

**Nicht verwenden:**
- ❌ Kreisdiagramm bei > 5 Kategorien
- ❌ 3D-Diagramme (verzerren Wahrnehmung)
- ❌ Doppelachsen ohne klare Kennzeichnung

---

## Slicer (Datenschnitt)

### Slicer-Typen (neue Version)

| Typ | Einstellung | Anwendung |
|-----|-------------|-----------|
| **Liste** | Standard | Wenige Werte (< 10) |
| **Dropdown** | Slicer-Einstellungen → Stil | Viele Werte (> 10) |
| **Kachel/Button** | Layout mit mehreren Schaltflächen | Horizontale Segmente |
| **Zwischen** | Numerisch/Datum | Wertebereiche |

### Horizontaler Slicer (Button-Layout)

In der neuen Slicer-Version:
1. Slicer markieren → Format (Pinsel-Symbol)
2. **Layout mit mehreren Schaltflächen** aufklappen
3. `Feste Anzahl von Schaltflächen` **AUS**
4. Slicer breit genug ziehen
5. Höhe auf ca. 50-60 px reduzieren
6. Unter **Überlauf**: `Überlaufart` auf **Umbruch** setzen

### Sortierung im Slicer

Für korrekte Reihenfolge (z.B. Altersgruppen):
1. Sortierspalte in Power Query erstellen (numerisch)
2. In Datenansicht: `AgeSegmentation` markieren
3. **Spaltentools → Nach Spalte sortieren → `AgeSegmentationSort`**
4. Im Slicer: Sortieren nach Feld, Aufsteigend

### Slicer-Synchronisation

Mehrere Seiten mit gleicher Filterung:
- Ansicht → Slicer synchronisieren
- Häkchen bei relevanten Seiten setzen

---

## KPI-Karten

### Aufbau einer KPI-Leiste

```
┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐
│  Umsatz  │ │  Kunden  │ │  Marge % │ │  Growth  │
│  1.2 Mio │ │   3'421  │ │   42.3%  │ │  ▲ +5.2% │
└──────────┘ └──────────┘ └──────────┘ └──────────┘
```

Empfohlene DAX-Patterns für KPI-Karten:

```dax
// Formatierte Zahl mit Einheit
Umsatz Display =
    VAR Wert = [Umsatz]
    RETURN
        IF(
            Wert >= 1000000,
            FORMAT( Wert / 1000000, "#,0.0" ) & " Mio",
            IF(
                Wert >= 1000,
                FORMAT( Wert / 1000, "#,0" ) & " Tsd",
                FORMAT( Wert, "#,0" )
            )
        )

// Trend-Pfeil
Trend =
    VAR Aktuell = [Umsatz]
    VAR Vorjahr = [Umsatz VJ]
    VAR Diff = DIVIDE( Aktuell - Vorjahr, Vorjahr, 0 )
    RETURN
        IF( Diff > 0, "▲", IF( Diff < 0, "▼", "●" ) )
        & " " & FORMAT( ABS(Diff), "0.0%" )
```

---

## Report-Layout

### Seitenstruktur

```
┌──────────────────────────────────────────────┐
│  Titel / Logo                    Datum       │  ← Header (50 px)
├──────────────────────────────────────────────┤
│  [Slicer 1] [Slicer 2] [Slicer 3]           │  ← Filter-Leiste (60 px)
├──────────────────────────────────────────────┤
│  [KPI 1] [KPI 2] [KPI 3] [KPI 4]            │  ← KPI-Leiste (80 px)
├──────────────────────────────────────────────┤
│                    │                         │
│   Hauptdiagramm    │   Nebendiagramm         │  ← Analyse-Bereich
│                    │                         │
├──────────────────────────────────────────────┤
│  Detail-Tabelle                              │  ← Detail (optional)
└──────────────────────────────────────────────┘
```

### Ausrichtung und Abstände

- Alle Visuals am Raster ausrichten (Ansicht → Am Raster einrasten)
- Einheitliche Abstände zwischen Visuals (8 px)
- Seitengrösse: 16:9 (1280 × 720 px) für Bildschirm, Benutzerdefiniert für Druck

---

## Farbgestaltung

### Schweizer Unternehmensfarben (Swiss Life)

Verwende das Corporate Design. Falls nicht verfügbar, neutrale Palette:

| Zweck | Empfehlung |
|-------|-----------|
| Primärfarbe | Unternehmensfarbe (z.B. Swiss Life Rot) |
| Sekundärfarbe | Komplementär oder Grautöne |
| Positiv / Wachstum | Grün (#2E7D32) |
| Negativ / Rückgang | Rot (#C62828) |
| Neutral | Grau (#616161) |
| Hintergrund | Weiss oder sehr helles Grau (#F5F5F5) |

### Konditionale Formatierung

```dax
// Farbwert für bedingte Formatierung
Farbe Trend =
    IF( [Umsatz VJ %] > 0, "#2E7D32",      // Grün
    IF( [Umsatz VJ %] < -0.05, "#C62828",   // Rot
    "#616161" ))                              // Grau
```

---

## Interaktivität

### Drillthrough

1. Zielseite erstellen (Detail-Ansicht)
2. Auf Zielseite: Feld in **Drillthrough-Filter** ziehen
3. Im Quell-Visual: Rechtsklick → Drillthrough → Zielseite
4. Option: „Alle Filter beibehalten" aktivieren

### Lesezeichen (Bookmarks)

Für verschiedene Ansichten derselben Seite:
- Ansicht → Lesezeichen → Hinzufügen
- Lesezeichen-Navigation als Buttons auf der Seite platzieren
- Nützlich für: Standard/Detail-Ansicht, verschiedene KPI-Sets

### Tooltips

Benutzerdefinierte Tooltipseite:
1. Neue Seite erstellen → Seitengrösse = QuickInfo (320 × 240 px)
2. Visuals auf der Tooltipseite platzieren
3. Im Ziel-Visual: Format → QuickInfo → Seite auswählen

---

## Barrierefreiheit

| Massnahme | Umsetzung |
|-----------|-----------|
| Alt-Text | Jedes Visual: Format → Allgemein → Alternativtext |
| Kontrast | Mindestens 4.5:1 Kontrastverhältnis |
| Farbe + Form | Nie nur Farbe als Unterscheidung (auch Muster/Symbole) |
| Tab-Reihenfolge | Ansicht → Tab-Reihenfolge logisch sortieren |
| Schriftgrösse | Minimum 10pt für Beschriftungen, 12pt für Titel |
