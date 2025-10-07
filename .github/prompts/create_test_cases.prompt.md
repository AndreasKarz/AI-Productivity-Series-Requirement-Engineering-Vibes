---
mode: 'agent'
model: 'Claude Sonnet 4.5 (Preview)'
tools: ['search_code', 'search_wiki', 'search_workitem', 'codebase', 'testFailure', 'terminalSelection', 'terminalLastCommand', 'searchResults', 'editFiles', 'search', 'runCommands', 'runTasks', 'Microsoft Docs', 'ado', 'sequential-thinking', 'azure_summarize_topic']
description: Design and create deterministic, redundancy-free manual test cases for an Azure DevOps Work Item using MCP tools (ado, sequential-thinking), a dry-run preview, and explicit confirmation before creation.
---
parameters:
  - name: workItemId
    label: Work Item ID
    type: number
    required: true
---
# Rules (do not repeat):
- Use the **ADO MCP** server and the project `CTRM` for the job.
- In the Work Item, the **test cases are strictly linked** via "Tested By" (Work Item == Tested By ==> Test Case)
- If the **Work Item Type** is `Bug` or `Product Backlog Item`, the tests should be written in short simple IT English. Otherwise, use Swiss German (no Eszett `ß`) language.
- If the **user add** something like `auf deutsch`, **adapt the output accordingly**.
- **No speculation and/or assumptions**. Mark unverifiable parts as ANNAHME (for DE) or ASSUMPTION (for EN) and ask targeted questions.
- **Respect the ISTQB guidelines**, especially:
  - 1:1 mapping between each step and one expected result.
  - Cover happy path, negative cases, and edge cases (distinct objectives; avoid redundancy).
  - Use explicit numbering 1..n for proposal items; do not rely on auto-numbering with repeated "1.".
- Ensure the **`Expected result`** in the test steps is **detailed**, including all relevant checkpoints and the **exact definition** from the associated Work Item. 
- **"Verify step completes successfully" is not acceptable!** Describe ALL Expected results in detail.
- Tag **every created case** with `Ai Gen`

# Workflow (Sequential Thinking enforced)
- **Step 1**: **Analyze** the acceptance criteria for completeness
  1. **Ensure all functional** and non-functional requirements are covered.
  2. **Check for any ambiguities or inconsistencies in the requirements**.
  3. **Validate that the acceptance criteria are testable and measurable**.

- **Step 2**: **Design** test cases
  1. **Inspect possible existing test cases** (linked via `Tested By`) for reuse.
  2. Design **at least 1 and at most 3 test cases for each acceptance criterion** (do not create anything in ado yet!).
  3. Ensure each test case has a **clear objective** and covers different scenarios (happy path, negative cases, edge cases).
  4. Document the test cases in a **structured format**, including preconditions, test steps, and expected results.
  5. Review and refine the test cases to **eliminate any redundancy and ensure clarity**.
  6. **Show an numbered list of your test cases in the chat in the following format**:
    ```
    ## Test Case 1: [Title]
    - **Preconditions**: [List of preconditions]
    - **Test Steps**:
      1. [Step 1]
         - **Expected Result**: [Detailed expected result]
      2. [Step 2]
         - **Expected Result**: [Detailed expected result]
      ...
    ```
  7. **Open a dialog with me** and let us rework every test case together.

- **Step 3**: **Implement** the test in Azure DevOps.
  1. **Ask**, which test cases designed in Step 2 should be created?
     - All
     - None
     - [Specific test case(s)] (e.g. `1,2,6`)
  2. **Renumbering the test cases as needed** (e.g. `1,2,6` => `1,2,3`).
  2. **Create these test cases** via the ADO MCP server.
  3. **Ensure traceability by** linking test cases back to their corresponding acceptance criteria (Test Case == Tests ==> Work Item).
  4. **Show me an overview** that summarizes all created test cases and their links to the acceptance criteria.
