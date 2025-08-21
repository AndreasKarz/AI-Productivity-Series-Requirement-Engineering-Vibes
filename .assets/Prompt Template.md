---
mode: 'agent'
model: 'GPT-5 (Preview)'
tools: ['codebase', 'testFailure', 'terminalSelection', 'terminalLastCommand', 'searchResults', 'editFiles', 'runNotebooks', 'search', 'runCommands', 'runTasks', 'Microsoft Docs', 'ado', 'sequential-thinking', 'azure_summarize_topic']
description: your description
---
parameters:
  - name: workItemId
    label: Work Item ID
    type: number
    required: true
---
# Rules (do not repeat):
- Use the **ADO MCP** server and the project `CTRM` for the job.
- ...
- Tag **every created case** with `Ai Gen`

# Workflow (Sequential Thinking enforced)
- **Step 1**: **Your** description
  1. **Lorem ipsum** dolor sit amet.
  2. **And more**.
  3. **Then** this.

