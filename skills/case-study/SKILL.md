---
name: case-study
description: Transform raw project material into a portfolio case study pitched at the designer's level, from student to principal
triggers:
  - case study
  - portfolio case
  - casestack
  - design case study
  - UX case study
  - product design case
---

# Casestack: Portfolio Case Study Generator

Transform raw project material into a polished portfolio case study in one workflow. It works for UX designers and product designers at every level: student/intern, junior, mid-level, senior, and lead/staff/principal. The skill asks which kind of case study to write first, then the designer's level, and adjusts the interview, writing, and review to that kind and level. It orchestrates ingestion, gap-fill interviews, content generation, and production-ready Next.js page creation.

## When to Use

Use this skill when someone wants to:
- Create a portfolio case study from project materials
- Turn a design project into a presentable case study
- Generate a case study page for their Next.js portfolio
- Structure raw notes/docs/Figma files into case study format

## Workflow Overview

Every run follows the five rules for using AI in a UX portfolio. Interview, write, page generation, and review each load them before producing output:

```
Read: references/ai-portfolio-rules.md
```

```
┌─────────────┐    ┌─────────────┐    ┌─────────────┐    ┌─────────────┐    ┌─────────────┐    ┌─────────────┐    ┌─────────────┐
│    KIND     │ -> │    LEVEL    │ -> │   INGEST    │ -> │  INTERVIEW  │ -> │    WRITE    │ -> │   GENERATE  │ -> │   REVIEW    │
│ (ask first) │    │ (ask next)  │    │ (materials) │    │ (gap-fill)  │    │  (content)  │    │   (page)    │    │  (verify)   │
└─────────────┘    └─────────────┘    └─────────────┘    └─────────────┘    └─────────────┘    └─────────────┘    └─────────────┘
```

## Step-by-Step Instructions

### Setup: Choose the case study kind

**This is the only first action.** Ask which kind of case study to write before reading materials, asking level, interviewing, writing, or generating a page. Do not auto-select.

```
Read: .cursor/rules/case-study-setup.mdc
```

Ask one question with these options:

1. **Interactive Narrative** — product design, feature launches, 0-to-1 and multi-phase projects
2. **Editorial Long-form** — research-heavy projects, leadership, culture, and strategy stories
3. **Data/Metrics-Led** — data products, analytics, developer tools, and internal tools
4. **Visual Campaign** — brand and campaign work, visual identity, and art direction
5. **Design System Doc** — design systems, component libraries, and guidelines

Store the answer as `stylePreset`: `interactive-narrative`, `editorial-longform`, `data-metrics-led`, `visual-campaign`, or `design-system-doc`. Every later step uses that value.

If the same message already names a kind, confirm it in one line and continue. Do not ask again. Auto-select only when the user explicitly says to choose for them.

### Step 0: Ask the Designer's Level

After the kind is stored, ask the designer's level. Do not start gathering materials until the level is known.

```
Read: references/career-levels.md
```

Ask one question with these options:
1. Student / Intern
2. Junior (0-2 years)
3. Mid-level (2-5 years)
4. Senior (5-8 years)
5. Lead / Staff / Principal (8+ years)

In the same message, ask whether their role is closer to **UX Designer** or **Product Designer**, and whether they are applying for a role above their current level (optional).

Store the answers as `meta.designerLevel`, `meta.roleTrack`, and `meta.targetLevel`. Career switchers default to `junior`. If the designer skips the question, use `mid` and tell them.

Every later step reads the level from the content model:
- **Interview** picks which gaps to ask about first
- **Write** sets tone and emphasis
- **Review** scores against that level's thresholds

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

This compares extracted content against the rubric, using the priorities for the designer's level, and asks targeted questions for missing sections. **One question at a time.** Never invent metrics or quotes. Follow `references/ai-portfolio-rules.md`: collect the designer’s problem, learning, decisions, evidence, and — only if AI supported the work — ownership of that AI use.

### Step 4: Write Content

Load and execute the **write** sub-skill:

```
Read: skills/case-study/write/SKILL.md
```

This generates the full case study narrative in the tone for the designer's level, following `references/writing-rules.md` and `references/ai-portfolio-rules.md`.

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

### Step 6: Apply the chosen style preset

Load and execute the **style-presets** sub-skill:

```
Read: skills/case-study/style-presets/SKILL.md
```

Apply the `stylePreset` chosen in setup. Do not ask again, and do not auto-select. Auto-select only when the user explicitly said to choose for them.

### Step 7: Generate Page

Load and execute the **page-generator** sub-skill:

```
Read: skills/case-study/page-generator/SKILL.md
```

This creates the Next.js route, components, and content files using the selected style preset. Before shipping, check visuals against Rule #4 in `references/ai-portfolio-rules.md`.

### Step 8: Review & Verify

Load and execute the **review** sub-skill:

```
Read: skills/case-study/review/SKILL.md
```

This runs build/lint/typecheck, captures screenshots, scores against the rubric using the designer's level thresholds, and pass/fails the five rules in `references/ai-portfolio-rules.md`.

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
    designerLevel: 'student' | 'junior' | 'mid' | 'senior' | 'lead';
    roleTrack: 'ux' | 'product';
    targetLevel?: 'student' | 'junior' | 'mid' | 'senior' | 'lead';
    projectType?: 'shipped' | 'concept' | 'academic' | 'freelance' | 'volunteer';
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

  aiSupport?: {
    used: boolean;
    tool?: string;
    why?: string;
    helpedWith?: string[];
    reviewedOrChanged?: string[];
    decisionsOwned?: string[];
  };

  stylePreset:
    | "interactive-narrative"
    | "editorial-longform"
    | "data-metrics-led"
    | "visual-campaign"
    | "design-system-doc";
  
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
| (Step 0) | Ask the designer's level | Before anything else |
| `ingest` | Extract content from materials | After level is known |
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

1. Ask their level (student, junior, mid, senior, lead/staff/principal) and track (UX or product)
2. Ask what materials they have
3. Ingest provided docs/Figma/notes
4. Interview for the details that matter most at their level
5. Generate content following writing rules, in the tone for their level
6. Detect their portfolio stack
7. Generate matching Next.js page
8. Verify build, capture screenshots, and score against their level
