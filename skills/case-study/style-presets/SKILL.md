---
name: case-study/style-presets
description: Select a presentation style for the case study based on content type and user preference
parent: case-study
---

# Style Presets Sub-skill

Select and configure a presentation style preset based on the case study content, user preference, and portfolio context.

## When to Use

Before generating pages, determine which style preset best suits the case study:
- **Interactivity level**: Does the content benefit from scrollytelling?
- **Content density**: Text-heavy vs. visual-heavy
- **Portfolio voice**: Does the existing portfolio lean editorial or interactive?
- **Case study type**: Product feature, campaign, design system, research

## Available Presets

### 1. Interactive Narrative (Sanvithi-style) ⭐ Recommended for Product Features

Based on analysis of https://sanvithi.com/explora - the gold standard for senior product case studies.

**Characteristics**:
- Pinned scrollytelling for solution sections
- Numbered progression (Design 1/3, 2/3, 3/3)
- Outcome-first hero with large metrics
- Clean, minimal chrome
- Large typographic hierarchy
- Scroll-triggered reveals throughout

**Best for**:
- Product design case studies
- Feature launches
- 0-to-1 projects
- Complex multi-phase projects

**Key Components**:
- `ScrollytellingSection` - Pinned text while images transition
- `NumberedPhase` - Phase progression indicator (1/3, 2/3, 3/3)
- `CountUpMetric` - Animated metrics on scroll
- `ScrollReveal` - Staggered content reveals
- `ScrollProgress` - Chapter-based navigation

**Configuration**:
```typescript
const preset: InteractiveNarrativeConfig = {
  hero: {
    outcomeFirst: true,
    metricsAboveFold: true,
    scopeTags: true,
  },
  sections: {
    pinSolutionSections: true,
    numberProcessPhases: true,
    scrollRevealAll: true,
  },
  navigation: {
    showProgress: true,
    stickyChapters: true,
    showPercentage: false,
  },
  metrics: {
    animateOnScroll: true,
    largeDisplay: true,
  },
};
```

---

### 2. Editorial Long-form

Based on Swiggy design article and Substack-style case studies.

**Characteristics**:
- Article-style continuous flow
- No pinned sections
- Inline images within text
- Pull quotes for emphasis
- Reading-time indicator
- Simple scroll behavior

**Best for**:
- Design leadership case studies
- Process/culture change stories
- Research-heavy projects
- Strategic initiatives

**Key Components**:
- `Quote` (pull-quote variant)
- `ImageWithCaption` (inline)
- `MetricCallout` (simple)
- `ScrollReveal` (subtle)

**Configuration**:
```typescript
const preset: EditorialLongformConfig = {
  hero: {
    articleStyle: true,
    readingTime: true,
    authorByline: true,
  },
  sections: {
    pullQuotes: true,
    inlineImages: true,
    noComplexInteractions: true,
  },
  typography: {
    serifHeadings: false,  // match portfolio
    largeBodyText: true,
    lineHeight: 1.75,
  },
};
```

---

### 3. Data/Metrics-Led

Based on Design System case study and Fabio's Metrix SaaS.

**Characteristics**:
- Metrics prominent above fold
- Token/system documentation style
- Code blocks for technical content
- Before/after emphasis
- Technical depth visible
- Systematic structure

**Best for**:
- Design system case studies
- Data product design
- Developer tools
- Internal tools
- Analytics products

**Key Components**:
- `CountUpMetric` - Hero metrics
- `BeforeAfter` - Comparison emphasis
- `ImageComparisonSlider` - Interactive comparison
- `DecisionCard` - Technical decisions
- Code blocks for tokens/specs

**Configuration**:
```typescript
const preset: DataMetricsConfig = {
  hero: {
    metricsGrid: true,
    technicalTags: true,
  },
  sections: {
    showBeforeAfter: true,
    includeCodeBlocks: true,
    technicalDecisions: true,
  },
  metrics: {
    animateOnScroll: true,
    showChange: true,  // +15%, -20%
    contextualLabels: true,
  },
};
```

---

### 4. Visual Campaign

Based on Roscoe Design's Napo Frenchies and visual-forward portfolios.

**Characteristics**:
- Full-bleed imagery
- Gallery-focused layouts
- Minimal text, maximum visuals
- Horizontal scroll galleries
- Hover interactions
- Dramatic transitions

**Best for**:
- Brand/campaign work
- Marketing design
- Visual identity projects
- Art direction
- Motion/video projects

**Key Components**:
- `HorizontalGallery` - Full-width image scrolls
- `ImageWithCaption` (full-bleed variant)
- `ScrollReveal` (dramatic)
- Video embeds

**Configuration**:
```typescript
const preset: VisualCampaignConfig = {
  hero: {
    fullBleed: true,
    imageFirst: true,
    minimalText: true,
  },
  sections: {
    galleryFocused: true,
    horizontalScrolls: true,
    reducedText: true,
  },
  images: {
    fullWidth: true,
    hoverEffects: true,
    lightboxEnabled: true,
  },
};
```

---

### 5. Design System Doc

Based on Siddhant's Design System case study.

**Characteristics**:
- Component-focused structure
- Usage examples
- Do/Don't patterns
- Systematic, scannable
- Technical specifications
- Token documentation

**Best for**:
- Design systems
- Component libraries
- Pattern libraries
- Guidelines documentation

**Key Components**:
- `DecisionCard` - Pattern rationale
- `BeforeAfter` - Do/Don't examples
- Code blocks - Token specs
- `TableOfContents` - Sticky navigation
- `NumberedPhase` - Systematic progression

**Configuration**:
```typescript
const preset: DesignSystemDocConfig = {
  hero: {
    problemStatement: true,
    teamMetrics: true,
  },
  sections: {
    stickyNav: true,
    componentExamples: true,
    usageGuidelines: true,
  },
  documentation: {
    showTokens: true,
    dosDonts: true,
    codeExamples: true,
  },
};
```

---

## Preset Selection Logic

When the user hasn't specified a preference, auto-select based on content analysis:

```typescript
function selectPreset(content: CaseStudy): StylePreset {
  // Check for design system signals
  if (
    content.meta.title.toLowerCase().includes('design system') ||
    content.meta.title.toLowerCase().includes('component') ||
    content.process.some(p => p.phase.includes('token'))
  ) {
    return 'design-system-doc';
  }
  
  // Check for campaign/visual signals
  if (
    content.meta.platform.includes('brand') ||
    content.meta.platform.includes('campaign') ||
    content.assets.images.length > 15
  ) {
    return 'visual-campaign';
  }
  
  // Check for data/metrics signals
  if (
    content.impact.metrics.length >= 4 ||
    content.process.some(p => p.description.includes('data') || p.description.includes('analytics'))
  ) {
    return 'data-metrics-led';
  }
  
  // Check for editorial signals
  if (
    content.reflection.learnings.length >= 5 ||
    content.research.keyFindings.length >= 6
  ) {
    return 'editorial-longform';
  }
  
  // Default to interactive narrative for product work
  return 'interactive-narrative';
}
```

## Asking User Preference

When starting page generation, present preset options:

```
Based on your case study content, I recommend the **Interactive Narrative** preset, which includes:
- Pinned scrollytelling for your solution sections
- Animated metrics (showing your 12.5% improvement)
- Numbered phases for your process

Other options:
1. **Editorial Long-form** - Article-style continuous flow
2. **Data/Metrics-Led** - Emphasizes your impact numbers
3. **Visual Campaign** - Gallery-focused, minimal text
4. **Design System Doc** - Component-focused structure

Which would you prefer? (Or I can proceed with Interactive Narrative)
```

## Component Availability by Preset

| Component | Interactive | Editorial | Data/Metrics | Visual | Design System |
|-----------|-------------|-----------|--------------|--------|---------------|
| ScrollytellingSection | ✅ Primary | ❌ | ❌ | ❌ | ❌ |
| ScrollProgress | ✅ | ❌ | ❌ | ❌ | ✅ |
| ScrollReveal | ✅ | ✅ Subtle | ✅ | ✅ Dramatic | ✅ |
| CountUpMetric | ✅ | ❌ | ✅ Primary | ❌ | ✅ |
| ImageComparisonSlider | ✅ | ❌ | ✅ Primary | ❌ | ✅ |
| HorizontalGallery | ✅ | ❌ | ❌ | ✅ Primary | ❌ |
| NumberedPhase | ✅ Primary | ❌ | ❌ | ❌ | ✅ |
| BeforeAfter | ✅ | ✅ | ✅ Primary | ❌ | ✅ Primary |
| Quote | ✅ | ✅ Primary | ✅ | ❌ | ✅ |

## Accessibility Considerations

All presets must:
- Respect `prefers-reduced-motion` (disable scroll animations, show all content)
- Maintain focus management for interactive components
- Ensure keyboard navigation works
- Keep contrast ratios WCAG AA compliant
- Provide alternative layouts for pinned sections on mobile

## Mobile Adaptations

| Desktop Feature | Mobile Fallback |
|-----------------|-----------------|
| Pinned scrollytelling | Stacked sections |
| Horizontal gallery | Vertical scroll |
| Side-by-side comparison | Stacked before/after |
| Sticky navigation | Collapsible hamburger |
| Large metrics grid | Single-column stack |

## Integration with Page Generator

After preset selection, pass configuration to page-generator:

```typescript
// In page generation
const selectedPreset = await selectOrAskPreset(content);
const config = getPresetConfig(selectedPreset);

// Pass to component generation
generateComponents(content, config);
generatePage(content, config);
```

The page-generator uses the preset config to:
1. Choose which components to import
2. Configure component variants
3. Structure section layouts
4. Set animation behaviors
5. Configure navigation
