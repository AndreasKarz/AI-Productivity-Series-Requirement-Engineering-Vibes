# Hierarchical RAG — Setup-Workflow (neues Projekt)

Schritt-für-Schritt-Anleitung um eine DIGEST/RAW-Struktur von Grund auf aufzubauen.

---

## Phase 1: RAW-Layer vorbereiten

```
.assets/context/<Projektname>/
└── RAW/
    ├── 01_<Kategorie1>/
    ├── 02_<Kategorie2>/
    └── 03_<Kategorie3>/
```

**Regeln für RAW:**
- Originaldokumente **niemals verändern** (nur lesen)
- Ordnernamen numerisch präfixen für stabile Referenzierung
- Binärdateien (PDF, DOCX) wenn möglich zu Markdown konvertieren

---

## Phase 2: Folder-Digests erstellen (`20_folders/`)

Für jeden RAW-Ordner **ein Digest-File** erstellen:

```markdown
# 01_<Kategorie1> — Digest

**Letzte Aktualisierung:** YYYY-MM-DD  
**Anzahl Dokumente:** X

## Inhaltsübersicht

| Datei | Typ | Beschreibung | Schlüsselinfo |
|-------|-----|-------------|---------------|
| `datei1.md` | Anleitung | Kurze Beschreibung | Version X.Y, Datum |
| `datei2.pdf` | Prozess | Kurze Beschreibung | Scope, Verantwortlich |

## Wichtigste Erkenntnisse

- Bullet 1: Kritische Info die häufig gesucht wird
- Bullet 2: Wiederkehrender Begriff oder Prozess
```

**Qualitätskriterien:**
- Jede Zeile in der Tabelle: Max 1 Satz Beschreibung
- "Schlüsselinfo": Nur was wirklich bei Suche hilft (Version, Datum, Scope)
- Keine vollständigen Inhalte wiederholen — nur navigieren

---

## Phase 3: Topic-Summaries erstellen (`10_topics/`)

Topics sind **themenübergreifend** — ein Topic kann mehrere RAW-Ordner umfassen.

Typische Topics:
- Handbücher / Prozesse
- Testmanagement
- Change Management
- Releases
- Glossar-Themen

```markdown
# <Topic-Name>

**Stand:** YYYY-MM-DD  
**Quellen:** `RAW/01_...`, `RAW/02_...`

## Übersicht
[2-3 Sätze: Was umfasst dieses Topic, warum relevant]

## Schlüsselprozesse / -dokumente

| Dokument | Pfad | Inhalt |
|----------|------|--------|
| Prozessname | `RAW/01_X/datei.md` | Kurzbeschreibung |

## Häufig gestellte Fragen zu diesem Topic
[Optional: Top 3-5 Fragen + kurze Antworten mit RAW-Referenz]
```

---

## Phase 4: Glossar aufbauen (`glossary.md`)

```markdown
# Glossar

## Abkürzungen

| Kürzel | Langform | Bedeutung |
|--------|----------|-----------|
| ABC | Ausgeschriebener Name | Kurze Definition |

## Fachbegriffe

| Begriff | Definition | Kontext |
|---------|------------|---------|
| Begriff | Definition (1 Satz) | In welchem Prozess/Dokument |
```

**Befüllungsstrategie:**
1. Beim Erstellen der Folder-Digests: Unbekannte Begriffe notieren
2. Beim Erstellen der Topics: Begriffe definitieren und verlinken
3. Glossar nach Kategorie strukturieren, nicht alphabetisch (bei mehr als 50 Einträgen: alphabetisch + Kategorien)

---

## Phase 5: Catalog erstellen (`00_catalog.md`)

Der Catalog ist der **einzige Einstiegspunkt** — er muss immer aktuell sein.

```markdown
# <Projekt> Context Catalog

**Letzte Aktualisierung:** YYYY-MM-DD  
**Quelle:** `.assets/context/<Projekt>/RAW`

## Statistiken

| Metrik | Wert |
|--------|------|
| Originaldokumente | X |
| Digest-Files | Y |
| Token-Reduktion | ~Z% |

## Quick Navigation

### Nach Ordner

| Ordner | Beschreibung | Digest |
|--------|-------------|--------|
| 01_Kategorie1 | Kurzbeschreibung | [→](20_folders/01_...) |

### Nach Topic

- [Topic 1](10_topics/topic1.md) — Kurzbeschreibung
- [Topic 2](10_topics/topic2.md) — Kurzbeschreibung

### Referenz

- [Glossar](glossary.md) — X Begriffe
- [Entscheide & Einschränkungen](decisions.md)
```

---

## Phase 6: Decisions-File befüllen (`decisions.md`)

Dokumentiere bekannte Einschränkungen, Scope-Entscheide, offene Fragen:

```markdown
# Dokumentierte Entscheide & Einschränkungen

## Scope-Entscheide

| Entscheid | Begründung | Datum |
|-----------|-----------|-------|
| Was bewusst nicht inkludiert | Warum | YYYY-MM-DD |

## Bekannte Lücken

| Lücke | Auswirkung | Workaround |
|-------|-----------|-----------|
| Fehlendes Dokument/Thema | Was fehlt deswegen | Alternativer Ansatz |
```

---

## Wartung: Digest aktuell halten

### Trigger für Update
| Ereignis | Was updaten |
|---------|------------|
| Neues Dokument in RAW | `20_folders/<ordner>.digest.md` |
| Neue Version eines Dokuments | Digest-Zeile + Datum |
| Neuer Fachbegriff entdeckt | `glossary.md` |
| Widerspruch zwischen Dokumenten | `decisions.md` |
| Neue Kategorie/Ordner | `00_catalog.md` + neues Folder-Digest |

### Faustregel
**Ein neues RAW-Dokument = max. 3-5 Minuten Digest-Update.**  
Wenn es länger dauert, ist der Digest-Prozess zu komplex.

---

## Checkliste: Fertige Struktur

```
✅ RAW/          — Alle Originaldokumente vorhanden
✅ 20_folders/   — Für jeden RAW-Ordner ein .digest.md
✅ 10_topics/    — Mindestens 3-5 Topics definiert
✅ glossary.md   — Alle Abkürzungen erklärt
✅ decisions.md  — Scope-Entscheide dokumentiert
✅ 00_catalog.md — Vollständig, mit Statistiken und Navigation
```
