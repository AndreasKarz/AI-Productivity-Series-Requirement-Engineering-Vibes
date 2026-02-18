# Freshness Gate — Lazy Invalidation für Hierarchical RAG

> **Pattern-Name:** Freshness Gate (angelehnt an HTTP Stale-While-Revalidate)  
> **Zweck:** RAG aktuell halten ohne bei jedem Zugriff alle Quellen zu prüfen  
> **Stand:** Februar 2026

---

## Übersicht

Das Freshness Gate ergänzt die DIGEST/RAW-Struktur um eine **zeitbasierte Aktualitätsprüfung**. Kernprinzip: Bei jedem Digest-Zugriff wird geprüft, ob die zugrundeliegenden Quellen noch innerhalb ihres **TTL (Time-to-Live)** liegen. Nur abgelaufene Quellen werden geprüft — nicht das gesamte RAG.

### Analogie

| HTTP Caching | Hierarchical RAG |
|---|---|
| Cache | `digest/` (sofort verfügbar, token-sparsam) |
| Origin Server | Externe Quellen (SharePoint, ADO Wiki, URLs) |
| Cache-Control Header | `_sources.md` (TTL pro Ressource) |
| Stale-While-Revalidate | Digest liefern, im Hintergrund Quelle prüfen |

---

## Neues Artefakt: `_sources.md`

Liegt im **Root** der RAG-Struktur (neben `digest/` und `RAW/`):

```
.assets/context/<Projekt>/
├── _sources.md          ← Quellen-Registry (⚠️ GITIGNORED!)
├── digest/
│   └── (wie bisher)
└── RAW/
    └── (wie bisher)
```

> **🔒 Sicherheitshinweis:** `_sources.md` enthält interne URLs (SharePoint, ADO, etc.) und wird über `**/_sources.md` in `.gitignore` explizit ausgeschlossen. Diese Datei darf **niemals** committed werden!

### Format

```markdown
# Quellen-Registry

**Projekt:** <Projektname>  
**TTL-Standard:** 7 Tage

## Quellen

| ID | RAW-Pfad | Quelltyp | Quell-URL / Herkunft | Erstellt | Letzte Prüfung | Status |
|----|----------|----------|----------------------|----------|----------------|--------|
| S-001 | RAW/01_Handbücher/ | SharePoint | https://tenant.sharepoint.com/sites/... | 2025-11-01 | 2026-02-18 | ✅ aktuell |
| S-002 | RAW/02_Changes/ | ADO Wiki | CTRM/_wiki/wikis/CTRM.wiki/2581 | 2025-12-15 | 2026-02-10 | ⚠️ prüfen |
| S-003 | RAW/04_Testing/ | Manuell | Zulieferung Max Muster | 2026-01-20 | 2026-01-20 | ✅ aktuell |

## TTL-Konfiguration

| Quelltyp | TTL | Begründung |
|----------|-----|-----------|
| ADO Wiki | 3 Tage | Wiki ändert sich bei Sprints häufig |
| ADO Work Items | 1 Tag | Tickets ändern sich laufend |
| SharePoint | 7 Tage | Dokumente relativ stabil |
| Web-URL | 14 Tage | Externe Seiten, seltene Änderungen |
| Lokales File | 7 Tage | Standard-Intervall |
| Manuell | 30 Tage | User muss manuell bestätigen |
```

### Felder erklärt

| Feld | Beschreibung |
|------|-------------|
| **ID** | Stabile Referenz (S-001, S-002, ...) |
| **RAW-Pfad** | Wo die Daten im RAW-Layer liegen |
| **Quelltyp** | Bestimmt die Check-Methode und den TTL |
| **Quell-URL / Herkunft** | Woher die Daten ursprünglich stammen |
| **Erstellt** | Wann der Eintrag erstmals erfasst wurde |
| **Letzte Prüfung** | Wann zuletzt auf Aktualität geprüft wurde |
| **Status** | `✅ aktuell` / `⚠️ prüfen` / `🔄 wird aktualisiert` / `❌ nicht erreichbar` |

---

## Freshness-Gate-Workflow

### Trigger: Agent liest einen Digest

```
1. Agent erhält Anfrage
2. Agent liest relevanten Digest (z.B. 10_topics/Testmanagement.md)
3. Agent identifiziert betroffene RAW-Pfade aus dem Digest
4. Agent liest _sources.md → filtert Zeilen wo RAW-Pfad matcht
5. Für jede betroffene Quelle:
   a) Berechne: heute - "Letzte Prüfung" > TTL?
   b) NEIN → Quelle ist frisch. Weiter.
   c) JA → Freshness-Check auslösen (siehe unten)
6. Antwort mit Digest liefern
```

### Freshness-Check nach Quelltyp

| Quelltyp | Prüfmethode |
|----------|-------------|
| **SharePoint** | Playwright → Seite öffnen → Modified-Date auf der Seite lesen |
| **ADO Wiki** | MCP `mcp_ado_wiki_get_page` → Revision/Version vergleichen |
| **ADO Work Items** | MCP `mcp_ado_wit_get_work_item` → ChangedDate prüfen |
| **Web-URL** | `fetch_webpage` → Last-Modified Header oder Content-Hash |
| **Lokales File** | `Get-Item -Path ... \| Select-Object LastWriteTime` |
| **Manuell** | User fragen: "Quelle S-003 wurde zuletzt am X geprüft. Ist sie noch aktuell?" |

### Nach dem Freshness-Check

```
Wenn Quelle UNVERÄNDERT:
  → _sources.md: "Letzte Prüfung" = heute, Status = ✅ aktuell
  → Keine weiteren Aktionen

Wenn Quelle GEÄNDERT:
  1. RAW aktualisieren (Dokument neu holen/konvertieren)
  2. Betroffene Digest-Files aktualisieren:
     - 20_folders/<ordner>.digest.md
     - 10_topics/<topic>.md (wenn betroffen)
     - glossary.md (neue Begriffe?)
  3. _sources.md: "Letzte Prüfung" = heute, Status = ✅ aktuell
  4. 00_catalog.md: Statistiken bei Bedarf anpassen

Wenn Quelle NICHT ERREICHBAR:
  → _sources.md: Status = ❌ nicht erreichbar
  → User informieren: "Quelle S-002 ist nicht erreichbar"
  → Digest trotzdem verwenden (stale is better than nothing)
```

---

## Visualisierung: Entscheidungsfluss

```
               ┌──────────────────┐
               │  Digest gelesen  │
               └────────┬─────────┘
                        │
                        ▼
               ┌──────────────────┐
               │ _sources.md      │
               │ lesen + filtern  │
               └────────┬─────────┘
                        │
              ┌─────────┴─────────┐
              │                   │
        TTL OK              TTL abgelaufen
              │                   │
              ▼                   ▼
     ┌────────────┐    ┌──────────────────┐
     │ Antwort    │    │ Freshness-Check  │
     │ direkt     │    │ (je nach Typ)    │
     │ liefern    │    └────────┬─────────┘
     └────────────┘             │
                       ┌───────┴───────┐
                       │               │
                  Unverändert     Geändert
                       │               │
                       ▼               ▼
               ┌──────────┐  ┌─────────────────┐
               │ Datum    │  │ RAW updaten     │
               │ updaten  │  │ Digest updaten  │
               │ → fertig │  │ Datum updaten   │
               └──────────┘  │ → fertig        │
                             └─────────────────┘
```

---

## Performance-Regeln

| Regel | Begründung |
|-------|-----------|
| **Max 3 Freshness-Checks pro Anfrage** | Sonst wird die Antwort zu langsam |
| **Parallele Checks wo möglich** | SharePoint + ADO Wiki gleichzeitig prüfen |
| **Manuell-Quellen nicht automatisch** | User nicht bei jeder Anfrage nerven |
| **Stale Digest > kein Digest** | Lieber veraltete Info als Fehler |
| **Check-Ergebnis immer loggen** | In `_sources.md` → Audit-Trail |

---

## Edge Cases

### Quelle existiert nicht mehr
```
Status = ❌ nicht erreichbar
→ User informieren
→ Digest bleibt stehen (mit Vermerk "Stand: letztes bekanntes Datum")
→ In decisions.md als "Bekannte Lücke" eintragen
```

### Mehrere Quellen für einen RAW-Ordner
```
Jede Quelle bekommt eine eigene Zeile in _sources.md
→ Ordner-Digest wird erst als "frisch" betrachtet wenn ALLE Quellen OK
```

### Manueller Override
```
User sagt: "Bitte aktualisiere alle Quellen jetzt"
→ Alle Zeilen in _sources.md durchgehen (unabhängig vom TTL)
→ Batch-Update aller erreichbaren Quellen
```

---

## Migration: Bestehendes RAG um Freshness Gate erweitern

Für ein RAG **ohne** `_sources.md`:

```
1. _sources.md anlegen (leere Tabelle)
2. Für jeden RAW-Ordner:
   a) Woher kommen die Dokumente? → Quelltyp + URL eintragen
   b) Wann wurden sie zuletzt geholt? → Erstellt-Datum
   c) Letzte Prüfung = Erstellt (da nie geprüft)
3. TTL-Konfiguration festlegen
4. Ab sofort: Freshness-Gate-Workflow bei jedem Digest-Zugriff
```
