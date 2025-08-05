# AI Productivity Series - Requirement Engineering Vibes

[TODO] Intro

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

Wenn Du die Liste bekommen hast, dann kannst Du nun mit prompten loslegen. Hier ein paar Beispiele:
### Beispiele
...

## Weitere Informationen
- [Perplexity AI Engineer Space](https://www.perplexity.ai/spaces/the-ai-engineer-UslyhxrNTriahp77tvqP2g)
- [SpecStory](https://specstory.com/)
- [Weitere MCP Server](https://code.visualstudio.com/insider/mcp)
- [Swiss Life Demo Organisation](https://dev.azure.com/swisslife-ai4ctrm/)
- [GitHub Copilot Spaces](https://github.com/copilot/spaces?tab=org) (in progress)

## TODO
- Toolset definierten
- GitHub/SpecStory User Prompts
- Beispiele erstellen und gleich als User Prompts abspeichern