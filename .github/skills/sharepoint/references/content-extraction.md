# SharePoint Content Extraction - Detailreferenz

## Inhaltsverzeichnis

1. [Seitentext extrahieren](#seitentext-extrahieren)
2. [Navigation und Seitenstruktur](#navigation-und-seitenstruktur)
3. [Listen und Bibliotheken](#listen-und-bibliotheken)
4. [Eingebettete Medien](#eingebettete-medien)
5. [Wiki-Seiten](#wiki-seiten)

---

## Seitentext extrahieren

### Standard-Seiteninhalt

```
1. mcp_playwright_browser_snapshot
2. Relevante Textbloecke aus dem Snapshot identifizieren
3. Ueberschriften, Absaetze und Links strukturiert erfassen
4. Markdown-formatierte Zusammenfassung erstellen
```

### Mehrstufige Seiten (Tabs, Accordions)

SharePoint Modern Pages nutzen oft Web Parts mit Tabs oder Accordions:

1. **Snapshot erstellen** - Sichtbaren Inhalt erfassen
2. **Interaktive Elemente identifizieren** - Tabs, Accordions, "Mehr anzeigen"-Buttons
3. **Auf jedes Element klicken** und erneut Snapshot erstellen:
   ```
   mcp_playwright_browser_click -> Tab/Accordion-Element
   mcp_playwright_browser_snapshot -> Neuen Inhalt erfassen
   ```
4. **Alle Inhalte zusammenfuehren**

### Seitennavigation (Hub Sites)

Bei Hub-Sites mit uebergreifender Navigation:

1. Snapshot der Hauptnavigation erstellen
2. Alle Navigationspunkte dokumentieren
3. Bei Bedarf zu Unterseiten navigieren:
   ```
   mcp_playwright_browser_click -> Navigationspunkt
   mcp_playwright_browser_wait_for -> Seite geladen
   mcp_playwright_browser_snapshot -> Neuen Inhalt lesen
   ```

---

## Navigation und Seitenstruktur

### Seitenstruktur analysieren

```
1. mcp_playwright_browser_snapshot
2. Identifiziere:
   - Hauptnavigation (oben)
   - Seitennavigation (links)
   - Quick Links Web Parts
   - Hero Banner Links
   - Footer Links
3. Erstelle eine hierarchische Uebersicht der Seite
```

### Breadcrumb-Navigation nutzen

SharePoint zeigt Breadcrumbs fuer die Seitenhierarchie:
- Breadcrumb aus Snapshot extrahieren
- Hierarchie dokumentieren: `Site > Unterseite > Aktuelle Seite`

---

## Listen und Bibliotheken

### SharePoint-Listen lesen

```
1. Zur Listenansicht navigieren
2. mcp_playwright_browser_snapshot
3. Tabellarische Daten als Markdown-Tabelle aufbereiten
4. Bei vielen Eintraegen: Paginierung beachten
   - "Naechste Seite"-Button suchen
   - Alle Seiten durchgehen
```

### Dokumentenbibliotheken

```
1. Zur Bibliothek navigieren
2. mcp_playwright_browser_snapshot
3. Dateien mit Metadaten (Name, Datum, Autor) erfassen
4. Ordnerstruktur dokumentieren
5. Bei Bedarf in Unterordner navigieren
```

### Filterung und Sortierung

Falls spezifische Eintraege gesucht werden:
1. Filter-Icon in der Listenansicht suchen
2. `mcp_playwright_browser_click` auf Filter
3. Filterkriterien eingeben
4. Ergebnis via Snapshot erfassen

---

## Eingebettete Medien

### Bilder und Diagramme

SharePoint-Seiten enthalten oft eingebettete Bilder/Diagramme:

1. **Screenshot erstellen** fuer visuellen Kontext:
   ```
   mcp_playwright_browser_take_screenshot
   ```
2. **Alt-Text extrahieren** aus dem Snapshot (falls vorhanden)
3. **Bildunterschriften** erfassen

### Eingebettete Videos

Videos koennen nicht heruntergeladen werden. Stattdessen:
1. Video-Titel und Beschreibung aus Snapshot extrahieren
2. Ggf. Thumbnail via Screenshot festhalten
3. Video-URL dokumentieren

### Power BI Reports

Eingebettete Power BI Reports:
1. Screenshot erstellen fuer visuelle Darstellung
2. Sichtbare Datenpunkte aus dem Snapshot notieren
3. Report-Titel und Filter-Zustand dokumentieren

---

## Wiki-Seiten

### SharePoint Wiki (Classic)

```
1. Zur Wiki-Seite navigieren
2. mcp_playwright_browser_snapshot
3. Wiki-Inhalt als Markdown extrahieren
4. Interne Wiki-Links identifizieren und dokumentieren
5. Bei Bedarf durch Wiki-Links navigieren
```

### Modern Wiki (Site Pages)

Modern Wiki-Seiten sind Standard-Seiten mit Text-Web-Parts:
- Gleicher Workflow wie Seitentext-Extraktion
- Auf interne Links achten und bei Bedarf folgen

---

## Best Practices

| Aspekt | Empfehlung |
|--------|------------|
| **Vollstaendigkeit** | Immer pruefen, ob Tabs/Accordions weiteren Inhalt verbergen |
| **Strukturierung** | Inhalte als Markdown mit Ueberschriften-Hierarchie aufbereiten |
| **Quellenangabe** | SharePoint-URL immer als Quelle angeben |
| **Screenshots** | Bei visuellen Inhalten (Diagramme, Charts) Screenshot erstellen |
| **Paginierung** | Bei Listen/Bibliotheken alle Seiten durchgehen |
| **Zeitstempel** | Aenderungsdatum der Seite/Dokumente dokumentieren |
