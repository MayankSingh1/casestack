---
name: case-study/review
description: Score case study against the rubric for the designer's level and verify build/accessibility
parent: case-study
---

# Review Sub-skill

Verify the generated case study meets quality standards, passes technical checks, and scores well against the rubric for the designer's level.

Before scoring, read `references/case-study-rubric.md` and `references/career-levels.md`. Use `meta.designerLevel`, or `meta.targetLevel` if it is set and higher, to pick the thresholds.

## Review Process

### 1. Technical Verification

#### Build Check

```bash
# Run Next.js build
npm run build

# Check for errors
echo $?  # Should be 0
```

If build fails:
- Report specific errors
- Suggest fixes
- Iterate until passing

#### TypeScript Check

```bash
npx tsc --noEmit
```

Check for:
- Type errors in generated components
- Missing type definitions
- Incorrect prop types

#### Lint Check

```bash
npm run lint
```

Check for:
- ESLint violations
- Accessibility linting (if eslint-plugin-jsx-a11y installed)
- Import order issues

### 2. Visual Verification

#### Render the Page

Start dev server and navigate to the case study:

```bash
npm run dev
# Navigate to /work/[slug]
```

#### Capture Screenshots

Take screenshots at key breakpoints:

| Breakpoint | Width | Name |
|------------|-------|------|
| Mobile | 375px | mobile.png |
| Tablet | 768px | tablet.png |
| Desktop | 1440px | desktop.png |

Capture:
1. Hero section (above fold)
2. Full page scroll
3. Any interactive states (hover, expanded)

#### Visual Checklist

- [ ] Hero renders with correct content
- [ ] Images load (or show proper placeholders)
- [ ] Typography matches portfolio style
- [ ] Colors match portfolio tokens
- [ ] Spacing consistent with portfolio
- [ ] No layout breaks at any breakpoint
- [ ] TOC functions (if sticky)
- [ ] Links work

### 3. Accessibility Audit

#### Automated Checks

```bash
# If axe-core installed
npx @axe-core/cli http://localhost:3000/work/[slug]
```

Or use browser DevTools:
- Lighthouse accessibility audit
- Axe browser extension
- WAVE browser extension

#### Manual Checks

| Criterion | Pass/Fail |
|-----------|-----------|
| Keyboard navigation works | |
| Focus visible on all interactive elements | |
| Heading hierarchy is logical | |
| All images have alt text | |
| Color contrast ≥ 4.5:1 | |
| Links are distinguishable | |
| No motion without prefers-reduced-motion check | |

### 4. Content Rubric Scoring

Score each section 0-3:
- 0 = Missing
- 1 = Present but thin
- 2 = Good
- 3 = Excellent

#### Section Scoring

| Section | Score | Notes |
|---------|-------|-------|
| Hero (title, outcome, meta) | /3 | |
| TL;DR (concise, outcome-first) | /3 | |
| Context (business problem clear) | /3 | |
| Role (specific ownership stated) | /3 | |
| Constraints (real challenges) | /3 | |
| Research (methods, findings, evidence) | /3 | |
| Problem framing (HMW, metrics) | /3 | |
| Process (decisions, alternatives, trade-offs) | /3 | |
| Solution (annotated visuals) | /3 | |
| Validation (testing, iterations) | /3 | |
| Impact (quantified outcomes) | /3 | |
| Reflection (learnings, growth) | /3 | |

**Total: /36**

#### Level Signal Scoring

Score each signal against what is expected at the designer's level. A student with clear process and honest reflection can pass with low Strategy and Influence scores.

| Signal | Score | Evidence |
|--------|-------|----------|
| Ownership | /3 | |
| Strategy | /3 | |
| Influence | /3 | |
| Impact | /3 | |
| Craft | /3 | |
| Collaboration | /3 | |
| Growth | /3 | |

**Total: /21**

#### Level Thresholds

| Level | Signals (/21) | Sections (/36) | Must hit |
|-------|---------------|----------------|----------|
| Student / Intern | ≥ 8 | ≥ 20 | Process ≥ 2, Reflection ≥ 2 |
| Junior | ≥ 10 | ≥ 22 | Process ≥ 2, Role ≥ 2 |
| Mid-level | ≥ 13 | ≥ 24 | Ownership ≥ 2, Process ≥ 2 |
| Senior | ≥ 15 | ≥ 26 | Ownership ≥ 2, Impact ≥ 2, Process ≥ 2 |
| Lead / Staff / Principal | ≥ 17 | ≥ 28 | Influence ≥ 3, Strategy ≥ 2, Impact ≥ 2 |

For concept and academic projects, score Impact on test results, task success, and feedback. Do not mark down for missing business metrics.

### 5. AI Portfolio Rules

Score each rule pass or fail against `references/ai-portfolio-rules.md`.

| Rule | Pass/Fail | What to check |
|------|-----------|---------------|
| #1 Keep your personal voice | | Problem solved, what was learned, decisions made and why |
| #2 Show evidence | | Process backed by research findings, testing insights, or design iterations |
| #3 Clarify ownership | | If AI was used: tool and why, what AI helped do, what was reviewed or changed, which decisions were theirs. If AI was not used: PASS and omit the disclosure |
| #4 Check visuals | | Consistent styles, proper alignment, accurate representation of the work |
| #5 Show your thinking | | Why the problem mattered, evidence that informed the solution, trade-offs, what changed because of the work |

Rule #4 fails when styles clash, alignment breaks, or a visual misrepresents the work.

A case study is not ready to publish if Rule #1, #2, or #5 fails, or if AI was used and Rule #3 is missing.

### 6. Writing Quality Check

#### Automated Checks

```bash
# Check for banned phrases
grep -i "leverage\|utilize\|synergy\|streamline" content/work/[slug].mdx
```

#### Rubric

| Criterion | Pass/Fail | Example Issue |
|-----------|-----------|---------------|
| No AI slop phrases | | "leveraged synergies" |
| Active voice | | "was designed by me" |
| Outcome-first | | Starts with process |
| Specific over vague | | "improved" without numbers |
| Scannable (headers, bullets) | | Wall of text |
| No jargon | | Unexplained acronyms |
| Sentences ≤ 25 words | | Run-on sentences |

### 7. Gap Report

After scoring, generate a gap report:

```yaml
Case Study Review: [Title]
Date: [Date]
Slug: [slug]

Technical Status:
  build: PASS | FAIL (error details)
  typescript: PASS | FAIL (error details)
  lint: PASS | FAIL (error details)

Accessibility Status:
  automated: PASS | X issues found
  keyboard_nav: PASS | FAIL
  color_contrast: PASS | FAIL
  heading_hierarchy: PASS | FAIL
  alt_text: PASS | FAIL (X images missing)

Content Score: X/36
  - Strongest: [sections]
  - Weakest: [sections]
  - Gaps: [missing or thin areas]

Designer Level: [student | junior | mid | senior | lead] (target: [level or none])

Level Signal Score: X/21 (bar for this level: Y)
  - Meets level bar: YES | NO
  - Strongest signals: [signals]
  - Weakest signals: [signals]
  - Recommendations: [specific improvements]

AI Portfolio Rules:
  rule_1_personal_voice: PASS | FAIL
  rule_2_evidence: PASS | FAIL
  rule_3_ownership: PASS | FAIL | N/A (AI not used)
  rule_4_visuals: PASS | FAIL
  rule_5_thinking: PASS | FAIL

Writing Quality:
  - Issues found: [list]
  - Suggested edits: [list]

Screenshots Captured:
  - mobile.png: [path]
  - desktop.png: [path]

Overall Assessment:
  - READY TO PUBLISH (only when Rules #1, #2, and #5 pass, Rule #3 passes or AI was not used, and Rule #4 passes)
  - NEEDS MINOR REVISIONS (list)
  - NEEDS SIGNIFICANT WORK (list)

Next Actions:
  1. [Specific action]
  2. [Specific action]
```

### 8. Remediation

For each gap identified:

#### Technical Issues

| Issue | Fix |
|-------|-----|
| Build failure | Check error, fix code, rebuild |
| Type error | Add/fix types |
| Lint error | Auto-fix or manual edit |

#### Content Issues

| Gap | Action |
|-----|--------|
| Missing section | Return to interview sub-skill |
| Thin section | Ask user for more detail |
| Weak metrics | Ask user for numbers or mark as estimate |
| No visuals | Ask user for screenshots or Figma access |
| Rule #4 visuals | Restyle to the portfolio, fix alignment, or replace an unverified image with a labeled placeholder |

#### Writing Issues

| Issue | Fix |
|-------|-----|
| AI slop | Replace with specific language |
| Rule #1 voice | Restore the problem, the learning, and why the decision was made, in the designer’s words |
| Rule #2 evidence | Ask for a research finding, testing insight, or iteration; do not invent one |
| Rule #3 ownership | If AI was used, add tool, what AI did, what was reviewed or changed, and which decisions were theirs |
| Rule #5 thinking | Add why the problem mattered, the evidence, the trade-off, and what changed |
| Passive voice | Rewrite in active voice |
| Wall of text | Add headers, bullets |
| Vague | Add numbers, specifics |

### 9. Final Sign-off Checklist

Before declaring complete:

- [ ] `npm run build` passes
- [ ] `npx tsc --noEmit` passes
- [ ] `npm run lint` passes (or only acceptable warnings)
- [ ] Page renders at all breakpoints
- [ ] Screenshots captured
- [ ] All images have alt text
- [ ] Lighthouse accessibility ≥ 90
- [ ] Content score meets the level's section threshold
- [ ] Level signal score meets the level's threshold
- [ ] Level's "must hit" scores met
- [ ] No banned writing phrases
- [ ] Rule #1, #2, and #5 pass
- [ ] Rule #3 passes, or AI was not used
- [ ] Rule #4 passes (styles, alignment, accurate representation)
- [ ] User has reviewed and approved

## Output

Deliver to user:

1. **Gap Report** (YAML or structured summary)
2. **Screenshots** (mobile + desktop)
3. **Recommendations** (prioritized list)
4. **Status** (Ready / Needs Work)

If Ready:
```
✅ Your case study is ready to publish!

Technical: All checks pass
Content: 28/36 (Strong)
Level signals: 11/21 (meets the Junior bar of 10)

View it at: /work/[slug]
```

If Needs Work:
```
⚠️ Your case study needs some adjustments:

Technical Issues:
- [Issue and fix]

Content Gaps:
- [Section] needs [improvement]

Recommended Next Steps:
1. [Action]
2. [Action]

Would you like help addressing these?
```
