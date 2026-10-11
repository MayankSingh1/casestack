# Casestack

> Turn raw project material into a polished portfolio case study in one go.

Casestack is an installable AI skill package that helps senior UX/product designers (6+ years) create compelling portfolio case studies. It works with Cursor, Claude Code, and Codex.

## What It Does

1. **Ingests** any mix of inputs: docs, PDFs, Figma files (via MCP), screenshots, notes
2. **Interviews** you to fill gaps—asking only about thin/missing sections
3. **Writes** senior-level content following a proven rubric
4. **Generates** production-ready Next.js pages matching your portfolio's style
5. **Reviews** and scores against hiring manager expectations

## Installation

```bash
npx casestack init --platform <cursor|claude-code|codex>
```

This installs the skills to your project:
- **Cursor**: `.cursor/skills/casestack/`
- **Claude Code**: `.claude/skills/casestack/`
- **Codex**: `.codex/skills/casestack/`

## Usage

After installation, ask your AI assistant:

```
"I want to create a case study for my recent checkout redesign project"
```

Or reference the skill directly:

```
"Use the case-study skill to document my dashboard project"
```

The skill will guide you through:
1. Gathering your materials (docs, Figma, notes)
2. Extracting structured content
3. Interviewing for missing senior-level details
4. Generating the written case study
5. Creating a matching Next.js page
6. Reviewing and scoring the result

## Package Structure

```
casestack/
├── bin/
│   └── casestack.js          # CLI entry point
├── lib/
│   └── init.js               # Programmatic API
├── skills/
│   └── case-study/
│       ├── SKILL.md          # Main router skill
│       ├── ingest/           # Extract content from materials
│       ├── interview/        # Gap-fill questioning
│       ├── write/            # Generate narrative
│       ├── architecture/     # Section reference guide
│       ├── page-generator/   # Create Next.js pages
│       └── review/           # Score and verify
├── templates/
│   ├── tailwind/             # Tailwind CSS components
│   ├── css-modules/          # CSS Modules components
│   ├── styled-components/    # styled-components
│   └── emotion/              # Emotion components
├── references/
│   ├── senior-rubric.md      # Scoring checklist
│   ├── writing-rules.md      # Content guidelines
│   └── nda-handling.md       # Confidentiality guide
├── examples/
│   └── fictional-case-study/ # Complete example
├── cursor-plugin.json        # Plugin manifest
├── package.json
└── validate.js               # Package validation
```

## Skills Overview

### `/case-study` (Main Router)

The entry point that orchestrates the full workflow. It:
- Identifies what materials you have
- Routes to appropriate sub-skills
- Tracks progress through the workflow

### `/case-study/ingest`

Extracts structured content from your materials:
- PDFs, docs, markdown files
- Figma files (via Figma MCP)
- Screenshots and visuals
- Notes and research data

### `/case-study/interview`

Compares extracted content against the senior rubric and asks targeted questions:
- One question at a time
- Focuses on seniority signals (ownership, impact, strategy)
- Never invents metrics or quotes
- Marks unknowns clearly

### `/case-study/write`

Generates the full case study narrative:
- Follows outcome-first writing rules
- Avoids AI slop phrases
- Maintains appropriate length and scannability

### `/case-study/architecture`

Reference document explaining:
- What each section should contain
- What hiring managers look for
- How to demonstrate seniority
- NDA handling guidance

### `/case-study/page-generator`

Creates Next.js pages that match your portfolio:
- Detects your styling system (Tailwind, CSS Modules, etc.)
- Detects App Router vs Pages Router
- Matches existing conventions
- Ships accessible, responsive components

### `/case-study/review`

Verifies and scores the case study:
- Runs build/lint/typecheck
- Captures screenshots
- Scores against rubric
- Reports gaps and recommendations

## Case Study Sections

A complete senior case study includes:

| Section | Purpose |
|---------|---------|
| **Hero** | Title, one-line outcome, role, timeline, team, platform |
| **TL;DR** | 2-4 sentence summary (problem → approach → outcome) |
| **Context** | Business problem and why it mattered |
| **My Role** | Specific ownership and collaboration |
| **Constraints** | Real-world limitations you navigated |
| **Research** | Methods, findings, and evidence |
| **Problem Framing** | HMW questions and success metrics |
| **Process** | Key decisions with alternatives and trade-offs |
| **Solution** | Annotated walkthrough of what you built |
| **Validation** | Testing, iterations, and what changed |
| **Impact** | Quantified outcomes (before/after) |
| **Reflection** | Learnings and what you'd do differently |

## Components Included

### Tailwind Templates

```tsx
import {
  Hero,
  SectionBlock,
  ImageWithCaption,
  BeforeAfter,
  MetricCallout,
  Quote,
  DecisionCard,
  TableOfContents,
  NextProject,
  MetaGrid
} from 'casestack/templates/tailwind';
```

All components are:
- Fully responsive
- WCAG AA accessible
- Dark mode compatible
- TypeScript typed

## Validation

Validate the package structure and example:

```bash
npm run validate
```

Validate a specific case study:

```bash
npx casestack validate ./content/my-case-study.json
```

## Senior Rubric Checklist

The rubric scores these seniority signals:

| Signal | What it looks like |
|--------|-------------------|
| **Ownership** | Defined the approach, not just executed |
| **Strategy** | Connected design to business outcomes |
| **Influence** | Shaped decisions beyond your team |
| **Impact** | Quantified, meaningful outcomes |
| **Craft** | High-quality, thoughtful execution |
| **Collaboration** | Worked effectively across functions |
| **Growth** | Showed learning and self-awareness |

Target score: **30+/36** for section completeness, **15+/21** for seniority signals.

## Writing Rules

Key guidelines the `write` skill follows:

1. **Outcome-first**: Lead with results, not process
2. **Concise**: Every sentence earns its place
3. **Scannable**: Headers, bullets, bold metrics
4. **Plain language**: No jargon
5. **No AI slop**: Avoid "leveraged," "streamlined," "synergy"
6. **Specific**: Numbers over adjectives
7. **Honest**: Mark estimates, don't fabricate

See `references/writing-rules.md` for the complete guide.

## Example

The `examples/fictional-case-study/` directory contains a complete example with:

- `content.json` - Structured content model
- `page.mdx` - Written case study in MDX
- `README.md` - Usage notes

This example demonstrates senior-level depth, proper structure, and writing quality. Use it as a reference when creating your own case studies.

## Requirements

- Node.js 18+
- Next.js portfolio (for page generation)
- Optional: Figma MCP (for direct Figma access)

## License

MIT

---

Built for senior designers who want portfolio case studies that actually land interviews.
