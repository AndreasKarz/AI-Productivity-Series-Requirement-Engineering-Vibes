---
name: instructions-creator
description: "Guide for creating and updating VS Code custom instruction files (*.instructions.md and copilot-instructions.md). Use when a user wants to create new instructions, update existing instructions, design instruction hierarchies, or needs help with applyTo patterns and instruction structure. Triggers on: create instructions, new instructions, instructions.md, copilot-instructions, update instructions, instruction file, coding guidelines, project rules, custom instructions."
---

# Instructions Creator

Create effective VS Code custom instruction files that shape AI behavior consistently across chat sessions.

## Before Creating Instructions

### Fetch Latest Documentation

Before writing or overhauling any instructions file, fetch the latest VS Code custom instructions documentation:

1. Use `fetch_webpage` to retrieve:
   **https://code.visualstudio.com/docs/copilot/customization/custom-instructions**
2. Extract current file formats, frontmatter options, and best practices
3. Apply those patterns throughout the instruction design

If the URL is unreachable, fall back to the embedded format reference below.

### Fetch Anthropic Prompt Engineering Best Practices

For instruction content quality, also fetch:

1. **https://platform.claude.com/docs/en/docs/build-with-claude/prompt-engineering/overview**
2. **https://platform.claude.com/docs/en/docs/build-with-claude/prompt-engineering/be-clear-and-direct**
3. **https://platform.claude.com/docs/en/docs/build-with-claude/prompt-engineering/system-prompts**

Extract principles for clear, direct, and effective instructions.

---

## Instruction File Types

### Always-On Instructions

Automatically included in every chat request. Two formats:

| File | Location | Scope |
|------|----------|-------|
| `copilot-instructions.md` | `.github/copilot-instructions.md` | All chat requests in workspace |
| `AGENTS.md` | Workspace root (or subfolders) | All AI agents in workspace |

### File-Based Instructions

Applied conditionally based on file patterns or task matching:

| File | Location | Scope |
|------|----------|-------|
| `*.instructions.md` | `.github/instructions/` or configured folders | Files matching `applyTo` pattern |
| `*.instructions.md` | User profile `prompts/` folder | All workspaces for that user |

---

## File Format Reference

### Frontmatter (YAML)

```yaml
---
name: 'Display Name'           # Optional. Shown in UI. Defaults to filename.
description: 'Short summary'   # Optional. Shown on hover in Chat view.
applyTo: '**/*.py'             # Optional. Glob pattern for auto-application.
---
```

**Frontmatter rules:**
- All three fields are optional
- Without `applyTo`, instructions are not applied automatically (manual attachment only)
- `applyTo: '**'` applies to all files
- Glob patterns are relative to workspace root

### Common `applyTo` Patterns

| Pattern | Matches |
|---------|---------|
| `**` | All files |
| `**/*.py` | All Python files |
| `**/*.{ts,tsx}` | All TypeScript files |
| `src/**` | Everything under `src/` |
| `**/*.test.{ts,js}` | All test files |
| `**/api/**` | All files in any `api/` folder |
| `docs/**/*.md` | Markdown files under `docs/` |

### Body

Markdown content with the actual instructions. Supports:
- Standard Markdown formatting
- Code blocks with examples
- Markdown links to reference files or URLs
- Tool references via `#tool:<tool-name>` syntax

---

## Creation Workflow

### Step 1: Determine Instruction Type

| Scenario | Type | File |
|----------|------|------|
| Project-wide coding standards | Always-on | `.github/copilot-instructions.md` |
| Multi-agent workspace conventions | Always-on | `AGENTS.md` |
| Language-specific rules (Python, TS...) | File-based | `python.instructions.md` with `applyTo: '**/*.py'` |
| Framework-specific patterns | File-based | `react.instructions.md` with `applyTo: '**/*.tsx'` |
| Test conventions | File-based | `testing.instructions.md` with `applyTo: '**/*.test.*'` |
| Documentation standards | File-based | `docs.instructions.md` with `applyTo: '**/*.md'` |
| User-level personal preferences | User-level | In profile `prompts/` folder |

### Step 2: Gather Requirements

Clarify with the user:

1. **Scope** — Project-wide or file-type-specific?
2. **Purpose** — Coding standards, architecture rules, workflow conventions, or domain knowledge?
3. **Audience** — Solo developer, team, or organization?
4. **Existing instructions** — Check for existing `.github/copilot-instructions.md`, `.instructions.md` files, or `AGENTS.md`
5. **Conflicts** — Will these instructions contradict or override existing ones?

### Step 3: Draft Instructions

Apply the [Writing Principles](#writing-principles) and structure the content using the [Instruction Architecture](#instruction-architecture).

### Step 4: Review and Validate

Run through the [Quality Checklist](#quality-checklist) before delivering.

---

## Writing Principles

These principles are derived from Anthropic's prompt engineering best practices and adapted for VS Code instruction files.

### 1. Be Clear, Direct, and Specific

Treat the AI as a skilled new team member with no context on project norms.

| Principle | Example |
|-----------|---------|
| State concrete rules | "Use `date-fns` instead of `moment.js`" not "Use modern date libraries" |
| Include reasoning | "Use `date-fns` — moment.js is deprecated and increases bundle size" |
| Define ambiguous terms | "Component = React functional component with TypeScript props interface" |
| Set measurable expectations | "Functions must not exceed 50 lines" not "Keep functions short" |

### 2. Show, Don't Just Tell

Code examples communicate format, style, and expectations far more effectively than abstract descriptions.

```markdown
## Naming conventions

### Preferred
```typescript
// React component files: PascalCase
UserProfile.tsx
OrderHistory.tsx

// Utility functions: camelCase
formatCurrency.ts
parseUserInput.ts

// Constants: UPPER_SNAKE_CASE
const MAX_RETRY_COUNT = 3;
const API_BASE_URL = '/api/v2';
```

### Avoid
```typescript
// ❌ No kebab-case for components
user-profile.tsx

// ❌ No abbreviations
fmtCur.ts
```
```

### 3. Use Positive Instructions

State what TO do, not just what NOT to do. Positive instructions are more effective.

| Instead of | Write |
|------------|-------|
| "Don't use `any` type" | "Use explicit TypeScript types for all parameters and return values" |
| "Don't write long functions" | "Extract functions longer than 30 lines into smaller, named functions" |
| "Don't use console.log" | "Use the project logger (`logger.info()`, `logger.error()`) for all output" |

### 4. Include Reasoning Behind Rules

When instructions explain *why* a convention exists, the AI makes better decisions in edge cases.

```markdown
## Error handling

Wrap all API calls in try-catch blocks with typed error responses.
This ensures the frontend always receives a structured error object
instead of an unhandled 500 response.
```

### 5. Focus on Non-Obvious Rules

Skip conventions that standard linters or formatters already enforce. The AI knows standard best practices — provide only project-specific or team-specific knowledge.

```markdown
## What to include
- Project-specific architecture decisions
- Team conventions not covered by ESLint/Prettier
- Domain-specific terminology and patterns
- Integration patterns with internal services

## What to skip
- Basic syntax rules (linter handles these)
- Standard formatting (Prettier handles this)
- General language best practices (AI already knows)
```

### 6. Keep Instructions Concise

Each instruction file shares the context window with conversation history, other instructions, and the user's request.

- **Target**: 50–150 lines per file for file-based instructions
- **Maximum**: 300 lines for always-on instructions (`.github/copilot-instructions.md`)
- If longer: split into multiple file-based instruction files with specific `applyTo` patterns

---

## Instruction Architecture

### Structure for Always-On Instructions (`copilot-instructions.md`)

```markdown
# Project: [Name]

## Tech Stack
- [Languages, frameworks, key libraries]

## Architecture
- [Key architectural patterns and decisions]

## Coding Conventions
- [Project-specific rules with examples]

## File Structure
- [Important directory conventions]

## Domain Knowledge
- [Business terms, glossary, or domain rules]

## Testing
- [Test conventions and requirements]
```

### Structure for File-Based Instructions

```markdown
---
name: '[Descriptive Name]'
description: '[When and why these rules apply]'
applyTo: '[glob pattern]'
---

# [Domain] Standards

## Conventions
- [Rules with code examples]

## Patterns
- [Preferred patterns with examples]

## Anti-Patterns
- [What to avoid and why]
```

### Structure for Domain-Specific Instructions

For complex domains, use a focused approach:

```markdown
---
name: 'API Design'
description: 'REST API conventions for backend services'
applyTo: '**/api/**/*.ts'
---

# API Design Standards

## Endpoint Naming
[Convention with examples]

## Request/Response Format
[Schema patterns with code]

## Error Handling
[Standard error structure]

## Authentication
[Auth pattern for this project]

## Versioning
[API versioning approach]
```

---

## Instruction Hierarchy and Priority

When multiple instruction files exist, VS Code combines them. Higher priority wins on conflicts:

| Priority | Source | Example |
|----------|--------|---------|
| 1 (highest) | User-level instructions | Personal `.instructions.md` in profile |
| 2 | Repository instructions | `.github/copilot-instructions.md`, `AGENTS.md` |
| 3 (lowest) | Organization instructions | GitHub org-level instructions |

**Conflict resolution strategies:**
- Avoid contradictions between instruction files
- If unavoidable, add explicit override statements: "This rule supersedes any conflicting instruction about X"
- Use `applyTo` patterns to scope rules narrowly and prevent overlap

---

## Quality Checklist

Run every instruction file through this checklist:

| # | Check | Question |
|---|-------|----------|
| 1 | **Clarity** | Could a new team member follow every rule without asking questions? |
| 2 | **Specificity** | Are vague words ("appropriate", "good", "clean") replaced with measurable criteria? |
| 3 | **Examples** | Does every non-trivial rule include a concrete code example? |
| 4 | **Reasoning** | Do rules explain *why*, not just *what*? |
| 5 | **Conciseness** | Is every line earning its place in the context window? |
| 6 | **Non-obvious** | Are standard linter/formatter rules excluded? |
| 7 | **Positive** | Are instructions stated positively (do X) rather than negatively (don't Y)? |
| 8 | **Scoped** | Is `applyTo` set correctly for file-based instructions? |
| 9 | **No conflicts** | Do these instructions avoid contradicting other instruction files? |
| 10 | **Testable** | Can compliance with each rule be verified by reading the code? |

---

## Anti-Patterns

| Anti-Pattern | Problem | Fix |
|--------------|---------|-----|
| Giant monolithic file | Context bloat, buried rules | Split into scoped `.instructions.md` files |
| "Be helpful and write clean code" | Too vague, AI already tries to do this | State specific, measurable conventions |
| Repeating linter rules | Wastes context, already enforced | Focus on project-specific rules only |
| No code examples | Rules are ambiguous without examples | Add preferred/avoid code snippets |
| Contradicting instructions | AI gets confused, inconsistent output | Audit all files, resolve conflicts |
| Missing `applyTo` | Instructions not auto-applied | Add appropriate glob pattern |
| "Don't do X" without alternative | Negative-only rules are weaker | "Use Y instead of X because Z" |
| Mixing scopes | Backend rules applied to frontend | Use separate files with targeted patterns |
| Over-constraining | Too many rules cause contradictions | Prioritize the 10-20 most impactful rules |
| No reasoning behind rules | AI can't handle edge cases well | Add brief "because..." for each rule |

---

## Important Rules

- Always determine the correct instruction type (always-on vs. file-based) before writing
- Include code examples for every non-trivial rule — examples communicate more than descriptions
- State rules positively with reasoning — "Use X because Y" beats "Don't use Z"
- Respect the context window — challenge every line: "Does the AI need this?"
- Never duplicate what linters, formatters, or the AI already knows
- Always set `applyTo` for file-based instructions to ensure automatic application
- Audit existing instructions for conflicts before adding new ones
- Keep individual files under 150 lines; split when approaching this limit
