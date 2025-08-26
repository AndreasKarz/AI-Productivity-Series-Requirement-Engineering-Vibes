# Agentic Requirement Engineering (ARE)

[Deutsch](README.md) | [English](README.en.md)

**Requirements Engineering & Testing reimagined.**  
Imagine saving valuable time while elevating the quality of your projects to a new level. That's exactly what **Agentic Requirement Engineering makes possible** – and in a fraction of the time you currently spend.

This repository is your gateway to a focused, efficient, and inspiring way of working. Here you'll find everything you need: clear instructions, proven prompts, and a practical setup that gets you straight into action.  
**Be ready – and let yourself be inspired by smart automation and pinpoint precision.**  

# The next level begins now.

## Prerequisites
> **Download the [are_setup.ps1](https://github.com/AndreasKarz/AI-Productivity-Series-Requirement-Engineering-Vibes/blob/main/are_setup.ps1) installation script** and run it in PowerShell. It will help you make the necessary preparations and set up the environment. After installation, you'll find the "ARE" folder in your user directory and **Visual Studio Code Insiders will open** in this folder.<br/>
> Additionally, you'll find a shortcut to ARE on your desktop, which allows you to work directly in this folder.

**After that, the following steps need to be completed:**
- **Install the Azure DevOps MCP Server Extension** in Visual Studio Code Insiders: [Instructions](https://github.com/microsoft/azure-devops-mcp)
- Make sure you can generate prompts in the **[AI Engineer Perplexity Space](https://www.perplexity.ai/spaces/the-ai-engineer-UslyhxrNTriahp77tvqP2g)**.
- Open **Copilot Chat** and sign in <small>(SL Account)</small>
- Open the **Explorer view** in Visual Studio Code Insiders.
- Open the `.vscode/mcp.json` file and **start both servers** `ado` and `sequential-thinking`. Both must show `Running` status.

## Let's get started
1. Open the **Terminal** view in Visual Studio Code
2. Run the command `az login --allow-no-subscriptions` in the terminal and **sign in with your ADO credentials**
3. **Open GitHub Copilot Chat**, set the mode to `Agent` and select the `GPT-5` model
4. Execute the following prompt: `List all available projects in ADO via MCP` (Initially, many permissions will be requested, which you can answer with 'Always')

**Once you've received the list, you can start prompting.**

# Working with ARE
> Start the ARE environment with the desktop icon created during installation. 
> Open `View > Terminal` and run `./are_start.ps1` in the terminal. **This will update the prompts, instructions, and configurations in this repository** and sign you in.

## List of available prompts
Here you'll find an overview of available prompts that help you work efficiently:
- `/analyze_bug <WorkItemID>` => Analyzes a bug in ADO and guides you interactively through the improvement.
- `/analyze_workitem <WorkItemID>` => Analyzes a WorkItem in ADO and returns relevant information.
- `/create_test_cases <WorkItemID>` => Creates manual test cases for a WorkItem in ADO through dialog and links them correctly.
- `/research_topic <Topic>` => Searches all WIKIs and documentation for this topic and creates a summary.
- `/analyze_load_chain <PropertyName>` => Search for property throughout the entire codebase and show the complete load chain including involved WorkItems.
- `/analyze_logs` => Analyze logs, upload file to chat or specify path.
TODO
- Search source code
- Calculate time savings
- Evaluate BE/FE distribution in sprint and create dashboard with recommendations
- Display translations
- Show mail template including configuration
- ...

# ARE Structure
Familiarize yourself with the directory structure. Here you'll find all important files and folders that help you work efficiently. **Pay attention to the 🤐 icon for your own files, assets, and instructions!** These are NOT versioned and therefore will not be deleted when updating the repository.

- 🤐 `.assets/`: Here you can store your personal assets for demos/training. Only the README is versioned.
- 🔄️ `.vscode/`: Contains configuration files for Visual Studio Code.
- 🔄️ `.github/instructions/`: Contains Copilot instructions. 
  - 🤐 create a new file `project.copilot.instructions.md` in this folder for project-specific instructions.
  - 🤐 create a new file `user.copilot.instructions.md` in this folder for your own instructions.
- 🔄️ `.github/prompts/`: Contains pre-built prompts for use with GitHub Copilot.
- 🤐 `.github/userprompts/`: Here you can save your own prompts. Only the template is versioned.
- 🤐 `.specstory/`: Settings and history of SpecStory.
- 🔄️ `Root Directory`: Is versioned.

## Hierarchy of instructions and prompts
This is the order in which instructions and prompts are processed. Note that specific instructions take precedence over general ones. Watch out for conflicting instructions in your user- and project-specific instructions. If these cannot be avoided, instruct GitHub Copilot to follow the specific instructions and explicitly ignore the previous, conflicting instructions.
- `.github/instructions/copilot.instructions.md`: General instructions for GitHub Copilot.
- `.github/instructions/project.copilot.instructions.md`: Project-specific instructions for GitHub Copilot.
- `.github/instructions/user.copilot.instructions.md`: User-defined instructions for GitHub Copilot.
- `.github/prompts/`: Contains pre-built prompts for use with GitHub Copilot.

## TODO
- Create examples and save as user prompts


## Additional Resources
- [Prompt Files Documentation](https://code.visualstudio.com/docs/copilot/copilot-customization#_prompt-files-experimental)
- [AI Engineer Perplexity Space](https://www.perplexity.ai/spaces/the-ai-engineer-UslyhxrNTriahp77tvqP2g)
- [GitHub Copilot Chat Cheat Sheet](https://docs.github.com/en/copilot/reference/cheat-sheet)
