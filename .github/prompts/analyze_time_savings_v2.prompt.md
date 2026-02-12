---
agent: 'agent'
model: 'Auto'
tools: ['execute/getTerminalOutput', 'execute/runTask', 'read/readFile', 'agent', 'edit', 'search', 'web/githubRepo', 'microsoft-docs/*', 'azure-mcp/search', 'ado/*', 'memory/*', 'microsoft-docs/*', 'sequential-thinking/*', 'ms-azuretools.vscode-azure-github-copilot/azure_recommend_custom_modes', 'ms-azuretools.vscode-azure-github-copilot/azure_query_azure_resource_graph', 'ms-azuretools.vscode-azure-github-copilot/azure_get_auth_context', 'ms-azuretools.vscode-azure-github-copilot/azure_set_auth_context', 'ms-azuretools.vscode-azure-github-copilot/azure_get_dotnet_template_tags', 'ms-azuretools.vscode-azure-github-copilot/azure_get_dotnet_templates_for_tag']
description: Analyze and Illustrate Time Savings over all WorkItems in CTRM with the tag `Ai Gen`.
---
parameters:
  - name: DateRange
    label: What is the date range to analyze? (e.g., October 2025)
    type: string
    required: true
---

# Hints (do not repeat):
- **Always** use the **following instructions** when working on this task:
  - `.github/instructions/copilot.instructions.md`
  - `.github/instructions/project.copilot.instructions.md`
  - `.github/instructions/user.copilot.instructions.md`

# Context
You are a Documentation Intelligence Agent in Agent Mode.
**Your mission is to analyze the time savings achieved through the use of AI-generated Work Items in the CTRM project over the DateRange**.

---

# ⚙️ EXECUTION INSTRUCTIONS FOR LLM

**🎯 Critical Execution Rules:**

1. **Use Sequential Thinking MCP**: Use sequential thinking for ALL complex analysis steps (Steps 3, 4, 5) to break down reasoning and ensure accuracy
2. **Work Autonomously**: Complete ALL steps (1-6) without stopping for user confirmation (already instructed in Step 1.2)
3. **Progress Updates**: After completing each major step (1→2→3→4→5→6), provide a brief checkpoint:
   - Format: `✅ PHASE X completed. Proceeding to PHASE Y...`
4. **Do NOT Stop Prematurely**: Continue execution until Step 6 (Cleanup) is fully complete
5. **Externalize Working Memory**: Store intermediate results in Memory MCP (after Steps 3 and 4) to reduce cognitive load
6. **Handle Uncertainty**: If data is unclear or incomplete, document the issue and proceed with best effort, noting all assumptions made
7. **Efficiency & Thoroughness**: Balance speed with accuracy - this is a production analysis workflow that requires both
8. **Self-Monitoring & Recovery**: Continuously monitor your own execution state:
   - After each tool call, check the `Output` panel in `GitHub Copilot Chat` for:
     - Tool execution errors or warnings
     - Unexpected empty results
     - Timeout messages
     - Missing expected data
   - If you detect you are stuck (e.g., waiting for tool results that never arrive, repeated failed attempts, no progress for >2 minutes):
     - **STOP** and analyze what went wrong
     - **DIAGNOSE**: Review the last 3-5 tool calls in the Output panel
     - **RECOVER**: Try alternative approaches:
       - Use different tool parameters
       - Break down the task into smaller steps
       - Switch to manual file operations if API calls fail
       - Ask user for clarification if data is fundamentally missing
     - **DOCUMENT**: Explain to the user what happened and what recovery action you took
   - Set internal checkpoints: If any phase takes >5 minutes without progress, trigger self-diagnostic
   - Use `get_terminal_output` or `get_task_output` tools to verify command completion

**📊 Complexity Management:**
- For Step 4.5 (Statistical Analysis): If calculations become highly complex, consider using a sub-agent for statistical computations
- Use parallel tool calls for independent data collection operations (Step 2)
- Break down large Work Item sets into batches if needed (e.g., 50-100 items per batch)

---

# Target
Collect all Work Items in the CTRM project tagged with `Ai Gen` via **ado mcp** and compare them with **comparable Work Items** from the DateRange that were created without this tag.
Provide an overview of the **average time savings** per Work Item type (Feature, PBI, Bug, Test Case), as well as a total overview of the estimated time savings for the entire CTRM project through the use of Agentic Requirements Engineering.
Additionally, provide an evaluation of time savings **grouped by department**, where departments are identified by the second position in the Area path (e.g., for `CTRM\CIA\CIA-Client Portal`, the department is `CIA`).

# Rules (do not repeat):
- Always think step by step and use **sequential thinking** to ensure a structured approach to the analysis.
- Use **strictly** `ado mcp` to search for Work Items and **nothing else**!.
- Analyze the time between Created and Approved or Ready for Flight of Work Items **realistically, incorporating comments and history as accurately as possible**.
- Also **consider the typical times in practice** required for creating a Feature, PBI, Test Case, or Bug.
- Calculate in **minutes**.
- Use **sequential thinking** to ensure a structured approach to the analysis.


# Workflow (Sequential Thinking enforced)

## 📋 PHASE 1: PREPARATION

### Step 1: **Preparations**

  ### 1.1: **MCP Server Initialization**
    1. **Check** `.vscode/mcp.json` and start the configured servers you need for the task
    2. **Verify** these MCP servers are active:
      - `sequential-thinking` - For complex problem analysis
      - `memory` - For context persistence and benchmark storage
      - `ado` - For Azure DevOps interactions
    3. **Retrieve** any existing benchmark data from Memory MCP for historical comparison (if available)

  ### 1.2: **Understand the task**
    1.2.1 **Read** the user prompt and parameters carefully.
    1.2.2 **Clarify** any ambiguities by asking targeted questions before proceeding.
    1.2.3 **Plan** the steps needed to complete the task using sequential thinking.
    1.2.4 **Work autonomously** and **without further questions or confirmations** once the requirements are clear. Execute all steps from data collection through final deliverables without stopping for approval. Only ask questions if something is genuinely unclear or ambiguous.

**✅ Checkpoint**: After completing Step 1, output: `✅ PHASE 1: PREPARATION completed. Proceeding to PHASE 2: DATA COLLECTION...`

---

## 🔍 PHASE 2: DATA COLLECTION

### Step 2: **Collect and Understand the Work Items**

  ### 2.1: Format and Filter AiGen Work Items
    2.1.1 **Create** a new subfolder in the `.assets/` folder with the current date in the format `analyze_time_savings_<date>`.
    2.1.2 **Locate** the `AiGen.csv` file:
      - If the file exists in the analysis subfolder, proceed to the next step.
      - If the file is in the context or elsewhere, **copy** it into the newly created subfolder.
      - If the file does not exist, **query** all Work Items with the `Ai Gen` tag from the CTRM project using `ado mcp` and **export** them to `AiGen.csv`.
    2.1.3 **Remove all** line breaks **inside columns** of the `AiGen.csv` file to ensure proper CSV formatting.
    2.1.4 **Filter** the `AiGen.csv` file to keep only entries within the specified `DateRange` parameter:
      - Use the `State Change Date` column for filtering.
      - If `State Change Date` is empty, use the `Created Date` column instead.
      - **Remove** all entries outside the date range.

  ### 2.2: Read and understand the Work Items inside `AiGen.csv`
    2.2.1 **Read** the cleaned and filtered `AiGen.csv` file.
    2.2.2 **Understand** all the textual content of each Work Item, including descriptions, comments, and history.

**✅ Checkpoint**: After completing Step 2, output: `✅ PHASE 2: DATA COLLECTION completed. Proceeding to PHASE 3: ANALYSIS...`

---

## 📊 PHASE 3: ANALYSIS

### Step 3: **Analyze the Work Items**

  ### 3.1 Estimation for Work Items without the tag `Ai Gen`:
    | Item                       | Reasonable Guideline | Typical Range | Short Comment                                                                                               |
    | -------------------------- | -------------------: | ------------: | ----------------------------------------------------------------------------------------------------------- |
    | Test Case (ca. 5 Steps)    |            **15–30** |         10–45 | 90 min is only justified for complex preconditions/test data. With template/Gherkin usually <30 min.        |
    | Product Backlog Item (PBI) |              **120** |        90–150 | Appropriate. Depends on quality of ACs, dependencies, and review loop.                                      |
    | Feature                    |              **300** |       240–480 | 180 is too small. Properly preparing a feature incl. scope, non-functional, interfaces: 4–8h is typical.    |
    | Bug                        |               **30** |         15–45 | 30 is a good average incl. repro, expected/actual, environment, logs/screens.                               |

  ### 3.2 Practical Heuristics (Proven)
  - **Feature** effort for writing ≈ 2–3x that of a good PBI.
  - A 5-step **Test Case** ≈ 0.1–0.25 of a PBI (i.e., 10–30 min when PBI ~120 min).
  - **Bug**: 15 min for simple repro, +15 min for artifacts/logs → ~30 min as planning value.
  - Effective work time in our teams is typically **6 hours per day**.
  - Average hourly rate for calculation: **CHF 120/hour** (for cost savings calculation).

  ### 3.3: **Collect Comparable Work Items without `Ai Gen` Tag**
    3.3.1 **Use** `ado mcp` work item search tools to query Work Items in the CTRM project that were created within the specified `DateRange` and do not have the `Ai Gen` tag.
    3.3.2 **Filter** these Work Items by type (Feature, PBI, Bug, Test Case) to match those found in the `AiGen.csv` file.
    3.3.3 **Export** the collected Work Items to a separate CSV file named `Comparison_WorkItems.csv` in the analysis subfolder for reference.

  ### 3.4: **Estimate Time for Work Items without `Ai Gen` Tag**
    3.4.1 **Use** the practical heuristics provided in sections 3.1 and 3.2 above to estimate the time taken for each type of Work Item without the `Ai Gen` tag.
    3.4.2 **Calculate** actual time for manual Work Items by analyzing their creation date, state changes, and history (same methodology as AI items).
    3.4.3 **Record** both estimated time (from heuristics) and actual time (from metadata) for comparison purposes.

  ### 3.5: **Calculate Actual Time for Work Items with `Ai Gen` Tag**
    3.5.1 **Reference** the CTRM WIKI (see `.github/instructions/project.copilot.instructions.md`) for work item state definitions and workflows.
    3.5.2 **Analyze** the actual time taken for each Work Item in the `AiGen.csv` file based on their creation date, state changes, comments, work item history, and other metadata.
    3.5.3 **Calculate** and **record** the following time metrics:
      - **Calendar Time**: Total time between creation and first target state (Feature: "Ready for Flight", PBI: "Committed", Bug: "Approved", Test Case: "Ready")
      - **Active Work Time**: Estimated active time based on frequency of updates/comments (to account for periods of inactivity)
      - **Time to First State Change**: Time between creation and first meaningful state change (indicates initial work effort)
    3.5.4 **Store** these calculated times in new columns in the `AiGen.csv` file: `Calendar_Time_Minutes`, `Active_Work_Time_Minutes`, `Time_To_First_Change_Minutes`.
    3.5.5 **Note**: For comparison fairness, use Active Work Time as the primary metric to avoid bias from long periods of inactivity common in manual work items.

  ### 3.6: **Quality Assessment with Scoring Rubric**
    3.6.1 **Apply** the following quality scoring rubric to each Work Item in the `AiGen.csv` file:

    **Quality Scoring Rubric (Total: 100 points)**
    
    **For Features & PBIs (100 points total):**
    - Acceptance Criteria completeness (25 points):
      - All critical scenarios covered: 25 pts
      - Most scenarios covered: 15 pts
      - Minimal coverage: 5 pts
      - Missing/inadequate: 0 pts
    - GIVEN-WHEN-THEN format adherence (20 points):
      - Consistent use throughout: 20 pts
      - Partial use: 10 pts
      - Not used: 0 pts
    - IREB Requirements Quality (20 points):
      - Clear, unambiguous, testable, complete: 20 pts
      - Mostly clear with minor issues: 12 pts
      - Unclear or ambiguous: 5 pts
      - Poor quality: 0 pts
    - Flight Levels / OKR alignment (15 points):
      - Clear value/outcome defined: 15 pts
      - Partially defined: 8 pts
      - Missing: 0 pts
    - Dependencies & Non-functional requirements (10 points):
      - Fully documented: 10 pts
      - Partially documented: 5 pts
      - Missing: 0 pts
    - CTRM process compliance (10 points):
      - All mandatory fields complete: 10 pts
      - Some fields missing: 5 pts
      - Major gaps: 0 pts

    **For Test Cases (100 points total):**
    - ISTQB test case structure (30 points):
      - Complete structure (preconditions, steps, expected results): 30 pts
      - Partially complete: 15 pts
      - Incomplete: 5 pts
    - Test steps clarity (25 points):
      - Clear, unambiguous, repeatable: 25 pts
      - Mostly clear: 15 pts
      - Unclear: 5 pts
    - Expected results precision (25 points):
      - Precise, measurable results: 25 pts
      - Generic results: 10 pts
      - Vague: 0 pts
    - Test data & prerequisites (20 points):
      - Fully specified: 20 pts
      - Partially specified: 10 pts
      - Missing: 0 pts

    **For Bugs (100 points total):**
    - Reproduction steps completeness (40 points):
      - Detailed, repeatable steps: 40 pts
      - Partial steps: 20 pts
      - Incomplete: 5 pts
    - Expected vs Actual behavior (30 points):
      - Both clearly stated: 30 pts
      - One clear, one vague: 15 pts
      - Both vague: 5 pts
    - Environment & logs documentation (20 points):
      - Complete documentation: 20 pts
      - Partial: 10 pts
      - Missing: 0 pts
    - Screenshots/attachments (10 points):
      - Helpful visuals included: 10 pts
      - Missing: 0 pts

    3.6.2 **Assign Confidence Level** to each quality assessment:
      - **High Confidence** (90-100%): Clear criteria, all information available
      - **Medium Confidence** (70-89%): Most criteria applicable, some judgment required
      - **Low Confidence** (50-69%): Limited information, significant judgment required
      - **Very Low Confidence** (<50%): Insufficient information for reliable assessment

    3.6.3 **Add** new columns to the `AiGen.csv` file:
      - `Quality_Score` (0-100)
      - `Confidence_Level` (High/Medium/Low/Very Low)
      - `Confidence_Percentage` (0-100%)
      - `Quality_Assessment_Notes` (brief explanation of scoring)

    3.6.4 **Calculate** quality scores for comparable manual Work Items (from `Comparison_WorkItems.csv`) using the same rubric for fair comparison.

**💾 Memory Checkpoint**: After completing Step 3 analysis, store intermediate results in Memory MCP:
- Entity: `TimeSavingsAnalysis_{DateRange}`
- Observations: Store all estimation tables, quality scores, and confidence levels for each Work Item analyzed
- This externalizes working memory and allows recovery if needed

**✅ Checkpoint**: After completing Step 3, output: `✅ PHASE 3: ANALYSIS completed. Intermediate results stored in Memory MCP. Proceeding to PHASE 4: CALCULATIONS...`

---

## 🧮 PHASE 4: CALCULATIONS

### Step 4: **Calculate and Document Time Savings and Quality Improvements**

  ### 4.1: **Calculate Time Savings**
    4.1.1 **Compare** the estimated times for Work Items with and without the `Ai Gen` tag.
    4.1.2 **Calculate** the average time savings per Work Item type.
    4.1.3 **Aggregate** the total estimated time savings for the entire CTRM project.

  ### 4.2: **Quality Improvements**
    4.2.1 **Analyze** the quality factors assigned to the Work Items with the `Ai Gen` tag.
    4.2.2 **Document** any notable improvements in quality compared to standard expectations.

  ### 4.3: **Departmental Analysis**
    4.3.1 **Group** the Work Items by department based on the second position in the Area path (e.g., for `CTRM\CIA\CIA-Client Portal`, the department is `CIA`).
    4.3.2 **Handle** any Work Items with non-standard Area path structures by categorizing them as `Unknown` department.
    4.3.3 **Calculate** and **aggregate** the time savings for each department, including total minutes saved and percentage improvement.

  ### 4.4: **User-Level Analysis**
    4.4.1 **Extract** the `Assigned To` field from each Work Item to identify the user/author.
    4.4.2 **Calculate** total number of unique ARE users (users who created AI-generated Work Items in the analysis period).
    4.4.3 **Group** Work Items by user and calculate:
      - Total Work Items created per user (AI-generated vs manual)
      - Average time savings per user
      - Average quality score per user
      - Total time saved per user (in minutes and hours)
    4.4.4 **Identify** top performers who achieved the highest time savings and quality scores using ARE (Agentic Requirements Engineering).
    4.4.5 **Export** user-level statistics to a new CSV file: `User_Level_Analysis.csv`
    4.4.6 **Store** the total count of unique ARE users for inclusion in reports and dashboards.

  ### 4.5: **Statistical Significance Analysis**
    4.5.1 **Calculate** sample sizes for each Work Item type (AI-generated vs manual).
    4.5.2 **Compute** mean and standard deviation for time savings in each category.
    4.5.3 **Calculate** 95% confidence intervals for time savings estimates.
    4.5.4 **Perform** statistical tests (e.g., t-test) to determine if time savings are statistically significant (p-value < 0.05).
    4.5.5 **Document** statistical findings including:
      - Sample sizes (n)
      - Mean time savings with confidence intervals
      - Statistical significance indicators
      - Notes on reliability based on sample size

  ### 4.6: **Cost Savings Calculation**
    4.6.1 **Convert** time savings to cost savings using the hourly rate from section 3.2 (CHF 120/hour).
    4.6.2 **Calculate** for each category:
      - Total minutes saved
      - Total hours saved (minutes ÷ 60)
      - Total cost savings (hours × CHF 120)
      - Cost savings per Work Item
    4.6.3 **Calculate** ROI (Return on Investment) if ARE tool costs are known.
    4.6.4 **Express** cost savings in terms of FTE (Full Time Equivalent):
      - FTE saved = Total hours saved ÷ (6 hours/day × 220 working days/year)
    4.6.5 **Add** cost-related columns to result files: `Cost_Savings_CHF`, `Hours_Saved`

**💾 Memory Checkpoint**: After completing Step 4 calculations, store calculation results in Memory MCP:
- Entity: `TimeSavingsCalculations_{DateRange}`
- Observations: Store all calculated metrics (time savings, quality improvements, cost savings, FTE impact, statistical significance)
- This provides checkpoint before final reporting phase

**✅ Checkpoint**: After completing Step 4, output: `✅ PHASE 4: CALCULATIONS completed. Results stored in Memory MCP. Proceeding to PHASE 5: REPORTING...`

---

## 📝 PHASE 5: REPORTING

### Step 5: **Reporting**

  ### 5.1: **Document Findings in Management Report**
    5.1.1 **Create** a comprehensive management report with the following structure:

    **A. Executive Summary** (1 page maximum):
      - Key findings at a glance
      - Total number of active ARE users in the analysis period
      - Total time savings (minutes, hours, FTE)
      - Total cost savings (CHF)
      - Overall quality score improvements
      - Top 3 recommendations
      - ROI summary (if applicable)

    **B. Detailed Findings**:
      - Average time savings per Work Item type (with confidence intervals)
      - Average time savings per User (top performers highlighted)
      - Total estimated time savings for the CTRM project
      - Quality improvements observed (total and by department/Work Item type)
      - Departmental time savings analysis
      - Statistical significance results
      - Cost savings breakdown

    **C. Quality Assessment Results**:
      - Average quality scores by Work Item type
      - Comparison of AI-generated vs manual Work Items quality
      - Confidence levels summary
      - Key quality improvements

    **D. Recommendations**:
      - **Primary Recommendation**: Expand the use of ARE (Agentic Requirements Engineering) tool across all teams. All `Ai Gen` tagged Work Items were created using this tool, demonstrating significant time and quality benefits.
      - Identify departments/teams with low ARE adoption for targeted training
      - Expand ARE user base from current count to broader team adoption
      - Best practices from top-performing users
      - Areas for process improvement
      - Suggested KPIs for ongoing monitoring

    **E. Methodology** (Transparency Section):
      - Data collection approach (including ARE user identification)
      - Time calculation methodology (Calendar Time vs Active Work Time)
      - Quality scoring rubric details
      - Statistical methods used
      - Assumptions and limitations
      - Heuristics and estimation guidelines
      - Cost calculation basis (CHF 120/hour rate)
      - ARE Users: Count and list of unique users who created AI-generated Work Items

    5.1.2 **Save** the report as a markdown file named `Time_Savings_Analysis_Report_<DateRange>.md` in the analysis subfolder.

  ### 5.2: **Interactive Dashboard and Visualizations**
    5.2.1 **Generate** the following visualizations:
      - **Bar Chart**: Time savings by Work Item type (AI vs Manual)
      - **Bar Chart**: Cost savings by Work Item type
      - **Pie Chart**: Distribution of Work Items by department
      - **Line/Bar Chart**: Time savings by department
      - **Scatter Plot**: Quality Score vs Time Savings correlation
      - **Table**: Top 10 users by time savings
      - **Heat Map**: Quality scores by department and Work Item type
      - **Box Plot**: Time distribution comparison (AI vs Manual) with confidence intervals

    5.2.2 **Create** an interactive single-page HTML dashboard named `Time_Savings_Dashboard_<DateRange>.html` with:
      - **Interactive filters**: Department, Work Item Type, Date Range, User
      - **Drill-down capability**: Click on charts to see detailed data
      - **Responsive design**: Works on desktop and mobile
      - **Chart library**: Use Chart.js or D3.js for interactivity
      - **Summary cards** at top: Total Time Saved, Total Cost Saved, Average Quality Improvement, FTE Saved, **ARE Users Count**
      - **Export functionality**: Allow users to download filtered data as CSV
      - **Tooltips**: Show detailed information on hover

    5.2.3 **Apply Corporate Identity (CI) to the Dashboard**:
      
      **Color Palette (STRICT - use exactly these hex values):**
      ```javascript
      const brandColors = {
          primary: '#C5003E',      // Brand Red (main brand color)
          secondary: '#000000',    // Brand Black
          tertiary: '#8C8C8C',     // Brand Gray
          lightGray: '#E0E0E0',    // Brand Light Gray
          white: '#FFFFFF',        // White
          success: '#26de81',      // Keep for positive indicators
          warning: '#ffeaa7',      // Keep for warnings
          danger: '#fc5c65'        // Keep for negative indicators
      };
      ```

      **Typography:**
      - Font Family: `'Segoe UI', Tahoma, Geneva, Verdana, sans-serif` (fallback chain)
      - Headings: Bold, Brand Red (#C5003E)
      - Body Text: Regular, Dark Gray (#333333)

      **Gradients:**
      - Primary Gradient: `linear-gradient(135deg, #C5003E 0%, #8B0000 100%)`
      - Use for: Body background, KPI cards, table headers

      **Component Styling:**
      - **KPI Cards**: 
        - Background: Primary gradient (Red → Dark Red)
        - Text: White
        - Shadow: `0 4px 6px rgba(0, 0, 0, 0.1)`
        - Border Radius: 10px
      
      - **Charts**:
        - Primary bars/areas: Brand Red (#C5003E)
        - Secondary elements: Black (#000000)
        - Tertiary elements: Gray (#8C8C8C)
        - Background: Light gray (#f8f9fa)
      
      - **Tables**:
        - Header: Primary gradient
        - Header Text: White
        - Alternating rows: Light gray (#f8f9fa) and white
        - Hover: #e9ecef
      
      - **Titles & Labels**:
        - Color: Brand Red (#C5003E)
        - Font Weight: 600 (semi-bold)

      **Chart Color Order (for multi-series):**
      1. Brand Red (#C5003E)
      2. Brand Black (#000000)
      3. Brand Gray (#8C8C8C)
      4. Light Gray (#E0E0E0)
      5. Success Green (for positive metrics only)
      6. Warning Yellow (for alerts only)

      **Accessibility:**
      - Ensure sufficient contrast ratios (WCAG AA minimum)
      - Red text on white background: Use #C5003E
      - White text on red background: Use gradient or solid #C5003E

    5.2.4 **Include** static versions of key visualizations in the markdown management report.

  ### 5.3: **Store Benchmark Data in Memory MCP**
    5.3.1 **Prepare** benchmark data for long-term storage:
      - Analysis date and date range
      - Summary statistics (total time saved, avg quality scores, etc.)
      - Key metrics by Work Item type and department
      - Sample sizes and confidence intervals

    5.3.2 **Store** the benchmark data in Memory MCP using structured entities:
      - Entity type: "ARE_Benchmark"
      - Include analysis period identifier
      - Tag with relevant metadata (quarter, year, departments)

    5.3.3 **Create** relations between current analysis and previous benchmarks for trend tracking.

    5.3.4 **Generate** a trend comparison if historical benchmark data exists:
      - Compare current results with previous periods
      - Calculate improvement/regression trends
      - Add trend analysis section to the report

**✅ Checkpoint**: After completing Step 5, output: `✅ PHASE 5: REPORTING completed. Proceeding to PHASE 6: CLEANUP...`

---

## 🧹 PHASE 6: CLEANUP

### Step 6: **Cleanup**
  ### 6.1: **Remove Temporary Files**
    6.1.1 **Identify** and **delete** temporary files created during the analysis:
      - PowerShell scripts (.ps1)
      - Python scripts (.py)
      - Temporary data processing files
      - Intermediate CSV files not marked as deliverables
      - Cache files
      - Log files

    6.1.2 **Keep** all deliverable files:
      - `AiGen.csv` (with added analysis columns)
      - `Comparison_WorkItems.csv`
      - `User_Level_Analysis.csv`
      - `Time_Savings_Analysis_Report_<DateRange>.md`
      - `Time_Savings_Dashboard_<DateRange>.html`
      - All visualization image files referenced in the report

    6.1.3 **Verify** that the analysis subfolder contains only deliverables and required data files.

**✅ Final Checkpoint**: After completing Step 6, output: `✅ PHASE 6: CLEANUP completed. All steps (1-6) finished successfully. Analysis workflow complete.`

---

# 🎉 Workflow Complete

You have successfully completed the Time Savings Analysis workflow. All phases executed, data stored in Memory MCP, and final deliverables generated.
