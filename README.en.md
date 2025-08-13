# Agentic Requirement Engineering (ARE)

[Deutsch](README.md) | [English](README.en.md)

**Requirements Engineering & Testing reimagined.**  
Imagine saving valuable time while simultaneously elevating the quality of your projects to a new level. That's exactly what **Agentic Requirement Engineering makes possible** – and in a fraction of the time you currently spend on it.

This repository is your entry point into a focused, efficient, and inspiring way of working. Here you'll find everything you need: clear instructions, proven prompts, and a practical setup that gets you straight into action.  
**Be ready – and let yourself be inspired by smart automation and pinpoint precision.**  

# The next level begins now.

## Updating
> To ensure you're always working with the **latest ARE version**, regularly run `./are_update.ps1`. **This updates the prompts, instructions, and configurations in this repository.**

## Preparations
> **Download the [are_setup.ps1](https://github.com/AndreasKarz/AI-Productivity-Series-Requirement-Engineering-Vibes/blob/main/are_setup.ps1) installation script** and run it in PowerShell. It will help you make the necessary preparations and set up the environment. After installation, you'll find the "ARE" folder in your user directory and **Visual Studio Code Insiders will open** in this folder.<br/>
> Additionally, there's a shortcut to ARE on the desktop, which allows you to work directly in this folder.

**The following steps must then be performed:**
- **Install the Azure DevOps MCP Server Extension** in Visual Studio Code Insiders: [Instructions](https://github.com/microsoft/azure-devops-mcp)
- Ensure that you can generate prompts in the **[AI Engineer Perplexity Space](https://www.perplexity.ai/spaces/the-ai-engineer-UslyhxrNTriahp77tvqP2g)**.
- Open **Copilot Chat** and sign in <small>(SL Account)</small>
- Open the **Explorer view** in Visual Studio Code Insiders.
- Open the `.vscode/mcp.json` file and **start both servers** `ado` and `sequential-thinking`. Both must show `Running` status.

## Let's get started
1. Open the **Terminal** view in Visual Studio Code
2. Run the command `az login --allow-no-subscriptions` in the terminal and **sign in with your ADO credentials**
3. **Open GitHub Copilot Chat**, set the mode to `Agent` and select the `GPT-5` model
4. Execute the following prompt: `List all available projects in ADO via MCP` (Initially, many permissions will be requested, which you can answer with 'Always')

**Once you've received the list, you can start prompting.**

# List of available prompts
Here you'll find an overview of the available prompts that help you work efficiently:
- `/analyze_workitem <WorkItemID>` => Analyzes a WorkItem in ADO and returns relevant information.
- `/create_test_cases <WorkItemID>` => Creates manual test cases for a WorkItem in ADO through dialog and links them correctly.
TODO
- Search WIKI content
- Browse source code
- Analyze bug 
- Calculate time savings
- Evaluate BE/FE split in the sprint and create a dashboard incl. recommendations
- Analyze test coverage
- Search fields throughout the entire codebase and show the complete loading path
- Display translations
- Show mail templates including configuration
- Analyze logs (ask which file in .assets should be inspected)
- Summarize PDF manual (test if Copilot can read PDFs; otherwise provide a workaround. Ask which file in .assets should be used, all or a specific topic)
- ...

# ARE structure
Familiarize yourself with the directory structure. Here you'll find all important files and folders that help you work efficiently. **Pay attention to the 🤐 icon for your own files, assets, and instructions!** These are NOT versioned and therefore won't be deleted when updating the repository.

- 🤐 `.assets/`: Here you can store your personal assets for demos/training. Only the README is versioned.
- 🔄️ `.vscode/`: Contains configuration files for Visual Studio Code.
- 🔄️ `.github/instructions/`: Contains Copilot instructions. 
  - 🤐 for project-specific instructions, create a new file `project.copilot.instructions.md` in this folder.
  - 🤐 for your own instructions, create a new file `user.copilot.instructions.md` in this folder.
- 🔄️ `.github/prompts/`: Contains pre-made prompts for use with GitHub Copilot.
- 🤐 `.github/userprompts/`: Here you can store your own prompts. Only the template is versioned.
- 🤐 `.specstory/`: Settings and history of SpecStory.
- 🔄️ `Root Directory`: Is versioned.

## Hierarchy of instructions and prompts
This is the order in which instructions and prompts are processed. Note that specific instructions take precedence over general ones. Watch out for conflicting instructions in your user and project-specific instructions. If these cannot be avoided, instruct GitHub Copilot to follow the specific instructions and explicitly ignore the previous, conflicting instructions.
- `.github/instructions/copilot.instructions.md`: General instructions for GitHub Copilot.
- `.github/instructions/project.copilot.instructions.md`: Project-specific instructions for GitHub Copilot.
- `.github/instructions/user.copilot.instructions.md`: User-defined instructions for GitHub Copilot.
- `.github/prompts/`: Contains pre-made prompts for use with GitHub Copilot.

## Prompts
There are 2 types of prompts in this directory: prompts and userprompts. Both are available in Copilot Chat. The big difference is that prompts appear as selections, while UserPrompts must be typed in.


## TODO
- Create examples and save them as User Prompts


## Additional Resources
- [Documentation Prompt Files](https://code.visualstudio.com/docs/copilot/copilot-customization#_prompt-files-experimental)
- [AI Engineer Perplexity Space](https://www.perplexity.ai/spaces/the-ai-engineer-UslyhxrNTriahp77tvqP2g)
