---
agent: 'agent'
model: 'Claude Opus 4.5'
tools: ['execute', 'read', 'edit', 'search', 'agent', 'azure-mcp/search', 'ado/*', 'memory/*', 'microsoft-docs/*', 'sequential-thinking/*', 'ms-azuretools.vscode-azure-github-copilot/azure_get_auth_context', 'ms-azuretools.vscode-azure-github-copilot/azure_set_auth_context']
description: Analyze and improve an Azure DevOps Work Item via MCP tools (ado, sequential-thinking) following IREB/ISTQB, with a dry-run preview and optional apply.
---
parameters:
  - name: **workItemId**
    label: Work Item ID
    type: number
    required: true
  - name: **adoProject**
    label: ADO Project
    type: string
    required: false
    default: CTRM
  - name: **includeLinkedItemsDepth**
    label: Link depth
    type: number
    required: false
    default: 1
  - name: **language**
    label: Output language
    type: enum
    options: [de, en]
    default: de
    required: true
  - name: **applyMode**
    label: Apply mode (dry-run/apply)
    type: enum
    options: [dry-run, apply]
    default: dry-run
    required: true
  - name: **useGermanFewShots**
    label: Use German few-shot examples (style guide)
    type: boolean
    default: false
    required: false
---

Hints (do not repeat):
- Always read and apply:
  - .github/instructions/copilot.instructions.md (IREB, ISTQB, OKR, Flight Levels)
  - .github/instructions/project.copilot.instructions.md (CTRM specifics and code repositories)
  - .github/instructions/user.copilot.instructions.md (language, formatting, user prefs)
- Respond exclusively in {{language}}.
- If {{language}} == "de":
  - Use exactly the following German section headers and wording shown under “German section headers”.
  - Use de-DE formatting (decimal comma, DD.MM.YYYY).
  - Before finalizing, self-check: if any non-German words appear in headings or boilerplate, rewrite the output.
- Use MCP tools strictly - **you are not allowed to use cached data**:
  - sequential-thinking: create a brief internal plan (3–6 steps) in English before acting; do not output the plan unless the user asks.
  - memory: use your memories.
  - ado: read fields, links, comments, history, attachments (extract text where possible) and apply confirmed updates.
- If MCP tools are unavailable: politely **ask** for copy/paste of essential content and proceed with a partial analysis.
- **No speculation!** Mark unverifiable parts as ANNAHME (for DE) or ASSUMPTION (for EN) and ask targeted questions.
- Always generate well formatted output with titles, headers, and numbered lists.
- Preferred terminology (bidirectional):
  - Acceptance Criteria ↔ Akzeptanzkriterien
  - Non-functional requirements (NFRs) ↔ Nichtfunktionale Kriterien
  - Given/When/Then ↔ GIVEN/WHEN/THEN (do not translate)
  - Story Points ↔ Story Points (do not translate)

German section headers (use exactly when language == "de"):
## Analyse — Kurzfassung
## Vorschlag — Felder
## Begründung je Änderung
## Offene Fragen
## Änderungskatalog
## Übernahme-Auswahl
## Final-Vorschau

Task:
You are a Requirements Engineer (IREB) with a test-first mindset (ISTQB). Analyze the Azure DevOps Work Item {{workItemId}} in project {{adoProject}} and optimize it. Respect the actual work item type (from ADO), incl. Bug-specific ReproSteps and PBI/Feature Acceptance Criteria.

Procedure (tool-assisted):
0) Work Item Type Check
   - First, retrieve the System.WorkItemType field for Work Item {{workItemId}}.
   - If System.WorkItemType == "Bug": 
     * Stop execution of this prompt.
     * Switch to and execute the analyze_bug.prompt.md prompt instead.
     * Pass all current parameters (workItemId, adoProject, includeLinkedItemsDepth, applyMode) to the Bug analysis prompt.
   - If System.WorkItemType != "Bug": Continue with step 1) below.

1) Collection (ado)
   - Retrieve core and custom fields: System.WorkItemType, System.Title, System.Description, Microsoft.VSTS.Common.AcceptanceCriteria, Microsoft.VSTS.Common.Priority, Microsoft.VSTS.Scheduling.StoryPoints, System.AssignedTo, System.Tags, System.State; for Bugs also Microsoft.VSTS.TCM.ReproSteps; include further team-specific fields if present.
   - Retrieve links up to depth {{includeLinkedItemsDepth}} with types (Parent/Child/Related/PR/Commit).
   - Retrieve comments and history (field changes).
   - Retrieve attachment metadata and extract text where possible (TXT/MD/HTML/CSV/JSON; PDFs/DOCX only if supported).
   - If a Parent exists: retrieve parent core fields (Title, Type, Description, ACs/NFRs if present).
   - Normalize HTML fields (Description/ACs/ReproSteps) to Markdown.
   - If essentials are missing (Title, Description): list missing items and ask blocking questions; proceed with partial analysis only.

2) Analysis (IREB/ISTQB)
   - Assess: Clarity/Unambiguity, Completeness, Consistency (internal/external), Correctness, Testability/Verifiability, Traceability, Prioritization, Feasibility.
   - For ACs: GWT form, measurable oracles/thresholds, pre/postconditions; also negative/edge cases.
   - Cross-check with Parent and linked items (goals, scope, NFRs, conflicts).
   - Test Coverage Analysis: Retrieve all Test Cases linked via "Tested By" relationship. Verify that each Acceptance Criterion is covered by at least one Test Case. Identify coverage gaps and assess test quality (clear test steps, expected results matching AC criteria).

3) Proposal
   - Produce: Title, Description (Markdown), Acceptance Criteria (GIVEN/WHEN/THEN list), Non-functional Criteria (NFR table), Priority/Size (if sensible), Tags, optional Link recommendations (as text only; no auto-change).
   - Provide field-wise rationales referencing IREB/ISTQB criteria.
   - Create a numbered change catalog (1–n), each item uniquely referable.

4) Dry-run preview and apply
   - Show a preview table Field | Old | New.
   - Ask the user for selection.
   - Apply only if:
     - {{applyMode}} == "apply" AND the user explicitly confirms with CONFIRM_APPLY.
     - Then update only the selected fields via ado. On validation errors: abort and report cause and remedy.

Output format (Markdown, in this exact order; use German headers when language == "de"):
## Analyse — Kurzfassung
- Executive Summary
- Wichtigste Befunde (IREB/ISTQB)
- Testabdeckung (Coverage-Analyse der verlinkten Test Cases)
- Risiken & Unklarheiten
- Nummerierte Empfehlungen (1–n, je 1–2 Sätze)

## Vorschlag — Felder
- Vorgeschlagener Titel
- Vorgeschlagene Beschreibung
- Akzeptanzkriterien (GIVEN/WHEN/THEN Liste)
- Nichtfunktionale Kriterien
  | Attribut | Messgrösse | Schwelle | Verifikation |
  |---|---|---|---|
- Priorität/Grösse (Stichpunkte)
- Tags (Inline-Code, z. B. `security`, `backend`)
- Link-Hinweise (Empfehlungen: Aktion | Linktyp | Ziel-ID/Bezug | Grund)

## Begründung je Änderung
| Feld | IREB/ISTQB-Mapping | Begründung |
|---|---|---|

## Offene Fragen
- [Gezielte, blockierende Fragen; Annahmen referenzieren mit “ANNAHME: …”]

## Änderungskatalog
1. [Änderung 1]
2. [Änderung 2]
…

## Übernahme-Auswahl
Bitte wähle eine Option:
- ALLE
- KEINE
- komma separierter String, z.B. 1,3,4,11

## Final-Vorschau
- Tabelle: Feld | Alt | Neu
- Getroffene Auswahl: [ALLE/KEINE/CSV]
- Notiz: [kurze Zusammenfassung der Änderungen]