---
name: code-review
description: Comprehensive, read-only code review skill for reviewing an entire codebase or all explicitly mentioned files for logic bugs, type errors, security issues, performance problems, regressions, and other user-specified focus areas. Use when asked to review, audit, analyze, or carefully inspect code. Thoroughly inspect all files in scope, follow any user-requested priorities, and never modify code while reviewing.
---

# Code Review

Perform deep, read-only code reviews. Inspect every file in scope, prioritize real defects and risk over style commentary, and produce a comprehensive report with concrete evidence.

## Non-Negotiable Rules

- Never modify code during review.
- Never create, delete, or rewrite project files as part of review output unless the user explicitly changes the task away from review.
- Treat user focus areas as mandatory priorities.
- If user asks for a full-codebase review, inspect every in-repository file that can affect correctness, security, performance, build behavior, deployment, or tests.
- If user names specific files, inspect every named file completely and expand to directly related files only when needed to verify behavior.
- Do not sample files when the user requested the entire codebase or all mentioned files.
- Do not claim coverage for a file unless it was actually opened and analyzed.
- Treat "look for bugs or errors" as including logic bugs, type issues, security issues, performance issues, and reliability risks unless the user narrows scope.
- Keep the task read-only even if an obvious fix is apparent. Report the fix direction instead of applying it.

## Review Workflow

### 1. Define Scope

- Determine whether scope is the entire codebase or a specific set of files.
- Identify user-requested focus areas such as bugs, security, performance, accessibility, API design, or architecture and elevate them in the review.
- Expand to directly related files only when needed to validate control flow, data flow, type flow, configuration, or runtime behavior.
- Record the exact scope boundaries in the final report.

### 2. Build File Inventory

- Enumerate files in scope before analysis.
- Group files by area such as runtime code, configuration, infrastructure, tests, schemas, migrations, generated types, and scripts.
- Review every file in the inventory when full coverage is requested.
- Pay attention to non-source files that can still create defects, such as config, env handling, CI, migrations, permissions, or build scripts.

### 3. Analyze Every In-Scope File

For each file, check at minimum:

- Logic correctness and edge cases
- Type safety and type drift risks
- Security vulnerabilities and unsafe trust boundaries
- Performance bottlenecks and unnecessary work
- Reliability issues such as error handling gaps, retries, race conditions, bad defaults, and resource leaks
- Regression risk from implicit assumptions, hidden coupling, stale tests, or config drift

If user requests extra focus (for example accessibility, API consistency, architecture), include it as a first-class review axis.

### 4. Validate Findings Quality

- Report only issues with concrete evidence.
- Prefer high-signal findings over speculative comments.
- If uncertain, explicitly mark uncertainty and what would confirm it.
- Distinguish bugs from improvements.
- Do not pad the report with style nits, generic best practices, or hypothetical concerns that are not grounded in the code.

### 5. Produce Final Report

Order findings by severity:

1. Critical
2. High
3. Medium
4. Low

For each finding include:

- Severity
- File and line reference
- What is wrong
- Why it matters (impact)
- Minimal recommended fix direction

Then include:

- Scope summary (what was reviewed)
- Coverage summary explaining whether review covered the full codebase or only requested files
- Areas with no issues found when that adds signal
- Open questions, assumptions, or places where runtime verification would be needed
- Residual risk or testing gaps

## Reporting Standards

- Be precise and concise.
- Use direct file references for every non-trivial claim.
- Avoid generic advice without evidence.
- Prefer actionable remediation guidance.
- If no issues are found, state that explicitly and list residual risks.
- Make findings the primary output. Keep any overview or summary brief and secondary.
- For full-codebase reviews, make it clear that all in-scope files were inspected.

## Reviewer Mindset

- Think like an attacker for security paths.
- Think like production traffic for performance paths.
- Think like future maintainers for reliability and clarity.
- Think like the type checker and runtime when tracing data and control flow.
- Focus on behavior and risk, not personal style preferences.
