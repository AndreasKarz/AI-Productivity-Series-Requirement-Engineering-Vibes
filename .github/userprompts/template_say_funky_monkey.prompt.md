---
mode: 'agent'
model: 'GPT-5 (Preview)'
tools: ['codebase', 'testFailure', 'terminalSelection', 'terminalLastCommand', 'searchResults', 'editFiles', 'search', 'runCommands', 'runTasks', 'Microsoft Docs', 'ado', 'sequential-thinking', 'azure_summarize_topic']
description: your description
---
parameters:
  - name: gender
    label: Which gender?
    type: string
    required: true
---
# Rules (do not repeat):
- Learn how to **realistic monkeys** with **ASCII characters**.
- ...

# Workflow (Sequential Thinking enforced)
- **Step 1**: **Think about** how a male monkey differs from a female monkey.
  1. The **female** monkey wears a **skirt**.
  2. The **male** monkey wears **shorts**.

- **Step 2**: Draw the monkey
  1. **Respect the gender** differences in clothing
  2. Add facial features: eyes, nose, mouth
  3. Complete the body with arms and legs
  4. Show me a **dancing monkey**!
