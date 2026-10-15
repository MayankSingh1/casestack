---
name: case-study/write
description: Generate case study content following the rubric and writing rules, in the tone for the designer's level
parent: case-study
---

# Write Sub-skill

Transform the structured content model into polished case study prose that shows the thinking expected at the designer's level.

## Level Calibration

Read `meta.designerLevel` (and `meta.targetLevel`, if higher) and the **Writing Tone by Level** table in `references/career-levels.md`. Then:

| Level | Lead with | Keep it honest |
|-------|-----------|----------------|
| Student / Intern | The brief, research, iterations, what you learned | Label concept or course work as such. Credit mentors and teammates |
| Junior | What you owned, your process, collaboration | Use "we" for team work. Don't claim strategy you didn't set |
| Mid-level | Decisions, trade-offs, measured results | Show what you owned end to end |
| Senior | Problem framing, business impact, who you aligned | Show trade-offs at product level |
| Lead / Staff / Principal | Direction you set, how others' work changed, org outcomes | Show the hard calls and their costs |

For concept or academic projects (`meta.projectType` is `concept` or `academic`): replace the business problem with the brief or user problem. Use test results and feedback for impact. Never invent business metrics.

## Input

- Completed content model from ingest + interview
- Content confidence scores
- Any gaps marked with handling decisions

## Output

- Full case study narrative (MDX or structured JSON)
- Ready for page generation

## Writing Process

### 1. Load References

Before writing, read:
```
Read: references/career-levels.md
Read: references/writing-rules.md
Read: references/ai-portfolio-rules.md
Read: skills/case-study/architecture/SKILL.md
```

### 2. Pre-Write Checklist

Confirm you have:
- [ ] Project title and one-liner
- [ ] Role and team context
- [ ] Clear problem statement
- [ ] At least one research method/finding
- [ ] Key design decisions with rationale
- [ ] Outcome metrics (or qualitative impact)
- [ ] Reflection/learnings

### 3. Section-by-Section Generation

#### Hero Section

Write:
```mdx
---
title: [Project Title]
outcome: [One-line result, numbers if possible]
role: [Your Role]
timeline: [Duration, Year]
team: [Team composition summary]
platforms: [Web, iOS, etc.]
company: [Company name or "A [descriptor] company"]
---
```

#### TL;DR

Formula: `[Problem] → [Approach] → [Outcome]`

Rules:
- Max 80 words
- Lead with the problem scale
- End with the quantified outcome
- No jargon

Example output:
```mdx
## TL;DR

[Company]'s checkout flow was losing $18M annually to abandonment. 
I led a 4-month redesign that consolidated 5 steps into 2, added 
smart defaults for international users, and surfaced trust signals 
at decision points. The result: 23% higher completion rates and 
$4.2M in recovered annual revenue.
```

#### Context & Business Problem

Structure:
1. Company/product context (1-2 sentences)
2. The problem and its scale (2-3 sentences)
3. Why it mattered now (1-2 sentences)

Tone: Business-aware, not just design-focused

#### My Role & Collaboration

Structure:
1. Title and formal scope
2. Bullet list of responsibilities
3. Key collaborators and working style

Show, don't inflate:
- ❌ "I single-handedly transformed..."
- ✅ "I owned the end-to-end UX, partnering closely with..."

#### Constraints

Format as a bullet list. Each constraint should be:
- Specific (not "limited time" but "4-month deadline for holiday launch")
- Relevant to decisions made later

#### Research & Insights

Structure:
1. Methods used (table or bullets)
2. Key findings (numbered, 3-5 max)
3. Supporting evidence (quotes, data)

Include at least one user quote if available.

#### Problem Framing

Structure:
1. Reframed problem statement
2. HMW questions (2-3)
3. Success metrics with targets

Connect to research findings.

#### Process & Key Decisions

For each major decision:

```mdx
### [Decision Name]

**Options considered:**
- Option A: [brief description]
- Option B: [brief description]
- Option C: [brief description]

**Chosen approach:** Option [X]

**Trade-offs:** [What we gave up]

**Rationale:** [Evidence-based reasoning]
```

Include 2-4 key decisions. Focus on the ones that:
- Were contested or non-obvious
- Had significant impact
- Show the thinking expected at the designer's level

#### Solution Walkthrough

Structure:
1. Brief overview of the solution
2. Feature-by-feature breakdown with visuals
3. Each feature ties back to an insight or constraint

For each feature:
```mdx
### [Feature Name]

[Visual placeholder or image reference]

[Brief description of what it does]

**Design decision:** [Why it works this way]

**Tied to insight:** [Reference to research finding]
```

#### Validation

Structure:
1. Testing methods
2. What was learned
3. What changed as a result

Show iteration:
```mdx
**Before testing:** [Original approach]
**Feedback:** [What we heard]
**After testing:** [How we adapted]
```

#### Impact & Outcomes

Format metrics prominently:

```mdx
## Impact

| Metric | Before | After | Change |
|--------|--------|-------|--------|
| Completion rate | 62% | 76% | +23% |
| Time to purchase | 4.5 min | 2.9 min | -35% |
| Support tickets | 850/mo | 697/mo | -18% |

### Business Impact

$4.2M in recovered annual revenue

### Qualitative Impact

- Featured in company all-hands
- Approach adopted by 3 other teams
```

If metrics are estimates, mark clearly:
```mdx
*Note: Exact figures approximate due to NDA. Relative changes are accurate.*
```

#### Reflection & Learnings

Structure:
1. What was learned (2-3 bullets)
2. What you'd do differently (1-2 bullets)
3. Optional: advice for others

Avoid false modesty. Be genuine.

### 4. Formatting Standards

#### Headings
- Use H2 for main sections
- Use H3 for subsections
- Keep hierarchy clean (no skipping levels)

#### Lists
- Bullet for unordered items
- Numbers for sequential or ranked items
- Max 5-7 items per list

#### Visuals
- Every section should have or reference a visual
- Alt text required for all images
- Captions should add context, not describe

#### Emphasis
- **Bold** for key terms and metrics
- *Italic* for quotes and emphasis
- Avoid underlining (reserved for links)

### 5. Quality Checks

Before finalizing, verify:

#### Content Quality
- [ ] Outcome appears in first 100 words
- [ ] No jargon or buzzwords
- [ ] All metrics have context (before/after or baseline)
- [ ] Trade-offs are explicit
- [ ] At least one user quote or evidence

#### Writing Quality
- [ ] Active voice throughout
- [ ] No sentences over 25 words
- [ ] Headers are scannable (not "Section 1")
- [ ] No "utilized," "leveraged," "synergy"
- [ ] No hollow phrases ("streamlined the experience")

#### Completeness
- [ ] All 12 sections present (or intentionally omitted with reason)
- [ ] Visuals referenced for solution section
- [ ] Alt text prompts generated for images
- [ ] NDA compliance noted if applicable

#### AI Portfolio Rules

Check against `references/ai-portfolio-rules.md` before finishing:

- [ ] **Rule #1 — Keep your personal voice.** The prose shows what problem the designer solved, what they learned, and which decisions they made and why. The wording stays theirs. Do not replace a specific answer with generic process language.
- [ ] **Rule #2 — Show evidence.** Process descriptions are backed by research findings, testing insights, or design iterations from the content model. Do not invent those.
- [ ] **Rule #3 — Clarify ownership.** If `aiSupport.used` is true, the case study states which tool was used and why, what AI helped do, what the designer reviewed or changed, and which decisions were theirs. If AI was not used, omit that disclosure.
- [ ] **Rule #5 — Show your thinking.** Each major decision includes why the problem mattered, what evidence informed the solution, which trade-offs were considered, and what changed because of the work.

Rule #4 (check visuals) is enforced in page generation and review, not in this prose pass.

### 6. Output Format

Generate MDX with frontmatter:

```mdx
---
slug: checkout-redesign
title: Reimagining Checkout for Global Scale
outcome: Reduced cart abandonment by 23%, recovering $4.2M annually
role: Lead Product Designer
timeline: 4 months (Q2-Q3 2023)
team:
  - 2 Designers
  - 5 Engineers  
  - 1 PM
  - 1 Researcher
teamSize: 9
platforms:
  - Web
  - Mobile Web
company: "[Company Name]"
year: 2023
isNDA: false
heroImage: /work/checkout/hero.png
heroAlt: Checkout flow showing streamlined 2-step process
---

## TL;DR

[Generated content]

## Context & Business Problem

[Generated content]

[... remaining sections ...]
```

### 7. Handling Unknowns

For fields marked as unknown during interview:

**Option A: Omit gracefully**
If the section isn't critical, simply don't include it.

**Option B: Mark clearly**
```mdx
*Note: Exact metrics were not tracked for this project.*
```

**Option C: Use qualitative language**
Instead of "improved by X%," write "significantly improved based on user feedback and stakeholder validation."

Never invent specifics. Hiring managers spot fabrication.

## Common Patterns

### Opening Hook Examples

Strong:
- "This project recovered $4.2M in annual revenue."
- "Our checkout completion rate jumped 23% in 4 months."
- "67% of users were abandoning at the payment step."

Weak:
- "I worked on a checkout redesign project."
- "In this case study, I will describe..."
- "At [Company], I was tasked with..."

### Transition Phrases

Between sections, use brief bridges:
- "Armed with these insights, we moved to ideation."
- "Testing revealed unexpected friction points."
- "Looking back on this project..."

Avoid:
- "In this section, I will discuss..."
- "Next, I want to talk about..."
