# Agentic Requirement Engineering

[Deutsch](README.md) | [English](README.en.md)

**Requirements Engineering & Testing neu gedacht.**  
Stell dir vor, Du sparst wertvolle Zeit und hebst gleichzeitig die Qualität Deiner Projekte auf ein neues Level. Genau das macht **Agentic Requirement Engineering möglich** – und das in einem Bruchteil der Zeit, die du jetzt dafür aufwendest.

Dieses Repository ist Dein Einstieg in eine fokussierte, effiziente und inspirierende Arbeitsweise. Hier findest Du alles, was Du brauchst: klare Anleitungen, erprobte Prompts und ein praktisches Setup, welches Dich direkt ins Tun bringen.  
**Be ready – und lass Dich von smarter Automatisierung und punktgenauer Präzision begeistern.**  

# Das nächste Level beginnt jetzt.

## Vorbereitungen
- Klone dieses Repository in ein Verzeichnis Deiner Wahl (**Es ist wichtig zu klonen**, damit Du die Updates erhälst!) 
- [Visual Studio Code](https://code.visualstudio.com/) oder besser [Visual Studio Code Insiders](https://code.visualstudio.com/insiders/) muss installiert sein. <small>(AP047391)</small>
- [Azure CLI](https://learn.microsoft.com/en-us/cli/azure/install-azure-cli-windows) muss installiert sein. <small>(AP046904)</small>
- Du brauchst einen GitHub Account, am besten einen GitHub Enterprise Account. <small>(AP045370)</small>
- Prüfe das Du den GitHub Copilot nutzen kannst. Optimal wäre GitHub Copilot for Business. <small>(AP047763)</small>
- Installiere die [SpecStory Extension](https://marketplace.visualstudio.com/items?itemName=SpecStory.specstory-vscode) in Visual Studio Code (Insiders).
- **Installiere die Azure DevOps MCP Server Extension** in Visual Studio Code Insiders: [Anleitung](https://github.com/microsoft/azure-devops-mcp)
- Stelle sicher, dass Du im [AI Engineer Perplexity Space](https://www.perplexity.ai/spaces/the-ai-engineer-UslyhxrNTriahp77tvqP2g) Prompts generieren kannst.
 
**Prüfe die Vorbereitungen:**
 - Führe in PowerShell den Befehl `az --version` aus. Du solltest eine Ausgabe mit der Version der Azure CLI sehen.
 - Melde Dich mit `az login --allow-no-subscriptions` in der Azure CLI an. 
 - Wechsle in PowerShell in Dein Verzeichnis und führe den Befehl `git clone --force` aus.
 - Führe dann den Befehl `code .` aus, um Visual Studio Code zu öffnen.
 - Prüfe die Installation der Extensions *SpecStory* und *GitHub* Copilot.

## Einstellungen und Konfiguration
Wenn Du bist hier gekommen bist, dann hast Du die Vorbereitungen erfolgreich abgeschlossen. Jetzt kannst Du mit der Konfiguration beginnen:

### SpecStory
1. Öffne Visual Studio Code (Insiders)
2. Klicke auf das Extensions-Symbol in der linken Seitenleiste
3. Klicke auf das Zahnrad-Symbol oben in der Extensions-Ansicht
4. **Aktiviere Auto-save**

### GitHub Copilot
1. Copilot Chat starten und anmelden <small>(SL Account)</small>

### ADO MCP Server
1. Öffne in Visual Studio Code Insiders die **Explorer Ansicht**.
2. Öffne die Datei `.vscode/mcp.json` und **starte die beiden Server** `ado` und `sequential-thinking`. Es müssen danach beide auf `Running` stehen

## Und los geht's
1. Öffne die Ansicht **Terminal** in Visual Studio Code
2. Führe den Befehl `az login` im Terminal aus und **melde Dich mit Deinen ADO Credentials an**
3. **Öffne den GitHub Copilot Chat**, stelle den Mode auf `Agent` und wähle das Model `Claude Sonet 4` aus
4. Führe folgenden Prompt aus: `Liste mir via MCP alle zur Verfügung stehenden Projekte im ADO auf` (Am Anfang werden viele Berechtigungen abgefragt, die Du mit 'Always' beantworten kannst)

**Wenn Du die Liste bekommen hast, dann kannst Du nun mit prompten loslegen.**

# Instructions
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

## Hierarchie der Instrauktionen und Prompts
Dies ist die Reihenfolge, in der die Anweisungen und Prompts verarbeitet werden. Achte darauf, dass die spezifischen Anweisungen Vorrang vor den allgemeinen haben. Achte auf widersprüchliche Anweisungen in deinen Benutzer- und Projektspezifischen Anweisungen. Sollten sich diese nicht vermeiden lassen, weise GitHub Copilot an, die spezifischen Anweisungen zu befolgen und die vorherigen, widersprüchlichen Anweisungen explizit zu ignorieren.
- `.github/instructions/copilot.instructions.md`: Allgemeine Anweisungen für GitHub Copilot.
- `.github/instructions/project.copilot.instructions.md`: Projektspezifische Anweisungen für GitHub Copilot.
- `.github/instructions/user.copilot.instructions.md`: Benutzerdefinierte Anweisungen für GitHub Copilot.
- `.github/prompts/`: Enthält die vorgefertigten Prompts für die Nutzung mit GitHub Copilot.

## Prompts
Es gibt 2 Arten von Prompts in diesem Verzeichnis: prompts und userprompts. Beide sind im Copilot Chat verfügbar. Der grosse Unterschied ist, dass prompts als Auswahl erscheinen, userprompts müssen eingetippt werden.

### create_test_cases
Erstellt manuelle Test Cases zu einem WorkItem in ADO und verknüpft diese korrekt.
`/create_test_cases nnnnn`


## TODO
- template.copilot.instructions.md erstellen
- Prompt um Feature/PBI zu überarbeiten
- Beispiele erstellen und gleich als User Prompts abspeichern