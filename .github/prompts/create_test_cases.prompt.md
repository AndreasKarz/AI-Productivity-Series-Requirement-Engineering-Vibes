---
mode: 'agent'
model: 'GPT-5 (Preview)'
tools: ['codebase', 'testFailure', 'terminalSelection', 'terminalLastCommand', 'searchResults', 'editFiles', 'runNotebooks', 'search', 'runCommands', 'runTasks', 'Microsoft Docs', 'ado', 'sequential-thinking', 'azure_summarize_topic']
description: Design and create deterministic, redundancy-free manual test cases for an Azure DevOps Work Item using MCP tools (ado, sequential-thinking), with German output, a dry-run preview, and explicit confirmation before creation.
---
parameters:
  - name: workItemId
    label: Work Item ID
    type: number
    required: true
  - name: adoProject
    label: ADO Project
    type: string
    required: false
    default: CTRM
  - name: testSuiteUrl
    label: Requirement-Based Test Suite URL (optional)
    type: string
    required: false
  - name: language
    label: Output language
    type: enum
    options: [de, en]
    default: de
    required: true
  - name: applyMode
    label: Apply mode (dry-run/apply)
    type: enum
    options: [dry-run, apply]
    default: dry-run
    required: true
  - name: useGermanFewShots
    label: Use German few-shot examples (style guide)
    type: boolean
    default: false
    required: false
---

Hints (do not repeat):
- Respond exclusively in {{language}}.
- If {{language}} == "de":
  - Use exactly the following German section headers and wording shown under “German section headers”.
  - Use de-DE formatting (decimal comma, DD.MM.YYYY).
  - Before finalizing, self-check: if any non-German words appear in headings or boilerplate, rewrite the output.
- Use MCP tools if available:
  - ado: read work item fields, links (incl. "Tested By"), comments, history, attachments (extract text where possible); create/link test cases and suites only after explicit confirmation.
  - sequential-thinking: create a brief internal plan (3–6 steps) in English before acting; do not output the plan unless the user asks.
- If MCP tools are unavailable: ask for copy/paste of the essential Work Item content and proceed with a partial proposal.
- No speculation. Mark unverifiable parts as ANNAHME (for DE) or ASSUMPTION (for EN) and ask targeted questions.
- JSON only inside ```json code fences. Otherwise use Markdown.
- Test design rules (ISTQB):
  - 1:1 mapping between each step and one expected result.
  - Separate Vorbedingungen (setup) from Testschritte (actions).
  - Cover happy path, negative cases, and edge cases (distinct objectives; avoid redundancy).
  - Use explicit numbering 1..n for proposal items; do not rely on auto-numbering with repeated "1.".
- Preferred terminology: GIVEN/WHEN/THEN stays English; tag created cases with 'Ai Gen'; link via "Tested By" to the source Work Item.

German section headers (use exactly when language == "de"):
## Analyse — Kurzfassung
## Vorschlag — Felder
## Begründung je Änderung
## Offene Fragen
## Änderungskatalog
## Übernahme-Auswahl
## Final-Vorschau

Confirm to apply (only if applyMode=apply):
- Confirm exactly with: CONFIRM_APPLY
- Then:
  - Erzeuge nur die ausgewählten Testfälle, verknüpfe via "Tested By", tagge mit 'Ai Gen'.
  - Report:
    - Erstellte Testfälle (Liste: ID, Titel)
    - Links/Suite-Hinweise
    - Note (1–2 Sätze)

Few-shot examples (only as a style guide when useGermanFewShots == true; do not copy content verbatim):
Example — Vorschlagsübersicht (DE):
1. Positivfall: Erfolgreiches Anlegen
2. Negativfall: Validierungsfehler bei Pflichtfeldern
3. Edge Case: Maximale Feldlänge

Example — Testfall (DE):
## 2. Titel: TC-${workItemId}-02: Validierungsfehler bei Pflichtfeldern
Zweck/Nutzen:
- Validierungen greifbar und nutzerverständlich

Vorbedingungen:
- Rolle „Editor“, Umgebung Staging, leerer Browser-Cache

Testschritte:
1) Navigiere zur Seite „Neues Objekt“
2) Lasse das Pflichtfeld „Name“ leer und klicke Speichern

Erwartete Ergebnisse:
1) Seite lädt, Formular sichtbar
2) Fehlermeldung „Name ist ein Pflichtfeld“, kein Datensatz angelegt

Daten/Varianten:
- Name = ""