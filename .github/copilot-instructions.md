---
description: AI rules derived by SpecStory from the project AI interaction history
globs: *
---

## HEADERS

This document defines the rules and guidelines for the AI coding assistant to follow while working on this project. It covers project-specific instructions, coding standards, workflow guidelines, references, documentation structure, and best practices. The goal is to ensure consistency, quality, and maintainability across the project.

## PROJECT RULES

### General Instructions
*   Adhere to the specific instructions provided in each user interaction.
*   When asked to analyze or implement something, always consider the current project context.
*   If a request is ambiguous, ask for clarification before proceeding.
*   Always prioritise permanent rules over single-interaction requests.

### Versioning
*   All version updates and references to version changes should be recorded under the relevant section(s).

## TECH STACK

*   Programming Languages: C#, JavaScript, SQL
*   Frameworks: .NET, React
*   Databases: Azure SQL Database
*   Cloud Platform: Azure DevOps
*   Testing: NUnit, Jest
*   ADO MCP (Azure DevOps Microservice Communication Protocol)
*   PDF reader MCP

## PROJECT DOCUMENTATION & CONTEXT SYSTEM

### Context System
*   The AI coding assistant should refer to the existing documentation for project-specific information.
*   Use the file system to store and retrieve project-related context.
*   When asked a question, first check the existing documentation for the answer.
*   If the answer is not found, use external resources (e.g., Google, Stack Overflow).
*   Always cite the source of the information.

## TESTING

### General Guidelines
*   Write unit tests for all new code.
*   Write integration tests for complex interactions.
*   Use a test-driven development (TDD) approach.
*   Ensure all tests pass before committing code.
*   Test cases must validate the requirements, not just the end result.

### Test Types
*   Unit Tests: Verify the correctness of individual components in isolation.
*   Integration Tests: Verify the interaction between different components.
*   End-to-End Tests: Verify the end-to-end functionality of the system.
*   Performance Tests: Measure the performance of the system under load.
*   Security Tests: Identify potential security vulnerabilities.

## AZURE DEVOPS

### General Guidelines
*   Use Azure DevOps for source control, CI/CD, and project management.
*   Follow the specified branching strategy.
*   Create work items for all tasks, bugs, and features.
*   Use the Kanban board to track the progress of work items.
*   Use the test plans to manage and execute tests.
*   When creating Test Cases in Azure DevOps, set the Area Path to 'CTRM\IT\IT-TREX'.
*   The team's channel is '01 TREX Public'.

### ADO MCP (Azure DevOps Microservice Communication Protocol)
*   Use the ADO MCP to interact with Azure DevOps programmatically.
*   Use the `mcp_ado_workitem_create` command to create work items.
*   Use the `mcp_ado_workitem_update` command to update work items.
*   Use the `mcp_ado_testplan_create_test_case` command to create test cases.
*   Use the `mcp_ado_testplan_add_test_cases_to_suite` command to add test cases to test suites.
*   Use the `mcp_ado_testplan_link_test_cases_to_requirement` to link test cases to requirements.
*   If data access is limited, ask for clarification or suggest queries to export data.

## VIBE REQUIREMENT ENGINEERING

### General Guidelines

Apply Vibe RE for Azure DevOps Work Item analysis to identify inefficiencies and propose improvements. Act as a fact-driven analytic consultant.

### Step-by-Step Analysis

Use step-by-step reasoning. Adapt if data incomplete; note assumptions.

### Data Collection

Compile Work Items with attributes: ID, Title, Type, Sprint assignments, Status changes, Dates, Estimates, Links, Delay notes. Summarize internally.

### Key Insights

*   PBI Shifts: Count shifts per PBI/Sprint; identify patterns (e.g., frequent movers, averages).
*   Sprint Failures: Per Sprint, analyze causes (e.g., scope creep, underestimation) from histories.
*   PBI Categorization: Classify into Mandate (core reqs), Operation (maintenance), Upskilling (learning), Waste (non-value). Provide breakdown with confidence notes.

### Root Cause Analysis

Analyze why Sprints fail and bug waves accumulate. Integrate:

*   SCRUM: Poor planning/estimation.
*   IREB: Ambiguous requirements.
*   Flight Levels: Misalignments across levels (Team, Coordination, Strategy).
*   OKR: Unclear objectives leading to misprioritization.

Output structured summary with evidence.

### Action Catalog

Create 3-6 month plan with role-specific recommendations:

*   PO: Refine backlog via IREB; Set OKRs for prioritization.
*   REs: Enhance specs to cut bugs; Early categorization.
*   Scrum Master: Improve retros; Apply Flight Levels for flow.
*   Team: Accurate estimation; Reduce Waste via SCRUM.

Structure as Markdown table: | Action | Role | Timeline | Framework | Outcome |

## TEST CASE GUIDELINES

### General Instructions
*   Test cases must validate the requirements, not just the end result.
*   Follow the specified test case format.
*   Ensure all test cases have detailed, verifiable expected outcomes.
*   Prioritise requirements-based testing.
*   Aim for 100% coverage of acceptance criteria.

### Test Case Format
| Field | Content |
|---|---|
| Title | <Concise title> |
| Requirement ID(s) | <Reference number(s)> |
| Type | Positive / Negative |
| Preconditions | <System state, data, user role> |
| Test Steps | 1. … 2. … (imperative) |
| Expected Result | <Observable behaviour that proves requirement> |
| Priority | 2 |
| Area Path | CTRM\\IT\\IT-TREX |
| Test Plan ID | 772705 |

### Expected Results
*   "Verify step completes successfully" is NOT an acceptable 'Expected Result'.
*   Describe ALL Expected result detaillierter
*   Each step must contain a clear, verifiable expectation.
*   Pauschale Formulierungen are not allowed.

## Uebenext Specification

### Level Definitions

*   Level 0: Geschäftsziele / Projektziele. Je nach Vorhaben Ableitung aus Geschäftsfzielen. Notation: Freitext. ADO: n/a. Nutzen: Das WOZU wird klar
*   Level 1: Ende-to-End Prozesse. Geschäftsfälle aus Sicht des Business. Notation: BPMN-Collaboration Diagram. ADO: Epic (pro GF). Nutzen: Etabliert in Swiss Life. Ermöglicht einfache Kommunikation mit Stakeholdern
*   Level 2: Kontext mit Features. Funktionalität zur Unterstützung oder Erfüllung der Geschäftsprozessen. Notation: Kontextdiagram (als UML Use Case Diagramm). ADO: Feature (Pro UC). (Wiki für Modelle). Nutzen: Klare Abgrenzung In-/Out of Scope
*   Level 2: Fachliches Domänenmodell. Zusammenhänge und Definition der Fachbegriffe. Notation: UML Klassendiagramm. ADO: Glossar. (Wiki). Nutzen: Gemeinsames Verständnis etabliert
*   Level 3: Systemanforderungen. Einzelne Szenarien der Use Cases. Notation: UML Aktivitätsdiagramm, UML Sequenzdiagramm, Freitext für UC Spez. ADO: PBI (Szenario), User Story, PBI User Story. (Wiki für UC Spez). Nutzen: Priorisierung für Umsetzung möglich, Mehrwert schaffen pro Szenario, Anforderung an Systeme, Konkrete Umsetzung der Szenariien