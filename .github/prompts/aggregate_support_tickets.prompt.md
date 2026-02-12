---
agent: 'agent'
model: 'Auto'
tools: ['vscode', 'execute', 'read', 'agent', 'edit', 'search', 'web', 'ado/*', 'memory/*', 'sequential-thinking/*', 'todo']
description: Aggregate Support Tickets from CSV to JSON knowledge graph with ADO enrichment.
---
parameters:
  - name: CsvPath
    label: Path to the Support Tickets CSV file (e.g., .assets/SupportTickets/Tickets.csv)
    type: string
    required: true
  - name: OutputFolder
    label: Output folder for the JSON graph (e.g., .assets/SupportTickets)
    type: string
    required: true
---

# Context

<role>
You are a **Data Engineering Agent** specialized in building knowledge graphs from Azure DevOps Work Items.
Your mission is to transform raw CSV exports into enriched JSON graphs that enable powerful downstream analysis.
</role>

<background>
Support Ticket data from Azure DevOps contains valuable insights about:
- Issue patterns and recurring problems
- Resolution times and bottlenecks
- Team workload distribution
- Cross-ticket relationships and dependencies

A well-structured knowledge graph makes this data queryable and analyzable.
</background>

---

# Instructions

<instructions>
Always follow these instruction files:
- `.github/instructions/copilot.instructions.md`
- `.github/instructions/project.copilot.instructions.md`
- `.github/instructions/user.copilot.instructions.md`
</instructions>

---

# Critical Execution Rules

<execution_rules>
1. **Use Sequential Thinking**: For complex analysis steps, use sequential thinking MCP to break down reasoning
2. **Work Autonomously**: Complete ALL phases without stopping for user confirmation
3. **Progress Updates**: After each phase, output: `✅ PHASE X completed. Proceeding to PHASE Y...`
4. **Handle Errors Gracefully**: If API calls fail, retry with backoff. Document failures and continue.
5. **Validate Data**: After each enrichment step, verify data integrity before proceeding
6. **Store Progress**: Save the graph after each enrichment phase to avoid data loss
</execution_rules>

---

# Workflow

## PHASE 1: CSV ANALYSIS & GRAPH CREATION

<phase_1>
### Step 1.1: Analyze CSV Structure
1. **Read** the first 50-100 rows of the CSV at `{{CsvPath}}`
2. **Identify** all columns and their data types
3. **Detect** encoding (handle BOM with `utf-8-sig` if needed)
4. **Document** the CSV structure for reference

### Step 1.2: Create Python Script for Graph Building
Create a Python script `build_ticket_graph.py` in `{{OutputFolder}}` that:

<graph_structure>
**Nodes to extract:**
- `tickets`: Main ticket data (id, type, state, title, description_preview, area, created, closed, tags, assignee, comment_count, related_links)
- `categories`: Work Item Types (Support Ticket, Issue, Feature, Bug, PBI)
- `states`: Ticket states (New, Active, Committed, Done, etc.)
- `areas`: Area paths parsed into hierarchy
- `tags`: All unique tags
- `timeframes`: Created date grouped by quarter (Q1 2025, Q2 2025, etc.)
- `products`: Extracted from tags matching product patterns
- `assignees`: Unique assignees
- `issue_types`: Extracted from tags matching issue patterns

**Edges to create:**
- `ticket_to_category`: ticket → work item type
- `ticket_to_state`: ticket → state
- `ticket_to_area`: ticket → area
- `ticket_to_tags`: ticket → tags (multiple)
- `ticket_to_timeframe`: ticket → quarter
- `ticket_to_product`: ticket → product (if found in tags)
- `ticket_to_assignee`: ticket → assignee
- `ticket_to_issue_type`: ticket → issue type (if found in tags)
- `ticket_references`: ticket → referenced ticket IDs (from description)
</graph_structure>

<helper_functions>
Include these helper functions:
- `strip_html(text)`: Remove HTML tags, decode entities
- `extract_work_item_references(text)`: Find #XXXXX patterns in description
- `parse_area_path(path)`: Split area path into components
- `parse_date(date_str)`: Parse dates, extract quarter
- `extract_products(tags)`: Match tags against product patterns
- `extract_issue_types(tags)`: Match tags against issue type patterns
</helper_functions>

### Step 1.3: Execute Graph Building
1. **Run** the script to generate `supporttickets_YYYY-MM-DD.json`
2. **Verify** the output contains all expected node types
3. **Report** ticket count and node/edge statistics
</phase_1>

**✅ Checkpoint**: `✅ PHASE 1 completed. Graph created with X tickets. Proceeding to PHASE 2...`

---

## PHASE 2: COMMENT ENRICHMENT

<phase_2>
### Step 2.1: Identify Tickets with Comments
1. **Filter** tickets where `comment_count > 0`
2. **Count** how many need comment fetching
3. **Skip** this phase if no tickets have comments

### Step 2.2: Create Comment Enrichment Script
Create `enrich_graph_with_comments.py` that:

<comment_fetching>
**API Configuration:**
- Organization: <ask_for_the_organization>
- Project: `CTRM`
- API Version: `7.1-preview.4`
- Endpoint: `/_apis/wit/workItems/{id}/comments`

**Rate Limiting:**
- Batch size: 50 tickets
- Delay between requests: 0.1 seconds
- Delay after batch: 1.0 seconds
- Save progress after each batch

**Comment Structure to Store:**
```json
{
  "total_count": 2,
  "fetched_at": "2026-02-06T14:00:00",
  "comments": [
    {
      "id": 12345,
      "date": "2025-08-26T08:06:10Z",
      "author": "Name (Department)",
      "author_email": "email@<ask_for_the_organization>.ch",
      "text_html": "<p>Original HTML</p>",
      "text_clean": "Cleaned plain text",
      "mentions": []
    }
  ]
}
```
</comment_fetching>

### Step 2.3: Execute Comment Enrichment
1. **Get** Azure AD token via `az account get-access-token`
2. **Run** the script
3. **Verify** comments were added correctly
4. **Update** graph metadata with enrichment timestamp
</phase_2>

**✅ Checkpoint**: `✅ PHASE 2 completed. X comments fetched for Y tickets. Proceeding to PHASE 3...`

---

## PHASE 3: RELATION ENRICHMENT

<phase_3>
### Step 3.1: Identify Tickets with Relations
1. **Filter** tickets where `related_links > 0`
2. **Count** how many need relation fetching
3. **Skip** this phase if no tickets have relations

### Step 3.2: Create Relation Enrichment Script
Create `enrich_graph_with_relations.py` that:

<relation_fetching>
**API Configuration:**
- Endpoint: `/_apis/wit/workitems/{id}?$expand=relations`
- API Version: `7.1`

**Relation Types to Map:**
| Raw Type | Friendly Name |
|----------|---------------|
| System.LinkTypes.Related | Related |
| System.LinkTypes.Hierarchy-Forward | Child |
| System.LinkTypes.Hierarchy-Reverse | Parent |
| System.LinkTypes.Dependency-Forward | Successor |
| System.LinkTypes.Dependency-Reverse | Predecessor |
| Microsoft.VSTS.Common.Affects-Forward | Affects |
| Microsoft.VSTS.Common.Affects-Reverse | Affected By |
| System.LinkTypes.Duplicate-Forward | Duplicate Of |
| System.LinkTypes.Duplicate-Reverse | Duplicate |

**New Nodes to Create:**
- `related_items`: All target IDs from relations
  - `id`: Work Item ID
  - `in_graph`: Boolean - is this ID in our tickets?
  - `linked_from_count`: How many tickets link to this
  - `linked_from`: List of source ticket IDs
  - `relation_types`: List of relation types

**New Edges:**
- `ticket_to_related`: Source ticket → related item with relation_type
</relation_fetching>

### Step 3.3: Execute Relation Enrichment
1. **Run** the script
2. **Build** `related_items` nodes from all fetched relations
3. **Create** `ticket_to_related` edges
4. **Update** graph metadata
</phase_3>

**✅ Checkpoint**: `✅ PHASE 3 completed. X relations fetched, Y related_items nodes created. Proceeding to validation...`

---

## PHASE 4: VALIDATION & SUMMARY

<phase_4>
### Step 4.1: Validate Graph Integrity
1. **Check** all node arrays are populated
2. **Verify** edge counts match expectations
3. **Confirm** metadata is complete

### Step 4.2: Generate Summary
Output a summary table:

| Metric | Value |
|--------|-------|
| Total Tickets | X |
| Node Types | 10+ |
| Edge Types | 10+ |
| Tickets with Comments | X |
| Total Comments Fetched | X |
| Tickets with Relations | X |
| Total Relations | X |
| Related Items (internal) | X |
| Related Items (external) | X |
| Graph File Size | X MB |

### Step 4.3: Document Output
The final graph structure is ready for analysis with:
- Full ticket data with metadata
- Comments for tickets that have them
- Relations and linked work items
- Calculated fields and aggregations
</phase_4>

**✅ Final**: `✅ PHASE 4 completed. Knowledge graph ready at {{OutputFolder}}/supporttickets_YYYY-MM-DD.json`

---

# Output Specification

<output_spec>
**Primary Deliverable:**
`{{OutputFolder}}/supporttickets_YYYY-MM-DD.json`

**Structure:**
```json
{
  "metadata": {
    "created": "ISO timestamp",
    "source": "CSV filename",
    "total_tickets": 17751,
    "comments_enriched": true,
    "comments_enriched_at": "ISO timestamp",
    "tickets_with_comments": 1247,
    "total_comments_fetched": 1901,
    "relations_enriched": true,
    "relations_enriched_at": "ISO timestamp",
    "tickets_with_relations": 179,
    "total_relations_fetched": 409,
    "related_items_count": 301
  },
  "statistics": {
    "by_state": {...},
    "by_category": {...},
    "by_area": {...}
  },
  "nodes": {
    "tickets": [...],
    "categories": [...],
    "states": [...],
    "areas": [...],
    "tags": [...],
    "timeframes": [...],
    "products": [...],
    "assignees": [...],
    "issue_types": [...],
    "related_items": [...]
  },
  "edges": {
    "ticket_to_category": [...],
    "ticket_to_state": [...],
    "ticket_to_related": [...]
  }
}
```

**Supporting Scripts (keep for reproducibility):**
- `build_ticket_graph.py`
- `enrich_graph_with_comments.py`
- `enrich_graph_with_relations.py`
</output_spec>

---

# Error Handling

<error_handling>
**CSV Encoding Issues:**
- Try `utf-8-sig` first (handles BOM)
- Fall back to `utf-8` then `latin-1`

**API Rate Limits:**
- Implement exponential backoff
- Save progress after each batch
- Resume from last saved state

**Missing Data:**
- Log missing fields, don't fail
- Use empty arrays/null for missing optional data
- Document data quality issues in metadata

**Token Expiration:**
- Refresh token if 401 received
- Use `az account get-access-token` for fresh token
</error_handling>
