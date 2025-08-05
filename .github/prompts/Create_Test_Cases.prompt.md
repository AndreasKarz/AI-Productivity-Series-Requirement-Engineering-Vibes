---
mode: 'agent'
model: 'Claude Sonnet 4'
tools: ['codebase', 'testFailure', 'terminalSelection', 'terminalLastCommand', 'searchResults', 'editFiles', 'runNotebooks', 'search', 'runCommands', 'runTasks', 'Microsoft Docs', 'ado', 'sequential-thinking', 'azure_summarize_topic']
description: 'Erstellt manuelle Test Cases zu einem WorkItem in ADO und verknüpft diese korrekt.'
---
1. The project is CTRM
2. Ask for the <WorkItem ID>.
3. Ask for the <Area Path>.
4. Ask for the <Test Suite> (Complete URL).
5. Analyze the WorkItem with the ID <WorkItem ID> very detailed including the comments and history to understand its acceptance criteria. 
6. Generate me ONLY a list of possible manual test cases based on your analysis. DON'T create any test cases or modify the WorkItem.