---
mode: 'agent'
model: 'Claude Sonnet 4'
tools: ['codebase', 'testFailure', 'terminalSelection', 'terminalLastCommand', 'searchResults', 'editFiles', 'runNotebooks', 'search', 'runCommands', 'runTasks', 'Microsoft Docs', 'ado', 'sequential-thinking', 'azure_summarize_topic']
description: 'Erstellt manuelle Test Cases zu einem WorkItem in ADO und verknüpft diese korrekt.'
---
1. The project is CTRM
2. Ask for the <WorkItem ID>.
3. The <Area Path> will be the same as the Area Path of the WorkItem.
4. Ask for the <Test Suite> (Complete URL).
5. Analyze the WorkItem with the ID <WorkItem ID> very detailed including the comments and history to understand its acceptance criteria. 
6. Generate me a numbered list of possible manual test cases based on your analysis. DON'T create any test cases or modify the WorkItem.
7. Ask for confirmation to create the test cases. Accept "All", "Stop" or a string with the comma separated numbers of the test cases to create.
8. When the answer is "All", create all test cases. If the answer is "Stop", abort the process. If the answer is a string with numbers, create only the specified test cases.
9. When created the test cases, link them inside the WorkItem via "Tested By" NOT VIA "TESTS"
10. Set the Area Path of the test cases to the same as the WorkItem.
11. Finally, create a new Requirement Based Test Suite in the specified <Test Suite> for the <WorkItem ID> and link the WorkItem to it.