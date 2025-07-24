# AI Productivity Series - Requirement Engineering Vibes

bla bla

## Vorbereitungen
- Visual Studio Code Insiders installieren. Fall keine Adminrechte vorhanden sind, dann die [portable Version](https://code.visualstudio.com/insiders/) verwenden ([Anleitung](https://code.visualstudio.com/docs/editor/portable))
- Ausserhalb der SL => installiere die [Azure CLI](https://learn.microsoft.com/en-us/cli/azure/install-azure-cli-windows) oder [Portable Azure CLI](https://learn.microsoft.com/de-de/cli/azure/install-azure-cli-windows?view=azure-cli-latest&pivots=zip) und prüfe mit `az --version`, ob die Installation erfolgreich war
- Installiere die [SpecStory Extension](https://marketplace.visualstudio.com/items?itemName=SpecStory.specstory-vscode) in Visual Studio Code Insiders
- Stelle sicher, dass Du im [AI Engineer Perplexity Space](https://www.perplexity.ai/spaces/the-ai-engineer-UslyhxrNTriahp77tvqP2g) Prompts generieren kannst
- Bestelle die benötigten Rechte:
  - GitHub-Enterprise-Access (AP045370)
  - GitHub-Co-Pilot for Business (AP047763)
  - Microsoft-AzureCLI - PAV (AP046904)
  - ADO Zugriff auf die gewünschte Organisation (az login muss funktionieren)

## Anleitung
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
1. In Visual Studio Code **dieses Verzeichnis** öffnen.
2. Öffne mit `Terminal > New Terminal` ein neues Terminal in Visual Studio Code
3. **Installiere den MCP Server** `npm install mcp-server-ado`. (Oder global mit Powershell im Access Terminal `npm install -g mcp-server-ado`)
4. Öffnen die Datei `.vscode/mcp.json` und starte die beiden Server `ado` und `sequential-thinking`. Es müssen danach beide auf `Running` stehen
5. Führe den Befehl `az login` aus und melde Dich mit Deinem ADO Konto an
6. Öffne den GitHub Copilot Chat, stelle den Mode auf `Agent` und wähle das Model `Claude Sonet 4` aus



https://specstory.com/  



https://github.com/copilot

AP045370   AP047763

https://dev.azure.com/swisslife-ai4ctrm/  

## Vorbereitung
- Bestelle die GitHub Rechte .... => 
- https://code.visualstudio.com/mcp => https://github.com/microsoft/azure-devops-mcp => https://github.com/microsoft/azure-devops-mcp/blob/main/docs/HOWTO.md
- Sequential Thinking auch noch ins MCP File packen
- Tools disablen (GitHub CoPilot Toolsets noch anschauen)
- Agent Mode
- Model Claude Sonet 4

## Introduction

1. Install extension

2. Konfiguriere .gitignore

3. Aktiviere Derrive AI rules

4. Install ADO MCP 

Flight Levels
OKR 