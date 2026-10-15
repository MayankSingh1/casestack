# Casestack

> Turn raw project material into a polished portfolio case study in one go.

Casestack is an installable AI skill package that helps UX designers and product designers at every level create compelling portfolio case studies: students and interns, junior, mid-level, senior, and lead/staff/principal designers. It works with Cursor, Claude Code, and Codex.

## What It Does

0. **Asks your level** first, then tailors everything that follows to it
1. **Ingests** any mix of inputs: docs, PDFs, Figma files (via MCP), screenshots, notes
2. **Interviews** you to fill gaps—asking only about thin/missing sections
3. **Writes** content at the right depth for your level, following a proven rubric
4. **Generates** production-ready Next.js pages matching your portfolio's style
5. **Reviews** and scores against what hiring managers expect at your level

## Installation

### Quick Install (Recommended)

```bash
# Install globally to ~/.cursor/skills/
npx casestack-skills install

# Or install to current project only
npx casestack-skills install --project
```

### Other Commands

```bash
# List installed locations
npx casestack-skills list

# Remove installation
npx casestack-skills uninstall

# Validate package structure
npx casestack-skills validate
```

### Manual Install

Copy these directories to your skills folder:

```bash
# Global (recommended)
~/.cursor/skills/casestack/
├── case-study/      # Copy from skills/case-study/
├── templates/       # Copy from templates/
└── references/      # Copy from references/

# Or project-local
.cursor/skills/casestack/
```

### Install Locations

| Mode | Path | Scope |
|------|------|-------|
| `--global` (default) | `~/.cursor/skills/casestack/` | All projects |
| `--project` | `.cursor/skills/casestack/` | Current project |

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
0. Telling it your level (student, junior, mid, senior, or lead/staff/principal) and whether you're a UX or product designer
1. Gathering your materials (docs, Figma, notes)
2. Extracting structured content
3. Interviewing for the details that matter most at your level
4. Generating the written case study
5. Creating a matching Next.js page
6. Reviewing and scoring the result

## Choosing Your Level

Before anything else, the skill asks which level fits you:

| Level | Experience | What your case study should emphasize |
|-------|------------|----------------------------------------|
| Student / Intern | School, bootcamp, internship | Process, research, iterations, craft, what you learned |
| Junior | 0-2 years | What you owned, process rigor, collaboration, craft |
| Mid-level | 2-5 years | End-to-end ownership, decisions and trade-offs, measured impact |
| Senior | 5-8 years | Problem framing, strategy, cross-functional influence, business impact |
| Lead / Staff / Principal | 8+ years | Direction-setting, org influence, growing designers, multi-team outcomes |

It also asks whether you're closer to a UX Designer or Product Designer role, and whether you're applying for a level above your current one. Career switchers start at Junior. Concept and class projects are welcome; the skill labels them honestly and never invents metrics.

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
│       ├── style-presets/    # Presentation style selection
│       ├── page-generator/   # Create Next.js pages
│       └── review/           # Score and verify
├── templates/
│   ├── tailwind/             # Tailwind CSS (17 components)
│   ├── css-modules/          # CSS Modules (17 components)
│   ├── styled-components/    # styled-components (17 components)
│   └── emotion/              # Emotion (17 components)
├── references/
│   ├── case-study-rubric.md  # Scoring checklist (68 points, per-level thresholds)
│   ├── career-levels.md      # Student → principal: priorities, tone, thresholds
│   ├── ai-portfolio-rules.md # Five rules for using AI in a portfolio
│   ├── writing-rules.md      # Content guidelines
│   └── nda-handling.md       # Confidentiality guide
├── research/
│   └── case-study-patterns.md # Analysis of 12 senior portfolios
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

Compares extracted content against the rubric and asks targeted questions:
- One question at a time
- Prioritizes the signals that matter at your level (e.g. process and learning for students, strategy and influence for seniors)
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
- What a strong case study looks like at junior vs. senior level
- NDA handling guidance

### `/case-study/style-presets`

Selects presentation style based on content type:
- **Interactive Narrative** (Sanvithi-style): Pinned scrollytelling, numbered phases
- **Editorial Long-form**: Article-style continuous flow
- **Data/Metrics-Led**: Metrics prominent, technical depth
- **Visual Campaign**: Gallery-focused, minimal text
- **Design System Doc**: Component-focused, systematic

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
- Scores against the rubric using your level's thresholds
- Reports gaps and recommendations

## Case Study Sections

A complete case study includes these sections at every level. The depth expected in each grows with seniority:

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

Each styling system includes **17 components**: 10 core layout components and 7 interaction components.

### Core Components

```tsx
import {
  Hero,              // Title, outcome, metadata
  SectionBlock,      // Section with heading
  ImageWithCaption,  // Image + caption
  BeforeAfter,       // Side-by-side comparison
  MetricCallout,     // Impact metrics grid
  Quote,             // User/stakeholder quotes
  DecisionCard,      // Design decisions with rationale
  TableOfContents,   // Section navigation
  NextProject,       // CTA to next case study
  MetaGrid           // Metadata display
} from 'casestack/templates/tailwind';
```

### Interaction Components

Based on analysis of 12 designer portfolios:

```tsx
import {
  ScrollytellingSection, // Pinned text + transitioning images (Sanvithi-style)
  ScrollProgress,         // Chapter-based navigation with progress bar
  ScrollReveal,           // Fade/slide in on scroll
  CountUpMetric,          // Animated number counting
  ImageComparisonSlider,  // Before/after with draggable divider
  HorizontalGallery,      // Horizontal scroll image gallery
  NumberedPhase           // Phase progression indicator (1/3)
} from 'casestack/templates/tailwind';
```

All components are:
- Fully responsive
- WCAG AA accessible
- Dark mode compatible
- TypeScript typed
- `prefers-reduced-motion` compliant

### Style Preset Component Usage

| Component | Interactive | Editorial | Data | Visual | Design System |
|-----------|-------------|-----------|------|--------|---------------|
| ScrollytellingSection | ✅ Primary | - | - | - | - |
| ScrollProgress | ✅ | - | - | - | ✅ |
| ScrollReveal | ✅ | ✅ Subtle | ✅ | ✅ Dramatic | ✅ |
| CountUpMetric | ✅ | - | ✅ Primary | - | ✅ |
| ImageComparisonSlider | ✅ | - | ✅ Primary | - | ✅ |
| HorizontalGallery | ✅ | - | - | ✅ Primary | - |
| NumberedPhase | ✅ Primary | - | - | - | ✅ |

## Validation

Validate the package structure and example:

```bash
npm run validate
```

Validate a specific case study:

```bash
npx casestack validate ./content/my-case-study.json
```

## Rubric Checklist

The rubric scores three categories (68 points total):

### Level Signals (21 points)
| Signal | What it looks like |
|--------|-------------------|
| **Ownership** | Defined the approach, not just executed |
| **Strategy** | Connected design to business outcomes |
| **Influence** | Shaped decisions beyond your team |
| **Impact** | Quantified, meaningful outcomes |
| **Craft** | High-quality, thoughtful execution |
| **Collaboration** | Worked effectively across functions |
| **Growth** | Showed learning and self-awareness |

### Section Completeness (36 points)
- Hero, TL;DR, Context, Role, Constraints
- Research, Problem Framing, Process
- Solution, Validation, Impact, Reflection

### Presentation Patterns (11 points)
- Outcome-first framing (+1)
- Clear numbered progression (+1)
- Visual evidence (+1)
- Constraints honesty (+1)
- Forward thinking (+1)
- Interaction quality (0-3)
- Mobile responsiveness (+1)
- Accessibility compliance (+1)

### Targets by Level

| Level | Signals (/21) | Sections (/36) |
|-------|---------------|----------------|
| Student / Intern | 8+ | 20+ |
| Junior (0-2 yrs) | 10+ | 22+ |
| Mid-level (2-5 yrs) | 13+ | 24+ |
| Senior (5-8 yrs) | 15+ | 26+ |
| Lead / Staff / Principal (8+ yrs) | 17+ | 28+ |

See `references/career-levels.md` for what each level emphasizes.

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

This example is written at the Senior level and shows proper structure and writing quality. Use it as a reference when creating your own case studies.

## Requirements

- Node.js 18+
- Next.js portfolio (for page generation)
- Optional: Figma MCP (for direct Figma access)

## License

MIT

---

Built for UX and product designers at every level who want portfolio case studies that actually land interviews.
