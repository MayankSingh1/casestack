---
name: case-study/review
description: Score case study against senior rubric and verify build/accessibility
parent: case-study
---

# Review Sub-skill

Verify the generated case study meets quality standards, passes technical checks, and scores well against the senior rubric.

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

#### Seniority Signal Scoring

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

### 5. Writing Quality Check

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

### 6. Gap Report

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

Seniority Score: X/21
  - Strongest signals: [signals]
  - Weakest signals: [signals]
  - Recommendations: [specific improvements]

Writing Quality:
  - Issues found: [list]
  - Suggested edits: [list]

Screenshots Captured:
  - mobile.png: [path]
  - desktop.png: [path]

Overall Assessment:
  - READY TO PUBLISH
  - NEEDS MINOR REVISIONS (list)
  - NEEDS SIGNIFICANT WORK (list)

Next Actions:
  1. [Specific action]
  2. [Specific action]
```

### 7. Remediation

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

#### Writing Issues

| Issue | Fix |
|-------|-----|
| AI slop | Replace with specific language |
| Passive voice | Rewrite in active voice |
| Wall of text | Add headers, bullets |
| Vague | Add numbers, specifics |

### 8. Final Sign-off Checklist

Before declaring complete:

- [ ] `npm run build` passes
- [ ] `npx tsc --noEmit` passes
- [ ] `npm run lint` passes (or only acceptable warnings)
- [ ] Page renders at all breakpoints
- [ ] Screenshots captured
- [ ] All images have alt text
- [ ] Lighthouse accessibility ≥ 90
- [ ] Content score ≥ 24/36
- [ ] Seniority score ≥ 15/21
- [ ] No banned writing phrases
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
Seniority: 18/21 (Senior-level)

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
