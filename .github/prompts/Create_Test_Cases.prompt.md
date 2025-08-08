---
mode: 'agent'
model: 'Claude Sonnet 4'
tools: ['codebase', 'testFailure', 'terminalSelection', 'terminalLastCommand', 'searchResults', 'editFiles', 'runNotebooks', 'search', 'runCommands', 'runTasks', 'Microsoft Docs', 'ado', 'sequential-thinking', 'azure_summarize_topic']
description: 'Create deterministic, redundancy-free manual test cases in German for an ADO Work Item in CTRM, using variable inputs, language-aware questions, confirmation, and suite linking.'
---

# Goal
Create manual test cases for an Azure DevOps (ADO) Work Item in project “CTRM” with a deterministic, repeatable structure. All test case content (titles, purposes, steps, expected results, data/variants) must be strictly in German. Avoid redundancies across test cases and steps. Do not use universal quantifiers in acceptance criteria or expected results. Respect the IREB and ISTQB rules. Follow the workflow exactly.

# Inputs
- Work Item ID: ${input:workItemId:Enter the ADO Work Item ID}
- Test Suite URL (optional, can be asked later): ${input:testSuiteUrl:Paste the complete Test Suite URL (optional)}
- Locale (optional, controls question language): ${input:locale:Enter UI language code (e.g., en, de). Leave empty to auto-default}

Language Policy
- Prompt and internal guidance: English.
- Test case content (Titel, Zweck/Nutzen, Vorbedingungen, Testschritte, Erwartete Ergebnisse, Daten/Varianten): German only.
- Questions/confirmations:
  - If ${locale} = de → ask in German.
  - Else → ask in English.
  - If ${locale} empty → ask in English and include a short German mirror sentence in parentheses.

Determinism and Structure
- Use a fixed template, stable field order, and consistent phrasing.
- Steps: short, imperative, present tense (German).
- Each expected result maps 1:1 to a step.
- Put shared setup into “Vorbedingungen”, not steps.

No Redundancy
- No duplicate checks across test cases or steps.
- Each assertion appears exactly once.
- Merge overlapping content; separate scenarios by clear purpose or data.

Acceptance Criteria Constraint
- Do not use universal quantifiers in German content (e.g., “immer”, “alle”, “jeder”, “ausnahmslos”).

Safety
- Do not create or modify ADO items before explicit confirmation (Step 5).

Workflow
1) Acquire Work Item ID:
   - Use ${workItemId}. If empty, ask:
     - de: “Bitte gib die  an.”
     - en: “Please provide the .”
2) Context setup:
   - Project is “CTRM”.
   - Set  = Work Item’s Area Path.
3) Analyze the Work Item (use ado tools if available):
   - Inspect title, description, acceptance criteria, comments, and history.
   - Derive additional, plausible acceptance checks from discussion/history without universal quantifiers.
   - Identify distinct, non-overlapping testing goals.
4) Propose candidate manual test cases (German only):
   - Output a numbered list. Do NOT create or modify anything yet.
   - Use this exact template and field order for each test case:

     Titel: TC-${workItemId}-: 
     Zweck/Nutzen:
     
     Vorbedingungen:
     - 
     - 
     Testschritte:
     1) 
     2) 
     Erwartete Ergebnisse:
     1) 
     2) 
     Daten/Varianten:
     - 

   - Style constraints (German content):
     - Steps = actions only; verifications in expected results.
     - Avoid vague terms (“etc.”, “in der Regel”).
     - No repeated setup in steps.
5) Confirmation to create:
   - If ${locale} = de:
     “Bitte bestätigen: ‘All’, ‘Stop’ oder eine kommagetrennte Liste der Nummern (z. B. ‘1,3,4’).”
   - Else (default English, with German mirror if locale empty):
     “Confirm creation: reply ‘All’, ‘Stop’, or the comma-separated numbers of the test cases to create (e.g., ‘1,3,4’).”
     (Deutsch: “Bitte bestätigen: ‘All’, ‘Stop’ oder eine kommagetrennte Liste der Nummern, z. B. ‘1,3,4’.)
6) On confirmation:
   - “All”: create all proposed test cases.
   - Numbers: create only those specified.
   - “Stop”: abort and do nothing.
7) Creation, linking, metadata (no further confirmation):
   - Create test cases in project “CTRM”.
   - Set Area Path = Work Item’s Area Path.
   - Link each test case to the Work Item via “Tested By” (not via “TESTS”).
8) Requirement Based Test Suite:
   - If ${testSuiteUrl} provided, use it; otherwise ask:
     - de: “Bitte gib die vollständige URL der  an.”
     - en: “Please provide the complete URL of the .”
   - Create a new Requirement Based Test Suite in the specified  for the ${workItemId} and link the Work Item to it.

Strict Redundancy Policy
- Before output, scan steps and test cases for overlap; merge or refactor to remove duplication.
- Common setup goes into “Vorbedingungen”.
- Separate similar scenarios by purpose or distinct data; do not repeat identical texts.

Language Sanity Checks (German content)
- Avoid universal quantifiers and vague language.
- Prefer concrete, verifiable statements with clear scope (e.g., input formats, boundary values).

Questions for missing details
- If environment, roles, data constraints, or naming conventions are unclear, ask in the user’s language per ${locale} rule before Step 4.

Example Style (German, schematic)
- Testschritte:
  1) Öffne die Ansicht “Backlog”.
  2) Wähle das Work Item mit der ID ${workItemId} aus.
- Erwartete Ergebnisse:
  1) Die Ansicht “Backlog” lädt ohne Fehlermeldung.
  2) Das Work Item wird mit Titel und aktuellem Status angezeigt.
