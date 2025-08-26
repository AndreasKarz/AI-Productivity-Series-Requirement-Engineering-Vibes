# Agentic Requirement Engineering (ARE)

[Deutsch](README.md) | [English](README.en.md)

**Requirements Engineering & Testing neu gedacht.**  
Stell dir vor, Du sparst wertvolle Zeit und hebst gleichzeitig die Qualität Deiner Projekte auf ein neues Level. Genau das macht **Agentic Requirement Engineering möglich** – und das in einem Bruchteil der Zeit, die du jetzt dafür aufwendest.

Dieses Repository ist Dein Einstieg in eine fokussierte, effiziente und inspirierende Arbeitsweise. Hier findest Du alles, was Du brauchst: klare Anleitungen, erprobte Prompts und ein praktisches Setup, welches Dich direkt ins Tun bringen.  
**Be ready – und lass Dich von smarter Automatisierung und punktgenauer Präzision begeistern.**  

# Das nächste Level beginnt jetzt.

## Vorbereitungen
> **Downloade das [are_setup.ps1](https://github.com/AndreasKarz/AI-Productivity-Series-Requirement-Engineering-Vibes/blob/main/are_setup.ps1) Installationsscript** und starte es in PowerShell. Es wird Dir helfen, die notwendigen Vorbereitungen zu treffen und die Umgebung einzurichten. Nach der Installation findest du in deinem Benutzerverzeichnis den Ordner "ARE" und **Visual Studio Code Insiders öffnet** sich in diesem Ordner.<br/>
> Zusätzlich befindet sich auf dem Desktop eine Verknüpfung zu ARE, mit welcher du direkt in diesem Ordner zu arbeiten kannst.

**Danach sind noch folgende Schritte auszuführen:**
- **Installiere die Azure DevOps MCP Server Extension** in Visual Studio Code Insiders: [Anleitung](https://github.com/microsoft/azure-devops-mcp)
- Stelle sicher, dass Du im **[AI Engineer Perplexity Space](https://www.perplexity.ai/spaces/the-ai-engineer-UslyhxrNTriahp77tvqP2g)** Prompts generieren kannst.
- Öffne den **Copilot Chat** und melde dich an <small>(SL Account)</small>
- Öffne in Visual Studio Code Insiders die **Explorer Ansicht**.
- Öffne die Datei `.vscode/mcp.json` und **starte die beiden Server** `ado` und `sequential-thinking`. Es müssen beide auf `Running` stehen.

## Und los geht's
1. Öffne die Ansicht **Terminal** in Visual Studio Code
2. Führe den Befehl `az login --allow-no-subscriptions` im Terminal aus und **melde Dich mit Deinen ADO Credentials an**
3. **Öffne den GitHub Copilot Chat**, stelle den Mode auf `Agent` und wähle das Model `GPT-5` aus
4. Führe folgenden Prompt aus: `Liste mir via MCP alle zur Verfügung stehenden Projekte im ADO auf` (Am Anfang werden viele Berechtigungen abgefragt, die Du mit 'Always' beantworten kannst)

**Wenn Du die Liste bekommen hast, dann kannst Du nun mit prompten loslegen.**

# Arbeiten mit ARE
> Starte die ARE Umgebung mit dem bei der Installation erstellten Desktop Icon. 
> Öffne `Ansicht > Terminal` und führe im Terminal `./are_start.ps1` aus. **Damit aktualisierst du die Prompts, Instruktionen und Konfigurationen in diesem Repository** und meldest dich an.

## Liste der verfügbaren Prompts
Hier findest Du eine Übersicht der verfügbaren Prompts, die Dir helfen, effizient zu arbeiten:
- `/analyze_bug <WorkItemID>` => Analysiert einen Bug in ADO und führt Dich interaktiv durch die Verbesserung.
- `/analyze_workitem <WorkItemID>` => Analysiert einen WorkItem in ADO und gibt relevante Informationen zurück.
- `/create_test_cases <WorkItemID>` => Erstellt im Dialog manuelle Test Cases zu einem WorkItem in ADO und verknüpft diese korrekt.
- `/research_topic <Topic>` => Durchsucht alle WIKIs und Dokumentationen nach diesem Thema und erstellt eine Zusammenfassung.
- `/analyze_load_chain <PropertyName>` => Property in der ganzen Codebasis durchsuchen und die Ladestrecke komplett aufzeigen inkl. den involvierten WorkItems.
TODO
- Source code durchsuchen
- Zeitgewinn berechnen
- Aufteilung BE/FE im Sprint auswerten und Dashboard erstellen inkl. Ratschlägen
- Übersetzungen anzeigen
- Mailtemplate inkl. Konfiguration anzeigen
- Logs analysieren (mit Frage, welche Datei in .assets untersucht werden soll)
- ...

# ARE Aufbau
Mach Dich mit der Verzeichnisstruktur vertraut. Hier findest Du alle wichtigen Dateien und Ordner, die Dir helfen, effizient zu arbeiten. **Für eigenen Dateien, Assets und Instruktionen das Icon 🤐 beachten!** Diese werden NICHT versioniert und somit auch nicht gelöscht bei einer Aktualisierung des Repository.

- 🤐 `.assets/`: Hier kannst Du Deine persönlichen Assets für Demos/Schulungen speichern. Es wird nur die README versioniert.
- 🔄️ `.vscode/`: Enthält die Konfigurationsdateien für Visual Studio Code.
- 🔄️ `.github/instructions/`: Beinhaltet die Copilot Instruktionen. 
  - 🤐 für projektspezifische Instruktionen in diesem Ordner eine neue Datei `project.copilot.instructions.md` erstellen.
  - 🤐 für eigene Instruktionen in diesem Ordner eine neue Datei `user.copilot.instructions.md` erstellen.
- 🔄️ `.github/prompts/`: Enthält die vorgefertigten Prompts für die Nutzung mit GitHub Copilot.
- 🤐 `.github/userprompts/`: Hier kannst Du Deine eigenen Prompts speichern. Es wird nur das Template versioniert.
- 🤐 `.specstory/`: Einstellungen und History von SpecStory.
- 🔄️ `Root Verzeichnis`: Wird versioniert.

## Hierarchie der Instruktionen und Prompts
Dies ist die Reihenfolge, in der die Anweisungen und Prompts verarbeitet werden. Achte darauf, dass die spezifischen Anweisungen Vorrang vor den allgemeinen haben. Achte auf widersprüchliche Anweisungen in deinen Benutzer- und Projektspezifischen Anweisungen. Sollten sich diese nicht vermeiden lassen, weise GitHub Copilot an, die spezifischen Anweisungen zu befolgen und die vorherigen, widersprüchlichen Anweisungen explizit zu ignorieren.
- `.github/instructions/copilot.instructions.md`: Allgemeine Anweisungen für GitHub Copilot.
- `.github/instructions/project.copilot.instructions.md`: Projektspezifische Anweisungen für GitHub Copilot.
- `.github/instructions/user.copilot.instructions.md`: Benutzerdefinierte Anweisungen für GitHub Copilot.
- `.github/prompts/`: Enthält die vorgefertigten Prompts für die Nutzung mit GitHub Copilot.

## TODO
- Beispiele erstellen und als User Prompts abspeichern


## Weitere Ressourcen
- [Dokumentation Prompt Files](https://code.visualstudio.com/docs/copilot/copilot-customization#_prompt-files-experimental)
- [AI Engineer Perplexity Space](https://www.perplexity.ai/spaces/the-ai-engineer-UslyhxrNTriahp77tvqP2g)
- [Spickzettel zu GitHub Copilot Chat](https://docs.github.com/de/copilot/reference/cheat-sheet)