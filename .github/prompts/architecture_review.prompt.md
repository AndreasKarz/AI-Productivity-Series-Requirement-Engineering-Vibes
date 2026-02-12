---
agent: "agent"
description: "EA-Standards-Review gegen SHERPA. Prüft Architektur-Dokumentationen auf Einhaltung der Enterprise Architecture Standards."
tools:
  ['vscode', 'execute', 'read', 'agent', 'edit', 'search', 'web', 'ado/search_code', 'ado/search_wiki', 'ado/search_workitem', 'ado/wiki_get_page', 'ado/wiki_get_page_content', 'ado/wiki_get_wiki', 'ado/wiki_list_pages', 'ado/wiki_list_wikis', 'playwright/*', 'todo']
---

# EA-Standards Review (SHERPA)

Prüfe die gegebene Architektur-Dokumentation **primär gegen die EA-Standards** des SHERPA-Frameworks. Der Output ist **kompakt, übersichtlich und actionable**.

## Input

{{input}}

## Input-Routing

| Input-Typ | Erkennung | Zugriff |
|-----------|-----------|---------|
| **📎 Attachment** | Datei im Chat (PDF, DOCX, MD, PNG) | Direkt analysieren |
| **🔗 ADO URL** | `dev.azure.com/{company}/*` | ADO MCP (`mcp_ado_wiki_*`, `mcp_ado_search_*`) |
| **📁 SharePoint** | `{sharepoint}/*` | Playwright (SAML-Login) |
| **🏗️ ADoIT** | `{adoit}/*` | Playwright (SAML-Login) |
| **🌐 Externe URL** | Andere URLs | `fetch_webpage`, Fallback Playwright |
| **📝 Freitext** | Ohne URL/Attachment | Rückfrage → konkrete Quelle anfordern |

## Vorgehen

### 1. Input analysieren
- Input-Typ bestimmen → Routing anwenden → Inhalt extrahieren
- Systemname, Scope und Architektur-Layer (Business/Application/Data/Technology) identifizieren

### 2. EA-Standards laden (OBLIGATORISCH)

> ⚠️ Mindestens **3 von 5 Quellen** müssen abgerufen werden. Nicht erreichbare Quellen im Report dokumentieren.

| # | Quelle | Zugriff | Prüfziel |
|---|--------|---------|----------|
| 1 | **CoA SharePoint** `{sharepoint}/sites/CommiteeofArchitectsCoA/` | Playwright | SEAL-Vorgaben, CoA-Entscheidungen, Architektur-Prinzipien |
| 2 | **ADoIT** `{adoit}/` | Playwright | Capability-Zuordnung, Applikationslandschaft, Datenflüsse |
| 3 | **ADO Standards-Wiki** | `mcp_ado_wiki_get_page_content` (ID 12465) | Technologie-Standards, Security Patterns, Integration Guidelines |
| 4 | **ADO CTRM-Wiki** | `mcp_ado_search_wiki` mit Systemname | Systemdoku, ADRs, Schnittstellen |
| 5 | **sl-ch-nexus** `github.com/sl-ch-ops/sl-ch-nexus` | `fetch_webpage` | IaC Templates, Landing Zone Patterns (nur bei Cloud-Systemen) |

### 3. Standards-Check durchführen

Prüfe die Dokumentation systematisch gegen diese **EA-Standardkategorien**:

| Kategorie | Prüfpunkte |
|-----------|-----------|
| **SEAL-Lifecycle** | Lifecycle-Phase dokumentiert? SEAL-Gate bestanden? |
| **Building Blocks** | Wiederverwendbare SL-Komponenten genutzt? |
| **Integration** | API-First? Event-Driven? Standard-Patterns? |
| **Data Governance** | Datenklassifizierung? Datenflüsse dokumentiert? |
| **Cloud/Azure** | Landing Zone konform? Standard-IaC? |
| **Security** | Security Baseline erfüllt? AuthN/AuthZ gemäss Standard? |
| **Dokumentation** | arc42-konform? ADRs vorhanden? Schnittstellendoku? |

### 4. Report generieren

---

## Output-Format

```markdown
# EA-Standards Review: [Systemname]

**Datum:** {{currentDate}} | **Scope:** [Geltungsbereich] | **Gesamtstatus:** 🟢/🟡/🔴

---

## Standards-Compliance

| # | EA-Standard | Status | Evidenz / Abweichung |
|---|-------------|--------|----------------------|
| 1 | SEAL-Lifecycle | ✔/⚠/✖/❓ | [Kurzbegründung + Quelle] |
| 2 | Building Blocks | ✔/⚠/✖/❓ | |
| 3 | Integration Patterns | ✔/⚠/✖/❓ | |
| 4 | Data Governance | ✔/⚠/✖/❓ | |
| 5 | Cloud/Azure Standards | ✔/⚠/✖/❓ | |
| 6 | Security Baseline | ✔/⚠/✖/❓ | |
| 7 | Dokumentationsstandard | ✔/⚠/✖/❓ | |

**Legende:** ✔ konform | ⚠ teilweise | ✖ nicht konform | ❓ nicht bewertbar (fehlt in Doku)

---

## Kritische Abweichungen

> Nur Standards mit ⚠ oder ✖. Bei ✔ überall → "Keine kritischen Abweichungen."

| # | Standard | Soll (SHERPA) | Ist | Handlungsbedarf | Prio |
|---|----------|--------------|-----|-----------------|------|
| 1 | | | | | P1/P2/P3 |

---

## Empfehlungen

| # | Massnahme | Begründung (Standard-Referenz) | Aufwand |
|---|-----------|-------------------------------|---------|
| 1 | | | S/M/L |

---

## Fazit

[2-3 Sätze Klartext: Hauptstärken, kritischste Lücken, klare Handlungsempfehlung.]

---

## Quellenvalidierung

| Quelle | Status | Relevante Findings |
|--------|--------|-------------------|
| CoA SharePoint | ✔/✖ | [Kurz] |
| ADoIT | ✔/✖ | |
| ADO Standards-Wiki | ✔/✖ | |
| ADO CTRM-Wiki | ✔/✖ | |
| sl-ch-nexus | ✔/✖/n.a. | |
```

---

## Regeln

1. **Quellenpflicht:** Jede Compliance-Aussage MUSS durch eine SHERPA-Quelle belegt sein
2. **Keine Annahmen:** Was nicht dokumentiert ist → ❓ (nicht bewertbar)
3. **Kompakt:** Keine Füllsätze. Tabellen > Fliesstext. Max. 1 Seite pro Abschnitt
4. **Klartext:** Direkte Aussagen, keine diplomatischen Formulierungen
5. **Actionable:** Jede Empfehlung referenziert den konkreten Standard und ist umsetzbar
6. **Transparenz:** Nicht erreichbare Quellen explizit dokumentieren

## Bei fehlender Dokumentation

- **Explizit als ❓ markieren** in der Standards-Compliance-Tabelle
- **Fehlende Dokumentation** ist selbst eine Abweichung vom Dokumentationsstandard
- **Nicht spekulieren** über undokumentierte Aspekte
