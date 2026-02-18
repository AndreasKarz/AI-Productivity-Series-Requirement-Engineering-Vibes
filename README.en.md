# Agentic-BA-RE-Tester-Setup for Agentic Requirements Engineering (**ARE**)

[Deutsch](README.md) | [English](README.en.md)

---

**Requirements Engineering & Testing reimagined.**  
Imagine saving valuable time while elevating the quality of your projects to a new level. That's exactly what **Agentic Requirement Engineering makes possible** – and in a fraction of the time you currently spend.

**Be ready – and let yourself be inspired by smart automation and pinpoint precision.**

## Prerequisites

> **Download the** [**are_setup.ps1**](https://github.com/AndreasKarz/AI-Productivity-Series-Requirement-Engineering-Vibes/blob/main/are_setup.ps1) **installation script** and run it in PowerShell. It will help you make the necessary preparations and set up the environment. After installation, you'll find the "ARE" folder in your user directory and **Visual Studio Code Insiders will open** in this folder.
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

---

# Architecture: Agents, Skills & Prompts

ARE follows the principle **"Agents orchestrate, Skills deliver domain knowledge"**. Central orchestration is managed via the `.github/AGENTS.md` file.

## Specialized Agents

Agents are invoked directly in Copilot Chat via `@`, e.g. `@RequirementsEngineer`.

| Agent | Expertise | When to use |
|-------|-----------|-------------|
| **@RequirementsEngineer** | IREB-compliant requirements, Features, PBIs, Epics, acceptance criteria | Elicit, document, validate requirements |
| **@Testmanager** | ISTQB-compliant test cases, test strategy, coverage analysis | Create test cases, manage test plans, test reports |
| **@BusinessAnalyst** | OKR, Flight Levels, stakeholder analysis, business cases | Evaluate business value, strategic decisions |
| **@EnterpriseArchitekt** | SHERPA standards, EA reviews, ADoIT, SEAL lifecycle | Evaluate architecture, check standards |
| **@PowerBI** | DAX, Power Query M, ETL, Star Schema, visualizations | Create reports, design data models |

## Skills (Domain Knowledge)

Skills are loaded automatically by the Agents and provide subject-matter depth. They are **not called directly**.

| Skill | Content |
|-------|---------|
| `business-analyst` | OKR framework, Flight Levels, stakeholder matrix, business case methodology, Swiss market, FINMA/DSG |
| `requirements-engineer` | IREB lifecycle, GIVEN/WHEN/THEN patterns, NFR per ISO 25010, ADO templates |
| `testmanager` | ISTQB test process, test design techniques, deterministic expected results, coverage analysis |
| `enterprise-architect` | SHERPA framework, CoA/ADoIT access, architecture layers, standards compliance |
| `powerbi` | ETL pipeline design, Star Schema, DAX patterns, Power Query M, visualizations |

Additional utility skills available: `agent-creator`, `skill-creator`, `instructions-creator`, `prompt-creator`, `hierarchical-rag`, `sharepoint`, `docx`, `xlsx`, `pptx`, `pdf`

---

## List of available prompts

> 👉🏻 When you're in Copilot **Agent** mode, you can easily call the following prompts by starting the instruction with **/** and then beginning to type the prompt name.

### **/business_conclusion** `**WorkItem ID**`

Analyzes the Work Item and everything attached to it and creates a **Management Summary** from it.

`_/business_conclusion 783464_`

### **/analyze_workitem** `**WorkItem ID**`

Analyzes a WorkItem in **Azure DevOps (ADO)** according to IREB®, ISTQB®, CTRM, OKR and FlightLevels. Then provides a **summary** of the analysis with **suggestions**. These can be **adjusted in the dialog** and will then be **taken over directly into the WorkItem** by Copilot upon request.

### **/create_test_cases** `**WorkItem ID**`

First **checks** the WorkItem including comments and any already linked Test Cases and validates the acceptance criteria for completeness. Then makes suggestions according to ISTQB® for additional Test Cases. These can be **edited in the dialog** and then **Copilot creates them upon request** and **links** them correctly with the WorkItem.

### **/create_feature** `**File**` **or** `**Description**`

**Analyzes** the file (Markdown, Text, ASCIIDOC or PDF) or the description, **checks** the requirements according to IREB® and **then enters a dialog**. Once all questions are answered and the suggestion is revised in the dialog, **Copilot creates the Feature from it**.

### **/gf_info** `**Business Case Name**`

Searches **all information about a business case** and then creates a summary from it.

### **/research_topic** `**Topic**`

You're **looking** for a specific **topic**, you know it's somewhere in the depths of an **ADO WIKI** (_SharePoint is currently not yet supported_), but you can't find it? **ARE will find it for you!**

### **/analyze_bug** `**WorkItem ID**`

Analyzes the Bug WorkItem and then searches for similar bugs, presumably relevant PBIs, checks Pull Requests, **analyzes** the code and then **creates** an **overview** for you.

### **/analyze_load_chain** `**Property Name**`

You have a property **where you don't know where it comes from and where it goes**? Then try this prompt and let it search for the complete chain. It searches for the property in all repositories it finds and then analyzes the entire load chain. It references the code and also considers WorkItems.

### **/analyze_logs** `**LogFile**`

**Copy your LogFile** to the `.assets` folder and then provide it to this prompt. It **analyzes the log**, examines the source code and pull requests and then outputs a **summarized analysis**.

### **/create_ui_test** `**TestCase ID**`

Executes the manual test case and creates a corresponding **Playwright test file** upon request. (Only works with WEB UIs).

Instead of the `TestCase ID`, **a test can also be described**, e.g. _/create_ui_test https://www.stadt-zuerich.ch/de/lebenslagen/neu-in-zuerich/other-languages.html - click on each language and then check on the follow-up page whether all translations are correct and error-free_

### **/forensic_analyze_pdf** `**PDF File**`

Upload the desired PDF to the `.assets` folder and then provide it to the prompt. It can **forensically examine** the PDF in general but also individual signatures in the document.

### **/architecture_review** `**Input**`

Reviews an architecture document (attachment, ADO URL, SharePoint, ADoIT or free text) **against the EA standards of the SHERPA framework**. Loads at least 3 of 5 sources (CoA SharePoint, ADoIT, ADO Standards Wiki, CTRM Wiki, sl-ch-nexus) and creates a compact **Standards Compliance Report**.

### **/aggregate_support_tickets** `**CSV Path**` `**Output Folder**`

Aggregates **support tickets from a CSV file** into a JSON knowledge graph and enriches them with ADO information.

### **/analyze_time_savings_v2** `**Time Period**`

Analyzes and visualizes **time savings across all WorkItems** in the CTRM project that carry the `AI Gen` tag. Ideal for reporting and ROI evidence.

### **/create_hierarchical_rag** `**Project Name**`

Builds a new **Hierarchical RAG (DIGEST/RAW)** for a project — including source download, digest generation, freshness gate and anonymization. Creates the knowledge structure in `.assets/context/`.

# ARE Structure

Familiarize yourself with the directory structure. Here you'll find all important files and folders that help you work efficiently. **Pay attention to the 🤐 icon for your own files, assets, and instructions!** These are NOT versioned and therefore will not be deleted when updating the repository.

*   🤐 `.assets/`: Here you can store your personal assets for demos/training. Only the README is versioned.
*   🔄️ `.vscode/`: Contains configuration files for Visual Studio Code.
*   🔄️ `.github/AGENTS.md`: Central orchestration file — defines the persona, workflow and delegation tables.
*   🔄️ `.github/agents/`: Contains the specialized Agents (RequirementsEngineer, Testmanager, BusinessAnalyst, EnterpriseArchitekt, PowerBI).
*   🔄️ `.github/skills/`: Contains the domain knowledge of the Agents (IREB, ISTQB, OKR, SHERPA, DAX etc.) plus utility skills.
*   🔄️ `.github/instructions/`: Contains Copilot instructions.
    *   🤐 create a new file `project.copilot.instructions.md` in this folder for project-specific instructions.
    *   🤐 create a new file `user.copilot.instructions.md` in this folder for your own instructions.
*   🔄️ `.github/prompts/`: Contains pre-built prompts for use with GitHub Copilot.
*   🤐 `.github/userprompts/`: Here you can save your own prompts. Only the template is versioned.
*   🔄️ `Root Directory`: Is versioned.

## Hierarchy of Instructions, Agents and Prompts

This is the order in which instructions are processed. Note that specific instructions take precedence over general ones. Watch out for conflicting instructions in your user- and project-specific instructions. If these cannot be avoided, instruct GitHub Copilot to follow the specific instructions and explicitly ignore the previous, conflicting instructions.

1.  `.github/instructions/copilot.instructions.md`: General instructions for GitHub Copilot.
2.  `.github/instructions/project.copilot.instructions.md`: Project-specific instructions.
3.  `.github/instructions/user.copilot.instructions.md`: User-defined instructions.
4.  `.github/AGENTS.md`: Central orchestration — delegates to specialized Agents.
5.  `.github/agents/*.agent.md`: Specialized Agents — orchestrate their domain.
6.  `.github/skills/*/SKILL.md`: Domain knowledge — loaded by Agents, never duplicated.
7.  `.github/prompts/*.prompt.md`: Pre-built prompts for common tasks.

# Installed [MCP](https://github.blog/ai-and-ml/llms/what-the-heck-is-mcp-and-why-is-everyone-talking-about-it) Servers

## Sequential-Thinking

An MCP server implementation that provides a tool for dynamic and reflective problem-solving through a structured thinking process. Breaks down complex instructions and individual steps for more reliable responses.

### Resources

[https://github.com/modelcontextprotocol/servers/tree/main/src/sequentialthinking](https://github.com/modelcontextprotocol/servers/tree/main/src/sequentialthinking)

## ADO

Allows access to Azure DevOps for analyzing WorkItems, WIKIs, documentation and source code. Can also create WorkItems and TestCases.

### Resources

[https://www.youtube.com/watch?v=QAwTYXNLW4w](https://www.youtube.com/watch?v=QAwTYXNLW4w)

## MongoDB

Access to MongoDB instances as sources for Copilot. The connection string must be set as the environment variable `MDB_MCP_CONNECTION_STRING`.

### Resources

[https://dev.to/edudeveloper/set-up-a-mongodb-mcp-server-in-vs-code-like-a-pro-pb7](https://dev.to/edudeveloper/set-up-a-mongodb-mcp-server-in-vs-code-like-a-pro-pb7)   
[https://www.npmjs.com/package/mongodb-mcp-server](https://www.npmjs.com/package/mongodb-mcp-server)   
[https://github.com/mongodb-js/mongodb-mcp-server](https://github.com/mongodb-js/mongodb-mcp-server)

## Playwright

The Playwright MCP is a powerful MCP server that gives an AI agent control over a web browser. It is based on Playwright, the same technology that powers our reliable testing and automation framework.

### Resources

https://devblogs.microsoft.com/blog/the-complete-playwright-end-to-end-story-tools-ai-and-real-world-workflows

[https://playwright.dev/agents](https://playwright.dev/agents)

## microsoft-docs

The Microsoft Learn MCP Server is a Model Context Protocol server that adds trusted and up-to-date Learn content as context to language models.

### Resources

[https://learn.microsoft.com/en-us/training/support/mcp](https://learn.microsoft.com/en-us/training/support/mcp)

## memory

A basic implementation of persistent storage using a local knowledge graph. This allows ARE to store information about the user across multiple chats.

### Resources

[https://github.com/modelcontextprotocol/servers/tree/main/src/memory](https://github.com/modelcontextprotocol/servers/tree/main/src/memory)

## PDF2Img

Self-developed MCP server so that GitHub Copilot can handle PDFs. Takes a detour via images, which can then be read by Copilot using OCR.

## AsciiDoc

Self-developed MCP server that can create new AsciiDocs from PDFs, including graphics and images.

## Elastic Search MCP

Coming soon...

### Resources

[https://www.elastic.co/search-labs/blog/model-context-protocol-elasticsearch](https://www.elastic.co/search-labs/blog/model-context-protocol-elasticsearch)

## GitHub MCP

Coming soon...
https://github.com/kuzudb/kuzu-mcp-server

### Resources

https://github.com/pnp/cli-microsoft365-mcp-server  
https://github.com/pnp/cli-microsoft365-mcp-server?tab=readme-ov-file

[https://github.com/github/github-mcp-server](https://github.com/github/github-mcp-server)

# Additional Resources
- [Awesome Copilot](https://github.com/github/awesome-copilot)
- [Prompt Files Documentation](https://code.visualstudio.com/docs/copilot/copilot-customization#_prompt-files-experimental)
- [AI Engineer Perplexity Space](https://www.perplexity.ai/spaces/the-ai-engineer-UslyhxrNTriahp77tvqP2g)
- [GitHub Copilot Chat Cheat Sheet](https://docs.github.com/en/copilot/reference/cheat-sheet)