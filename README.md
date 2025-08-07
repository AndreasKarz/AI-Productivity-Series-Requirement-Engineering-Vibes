# Agentic Requirement Engineering

[Deutsch](README.md) | [English](README.en.md)

**Requirements Engineering & Testing neu gedacht.**  
Stell dir vor, Du sparst wertvolle Zeit und hebst gleichzeitig die Qualität Deiner Projekte auf ein neues Level. Genau das macht **Agentic Requirement Engineering möglich** – und das in einem Bruchteil der Zeit, die du jetzt dafür aufwendest.

Dieses Repository ist Dein Einstieg in eine fokussierte, effiziente und inspirierende Arbeitsweise. Hier findest Du alles, was Du brauchst: klare Anleitungen, erprobte Prompts und ein praktisches Setup, welches Dich direkt ins Tun bringen.  
**Be ready – und lass Dich von smarter Automatisierung und punktgenauer Präzision begeistern.**  
Das nächste Level beginnt jetzt.

## Vorbereitungen
- Klone dieses Repository in ein Verzeichnis Deiner Wahl (**Es ist wichtig zu klonen**, damit Du die Updates erhälst!) 
- [Visual Studio Code](https://code.visualstudio.com/) oder besser [Visual Studio Code Insiders](https://code.visualstudio.com/insiders/) muss installiert sein. <small>(AP047391)</small>
- [Azure CLI](https://learn.microsoft.com/en-us/cli/azure/install-azure-cli-windows) muss installiert sein. <small>(AP047392)</small>
- Du brauchst einen GitHub Account, am besten einen GitHub Enterprise Account. <small>(AP045370)</small>
- Prüfe das Du den GitHub Copilot nutzen kannst. Optimal wäre GitHub Copilot for Business. <small>(AP047763)</small>
- Installiere die [SpecStory Extension](https://marketplace.visualstudio.com/items?itemName=SpecStory.specstory-vscode) in Visual Studio Code (Insiders).
- Stelle sicher, dass Du im [AI Engineer Perplexity Space](https://www.perplexity.ai/spaces/the-ai-engineer-UslyhxrNTriahp77tvqP2g) Prompts generieren kannst.
 
 Prüfe die Vorbereitungen:
 - Führe in PowerShell den Befehl `az --version` aus. Du solltest eine Ausgabe mit der Version der Azure CLI sehen.
 - Melde Dich mit `az login --allow-no-subscriptions` in der Azure CLI an. 
 - Wechsle in PowerShell in Dein Verzeichnis und führe den Befehl `git clone --force` aus.
 - Führe dann den Befehl `code .` aus, um Visual Studio Code zu öffnen.
 - Prüfe die Installation der Extensions *SpecStory* und *GitHub* Copilot.

## Einstellungen und Konfiguration
Wenn Du bist hier gekommen bist, dann hast Du die Vorbereitungen erfolgreich abgeschlossen. Jetzt kannst Du mit der Konfiguration beginnen:

### SpecStory
1. Öffne Visual Studio Code Insiders
2. Klicke auf das Extensions-Symbol in der linken Seitenleiste
3. Aktiviere Derrive AI rules
4. Aktiviere Auto-save

### GitHub Copilot
1. [Copilot Chat Extension](https://marketplace.visualstudio.com/items?itemName=GitHub.copilot-chat) installieren
2. Copilot starten und anmelden (SL Account)

### ADO MCP Server
1. In Visual Studio Code Insiders **dieses Verzeichnis** öffnen.
2. **Installiere die Azure DevOps MCP Server Extension** in Visual Studio Code Insiders: [Anleitung](https://github.com/microsoft/azure-devops-mcp)
3. Öffnen die Datei `.vscode/mcp.json` und **starte die beiden Server** `ado` und `sequential-thinking`. Es müssen danach beide auf `Running` stehen

## Und los geht's
1. Öffne mit `Terminal > New Terminal` ein neues Terminal in Visual Studio Code
2. Führe den Befehl `az login` im Terminal aus und **melde Dich mit Deinem ADO Konto an**
3. **Öffne den GitHub Copilot Chat**, stelle den Mode auf `Agent` und wähle das Model `Claude Sonet 4` aus
4. Führe folgenden Prompt aus: `Liste mir alle zur Verfügung stehenden Projekte im ADO auf` (Am Anfang werden viele Berechtigungen abgefragt, die Du mit 'Always' beantworten kannst)

Wenn Du die Liste bekommen hast, dann kannst Du nun mit prompten loslegen. 

## Lern Ressourcen
TODO
- CoPilot Prompt Files (https://www.perplexity.ai/search/wie-funktionieren-die-github-c-csB5cqnSSu.zhwdhHvm6sg)
- Prompt Engineering und wenn ein Prompt nicht richtig funktioniert, wie mit [The AI Engineer](https://www.perplexity.ai/spaces/the-ai-engineer-UslyhxrNTriahp77tvqP2g) überarbeiten lassen (mit Beispiel Prompt).

## Weitere Informationen
- [Perplexity AI Engineer Space](https://www.perplexity.ai/spaces/the-ai-engineer-UslyhxrNTriahp77tvqP2g)
- [SpecStory](https://specstory.com/)
- [Weitere MCP Server](https://code.visualstudio.com/insider/mcp)
- [Swiss Life Demo Organisation](https://dev.azure.com/swisslife-ai4ctrm/)
- [GitHub Copilot Spaces](https://github.com/copilot/spaces?tab=org) (in progress)

## TODO
- Prompt um Feature/PBI zu überarbeiten
- Beispiele erstellen und gleich als User Prompts abspeichern