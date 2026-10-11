---
name: case-study/interview
description: Gap-fill interview to capture missing senior case-study content
parent: case-study
---

# Interview Sub-skill

Conduct a targeted gap-fill interview to capture content missing from extracted materials. Compare against the senior case-study rubric and ask one question at a time.

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

### Prioritize Senior Signals
Focus on content that demonstrates seniority:
1. Ownership and scope
2. Strategic thinking
3. Cross-functional influence
4. Measurable impact
5. Craft and attention to detail

## Gap Assessment Process

### 1. Load Extracted Content

Read the content JSON from the ingest phase.

### 2. Score Against Rubric

For each section, assess completeness:

| Section | Required for Senior | Score |
|---------|---------------------|-------|
| Role & ownership | ★★★ Critical | 0-3 |
| Constraints faced | ★★ Important | 0-3 |
| Research methods + findings | ★★★ Critical | 0-3 |
| Problem framing / HMW | ★★ Important | 0-3 |
| Process + decisions | ★★★ Critical | 0-3 |
| Alternatives considered | ★★★ Critical | 0-3 |
| Trade-offs explained | ★★★ Critical | 0-3 |
| Validation/testing | ★★ Important | 0-3 |
| Quantified impact | ★★★ Critical | 0-3 |
| Reflection/learnings | ★★ Important | 0-3 |

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

## Question Bank

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
- "What were the 2-3 most important findings?"
- "Do you have any memorable quotes from users?"

**Q: "What surprised you in the research?"**
- Unexpected findings often make compelling narrative

### Problem Framing (Important)

If missing, ask:

**Q: "How did you frame the problem you were solving?"**
Follow-ups:
- "Did you create any HMW (How Might We) statements?"
- "How did you define success upfront?"
- "What metrics would indicate success?"

### Process & Decisions (Critical)

If missing key decisions, ask:

**Q: "Walk me through a key design decision you made."**
For each decision:
- "What alternatives did you consider?"
- "Why did you choose this approach over others?"
- "What trade-offs did you accept?"
- "Who did you need to convince?"

**Q: "Was there a moment where you changed direction?"**
- Pivots and iterations show strategic thinking

### Validation (Important)

If missing, ask:

**Q: "How did you validate your design before launch?"**
Follow-ups:
- "Did you run usability tests? How many participants?"
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
- "What would you do differently if starting over?"
- "What skills did you develop?"
- "What would you tell someone facing a similar challenge?"

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

## Senior-Level Red Flags

Watch for and probe when you see:

- "I did everything" → Ask about actual ownership vs. collaboration
- "We increased conversion" → Ask for specific numbers
- "Users loved it" → Ask for evidence (quotes, NPS, support tickets)
- No mention of trade-offs → Push for constraints and alternatives
- Perfect story with no challenges → Ask about what was hard
- Vague timelines → Pin down actual duration
