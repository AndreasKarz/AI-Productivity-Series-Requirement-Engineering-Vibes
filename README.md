# **CoTREx** Agentic Requirements Engineering (**ARE**)

[Deutsch](README.md) | [English](README.en.md)

---

**Requirements Engineering & Testing neu gedacht.**  
Stell dir vor, Du sparst wertvolle Zeit und hebst gleichzeitig die Qualität Deiner Projekte auf ein neues Level. Genau das macht **Agentic Requirement Engineering möglich** – und das in einem Bruchteil der Zeit, die du jetzt dafür aufwendest.

**Be ready – und lass Dich von smarter Automatisierung und punktgenauer Präzision begeistern.**


## Liste der verfügbaren Prompts:

> 👉🏻 Wenn Du im Copilot im `**Agent**` Mode bist, kannst Du die folgenden Prompts einfach aufrufen, in dem Du die Anweisung mit `**/**` beginnst und dann den Namen des Prompts zu schreiben beginnst .

### **/business_conclusion** `**WorkItem ID**`

Analysiert das Work Item und alles, was daran hängt und erstellt daraus ein **Management Summary**.

`_/business_conclusion 783464_`

### **/analyze_workitem** `**WorkItem ID**`

Analysiert ein WorkItem in **Azure DevOps (ADO)** nach IREB®, ISTQB®, CTRM, OKR und FlightLevels. Gibt danach eine **Zusammenfassung** der Analyse mit **Vorschlägen** aus. Diese können **im Dialog noch angepasst** werden und werden danach vom Copilot **auf Wunsch direkt ins WorkItem** übernommen.

### **/create_test_cases** `**WorkItem ID**`

**Prüft** zuerst das WorkItem inkl. den Kommentaren sowie allenfalls schon verlinkten Test Cases und validiert die Akzeptanzkriterien auf Vollständigkeit. Macht danach Vorschläge nach ISTQB® für weitere Test Cases. Diese können **im Dialog bearbeitet** werden und danach **erstellt Copilot diese auf Wunsch** und **verlinkt** diese auch korrekt mit dem WorkItem.

### **/create_feature** `**File**` **oder** `**Beschreibung**`

**Analysiert** die Datei (Markdown, Text, ASCIIDOC oder PDF) oder die Beschreibung, **prüft** dann die Anforderungen nach IREB® und **geht dann in einen Dialog**. Sind alle Fragen beantwortet und der Vorschlag im Dialog überarbeitet, **erstellt der Copilot daraus das Feature**.  

### **/gf_info** `**Name des Geschäftsfalles**`

Sucht **alle Informationen zu einem Geschäftsfall** und erstellt dann eine Zusammenfassung daraus.

### **/research_topic** `**Topic**`

Du **suchst** nach einem bestimmten **Thema**, Du weisst, es ist irgendwo in den Tiefen eines **ADO WIKIs** (_Sharepoint wird aktuell noch nicht unterstützt_), aber Du findest es nicht? **ARE wird es für Dich finden!**

### **/analyze_bug** `**WorkItem ID**`

Analysiert das Bug WorkItem und sucht dann ähnliche Bugs, vermutlich relevante PBIs, prüft Pull Requests, **analysiert** den Code und **erstellt** Dir dann eine **Übersicht**.

### **/analyze_load_chain** `**Property Name**`

Du hast ein Property, **bei dem Du nicht weisst, woher es kommt und wohin es geht**? Dann versuche mal diesen Prompt und lass ihn nach der kompletten Strecke suchen. Er sucht das Property in allen Repositories die er findet und analysiert dann die gesamt Ladekette. Dabei referenziert er auf den Code und berücksichtigt auch WorkItems.

### **/analyze_logs** `**LogFile**`

**Kopiere Dein LogFile** in den Ordner `.assets` und gib es dann diesem Prompt mit. Er **analysiert das Log**, untersucht den Source Code und die Pull Requests und gibt dann eine **zusammengefasste Analyse** aus.

### **/create_ui_test** `**TestCase ID**`

Führt den manuellen Test Case aus und erstellt auf Wunsch eine entsprechende **Playwright Testdatei**. (Funktioniert nur mit WEB UIs). 

Anstatt die `TestCase ID` kann auch **ein Test beschrieben werden**, z.B. _/create_ui_test https://www.stadt-zuerich.ch/de/lebenslagen/neu-in-zuerich/other-languages.html - klicke auf jede Sprache und prüfe dann auf der Folgeseite ob alle Übersetzungen korrekt und fehlerfrei sind_

### **/forensic_analyze_pdf** `**PDF Datei**`

Lade das gewünschte PDF in den Ordner `.assets` und gib diese dann dem Prompt mit. Er kann das PDF generell aber auch einzelne Unterschriften im Dokument **forensisch untersuchen**. 

# ARE Aufbau

Mach Dich mit der Verzeichnisstruktur vertraut. Hier findest Du alle wichtigen Dateien und Ordner, die Dir helfen, effizient zu arbeiten. **Für eigenen Dateien, Assets und Instruktionen das Icon 🤐 beachten!** Diese werden NICHT versioniert und somit auch nicht gelöscht bei einer Aktualisierung des Repository.

*   🤐 `.assets/`: Hier kannst Du Deine persönlichen Assets für Demos/Schulungen speichern. Es wird nur die README versioniert.
*   🔄️ `.vscode/`: Enthält die Konfigurationsdateien für Visual Studio Code.
*   🔄️ `.github/instructions/`: Beinhaltet die Copilot Instruktionen.
    *   🤐 für projektspezifische Instruktionen in diesem Ordner eine neue Datei `project.copilot.instructions.md` erstellen.
    *   🤐 für eigene Instruktionen in diesem Ordner eine neue Datei `user.copilot.instructions.md` erstellen.
*   🔄️ `.github/prompts/`: Enthält die vorgefertigten Prompts für die Nutzung mit GitHub Copilot.
*   🤐 `.github/userprompts/`: Hier kannst Du Deine eigenen Prompts speichern. Es wird nur das Template versioniert.
*   🔄️ `Root Verzeichnis`: Wird versioniert.

## Hierarchie der Instruktionen und Prompts

Dies ist die Reihenfolge, in der die Anweisungen und Prompts verarbeitet werden. Achte darauf, dass die spezifischen Anweisungen Vorrang vor den allgemeinen haben. Achte auf widersprüchliche Anweisungen in deinen Benutzer- und Projektspezifischen Anweisungen. Sollten sich diese nicht vermeiden lassen, weise GitHub Copilot an, die spezifischen Anweisungen zu befolgen und die vorherigen, widersprüchlichen Anweisungen explizit zu ignorieren.

*   `.github/instructions/copilot.instructions.md`: Allgemeine Anweisungen für GitHub Copilot.
*   `.github/instructions/project.copilot.instructions.md`: Projektspezifische Anweisungen für GitHub Copilot.
*   `.github/instructions/user.copilot.instructions.md`: Benutzerdefinierte Anweisungen für GitHub Copilot.
*   `.github/prompts/`: Enthält die vorgefertigten Prompts für die Nutzung mit GitHub Copilot.

# Installierte [MCP](https://github.blog/ai-and-ml/llms/what-the-heck-is-mcp-and-why-is-everyone-talking-about-it) Server

## Sequential-Thinking

Eine MCP-Server-Implementierung, die ein Tool für dynamische und reflektierende Problemlösung durch einen strukturierten Denkprozess bereitstellt. Zerlegt komplexe Anweisungen und einzelne Steps für zuverlässigere Antworten.

### Ressourcen

[https://github.com/modelcontextprotocol/servers/tree/main/src/sequentialthinking](https://github.com/modelcontextprotocol/servers/tree/main/src/sequentialthinking) 

## ADO

Erlaubt den Zugriff auf Azure DevOps zur Analyse von WorkItems, WIKIs, Dokumentationen und Source Code. Kann auch WorktItems und TestCases erstellen.

### Ressourcen

[https://www.youtube.com/watch?v=QAwTYXNLW4w](https://www.youtube.com/watch?v=QAwTYXNLW4w) 

## MongoDB

Zugriff auf MongoDB Instanzen als Sourcen für den Copilot. Connectionstring muss als Umgebungsvariable `MDB_MCP_CONNECTION_STRING` gesetzt sein. 

### Ressourcen

[https://dev.to/edudeveloper/set-up-a-mongodb-mcp-server-in-vs-code-like-a-pro-pb7](https://dev.to/edudeveloper/set-up-a-mongodb-mcp-server-in-vs-code-like-a-pro-pb7)   
[https://www.npmjs.com/package/mongodb-mcp-server](https://www.npmjs.com/package/mongodb-mcp-server)   
[https://github.com/mongodb-js/mongodb-mcp-server](https://github.com/mongodb-js/mongodb-mcp-server) 

## Playwright

Der Playwright MCP ist ein leistungsstarker MCP-Server, der einem KI-Agenten die Kontrolle über einen Webbrowser ermöglicht. Er basiert auf Playwright, derselben Technologie, die auch unser zuverlässiges Test- und Automatisierungsframework unterstützt.

### Ressourcen

https://devblogs.microsoft.com/blog/the-complete-playwright-end-to-end-story-tools-ai-and-real-world-workflows 

[https://playwright.dev/agents](https://playwright.dev/agents) 

## microsoft-docs

Der Microsoft Learn MCP Server ist ein Model Context Protocol-Server, der vertrauenswürdige und aktuelle Learn-Inhalte als Kontext zu Sprachmodellen hinzufügt.

### Ressourcen

[https://learn.microsoft.com/en-us/training/support/mcp](https://learn.microsoft.com/en-us/training/support/mcp) 

## memory

Eine grundlegende Implementierung von persistenter Speicherung unter Verwendung eines lokalen Wissensgraphen. Dadurch kann ARE Informationen über den Benutzer über mehrere Chats hinweg speichern.

### Ressourcen

[https://github.com/modelcontextprotocol/servers/tree/main/src/memory](https://github.com/modelcontextprotocol/servers/tree/main/src/memory) 

## PDF2Img

Selbstentwickelter MCP Server, damit GitHub Copilot mit PDF umgehen kann. Macht einen Umweg über Images, auf welche dann vom Copilot mit OCR eingelesen werden kann.

## AsciiDoc

Selbstentwickelter MCP Server, welcher aus PDFs neue AsciiDocs erstellen kann, inkl. Grafiken und Bilder.

## Elastic Search MCP

Comming soon...

### Ressourcen

[https://www.elastic.co/search-labs/blog/model-context-protocol-elasticsearch](https://www.elastic.co/search-labs/blog/model-context-protocol-elasticsearch) 

## GitHub MCP

Comming soon...
https://github.com/kuzudb/kuzu-mcp-server 

### Ressourcen

https://github.com/pnp/cli-microsoft365-mcp-server  
https://github.com/pnp/cli-microsoft365-mcp-server?tab=readme-ov-file 

[https://github.com/github/github-mcp-server](https://github.com/github/github-mcp-server) 

# Weitere Ressourcen
- [Awesome Copilot](https://github.com/github/awesome-copilot)
- [Dokumentation Prompt Files](https://code.visualstudio.com/docs/copilot/copilot-customization#_prompt-files-experimental)
- [AI Engineer Perplexity Space](https://www.perplexity.ai/spaces/the-ai-engineer-UslyhxrNTriahp77tvqP2g)
- [Spickzettel zu GitHub Copilot Chat](https://docs.github.com/de/copilot/reference/cheat-sheet)