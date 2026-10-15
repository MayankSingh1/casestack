---
name: case-study/interview
description: Gap-fill interview to capture missing case-study content, prioritized for the designer's level
parent: case-study
---

# Interview Sub-skill

Conduct a targeted gap-fill interview to capture content missing from extracted materials. Compare against the case-study rubric, using the priorities for the designer's level, and ask one question at a time.

Before asking, read `references/career-levels.md` and `references/ai-portfolio-rules.md`.

**If `meta.designerLevel` is not set, ask the level question from `references/career-levels.md` before anything else.** If `meta.targetLevel` is higher, use the target's priorities. Rules #1, #2, and #5 come from the designer’s answers. Rule #3 is asked only when they say AI supported the work.

## Core Principles

### Never Invent
- Do not make up metrics, numbers, or quotes
- Do not assume team sizes or timelines
- Do not fabricate user research findings
- Mark unknowns clearly as `[UNKNOWN]` or `[NOT MEASURED]`

### One Question at a Time
- Ask a single, focused question
- Wait for the response before the next question
- Group related sub-questions only when natural

### Prioritize Signals for the Level
Focus on what hiring managers look for at the designer's level:

| Level | Ask about first |
|-------|-----------------|
| Student / Intern | Brief, research, iterations, craft, what they learned |
| Junior | What they owned, process rationale, collaboration, craft |
| Mid-level | End-to-end ownership, decisions and trade-offs, measured impact |
| Senior | Problem framing, strategy, cross-functional influence, business impact |
| Lead / Staff / Principal | Direction-setting, org influence, growing designers, multi-team outcomes |

Do not push a student for revenue numbers or a junior for org strategy. Do push a senior or lead for them.

## Gap Assessment Process

### 1. Load Extracted Content

Read the content JSON from the ingest phase.

### 2. Score Against Rubric

For each section, assess completeness. Look up each section's priority for the designer's level in the **Section Priority by Level** table in `references/career-levels.md` (★★★ critical, ★★ important, ★ nice to have).

| Section | Priority (from level) | Score |
|---------|-----------------------|-------|
| Role & ownership | | 0-3 |
| Constraints faced | | 0-3 |
| Research methods + findings | | 0-3 |
| Problem framing / HMW | | 0-3 |
| Process + decisions | | 0-3 |
| Alternatives & trade-offs | | 0-3 |
| Validation/testing | | 0-3 |
| Quantified impact | | 0-3 |
| Influence & leadership | | 0-3 |
| Reflection/learnings | | 0-3 |

Scoring:
- 0 = Missing entirely
- 1 = Mentioned but thin
- 2 = Present but could be stronger
- 3 = Strong, complete

### 3. Prioritize Gaps

Rank gaps by:
1. Critical sections scoring 0-1
2. Important sections scoring 0
3. Critical sections scoring 2
4. Important sections scoring 1-2
5. Nice-to-have sections only if the designer has time

## Question Bank

The questions below work at every level. Add the level-specific questions at the end of this section where they apply.

### Role & Ownership (Critical)

If missing or thin, ask:

**Q: "What was your specific role on this project?"**
Follow-ups:
- "What did you personally own vs. collaborate on?"
- "Were you the sole designer or part of a team?"
- "Did you define the direction or execute someone else's vision?"
- "What decisions did you make independently?"

**Q: "What was the team structure?"**
Follow-ups:
- "How many people total? (designers, engineers, PM, etc.)"
- "Who did you work most closely with?"
- "Did you lead or mentor anyone?"

### Constraints (Important)

If missing, ask:

**Q: "What constraints shaped this project?"**
Examples to prompt:
- Time pressure (how long did you have?)
- Technical limitations
- Resource constraints (team size, budget)
- Organizational constraints (politics, legacy systems)
- User constraints (accessibility needs, device limitations)

### Research & Insights (Critical)

If missing or thin, ask:

**Q: "What research informed your decisions?"**
Follow-ups:
- "What methods did you use? (interviews, surveys, analytics, usability tests)"
- "How many participants/users?"
- "What were the 2-3 most important findings?" (Rule #2)
- "Which finding informed the solution?" (Rule #5)
- "Do you have any memorable quotes from users?"

**Q: "What surprised you in the research?"**
- Unexpected findings often make compelling narrative

### Problem Framing (Important)

If missing, ask:

**Q: "How did you frame the problem you were solving?"**
Follow-ups:
- "In one sentence, what problem did you solve?" (Rule #1)
- "Why did that problem matter to the business or the user?" (Rule #5)
- "Did you create any HMW (How Might We) statements?"
- "How did you define success upfront?"
- "What metrics would indicate success?"

### Process & Decisions (Critical)

If missing key decisions, ask:

**Q: "Walk me through a key design decision you made."**
For each decision:
- "What alternatives did you consider?"
- "Why did you choose this approach over others?" (Rule #1)
- "What evidence informed that choice?" (Rule #5)
- "What trade-offs did you accept?" (Rule #5)
- "What changed because of this decision?" (Rule #5)
- "Who did you need to convince?"

**Q: "Was there a moment where you changed direction?"**
- Pivots and iterations show strategic thinking

### Validation (Important)

If missing, ask:

**Q: "How did you validate your design before launch?"**
Follow-ups:
- "Did you run usability tests? How many participants?"
- "What testing insight changed the design?" (Rule #2)
- "Walk through one iteration: what you tried, what you learned, what you changed." (Rule #2)
- "What did you change based on feedback?"
- "Were there any A/B tests?"

### Impact (Critical)

If metrics are missing:

**Q: "What was the measurable impact of this work?"**
Guide to specific metrics:
- "Did conversion rates change? By how much?"
- "Did task completion improve?"
- "Was there a change in user satisfaction scores?"
- "Did support tickets decrease?"
- "What about engagement metrics?"

If they don't have exact numbers:

**Q: "Even if you don't have exact numbers, do you have directional data?"**
- "Roughly how much did [metric] improve?"
- "Was it considered a success by leadership? How did they express that?"
- "Can you share relative change (e.g., '2x improvement') even if not absolute numbers?"

Mark uncertain metrics clearly:
```json
{
  "name": "Conversion rate",
  "change": "~15% improvement",
  "isEstimate": true,
  "note": "Based on team discussion; exact data unavailable due to NDA"
}
```

### Reflection (Important)

If missing, ask:

**Q: "Looking back, what did you learn from this project?"**
Follow-ups:
- "What did you personally learn?" (Rule #1)
- "What would you do differently if starting over?"
- "What skills did you develop?"
- "What would you tell someone facing a similar challenge?"

### Level-Specific Questions

**Student / Intern**
- "Was this a class project, bootcamp brief, internship, or personal project?"
- "What was the brief, and how did you interpret it?"
- "What feedback did you get from mentors, instructors, or users, and what did you change?"
- "If you couldn't reach real users, how did you test your ideas?"

**Junior**
- "Which parts of this did you own, start to finish?"
- "How did you work with engineers during handoff?"
- "What feedback from a senior designer or PM changed your work?"

**Career switchers** (any level)
- "What skills from your previous career did you use on this project?"

**Mid-level**
- "How did you and your PM decide what to cut?"
- "What did you push back on, and what happened?"

**Senior**
- "How did you reframe the problem from what was first asked?"
- "Whose minds did you have to change, and how?"
- "How did you raise the bar for others on the team?"

**Lead / Staff / Principal**
- "What direction did you set, and how did other teams adopt it?"
- "What practices, systems, or frameworks did you create that outlasted this project?"
- "How did you grow the designers around you?"
- "What was the hardest call you made, and what did it cost?"

### AI Support (ask only if AI helped)

Ask this block only when the designer says AI supported the project work. Skip it when AI was not used, and set `aiSupport.used` to `false`. Do not invent a tool or a disclosure.

**Q: "You mentioned AI supported this work. Can you clarify what was yours?"** (Rule #3)
Follow-ups, in order:
- "Which tool did you use, and why that one?"
- "What did AI help you do?"
- "What did you review or change afterward?"
- "Which decisions were yours?"

Record the answers on `aiSupport`:

```json
{
  "aiSupport": {
    "used": true,
    "tool": "Name of the tool",
    "why": "Why that tool",
    "helpedWith": ["What AI helped do"],
    "reviewedOrChanged": ["What the designer reviewed or changed"],
    "decisionsOwned": ["Decisions that stayed the designer's"]
  }
}
```

## Interview Flow

```
1. Review extracted content confidence scores
2. Identify critical gaps (score 0-1)
3. Ask ONE question about highest-priority gap
4. Record response
5. Update content model
6. Repeat until critical gaps addressed
7. Address important gaps if user has time
8. Summarize what's still unknown
```

## Handling "I Don't Know" Responses

If the user can't answer:

```
"That's okay! We'll mark this as [NOT AVAILABLE] in the case study. 
Some options:
- Leave it out (if not critical)
- Use qualitative language ('significant improvement')
- Note it in the reflection ('metrics weren't tracked, which I'd change next time')

Want to move to the next question?"
```

## Output Format

After interview, update the content model:

```json
{
  "interviewCompleted": true,
  "interviewedAt": "2024-01-15T11:00:00Z",
  "questionsAsked": 8,
  "gapsRemaining": [
    {
      "field": "impact.metrics[0].before",
      "reason": "Pre-launch metrics not tracked",
      "handling": "Marked as qualitative improvement"
    }
  ],
  "content": {
    // Updated CaseStudy object
  }
}
```

## Red Flags

Watch for and probe when you see these, at any level:

- "I did everything" → Ask about actual ownership vs. collaboration
- "We increased conversion" → Ask for specific numbers
- "Users loved it" → Ask for evidence (quotes, NPS, support tickets)
- No mention of trade-offs → Push for constraints and alternatives
- Perfect story with no challenges → Ask about what was hard
- Vague timelines → Pin down actual duration

Level-specific:
- **Student / Junior**: claiming strategy or leadership that doesn't match the scope → Ask what they personally did. Credit the team honestly.
- **Mid-level and above**: no metrics at all → Ask for directional data or why it wasn't measured.
- **Senior / Lead**: only execution detail, no influence → Ask who they aligned and what changed beyond the project.
