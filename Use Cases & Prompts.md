[TODO]











# Data Collection Requirements

## Work Item Search Criteria:
- [System.TeamProject] = 'CTRM'
- [System.AreaPath] UNDER 'CTRM\CIA\CIA-Client Portal'
- [System.WorkItemType] = 'Bug'
- [System.Tags] CONTAINS 'Bereichsübergreifend'
- [System.State] <> 'Removed'
- [System.CreatedDate] >= @startOfDay('-365d')


- **Project**: CTRM
- **Primary Filter**: Items tagged with "Bereichsübergreifend"
- **Item Types**:
  - Issues tagged with "Bereichsübergreifend"
  - Bugs tagged with "Bereichsübergreifend" that are NOT 'Related' or 'Child' of Issues
- **Deduplication**: Ensure no duplicate items in the final list

## Work Item Hierarchy Structure:
```
Issue → Bug (Related) → Task (Child of Bug)
Bug → Task (Child of Bug)
```
*Reference: Work Item ID 837959 for hierarchy analysis*

# Processing Time Calculation Methodology

## Core Principle:
**Real development time** = Development Hours + Review Hours

## Calculation Formula:
```
ProcessingTime = DevelopmentHours + ReviewHours
DevelopmentHours = Sum(CommitSpan per PR)
ReviewHours = Sum(PR_Created to PR_Merged timespan)
```
## Technical Implementation APIs:
- `mcp_ado_wit_get_work_item`: Work Item Details & Relations
- `mcp_ado_repo_list_pull_requests_by_commits`: PR-Work Item Links
- `mcp_ado_repo_search_commits`: Commit Timeline Analysis
- `mcp_ado_repo_get_pull_request_by_id`: PR Creation/Merge Times

## Fallback Calculation (when no PRs linked):
```javascript
complexityFactor = estimateComplexity(title, type) // 0.3-1.0
dailyHours = Math.min(6, 2 + complexityFactor * 2) // 2-6h per day
workingDays = calculateWorkingDays(created, completed) // Mo-Fr only
processingTime = workingDays * dailyHours * typeMultiplier
```

## Specific Calculation Rules:

### For Standalone Bugs:
- Analyze all linked Pull Requests
- **Development Time**: Time span between first and last commit per PR
- **Review Time**: PR Created to Merged timespan
- **Fallback**: Complexity-based estimation if no PRs linked

### For Bugs with Child Tasks:
- Aggregate Tasks into their Parent Bugs
- Commit analysis for all linked Tasks
- Calculate total development time for the Bug complex

### For Issues:
- Aggregate all linked Child-Bugs
- If no Child-Items: Direct PR analysis of the Issue
- **Fallback**: Complexity-based estimation

## Expected Time Ranges:
- **Git-based transparency**: All calculations traceable through Git history

# Factory Grouping Logic

Each work item with "Bereichsübergreifend" tag should have an additional factory-specific tag:
- **Format**: "Bereichsübergreifend: [FACTORY_CODE]" (e.g., "Bereichsübergreifend: LPZ")
- **Default**: If no factory-specific tag exists, assign "Unbekannt"
- **FACTORY_CODE**s: 
  - LPZ => Lienhardt & Partner
  - IU => Unternehmenskunden  
  - IP => Investment Products
  - WM => Wealth Management
  - HYPOS => Hypothekargeschäft
  - EV => Einzelversicherung
  - "Unbekannt" => For work items only tagged with "Bereichsübergreifend" without specific factory tags

# Dashboard Output Requirements

## Interactive HTML Dashboard Features:
- **Single standalone HTML file** (no server required)
- **Swiss Life Corporate Design** like "Screenshot KuPo.png"

## Core Components:

### 1. Interactive Pie Chart
- Time distribution by factory categories
- Click-through navigation

### 2. Enhanced Data Table
**Columns Required**:
- Work Item ID & Title
- Factory Category
- **PR/Commit Details**: Number of linked PRs and commits
- **Repository Links**: Direct links to source code
- **Processing Time**: Git-based realistic time calculation
- **Development vs Review Time**: Separate breakdown
- Status and Priority

### 3. Summary Statistics
- **Total Processing Time**: Realistic Git-based calculations
- **Time Distribution**: By factory and work item type
- **Repository Coverage**: Percentage of items with linked PRs/commits

### 4. Interactive Features
- **Search functionality**: Filter work items by any column
- **Export to CSV**: Include PR/Commit information
- **PR Tooltips**: Hover details for Pull Request information
- **Commit Counter**: Visual indicators for commit activity
- **Repository Navigation**: Direct links to source repositories

### 5. Methodology Card
- Explanation of calculation approach
- Display of realistic processing time ranges
- Git history traceability information

## Technical Implementation Notes for Claude Sonnet 4:

1. **Data Analysis Priority**: Focus on accurate PR/commit time calculation over estimated hours
2. **Repository Integration**: Ensure proper linking between work items and source code repositories  
3. **Performance Optimization**: Handle large datasets efficiently for 12-month analysis
4. **Error Handling**: Provide fallback calculations when Git data is unavailable
5. **Visualization**: Create clear, interactive charts showing realistic time distributions

The dashboard should demonstrate **transparent, Git-based time tracking** that provides actionable insights into actual development effort for cross-departmental work items.
