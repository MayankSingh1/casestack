---
name: case-study/ingest
description: Ingest project material and extract structured content for case studies
parent: case-study
---

# Ingest Sub-skill

Extract structured content from raw project materials into the case study content model.

## Supported Input Types

### Documents
- **PDF**: Project briefs, PRDs, research reports, decks
- **Markdown/Text**: Write-ups, notes, specs
- **Google Docs**: (via copy-paste or export)

### Design Files
- **Figma**: Frames, flows, components (via Figma MCP or manual export)
- **Screenshots**: UI captures, before/after shots
- **Wireframes**: Low-fi sketches, whiteboard photos

### Research & Data
- **User research**: Interview transcripts, survey results
- **Analytics**: Metrics, dashboards, reports
- **Feedback**: User quotes, support tickets, reviews

## Ingestion Process

### 1. Identify Available Materials

Ask the user:
```
What materials do you have for this case study? 
- Project docs (briefs, PRDs, write-ups)
- Figma files (paste URL)
- Screenshots or visuals
- Research findings
- Metrics or analytics
- Notes (meeting notes, Slack threads)
```

### 2. Process Each Material Type

#### For Documents (PDF, Markdown, Text)

Read the file and extract:
- Project name and description
- Timeline and dates
- Team members mentioned
- Goals and objectives
- Problems described
- Solutions proposed
- Outcomes or metrics mentioned
- Constraints or challenges

#### For Figma Files

If **Figma MCP is available**:
```
1. Call get_design_context with the file URL
2. Extract frame names, flow structure
3. Use get_screenshot for key screens
4. Document component usage
```

If **Figma MCP is NOT available**:
```
Ask user to manually export:
1. Key screens as PNG/JPG
2. Flow overview screenshot
3. Before/after comparisons
4. Component documentation
```

#### For Research Materials

Extract:
- Research methods used
- Number of participants
- Key findings (verbatim quotes when possible)
- Insights and patterns
- Recommendations made

#### For Metrics/Analytics

Extract:
- Metric names and definitions
- Baseline values (before)
- Current values (after)
- Timeframes
- Caveats or estimation notes

### 3. Structure Extraction

Map extracted content to the schema fields:

```yaml
# Content Mapping Checklist

meta:
  slug: [derive from project name]
  title: [from docs or ask]
  oneLiner: [extract or synthesize]
  role: [extract or ask - REQUIRED for senior level]
  timeline: [from dates mentioned]
  team: [names mentioned]
  teamSize: [count or ask]
  platform: [web/mobile/desktop from context]
  company: [from docs or ask]
  year: [from dates]
  isNDA: [ask if sensitive]

hero:
  title: [project name]
  outcome: [key result or headline]
  heroImage: [main visual if available]

context:
  businessProblem: [from brief/PRD]
  background: [company/product context]
  stakeholders: [people/teams mentioned]

myRole:
  responsibilities: [CRITICAL - extract or ask]
  collaboration: [how worked with others]
  ownership: [what they owned/drove]

constraints:
  [time, budget, technical, org constraints mentioned]

research:
  methods: [interview, survey, analytics, etc.]
  keyFindings: [main insights]
  evidence: [supporting data]
  quotes: [verbatim user quotes if available]

problemFraming:
  hmw: [How Might We statements if present]
  successMetrics: [defined success criteria]

process:
  [phases, decisions, explorations mentioned]

solution:
  overview: [what was built]
  features: [key features/screens]

validation:
  testing: [usability tests, A/B tests]
  iterations: [changes made based on feedback]

impact:
  metrics: [quantified outcomes]
  qualitative: [non-metric impacts]

reflection:
  learnings: [what was learned]
  whatWouldChange: [retrospective thoughts]
```

### 4. Output Format

Generate a structured content file:

```json
{
  "extractedAt": "2024-01-15T10:30:00Z",
  "sources": [
    { "type": "pdf", "name": "project_brief.pdf" },
    { "type": "figma", "url": "https://figma.com/file/..." }
  ],
  "confidence": {
    "high": ["title", "context", "solution"],
    "medium": ["timeline", "team"],
    "low": ["impact.metrics"],
    "missing": ["myRole.ownership", "constraints"]
  },
  "content": {
    // Full CaseStudy object with extracted values
    // Use null for missing required fields
    // Use empty arrays for missing array fields
  },
  "rawExtracts": {
    // Verbatim quotes and passages for reference
  }
}
```

## Extraction Rules

### Never Invent
- **Metrics**: If not provided, mark as `null` with `isEstimate: true` note
- **Quotes**: Only use verbatim quotes with source
- **Numbers**: Don't guess team sizes, timelines, or percentages

### Always Extract
- Project name and company
- What was built (solution)
- Timeframe (even approximate)
- Platforms/devices

### Mark Uncertainty
Use confidence levels:
- `high`: Directly stated in materials
- `medium`: Inferred from context
- `low`: Uncertain, needs verification
- `missing`: Not present, must ask user

### Handle NDA/Sensitive Content
- Flag if company name should be anonymized
- Note if metrics should be relative vs. absolute
- Identify visual content that may need blurring

## Asset Handling

### Images from Figma
```
1. Export at 2x resolution
2. Use descriptive filenames: hero-checkout-flow.png
3. Record required alt text prompts
4. Note caption context
```

### Before/After Shots
```
1. Pair old and new versions
2. Label clearly: before-cart.png, after-cart.png
3. Note what changed and why
```

### Organize Assets
```
/case-study-assets/
  /[slug]/
    /hero/
    /process/
    /solution/
    /before-after/
```

## Handoff to Interview

After extraction, output:
1. The structured content JSON
2. Confidence assessment
3. List of missing/uncertain fields requiring user input

The interview sub-skill will use this to generate targeted questions.
