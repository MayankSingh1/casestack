---
name: case-study
description: Transform raw project material into a senior-level portfolio case study
triggers:
  - case study
  - portfolio case
  - casestack
  - design case study
  - UX case study
  - product design case
---

# Casestack: Portfolio Case Study Generator

Transform raw project material into a polished, senior-level portfolio case study in one workflow. This skill orchestrates ingestion, gap-fill interviews, content generation, and production-ready Next.js page creation.

## When to Use

Use this skill when someone wants to:
- Create a portfolio case study from project materials
- Turn a design project into a presentable case study
- Generate a case study page for their Next.js portfolio
- Structure raw notes/docs/Figma files into case study format

## Workflow Overview

```
┌─────────────┐    ┌─────────────┐    ┌─────────────┐    ┌─────────────┐    ┌─────────────┐
│   INGEST    │ -> │  INTERVIEW  │ -> │    WRITE    │ -> │   GENERATE  │ -> │   REVIEW    │
│ (materials) │    │ (gap-fill)  │    │  (content)  │    │   (page)    │    │  (verify)   │
└─────────────┘    └─────────────┘    └─────────────┘    └─────────────┘    └─────────────┘
```

## Step-by-Step Instructions

### Step 1: Gather Materials

Ask the user what materials they have:
- Project briefs, write-ups, or documentation (PDF, doc, markdown)
- Figma files (provide URLs; use Figma MCP if available)
- Screenshots, wireframes, or visual assets
- Meeting notes, Slack threads, or research docs
- Metrics, analytics, or impact data

### Step 2: Ingest Content

Load and execute the **ingest** sub-skill:

```
Read: skills/case-study/ingest/SKILL.md
```

This extracts structured content into a JSON/MDX frontmatter model.

### Step 3: Gap-Fill Interview

Load and execute the **interview** sub-skill:

```
Read: skills/case-study/interview/SKILL.md
```

This compares extracted content against the senior rubric and asks targeted questions for missing sections. **One question at a time.** Never invent metrics or quotes.

### Step 4: Write Content

Load and execute the **write** sub-skill:

```
Read: skills/case-study/write/SKILL.md
```

This generates the full case study narrative following senior writing rules.

### Step 5: Detect Portfolio Conventions

Before generating code, **read the portfolio repository**:

1. Check for `package.json` to identify framework
2. Detect styling system:
   - Look for `tailwind.config.*` → Tailwind
   - Look for `*.module.css` files → CSS Modules
   - Look for `styled-components` or `@emotion` in dependencies → styled-components/Emotion
3. Detect router:
   - `app/` directory with `page.tsx` → App Router
   - `pages/` directory → Pages Router
4. Check for existing case studies to match conventions
5. Identify color tokens, fonts, components

Fall back to Tailwind if undetectable.

### Step 6: Select Style Preset

Load and execute the **style-presets** sub-skill:

```
Read: skills/case-study/style-presets/SKILL.md
```

This determines the presentation style based on content type:
- **Interactive Narrative** (Sanvithi-style) - Pinned scrollytelling, numbered phases
- **Editorial Long-form** - Article-style continuous flow
- **Data/Metrics-Led** - Metrics prominent, technical depth
- **Visual Campaign** - Gallery-focused, minimal text
- **Design System Doc** - Component-focused, systematic

Ask user preference or auto-select based on content analysis.

### Step 7: Generate Page

Load and execute the **page-generator** sub-skill:

```
Read: skills/case-study/page-generator/SKILL.md
```

This creates the Next.js route, components, and content files using the selected style preset.

### Step 8: Review & Verify

Load and execute the **review** sub-skill:

```
Read: skills/case-study/review/SKILL.md
```

This runs build/lint/typecheck, captures screenshots, and scores against the rubric.

## Content Model Schema

The extracted content follows this structure:

```typescript
interface CaseStudy {
  meta: {
    slug: string;
    title: string;
    oneLiner: string;
    role: string;
    timeline: string;
    team: string[];
    teamSize: number;
    platform: string[];
    company: string;
    year: number;
    isNDA: boolean;
    ndaNote?: string;
  };
  
  hero: {
    title: string;
    outcome: string;
    heroImage?: string;
    heroAlt?: string;
  };
  
  tldr: string;
  
  context: {
    businessProblem: string;
    background: string;
    stakeholders: string[];
  };
  
  myRole: {
    responsibilities: string[];
    collaboration: string;
    ownership: string;
  };
  
  constraints: string[];
  
  research: {
    methods: string[];
    keyFindings: string[];
    evidence: string[];
    quotes?: Array<{ text: string; source: string }>;
  };
  
  problemFraming: {
    hmw: string[];
    successMetrics: Array<{ metric: string; target?: string; actual?: string }>;
  };
  
  process: Array<{
    phase: string;
    description: string;
    decisions: Array<{
      decision: string;
      alternatives: string[];
      tradeoffs: string;
      rationale: string;
    }>;
    visuals?: string[];
  }>;
  
  solution: {
    overview: string;
    features: Array<{
      name: string;
      description: string;
      visual?: string;
      annotation?: string;
    }>;
  };
  
  validation: {
    testing: string[];
    iterations: string[];
    feedback: string[];
  };
  
  impact: {
    metrics: Array<{
      name: string;
      before?: string;
      after?: string;
      change?: string;
      isEstimate?: boolean;
    }>;
    qualitative: string[];
  };
  
  reflection: {
    learnings: string[];
    whatWouldChange: string[];
  };
  
  nextSteps?: string[];
  
  assets: {
    images: Array<{ path: string; alt: string; caption?: string }>;
    videos?: Array<{ path: string; caption?: string }>;
  };
}
```

## Quick Reference

| Sub-skill | Purpose | When to Use |
|-----------|---------|-------------|
| `ingest` | Extract content from materials | Start of workflow |
| `interview` | Fill gaps via targeted questions | After ingest |
| `write` | Generate narrative content | After interview |
| `architecture` | Reference for section structure | Anytime (reference) |
| `style-presets` | Select presentation style | Before page generation |
| `page-generator` | Create Next.js page | After content ready |
| `review` | Verify and score | After generation |

## Interaction Components

The following scroll-based interaction components are available across all styling systems:

| Component | Purpose | Best Preset |
|-----------|---------|-------------|
| `ScrollytellingSection` | Pinned text while images transition | Interactive Narrative |
| `ScrollProgress` | Chapter-based navigation with progress | Interactive Narrative |
| `ScrollReveal` | Fade/slide in on scroll | All presets |
| `CountUpMetric` | Animated number counting | Data/Metrics-Led |
| `ImageComparisonSlider` | Before/after with draggable divider | Data/Metrics-Led |
| `HorizontalGallery` | Horizontal scroll image gallery | Visual Campaign |
| `NumberedPhase` | Phase progression indicator (1/3) | Interactive Narrative |

## Architecture Reference

For detailed guidance on each section and what hiring managers look for, read:

```
Read: skills/case-study/architecture/SKILL.md
```

## Error Handling

- **Missing Figma MCP**: Fall back to asking user to export screenshots manually
- **Unknown styling system**: Default to Tailwind with utility classes
- **Build failures**: Report specific errors and suggest fixes
- **Missing required content**: Mark clearly as `[UNKNOWN]` and continue

## Example Usage

User: "I want to create a case study for my recent checkout redesign project"

1. Ask what materials they have
2. Ingest provided docs/Figma/notes
3. Interview for missing senior-level details
4. Generate content following writing rules
5. Detect their portfolio stack
6. Generate matching Next.js page
7. Verify build and capture screenshots
