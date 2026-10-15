# Career Levels

Casestack works for UX designers and product designers at every level. Hiring managers read a student's case study differently from a principal's. This file defines each level and how the interview, writing, and review steps adjust to it.

Every run starts by asking the designer's level. Read this file before the interview, write, and review steps.

## Asking the Level

Ask once, before gathering materials. Use one question with these options:

```
Before we start: which level best describes you?

1. Student / Intern: in school, a bootcamp, or an internship
2. Junior: 0-2 years in UX or product design
3. Mid-level: 2-5 years
4. Senior: 5-8 years
5. Lead / Staff / Principal: 8+ years, or leading designers or design direction

Also: is your role closer to UX Designer or Product Designer?
And are you applying for a role above your current level? (optional)
```

Record the answers on the content model:

```json
{
  "meta": {
    "designerLevel": "student | junior | mid | senior | lead",
    "roleTrack": "ux | product",
    "targetLevel": "student | junior | mid | senior | lead"
  }
}
```

Rules:
- Years are a guide, not a gate. If the designer says "3 years but I lead a squad," trust their description of the work.
- **Career switchers** (from engineering, marketing, research, graphic design, and so on): use `junior` unless they already hold a design role at a higher level. In the interview, ask about skills they bring from the previous career.
- **Target level**: if `targetLevel` is set and higher than `designerLevel`, calibrate the interview and review to `targetLevel`. Do not inflate the writing. Show the real scope honestly and draw out signals of the next level that are already there.
- If the designer skips the question, default to `mid` and say so.

## UX Designer vs Product Designer

The section structure is the same for both tracks. Emphasis shifts:

| Track | Emphasize |
|-------|-----------|
| UX Designer | Research rigor, user flows, information architecture, usability testing, accessibility |
| Product Designer | Business problem, metrics, trade-offs with PM and engineering, shipping and iterating |

## Level Profiles

### Student / Intern

**Hiring managers look for:** Potential. A sound process, curiosity, basic research skill, clear rationale, visual craft, and the ability to take feedback.

**Acceptable projects:** Class projects, bootcamp briefs, concept redesigns, hackathons, volunteer and nonprofit work, internship projects.

**Emphasize:**
- The brief and how the designer understood the problem
- Research, even if small (5 interviews, a survey, a competitor review)
- Iterations and what feedback changed
- Craft: clean, consistent visuals
- Honest reflection and learning

**Do not expect:** Business metrics, strategic ownership, cross-team influence.

**Impact for this level:** Usability test results, task success in testing, mentor or client feedback, what was learned. Label concept work as concept work.

### Junior (0-2 years)

**Hiring managers look for:** Solid fundamentals and reliable execution. Clear reasoning, good collaboration with engineers and PMs, and growing ownership.

**Emphasize:**
- What the designer personally owned, even if scope was small
- Process rigor and clear design rationale
- Collaboration and handoff
- Craft and attention to detail
- What they learned and how they grew

**Do not expect:** Product strategy, org-level influence.

**Impact for this level:** Shipped outcomes, usability results, qualitative feedback. Metrics are a strong bonus.

### Mid-level (2-5 years)

**Hiring managers look for:** Independent end-to-end ownership of a feature or product area. Good decisions under constraints, and measurable results.

**Emphasize:**
- End-to-end ownership, from problem to shipped work
- Key decisions with alternatives and trade-offs
- Working with PM and engineering on scope
- Measured impact
- Validation and iteration

**Do not expect:** Org-wide influence or setting product vision.

### Senior (5-8 years)

**Hiring managers look for:** Strategic thinking and influence. Framing ambiguous problems, connecting design to business outcomes, aligning stakeholders, and raising the quality of others' work.

**Emphasize:**
- Problem framing and strategy
- Cross-functional influence and stakeholder alignment
- Business impact with numbers
- Trade-offs at product level
- Mentoring and raising the team's bar

### Lead / Staff / Principal (8+ years)

**Hiring managers look for:** Influence beyond one project. Setting direction, shaping how teams work, building systems and practices, growing other designers, and outcomes across several teams.

**Emphasize:**
- Vision and direction-setting
- Org-level influence: practices, frameworks, design systems others adopted
- Leading and growing designers
- Multi-team or company-level outcomes
- Hard calls and the reasoning behind them

## Calibration Table

Signal scores use the rubric in `references/case-study-rubric.md` (7 signals, 0-3 each, 21 total). Sections use the same rubric (12 sections, 36 total).

| Level | Top signals | Min signal score (/21) | Min section score (/36) | Must hit |
|-------|-------------|------------------------|-------------------------|----------|
| Student / Intern | Craft, Growth, Collaboration | 8 | 20 | Process ≥ 2, Reflection ≥ 2 |
| Junior | Craft, Collaboration, Ownership | 10 | 22 | Process ≥ 2, Role ≥ 2 |
| Mid-level | Ownership, Impact, Craft | 13 | 24 | Ownership ≥ 2, Process ≥ 2 |
| Senior | Strategy, Influence, Impact | 15 | 26 | Ownership ≥ 2, Impact ≥ 2, Process ≥ 2 |
| Lead / Staff / Principal | Influence, Strategy, Ownership | 17 | 28 | Influence ≥ 3, Strategy ≥ 2, Impact ≥ 2 |

## Section Priority by Level

★★★ = critical, ★★ = important, ★ = nice to have.

| Section | Student | Junior | Mid | Senior | Lead+ |
|---------|---------|--------|-----|--------|-------|
| Role & ownership | ★★ | ★★★ | ★★★ | ★★★ | ★★★ |
| Constraints | ★ | ★★ | ★★ | ★★ | ★★ |
| Research & insights | ★★★ | ★★★ | ★★★ | ★★ | ★★ |
| Problem framing | ★★ | ★★ | ★★ | ★★★ | ★★★ |
| Process & decisions | ★★★ | ★★★ | ★★★ | ★★★ | ★★★ |
| Alternatives & trade-offs | ★★ | ★★ | ★★★ | ★★★ | ★★★ |
| Validation & iteration | ★★★ | ★★★ | ★★ | ★★ | ★★ |
| Quantified impact | ★ | ★★ | ★★★ | ★★★ | ★★★ |
| Influence & leadership | ★ | ★ | ★★ | ★★★ | ★★★ |
| Reflection & learning | ★★★ | ★★★ | ★★ | ★★ | ★★ |

## Writing Tone by Level

| Level | Tone |
|-------|------|
| Student / Intern | Curious and clear. Show how you think. Credit mentors and teammates. |
| Junior | Confident about what you owned. Precise about what the team did. |
| Mid-level | Decisive. Lead with decisions and results. |
| Senior | Strategic. Connect design to business. Show who you aligned and how. |
| Lead / Staff / Principal | Directional. Show the bets you made and how others' work changed. |

At every level: never inflate scope, never invent metrics, and use "I" for your own work and "we" for team work.

## Concept and Academic Projects

- Label them clearly: "Concept project," "Course project," or "Bootcamp brief."
- Do not invent business metrics. Use test results, task success, or qualitative feedback.
- Replace "business problem" with the brief or the user problem.
- Constraints can be the brief, timeline, tools, or lack of access to real users. Say how you worked around them.
