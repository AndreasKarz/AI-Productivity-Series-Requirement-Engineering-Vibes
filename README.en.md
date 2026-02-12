# **CoTREx** Agentic Requirements Engineering (**ARE**)

[Deutsch](README.md) | [English](README.en.md)

---

**Requirements Engineering & Testing reimagined.**  
Imagine saving valuable time while elevating the quality of your projects to a new level. That's exactly what **Agentic Requirement Engineering makes possible** – and in a fraction of the time you currently spend.

**Be ready – and let yourself be inspired by smart automation and pinpoint precision.**

## Prerequisites

> **Download the** [**are\_setup.ps1**](https://github.com/AndreasKarz/AI-Productivity-Series-Requirement-Engineering-Vibes/blob/main/are_setup.ps1) **installation script** and run it in PowerShell. It will help you make the necessary preparations and set up the environment. After installation, you'll find the "ARE" folder in your user directory and **Visual Studio Code Insiders will open** in this folder.
> 
> Additionally, you'll find a shortcut to ARE on your desktop, which allows you to work directly in this folder.

**After that, the following steps need to be completed:**

*   **Install the Azure DevOps MCP Server Extension** in Visual Studio Code Insiders: [Instructions](https://github.com/microsoft/azure-devops-mcp)
*   Make sure you can generate prompts in the [**AI Engineer Perplexity Space**](https://www.perplexity.ai/spaces/the-ai-engineer-UslyhxrNTriahp77tvqP2g).
*   Open **Copilot Chat** and sign in (SL Account)
*   Open the **Explorer view** in Visual Studio Code Insiders.
*   Open the `.vscode/mcp.json` file and **start both servers** `ado` and `sequential-thinking`. Both must show `Running` status.

## Let's get started

1.  Open the **Terminal** view in Visual Studio Code
2.  Run the command `az login --allow-no-subscriptions` in the terminal and **sign in with your ADO credentials**
3.  **Open GitHub Copilot Chat**, set the mode to `Agent` and select the `GPT-5` model
4.  Execute the following prompt: `List all available projects in ADO via MCP` (Initially, many permissions will be requested, which you can answer with 'Always')

**Once you've received the list, you can start prompting.**

# Working with ARE

> Start the ARE environment with the desktop icon created during installation.  
> Open `View > Terminal` and run `./are_start.ps1` in the terminal. **This will update the prompts, instructions, and configurations in this repository** and sign you in.

## List of available prompts:

> 👉🏻 When you're in Copilot **Agent** mode, you can easily call the following prompts by starting the instruction with **/** and then beginning to type the prompt name.

### **/analyze\_workitem** `**WorkItem ID**`

Analyzes a WorkItem in **Azure DevOps (ADO)** according to IREB®, ISTQB®, CTRM, OKR and FlightLevels. Then provides a **summary** of the analysis with **suggestions**. These can be **adjusted in the dialog** and will then be **taken over directly into the WorkItem** by Copilot upon request.

### **/create\_test\_cases** `**WorkItem ID**`

First **checks** the WorkItem including comments and any already linked Test Cases and validates the acceptance criteria for completeness. Then makes suggestions according to ISTQB® for additional Test Cases. These can be **edited in the dialog** and then **Copilot creates them upon request** and **links** them correctly with the WorkItem.

### **/create\_feature** `**File**` **or** `**Description**`

**Analyzes** the file (Markdown, Text, ASCIIDOC or PDF) or the description, **checks** the requirements according to IREB® and **then enters a dialog**. Once all questions are answered and the suggestion is revised in the dialog, **Copilot creates the Feature from it**.

### **/gf\_info** `**Business Case Name**`

Searches **all information about a business case** and then creates a summary from it.

### **/research\_topic** `**Topic**`

You're **looking** for a specific **topic**, you know it's somewhere in the depths of an **ADO WIKI** (_SharePoint is currently not yet supported_), but you can't find it? **ARE will find it for you!**

### **/analyze\_bug** `**WorkItem ID**`

Analyzes the Bug WorkItem and then searches for similar bugs, presumably relevant PBIs, checks Pull Requests, **analyzes** the code and then **creates** an **overview** for you.

### **/analyze\_load\_chain** `**Property Name**`

You have a property **where you don't know where it comes from and where it goes**? Then try this prompt and let it search for the complete chain. It searches for the property in all repositories it finds and then analyzes the entire load chain. It references the code and also considers WorkItems.

### **/analyze\_logs** `**LogFile**`

**Copy your LogFile** to the `.assets` folder and then provide it to this prompt. It **analyzes the log**, examines the source code and pull requests and then outputs a **summarized analysis**.

### **/create\_ui\_test** `**TestCase ID**`

Executes the manual test case and creates a corresponding **Playwright test file** upon request. (Only works with WEB UIs).

Instead of the `TestCase ID`, **a test can also be described**, e.g. _/create\_ui\_test https://www.stadt-zuerich.ch/de/lebenslagen/neu-in-zuerich/other-languages.html - click on each language and then check on the follow-up page whether all translations are correct and error-free_

### **/forensic\_analyze\_pdf** `**PDF File**`

Upload the desired PDF to the `.assets` folder and then provide it to the prompt. It can **forensically examine** the PDF in general but also individual signatures in the document.

# ARE Structure

Familiarize yourself with the directory structure. Here you'll find all important files and folders that help you work efficiently. **Pay attention to the 🤐 icon for your own files, assets, and instructions!** These are NOT versioned and therefore will not be deleted when updating the repository.

*   🤐 `.assets/`: Here you can store your personal assets for demos/training. Only the README is versioned.
*   🔄️ `.vscode/`: Contains configuration files for Visual Studio Code.
*   🔄️ `.github/instructions/`: Contains Copilot instructions.
    *   🤐 create a new file `project.copilot.instructions.md` in this folder for project-specific instructions.
    *   🤐 create a new file `user.copilot.instructions.md` in this folder for your own instructions.
*   🔄️ `.github/prompts/`: Contains pre-built prompts for use with GitHub Copilot.
*   🤐 `.github/userprompts/`: Here you can save your own prompts. Only the template is versioned.
*   🔄️ `Root Directory`: Is versioned.

## Hierarchy of instructions and prompts

This is the order in which instructions and prompts are processed. Note that specific instructions take precedence over general ones. Watch out for conflicting instructions in your user- and project-specific instructions. If these cannot be avoided, instruct GitHub Copilot to follow the specific instructions and explicitly ignore the previous, conflicting instructions.

*   `.github/instructions/copilot.instructions.md`: General instructions for GitHub Copilot.
*   `.github/instructions/project.copilot.instructions.md`: Project-specific instructions for GitHub Copilot.
*   `.github/instructions/user.copilot.instructions.md`: User-defined instructions for GitHub Copilot.
*   `.github/prompts/`: Contains pre-built prompts for use with GitHub Copilot.

## Additional Resources

*   [Prompt Files Documentation](https://code.visualstudio.com/docs/copilot/copilot-customization#_prompt-files-experimental)
*   [AI Engineer Perplexity Space](https://www.perplexity.ai/spaces/the-ai-engineer-UslyhxrNTriahp77tvqP2g)
*   [GitHub Copilot Chat Cheat Sheet](https://docs.github.com/en/copilot/reference/cheat-sheet)