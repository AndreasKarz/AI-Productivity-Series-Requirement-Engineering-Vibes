# **CoTREx** Agentic Requirements Engineering (**ARE**)

[Deutsch](README.md) | [English](README.en.md)

---

**Requirements Engineering & Testing neu gedacht.**  
Stell dir vor, Du sparst wertvolle Zeit und hebst gleichzeitig die Qualität Deiner Projekte auf ein neues Level. Genau das macht **Agentic Requirement Engineering möglich** – und das in einem Bruchteil der Zeit, die du jetzt dafür aufwendest.

**Willst Du mit CoTREx ARE arbeiten?** [Dann melde Dich bei uns](https://teams.microsoft.com/l/channel/19%3AgnGndOg7XoTvLgeRPqdtLvwdRnHjGwQto9XQ0oRKjL81%40thread.tacv2/01%20TREX%20Public?groupId=8c4a846d-9e6a-4aae-a23e-ae2f203b52d6&tenantId=ab3ae8a3-fd32-4b83-831e-919c6fcd28b2) und wir machen mit Dir das Onboarding.  
**Be ready – und lass Dich von smarter Automatisierung und punktgenauer Präzision begeistern.**

# Das nächste Level beginnt jetzt. ![](https://swisslife.sharepoint.com/:i:/s/Co-TREx/Eaqr_Vq82jFKgWTxfsGgryUBMzX9FXVrDo_0heQTR8s5Kg?e=rsgIt7)

## Liste der verfügbaren Prompts:

> 👉🏻 Wenn Du im Copilot im `**Agent**` Mode bist, kannst Du die folgenden Prompts einfach aufrufen, in dem Du die Anweisung mit `**/**` beginnst und dann den Namen des Prompts zu schreiben beginnst .

### **/analyze\_workitem** `**WorkItem ID**`

Analysiert ein WorkItem in **Azure DevOps (ADO)** nach IREB®, ISTQB®, CTRM, OKR und FlightLevels. Gibt danach eine **Zusammenfassung** der Analyse mit **Vorschlägen** aus. Diese können **im Dialog noch angepasst** werden und werden danach vom Copilot **auf Wunsch direkt ins WorkItem** übernommen.

### **/create\_test\_cases** `**WorkItem ID**`

**Prüft** zuerst das WorkItem inkl. den Kommentaren sowie allenfalls schon verlinkten Test Cases und validiert die Akzeptanzkriterien auf Vollständigkeit. Macht danach Vorschläge nach ISTQB® für weitere Test Cases. Diese können **im Dialog bearbeitet** werden und danach **erstellt Copilot diese auf Wunsch** und **verlinkt** diese auch korrekt mit dem WorkItem.

### **/create\_feature** `**File**` **oder** `**Beschreibung**`

**Analysiert** die Datei (Markdown, Text, ASCIIDOC oder PDF) oder die Beschreibung, **prüft** dann die Anforderungen nach IREB® und **geht dann in einen Dialog**. Sind alle Fragen beantwortet und der Vorschlag im Dialog überarbeitet, **erstellt der Copilot daraus das Feature**.  

### **/gf\_info** `**Name des Geschäftsfalles**`

Sucht **alle Informationen zu einem Geschäftsfall** und erstellt dann eine Zusammenfassung daraus.

### **/research\_topic** `**Topic**`

Du **suchst** nach einem bestimmten **Thema**, Du weisst, es ist irgendwo in den Tiefen eines **ADO WIKIs** (_Sharepoint wird aktuell noch nicht unterstützt_), aber Du findest es nicht? **ARE wird es für Dich finden!**

### **/analyze\_bug** `**WorkItem ID**`

Analysiert das Bug WorkItem und sucht dann ähnliche Bugs, vermutlich relevante PBIs, prüft Pull Requests, **analysiert** den Code und **erstellt** Dir dann eine **Übersicht**.

### **/analyze\_load\_chain** `**Property Name**`

Du hast ein Property, **bei dem Du nicht weisst, woher es kommt und wohin es geht**? Dann versuche mal diesen Prompt und lass ihn nach der kompletten Strecke suchen. Er sucht das Property in allen Repositories die er findet und analysiert dann die gesamt Ladekette. Dabei referenziert er auf den Code und berücksichtigt auch WorkItems.

### **/analyze\_logs** `**LogFile**`

**Kopiere Dein LogFile** in den Ordner `.assets` und gib es dann diesem Prompt mit. Er **analysiert das Log**, untersucht den Source Code und die Pull Requests und gibt dann eine **zusammengefasste Analyse** aus.

### **/create\_ui\_test** `**TestCase ID**`

Führt den manuellen Test Case aus und erstellt auf Wunsch eine entsprechende **Playwright Testdatei**. (Funktioniert nur mit WEB UIs). 

Anstatt die `TestCase ID` kann auch **ein Test beschrieben werden**, z.B. _/create\_ui\_test https://www.stadt-zuerich.ch/de/lebenslagen/neu-in-zuerich/other-languages.html - klicke auf jede Sprache und prüfe dann auf der Folgeseite ob alle Übersetzungen korrekt und fehlerfrei sind_

### **/forensic\_analyze\_pdf** `**PDF Datei**`

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
*   🤐 `.specstory/`: Einstellungen und History von SpecStory.
*   🔄️ `Root Verzeichnis`: Wird versioniert.

## Hierarchie der Instruktionen und Prompts

Dies ist die Reihenfolge, in der die Anweisungen und Prompts verarbeitet werden. Achte darauf, dass die spezifischen Anweisungen Vorrang vor den allgemeinen haben. Achte auf widersprüchliche Anweisungen in deinen Benutzer- und Projektspezifischen Anweisungen. Sollten sich diese nicht vermeiden lassen, weise GitHub Copilot an, die spezifischen Anweisungen zu befolgen und die vorherigen, widersprüchlichen Anweisungen explizit zu ignorieren.

*   `.github/instructions/copilot.instructions.md`: Allgemeine Anweisungen für GitHub Copilot.
*   `.github/instructions/project.copilot.instructions.md`: Projektspezifische Anweisungen für GitHub Copilot.
*   `.github/instructions/user.copilot.instructions.md`: Benutzerdefinierte Anweisungen für GitHub Copilot.
*   `.github/prompts/`: Enthält die vorgefertigten Prompts für die Nutzung mit GitHub Copilot.

## Weitere Ressourcen

*   [Dokumentation Prompt Files](https://code.visualstudio.com/docs/copilot/copilot-customization#_prompt-files-experimental)
*   [AI Engineer Perplexity Space](https://www.perplexity.ai/spaces/the-ai-engineer-UslyhxrNTriahp77tvqP2g)
*   [Spickzettel zu GitHub Copilot Chat](https://docs.github.com/de/copilot/reference/cheat-sheet)