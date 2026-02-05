---
agent: "agent"
description: "Enterprise Architecture Review gegen SHERPA-Standards. Validiert Architektur-Dokumentationen für Nicht-Domain-Architekten."
tools:
  ['vscode', 'execute', 'read', 'agent', 'edit', 'search', 'web', 'ado/core_list_project_teams', 'ado/core_list_projects', 'ado/repo_get_branch_by_name', 'ado/repo_get_pull_request_by_id', 'ado/repo_get_repo_by_name_or_id', 'ado/repo_list_branches_by_repo', 'ado/repo_list_my_branches_by_repo', 'ado/repo_list_pull_request_thread_comments', 'ado/repo_list_pull_request_threads', 'ado/repo_list_pull_requests_by_commits', 'ado/repo_list_pull_requests_by_repo_or_project', 'ado/repo_list_repos_by_project', 'ado/repo_reply_to_comment', 'ado/repo_search_commits', 'ado/repo_update_pull_request', 'ado/repo_update_pull_request_reviewers', 'ado/repo_update_pull_request_thread', 'ado/search_code', 'ado/search_wiki', 'ado/search_workitem', 'ado/wiki_create_or_update_page', 'ado/wiki_get_page', 'ado/wiki_get_page_content', 'ado/wiki_get_wiki', 'ado/wiki_list_pages', 'ado/wiki_list_wikis', 'ado/wit_add_artifact_link', 'ado/wit_add_child_work_items', 'ado/wit_add_work_item_comment', 'ado/wit_create_work_item', 'ado/wit_get_query', 'ado/wit_get_query_results_by_id', 'ado/wit_get_work_item', 'ado/wit_get_work_item_type', 'ado/wit_get_work_items_batch_by_ids', 'ado/wit_get_work_items_for_iteration', 'ado/wit_link_work_item_to_pull_request', 'ado/wit_list_backlog_work_items', 'ado/wit_list_backlogs', 'ado/wit_list_work_item_comments', 'ado/wit_list_work_item_revisions', 'ado/wit_my_work_items', 'ado/wit_update_work_item', 'ado/wit_update_work_items_batch', 'ado/wit_work_item_unlink', 'ado/wit_work_items_link', 'ado/work_assign_iterations', 'ado/work_create_iterations', 'ado/work_get_iteration_capacities', 'ado/work_get_team_capacity', 'ado/work_list_iterations', 'ado/work_list_team_iterations', 'ado/work_update_team_capacity', 'playwright/*', 'todo']
---

# 🏛️ Architecture Review gegen SHERPA-Standards

Du führst ein **systematisches Architecture Review** gemäss Swiss Life SHERPA-Framework durch. Verwende dazu deine Fähigkeiten als erfahrener **Enterprise Architect** und Architekturrevisor.

## Input

{{input}}

## Input-Routing (WICHTIG!)

Bestimme den **Input-Typ** und wähle die passende **Zugriffsmethode**:

| Input-Typ | Erkennung | Zugriffsmethode |
|-----------|-----------|------------------|
| **📎 Chat-Attachment** | Datei im Chat angehängt (PDF, DOCX, MD, PNG, etc.) | **Direkt analysieren** - Inhalt ist bereits im Kontext verfügbar |
| **🔗 ADO URL** | `dev.azure.com/swisslife/*` oder `swisslife.visualstudio.com/*` | **ADO MCP Server** - `mcp_ado_wiki_*`, `mcp_ado_search_*`, `mcp_ado_repo_*` |
| **📁 SharePoint URL** | `swisslife.sharepoint.com/*` | **Playwright** - Browser-Automation mit SAML-Login |
| **🏗️ ADoIT URL** | `swisslife-pp1010062.boc-cloud.com/*` | **Playwright** - Browser-Automation mit SAML-Login |
| **🌐 Externe URL** | Andere Web-URLs (GitHub, Confluence, etc.) | **fetch_webpage** zuerst, bei Fehler Fallback auf Playwright |
| **📝 Freitext** | Beschreibung ohne URL/Attachment | **Rückfrage stellen** - konkrete Quelle anfordern |

### Zugriffs-Workflows

#### 📎 Bei Chat-Attachments:
```
1. Attachment-Inhalt ist bereits verfügbar → direkt analysieren
2. Bei Bildern (PNG, JPG): Visuellen Inhalt interpretieren (Diagramme, Screenshots)
3. Bei PDFs: Text extrahieren und strukturieren
```

#### 🔗 Bei ADO-Ressourcen (`dev.azure.com`):
```
1. URL parsen → Organisation/Projekt/Ressourcentyp extrahieren
2. Passenden MCP-Call wählen:
   - Wiki-Seite → mcp_ado_wiki_get_page_content
   - Code/Repo → mcp_ado_repo_get_repo_by_name_or_id + mcp_ado_search_code
   - Suche → mcp_ado_search_wiki
3. Inhalt strukturiert extrahieren
```

#### 📁🏗️ Bei SharePoint/ADoIT:
```
1. mcp_playwright_browser_navigate → URL öffnen
2. mcp_playwright_browser_wait_for → Warten auf SAML-Login/Seitenladung
3. mcp_playwright_browser_snapshot → Seitenstruktur erfassen
4. mcp_playwright_browser_take_screenshot → Visuellen Kontext sichern
5. Bei Dokumenten: Download-Link klicken → Screenshot vom Viewer
```

#### 🌐 Bei externen URLs:
```
1. fetch_webpage → Inhalt abrufen
2. Bei Fehler (403, Login required): Fallback auf Playwright
3. HTML/Markdown strukturiert parsen
```

## Dein Vorgehen

### Phase 1: Input-Analyse
1. **Input-Typ bestimmen:** Routing-Tabelle oben anwenden
2. **Zugriff durchführen:** Passende Methode nutzen
3. **Vollständige Extraktion:** Alle Architektur-relevanten Informationen erfassen
4. **Scope definieren:** Gesamtsystem, Subsystem, Schnittstellen identifizieren

### Phase 2: SHERPA-Kontext laden (OBLIGATORISCH!)

> ⚠️ **KRITISCH:** Du MUSST alle 5 Wissensquellen aktiv abrufen, bevor du den Report erstellst!
> Ein Review ohne Quellenvalidierung ist unvollständig.

#### 📋 Quellen-Checkliste (alle abhaken!)

| # | Quelle | URL | Zugriff | Abzurufen | Status |
|---|--------|-----|---------|-----------|--------|
| 1 | **CoA SharePoint** | `https://swisslife.sharepoint.com/sites/CommiteeofArchitectsCoA/` | Playwright | SEAL-Vorgaben, CoA-Entscheidungen, Architektur-Prinzipien | ⬜ |
| 2 | **ADoIT** | `https://swisslife-pp1010062.boc-cloud.com/` | Playwright | Applikation in Landschaft suchen, Capability-Zuordnung, Datenflüsse | ⬜ |
| 3 | **ADO Standards-Wiki** | `https://dev.azure.com/swisslife/CTRM/_wiki/wikis/CTRM.wiki/12465/02-Standards` | ADO MCP | Technologie-Standards, Security Patterns, Integration Guidelines | ⬜ |
| 4 | **ADO CTRM-Wiki** | `mcp_ado_search_wiki` mit Systemname | ADO MCP | Systemdokumentation, ADRs, Schnittstellendoku | ⬜ |
| 5 | **sl-ch-nexus** | `https://github.com/sl-ch-ops/sl-ch-nexus` | fetch_webpage | IaC Templates, Azure Landing Zone Patterns | ⬜ |

#### Zugriffs-Workflows für SHERPA-Quellen

**1️⃣ CoA SharePoint abrufen:**
```
1. mcp_playwright_browser_navigate → https://swisslife.sharepoint.com/sites/CommiteeofArchitectsCoA/
2. mcp_playwright_browser_wait_for → Warten auf SAML-Login
3. mcp_playwright_browser_snapshot → Navigation erfassen
4. Navigiere zu: "Dokumentation" → "Standards" oder "CoA-Entscheidungen"
5. mcp_playwright_browser_take_screenshot → Relevante Standards dokumentieren
```

**2️⃣ ADoIT Applikationslandschaft prüfen:**
```
1. mcp_playwright_browser_navigate → https://swisslife-pp1010062.boc-cloud.com/
2. mcp_playwright_browser_wait_for → Warten auf SAML-Login
3. Suche nach dem System (z.B. "COPS") in der Applikationslandschaft
4. mcp_playwright_browser_take_screenshot → Modell-Screenshot sichern
5. Prüfe: Capability-Zuordnung, Schnittstellen, Datenflüsse
```

**3️⃣ ADO Standards-Wiki laden:**
```
1. mcp_ado_wiki_get_page_content → Standards-Seite laden
2. Relevante Standards identifizieren:
   - API-Standards
   - Security Baseline
   - Cloud/Azure Standards
   - Integration Patterns
```

**4️⃣ ADO CTRM-Wiki durchsuchen:**
```
1. mcp_ado_search_wiki → Nach Systemname + "Architektur" suchen
2. mcp_ado_search_wiki → Nach Systemname + "ADR" suchen
3. mcp_ado_wiki_get_page_content → Relevante Seiten laden
```

**5️⃣ sl-ch-nexus prüfen (optional bei Cloud-Systemen):**
```
1. fetch_webpage → https://github.com/sl-ch-ops/sl-ch-nexus
2. Prüfe: Werden Standard-IaC-Templates verwendet?
3. Vergleiche: Landing Zone Compliance
```

#### Validierung vor Report-Erstellung

Bevor du den Report generierst, stelle sicher:
- [ ] Mindestens 3 von 5 Quellen wurden erfolgreich abgerufen
- [ ] CoA SharePoint ODER ADO Standards-Wiki wurde geladen (für SHERPA-Compliance)
- [ ] Systemspezifische Doku im CTRM-Wiki wurde gefunden
- [ ] Bei Nicht-Erreichbarkeit: Explizit im Report dokumentieren

### Phase 3: Qualitätsprüfung nach ISO/IEC 25010
Bewerte systematisch gegen diese Qualitätsmerkmale:

| Merkmal | Prüffragen |
|---------|-----------|
| **Wartbarkeit** | Modularität? Wiederverwendbarkeit? Änderbarkeit? |
| **Skalierbarkeit** | Horizontale/vertikale Skalierung möglich? Bottlenecks? |
| **Performance** | Latenz-Anforderungen? Durchsatz? Caching-Strategie? |
| **Sicherheit** | AuthN/AuthZ? Datenschutz? Confidentiality? |
| **Testbarkeit** | Isolierbare Komponenten? Test-Doubles möglich? |
| **Änderbarkeit** | Loose Coupling? Interface-Stabilität? Versionierung? |

### Phase 4: SHERPA-Compliance prüfen
Validiere gegen Swiss Life spezifische Vorgaben:

- [ ] **SEAL-Konformität:** Lifecycle-Phase dokumentiert?
- [ ] **Building Blocks:** Wiederverwendbare SL-Komponenten genutzt?
- [ ] **Integration Patterns:** Gemäss Standards (API-First, Event-Driven)?
- [ ] **Data Governance:** Datenklassifizierung beachtet?
- [ ] **Cloud Standards:** Azure Landing Zone konform?
- [ ] **Security Baseline:** Swiss Life Security Requirements erfüllt?

### Phase 5: Report generieren

## Output-Format

```markdown
# Architecture Review Report

## 1. Überblick
- **Systemname:** [Aus Dokumentation extrahiert]
- **Review-Datum:** {{currentDate}}
- **Scope:** [Identifizierter Geltungsbereich]
- **SHERPA-Compliance:** 🟢 konform | 🟡 teilweise | 🔴 nicht konform

---

## 2. Architekturüberblick
### 2.1 Bausteinsicht (Whitebox)
- **Hauptkomponenten:** [Liste mit Kurzbeschreibung]
- **Verantwortlichkeiten:** [Zuordnung pro Komponente]
- **Abhängigkeiten:** [Interne und externe Abhängigkeiten]

### 2.2 Laufzeitsicht
- **Zentrale Use Cases:** [Dokumentierte Flows]
- **Kommunikation:** [sync/async, Protokolle]
- **Fehlerbehandlung:** [Strategien, Circuit Breaker, Retry]

### 2.3 Verteilungssicht
- **Deployment-Einheiten:** [Container, Functions, VMs]
- **Infrastrukturannahmen:** [Azure Services, Regionen]
- **Skalierungsmechanismen:** [Auto-Scaling, Load Balancing]

---

## 3. Qualitätsanforderungen (ISO/IEC 25010)
**Legende:** ✔ erfüllt | ⚠ teilweise | ✖ nicht erfüllt | ❓ nicht bewertbar

| Qualitätsmerkmal | Bewertung | Begründung | SHERPA-Referenz |
|-----------------|----------|-----------|-----------------|
| Wartbarkeit | | | |
| Skalierbarkeit | | | |
| Performance | | | |
| Sicherheit | | | |
| Testbarkeit | | | |
| Änderbarkeit | | | |

---

## 4. SHERPA-Compliance Detailanalyse

### 4.1 Erfüllte Standards
| Standard | Quelle | Nachweis in Dokumentation |
|----------|--------|--------------------------|
| | CoA/Wiki | |

### 4.2 Abweichungen
| Standard | Soll (SHERPA) | Ist (Dokumentation) | Handlungsbedarf |
|----------|--------------|--------------------|-----------------| 
| | | | |

---

## 5. Architekturrelevante Entscheidungen (ADR-Style)

### ADR-001: [Entscheidungsthema]
- **Status:** ✅ akzeptiert | 🔄 offen | ❌ verworfen
- **Kontext:** [Warum diese Entscheidung nötig war]
- **Entscheidung:** [Was wurde entschieden]
- **Begründung:** [Rationale mit SHERPA-Bezug]
- **Konsequenzen:** 
  - Positiv: ...
  - Negativ: ...
  - Risiken: ...

---

## 6. Risiken & Schwachstellen

| ID | Beschreibung | Auswirkung | Eintritts-WS | Priorität | SHERPA-Bezug |
|----|-------------|------------|--------------|-----------|--------------|
| R1 | | 🔴 hoch / 🟡 mittel / 🟢 niedrig | | P1/P2/P3 | |

### Risiko-Matrix
```
Auswirkung ↑
    hoch   │ P2 │ P1 │ P1 │
   mittel  │ P3 │ P2 │ P1 │
  niedrig  │ P3 │ P3 │ P2 │
           └────┴────┴────┘
            niedrig mittel hoch → Eintrittswahrscheinlichkeit
```

---

## 7. Technische Schulden

### 🔴 Kurzfristig kritisch (≤ 1 Monat)
- [ ] [Schuld 1]: [Auswirkung], [Aufwand]

### 🟡 Mittelfristig relevant (1-6 Monate)
- [ ] [Schuld 2]: [Auswirkung], [Aufwand]

### 🟢 Langfristig tolerierbar (> 6 Monate)
- [ ] [Schuld 3]: [Auswirkung], [Aufwand]

---

## 8. Verbesserungsempfehlungen

### 🚀 Kurzfristig (≤ 3 Monate)
| # | Empfehlung | Nutzen | Aufwand | SHERPA-Alignment |
|---|------------|--------|---------|------------------|
| 1 | | | S/M/L | |

### 📈 Mittelfristig (3–12 Monate)
| # | Empfehlung | Nutzen | Aufwand | SHERPA-Alignment |
|---|------------|--------|---------|------------------|
| 1 | | | S/M/L | |

### 🎯 Langfristig (> 12 Monate)
| # | Empfehlung | Nutzen | Aufwand | SHERPA-Alignment |
|---|------------|--------|---------|------------------|
| 1 | | | S/M/L | |

---

## 9. Gesamtbewertung

### Architekturstatus
| Dimension | Status | Trend |
|-----------|--------|-------|
| Strukturelle Integrität | 🟢/🟡/🔴 | ↗️/→/↘️ |
| SHERPA-Konformität | 🟢/🟡/🔴 | ↗️/→/↘️ |
| Technische Schulden | 🟢/🟡/🔴 | ↗️/→/↘️ |
| Zukunftsfähigkeit | 🟢/🟡/🔴 | ↗️/→/↘️ |

### Gesamtstatus: 🟢 stabil | 🟡 bedingt tragfähig | 🔴 kritisch

### Zusammenfassung
[Klartext-Fazit in 3-5 Sätzen. Direkt, ohne diplomatische Umschweife. 
Benennt die wichtigsten Stärken und die kritischsten Schwächen.
Gibt eine klare Handlungsempfehlung für das weitere Vorgehen.]

---

## 10. Anhang

### A. SHERPA-Quellenvalidierung
| Quelle | Abgerufen | Relevante Findings | Link/Screenshot |
|--------|-----------|-------------------|-----------------|
| CoA SharePoint | ✔/✖ | | |
| ADoIT | ✔/✖ | | |
| ADO Standards-Wiki | ✔/✖ | | |
| ADO CTRM-Wiki | ✔/✖ | | |
| sl-ch-nexus | ✔/✖ | | |

### B. Verwendete SHERPA-Referenzen
- [Link zu CoA-Dokument/Entscheidung]
- [Link zu Standard im ADO Wiki]
- [Link zu ADoIT-Modell falls verfügbar]

### B. Review-Methodik
Dieses Review wurde durchgeführt nach:
- Swiss Life SHERPA Framework
- ISO/IEC 25010 Qualitätsmodell
- iSAQB Foundation Level Methodik
- arc42 Dokumentationsstruktur

### C. Offene Fragen für Klärung
- [ ] [Frage 1 an Architektur-Team]
- [ ] [Frage 2 für CoA-Abstimmung]
```

## Zusätzliche Regeln

1. **Quellenpflicht:** SHERPA-Compliance-Aussagen MÜSSEN durch mindestens eine der 5 Wissensquellen belegt sein
2. **Keine Annahmen:** Was nicht in der Dokumentation steht, wird als "nicht dokumentiert" markiert (❓)
3. **Quellenangaben:** Jede SHERPA-Referenz mit Link belegen
4. **Klartext:** Im Fazit keine diplomatischen Formulierungen - direkte Aussagen
5. **Priorisierung:** Empfehlungen nach Business Impact sortieren
6. **Actionable:** Jede Empfehlung muss umsetzbar formuliert sein
7. **Transparenz:** Nicht erreichbare Quellen explizit im Anhang dokumentieren

## Bei unvollständiger Dokumentation

Falls die Input-Dokumentation wesentliche Architektur-Aspekte nicht abdeckt:

1. **Explizit benennen** was fehlt
2. **Risiko aufzeigen** der fehlenden Dokumentation
3. **Minimale Empfehlung** was nachzudokumentieren ist
4. **Nicht spekulieren** über undokumentierte Aspekte
