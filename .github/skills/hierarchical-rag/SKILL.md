---
name: hierarchical-rag
description: Expert guide for building, maintaining, and querying a Hierarchical RAG (DIGEST/RAW) knowledge structure for LLM context management. Use this skill when a user wants to: (1) create a new DIGEST/RAW folder structure for a project, (2) add new documents to an existing RAW layer and generate/update the corresponding digests, (3) query a project's knowledge base using the two-tier lookup strategy, (4) optimize token usage by routing queries through the right layer, (5) restructure existing documentation into a hierarchical context system. Triggers on: hierarchical RAG, DIGEST/RAW, context compression, knowledge distillation, digest erstellen, RAW aktualisieren, Kontext optimieren, token sparen, Wissensstruktur, context engineering, summary index, two-tier context.
---

# Hierarchical RAG

Strukturiere Projektwissen in zwei Schichten, damit das LLM **immer im richtigen Layer** arbeitet und unnötige Token-Verbrennung vermieden wird.

## Kernkonzept

```
DIGEST/   ← Komprimiertes Wissen (Standard-Arbeitslayer)
  00_catalog.md       → Einstiegspunkt / Navigations-Index
  glossary.md         → Begriffe & Abkürzungen
  decisions.md        → Dokumentierte Einschränkungen & Entscheide
  10_topics/          → Themenübergreifende Zusammenfassungen
  20_folders/         → Folder-level Digests (ein File pro RAW-Ordner)

RAW/      ← Originaldokumente (nur bei Bedarf)
  01_Ordner/
  02_Ordner/
  ...
```

**Faustregeln:**
- **DIGEST zuerst** — 80-90% aller Anfragen können allein mit dem Digest beantwortet werden
- **RAW nur auf Demand** — Wenn eine präzise Passage, ein exaktes Datum oder ein vollständiges Dokument benötigt wird
- **Niemals RAW indizieren ohne Digest-Update** — Neues Dokument = neuer/aktualisierter Digest-Eintrag

---

## Query-Routing: Welchen Layer verwenden?

| Signal in der Anfrage | Layer |
|---|---|
| "Was ist X?" / Begriffserklärung | `glossary.md` |
| "Welche Themen gibt es zu...?" | `10_topics/` |
| "Was ist in Ordner X drin?" | `20_folders/` |
| "Welche Einschränkungen/Entscheide?" | `decisions.md` |
| "Zeige mir das genaue Dokument..." | `RAW/` |
| "Exaktes Zitat aus Kapitel X" | `RAW/` |
| "Alle Details zu Prozess Y" | `RAW/` nur wenn Topic-Summary nicht reicht |

---

## Workflows

### Neues Dokument in RAW hinzufügen → Digest aktualisieren

```
1. Dokument in den passenden RAW/Ordner-Pfad ablegen
2. 20_folders/<ordner>.digest.md aktualisieren:
   - Dateiname + kurze Beschreibung hinzufügen
3. Prüfen ob 10_topics/<topic>.md berührt wird → dort ergänzen
4. Neue Begriffe in glossary.md eintragen
5. 00_catalog.md Statistiken bei Bedarf anpassen
```

### Neuen RAW-Ordner anlegen → Vollständiger Digest aufbauen

Siehe [references/setup-workflow.md](references/setup-workflow.md) für den vollständigen Schritt-für-Schritt-Prozess.

### Bestehende Struktur analysieren

```
1. 00_catalog.md lesen → Überblick & Statistiken
2. 20_folders/ scannen → Was ist wo?
3. 10_topics/ lesen → fachliche Gruppierung
4. Bei Bedarf: RAW für Detailanalyse öffnen
```

---

## Digest-Qualitätsstandards

### `20_folders/<ordner>.digest.md`
```markdown
# <Ordner-Name> Digest

| Datei | Beschreibung | Schlüsselinfo |
|-------|-------------|---------------|
| datei.pdf | Kurzbeschreibung | Version, Datum, Scope |
```

### `10_topics/<topic>.md`
```markdown
# <Topic>

## Übersicht
[2-3 Sätze: Was ist das Thema, warum ist es relevant]

## Schlüsseldokumente
- `RAW/<pfad>` — Kurzbeschreibung
```

### `00_catalog.md`
```markdown
# Context Catalog

| Metrik | Wert |
|--------|------|
| Markdown files | X |
| Reduktion | X% |

## Quick Navigation
...Folder-Tabelle + Topic-Links...
```

---

## Token-Effizienz messen

Ziel: **≥ 60% Reduktion** gegenüber direkter RAW-Indizierung.

| Schicht | Typische Grösse |
|---|---|
| 00_catalog.md | ~1-2 KB |
| Ein Topic-File | ~5-15 KB |
| Ein Folder-Digest | ~10-30 KB |
| Ein RAW-Dokument | 50-500+ KB |

Wenn der Digest eines Topics grösser als das grösste RAW-Dokument ist → Digest ist zu detailliert, kürzen.

---

## Freshness Gate — RAG aktuell halten

Bei jedem Digest-Zugriff: Prüfe `_sources.md` ob die Quellen noch innerhalb ihres TTL liegen.

> **🔒 Sicherheit:** `_sources.md` enthält interne URLs und ist via `**/_sources.md` in `.gitignore` ausgeschlossen. Niemals committen!

```
_sources.md prüfen → TTL OK? → Ja → Digest direkt verwenden
                              → Nein → Quelle prüfen → Geändert? → RAW + Digest updaten
```

**Kernregeln:**
- Max 3 Freshness-Checks pro Anfrage
- Stale Digest > kein Digest
- Manuell-Quellen: User fragen statt automatisch prüfen

Vollständiges Konzept: [references/freshness-gate.md](references/freshness-gate.md)

---

## Best Practices & externe Ressourcen

Für vertiefte Theorie und aktuelle Entwicklungen: [references/best-practices.md](references/best-practices.md)
