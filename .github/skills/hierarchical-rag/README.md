# Hierarchical RAG — Skill

> **Token-effizientes Wissensmanagement für LLM-gestützte Workflows**

---

## Was ist Hierarchical RAG?

Hierarchical RAG ist eine **Methodik zur Strukturierung von Projektwissen in zwei Schichten**, damit LLMs (Claude, GPT, etc.) immer im richtigen Detaillevel arbeiten und keine unnötigen Tokens verbrennen.

### Das Problem

Du hast 500+ Dokumente in einem Projektordner. Wenn das LLM bei jeder Frage alle Dokumente lesen muss, passiert folgendes:

- **Token-Verschwendung**: 80% der gelesenen Inhalte sind irrelevant für die aktuelle Frage
- **Context-Window-Overflow**: Bei grossen Projekten passt nicht alles ins Fenster
- **Langsame Antworten**: Je mehr Context, desto langsamer und teurer

### Die Lösung: Zwei Schichten

```
.assets/context/<Projekt>/
│
├── _sources.md              ← Quellen-Registry (woher kommt was?)
│
├── digest/                  ← SCHICHT 1: Komprimiertes Wissen
│   ├── 00_catalog.md        → Einstiegspunkt (immer zuerst lesen)
│   ├── glossary.md          → Begriffe & Abkürzungen
│   ├── decisions.md         → Dokumentierte Entscheide
│   ├── 10_topics/           → Themenübergreifende Summaries
│   └── 20_folders/          → Folder-level Digests
│
└── RAW/                     ← SCHICHT 2: Originaldokumente
    ├── 01_Kategorie/        → Vollständige Dokumente
    ├── 02_Kategorie/        → Nur bei Bedarf öffnen
    └── ...
```

**Faustregeln:**
- **80-90% aller Fragen** werden allein mit dem Digest beantwortet
- **RAW nur auf Demand** — wenn ein exaktes Zitat, Datum oder Volltext nötig ist
- **≥ 60% Token-Reduktion** gegenüber direkter RAW-Indizierung

---

## Theoretischer Hintergrund

Das DIGEST/RAW-Pattern ist **kein einzelner Standard**, sondern kombiniert etablierte Konzepte aus der LLM-Engineering-Community:

| Konzept | Herkunft | Unser Äquivalent |
|---------|----------|-------------------|
| **Hierarchical RAG** | Oberbegriff | Gesamtstruktur |
| **Context Distillation** | Anthropic | Token-Reduktion durch Vorverarbeitung |
| **Summary Index** | LlamaIndex | `20_folders/*.digest.md` |
| **Parent Document Retriever** | LangChain | Digest → RAW Navigation |
| **Context Engineering** | Karpathy (2025) | Bewusste Kontextfenster-Gestaltung |
| **Community Summaries** | Microsoft GraphRAG | `10_topics/` |

### Weiterführende Quellen

| Quelle | URL |
|--------|-----|
| Anthropic – Contextual Retrieval | https://www.anthropic.com/news/contextual-retrieval |
| Anthropic – Long Context Tips | https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/long-context-tips |
| Microsoft GraphRAG | https://microsoft.github.io/graphrag/ |
| GraphRAG Paper | https://arxiv.org/pdf/2404.16130 |
| RAPTOR Paper | https://arxiv.org/abs/2401.18059 |
| LlamaIndex – Document Summary Index | https://docs.llamaindex.ai/en/stable/examples/index_structs/doc_summary/ |
| LangChain – Parent Document Retriever | https://python.langchain.com/docs/how_to/parent_document_retriever/ |

---

## Freshness Gate — Das RAG aktuell halten

### Das Problem

Ein statisches RAG veraltet. Dokumente ändern sich, Wiki-Seiten werden aktualisiert, aber der Digest bleibt auf dem Stand der Ersterfassung.

### Die Lösung: Lazy Invalidation via `_sources.md`

Inspiriert vom **HTTP Stale-While-Revalidate**-Pattern:

| HTTP Caching | Hierarchical RAG |
|---|---|
| Cache | `digest/` — sofort verfügbar, token-sparsam |
| Origin Server | Externe Quellen (SharePoint, ADO Wiki, URLs) |
| Cache-Control Header | `_sources.md` — TTL pro Ressource |
| Stale-While-Revalidate | Digest liefern, Quelle nur bei TTL-Ablauf prüfen |

### `_sources.md` — Die Quellen-Registry

```markdown
# Quellen-Registry

| ID | RAW-Pfad | Quelltyp | Quell-URL / Herkunft | Erstellt | Letzte Prüfung | Status |
|----|----------|----------|----------------------|----------|----------------|--------|
| S-001 | RAW/01_Handbücher/ | SharePoint | https://tenant.sharepoint.com/... | 2025-11-01 | 2026-02-18 | ✅ aktuell |
| S-002 | RAW/02_Changes/ | ADO Wiki | CTRM/_wiki/wikis/CTRM.wiki/2581 | 2025-12-15 | 2026-02-10 | ⚠️ prüfen |
```

### TTL nach Quelltyp

| Quelltyp | TTL | Prüfmethode |
|----------|-----|-------------|
| ADO Wiki | 3 Tage | MCP `ado.wiki` → Revision vergleichen |
| ADO Work Items | 1 Tag | MCP `ado.wit` → ChangedDate |
| SharePoint | 7 Tage | Playwright → Modified-Date lesen |
| Web-URL | 14 Tage | HTTP-Fetch → Last-Modified / Content-Hash |
| Lokales File | 7 Tage | `Get-Item` → LastWriteTime |
| Manuell | 30 Tage | User muss bestätigen |

### Der Workflow (bei jedem Digest-Zugriff)

```
User fragt etwas
        │
        ▼
Digest lesen → betroffene RAW-Pfade identifizieren
        │
        ▼
_sources.md prüfen → TTL noch OK?
        │
   ┌────┴────┐
   │         │
 Frisch    Abgelaufen
   │         │
   ▼         ▼
Antwort   Quelle prüfen → Geändert?
liefern      │
        ┌────┴────┐
        │         │
      Nein       Ja
        │         │
        ▼         ▼
    Datum      RAW updaten
    updaten  → Digest updaten
             → Datum updaten
```

### Performance-Regeln

- **Max 3 Freshness-Checks pro Anfrage** — sonst wird es zu langsam
- **Stale Digest > kein Digest** — lieber veraltete Info als Fehler
- **Manuell-Quellen nicht automatisch prüfen** — User nicht nerven

---

## Skill-Dateien

```
.github/skills/hierarchical-rag/
├── SKILL.md                              ← Core Skill (Trigger + Workflows)
├── README.md                             ← Dieses Dokument
└── references/
    ├── best-practices.md                 ← Theorie, Links, Frameworks
    ├── freshness-gate.md                 ← Freshness Gate Detailkonzept
    └── setup-workflow.md                 ← Setup-Anleitung neues Projekt
```

---

## Quick Start: Neues Projekt aufsetzen

```
1. RAW-Ordner anlegen und Dokumente einsortieren
2. Für jeden RAW-Ordner ein Folder-Digest in 20_folders/ erstellen
3. Themenübergreifende Topic-Summaries in 10_topics/ anlegen
4. Glossar mit allen Fachbegriffen befüllen
5. _sources.md mit allen Quellen und Herkunft anlegen
6. 00_catalog.md als Navigations-Index erstellen
```

Vollständige Anleitung: `references/setup-workflow.md`

---

## Wann diesen Skill verwenden?

- Neues DIGEST/RAW-Projekt aufbauen
- Neue Dokumente ins RAW einsortieren und Digest aktualisieren
- Token-Verbrauch optimieren
- Bestehende Dokumentation in hierarchische Struktur umbauen
- Freshness-Checks konfigurieren oder durchführen
