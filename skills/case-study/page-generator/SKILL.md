---
name: case-study/page-generator
description: Generate Next.js case study pages matching the portfolio's existing conventions
parent: case-study
---

# Page Generator Sub-skill

Generate production-ready Next.js case study pages that match the portfolio's existing conventions.

## Pre-Generation: Portfolio Analysis

**Before writing any code**, analyze the portfolio repository.

### 1. Detect Framework & Router

```bash
# Check for Next.js
cat package.json | grep '"next"'

# Detect router type
ls -la app/          # App Router if exists
ls -la pages/        # Pages Router if exists
ls -la src/app/      # App Router in src
ls -la src/pages/    # Pages Router in src
```

### 2. Detect Styling System

Check in order:

```bash
# Tailwind
ls tailwind.config.* 
grep '"tailwindcss"' package.json

# CSS Modules
find . -name "*.module.css" -o -name "*.module.scss"

# Styled-components
grep '"styled-components"' package.json

# Emotion
grep '"@emotion"' package.json

# Vanilla Extract
grep '"@vanilla-extract"' package.json
```

**Fall back to Tailwind if undetectable.**

### 3. Detect Existing Conventions

```bash
# Find existing case studies
find . -path "*/work/*" -name "*.tsx" -o -path "*/projects/*" -name "*.tsx"
find . -path "*/case-study/*" -name "*.tsx" -o -path "*/cases/*" -name "*.tsx"

# Check for MDX usage
find . -name "*.mdx"
grep '"@next/mdx"' package.json
grep '"next-mdx-remote"' package.json
grep '"contentlayer"' package.json

# Find layout components
find . -name "*layout*" -o -name "*Layout*"

# Find color tokens
find . -name "*.css" -exec grep -l ":root\|--color\|--primary" {} \;
grep -r "colors:" tailwind.config.* 2>/dev/null

# Check fonts
grep -r "font" app/layout.tsx src/app/layout.tsx 2>/dev/null
find . -name "fonts.*"
```

### 4. Build Convention Profile

```yaml
Portfolio Convention Profile:
  framework: Next.js [version]
  router: App Router | Pages Router
  styling: Tailwind | CSS Modules | styled-components | Emotion
  content: MDX | TypeScript data files | Contentlayer | next-mdx-remote
  caseStudyRoute: /work/[slug] | /projects/[slug] | /case-study/[slug]
  existingComponents:
    - ComponentName (path)
  colorTokens:
    primary: [value]
    secondary: [value]
  fonts:
    heading: [font]
    body: [font]
  imageHandling: next/image | standard img | custom component
```

## Generation Strategy

Based on detected conventions:

### If MDX is used:
1. Create content file: `content/work/[slug].mdx`
2. Add to existing dynamic route handler
3. Reuse existing MDX components

### If TypeScript data files:
1. Create data file: `data/work/[slug].ts`
2. Create page: `app/work/[slug]/page.tsx`
3. Import and render data

### If no existing pattern:
1. Create route: `app/work/[slug]/page.tsx`
2. Create components in `components/case-study/`
3. Use Tailwind (default) or detected styling

## Component Library

Generate these reusable components:

### Hero

```tsx
// components/case-study/Hero.tsx
interface HeroProps {
  title: string;
  outcome: string;
  role: string;
  timeline: string;
  team: string[];
  platforms: string[];
  heroImage?: string;
  heroAlt?: string;
}
```

Features:
- Responsive layout (image right on desktop, stacked on mobile)
- Meta grid for role/timeline/team/platform
- Optional hero image with proper aspect ratio

### MetaGrid

```tsx
// components/case-study/MetaGrid.tsx
interface MetaItem {
  label: string;
  value: string | string[];
}

interface MetaGridProps {
  items: MetaItem[];
  columns?: 2 | 3 | 4;
}
```

Features:
- Flexible column layout
- Handles array values (team members, platforms)

### SectionBlock

```tsx
// components/case-study/SectionBlock.tsx
interface SectionBlockProps {
  id: string;
  title: string;
  children: React.ReactNode;
}
```

Features:
- Consistent section spacing
- Anchor link support for TOC
- Semantic heading (H2)

### ImageWithCaption

```tsx
// components/case-study/ImageWithCaption.tsx
interface ImageWithCaptionProps {
  src: string;
  alt: string;
  caption?: string;
  fullWidth?: boolean;
}
```

Features:
- Uses next/image with proper sizing
- Lazy loading
- Optional caption below
- Full-width option for hero images

### BeforeAfter

```tsx
// components/case-study/BeforeAfter.tsx
interface BeforeAfterProps {
  before: { src: string; alt: string; label?: string };
  after: { src: string; alt: string; label?: string };
  caption?: string;
}
```

Features:
- Side-by-side on desktop, stacked on mobile
- Clear before/after labels
- Optional slider variant

### MetricCallout

```tsx
// components/case-study/MetricCallout.tsx
interface MetricCalloutProps {
  metrics: Array<{
    label: string;
    value: string;
    change?: string;
    positive?: boolean;
  }>;
}
```

Features:
- Visual emphasis on numbers
- Positive/negative color coding
- Grid layout for multiple metrics

### Quote

```tsx
// components/case-study/Quote.tsx
interface QuoteProps {
  text: string;
  source?: string;
  role?: string;
}
```

Features:
- Blockquote styling
- Attribution line
- Pull-quote variant for emphasis

### DecisionCard

```tsx
// components/case-study/DecisionCard.tsx
interface DecisionCardProps {
  decision: string;
  options: Array<{
    name: string;
    description: string;
    chosen?: boolean;
  }>;
  rationale: string;
  tradeoffs?: string;
}
```

Features:
- Visual hierarchy showing chosen option
- Expandable for alternatives
- Trade-off callout

### TableOfContents

```tsx
// components/case-study/TableOfContents.tsx
interface TOCItem {
  id: string;
  title: string;
  level: number;
}

interface TableOfContentsProps {
  items: TOCItem[];
  sticky?: boolean;
}
```

Features:
- Sticky positioning on desktop
- Active section highlighting
- Smooth scroll on click
- Hidden on mobile (hamburger menu variant)

### NextProject

```tsx
// components/case-study/NextProject.tsx
interface NextProjectProps {
  title: string;
  slug: string;
  thumbnail?: string;
  description?: string;
}
```

Features:
- CTA to view next case study
- Thumbnail preview
- Hover state

## Interaction Components

These components enable advanced scroll-based interactions. Use based on the selected style preset.

### ScrollytellingSection (Interactive Narrative preset)

```tsx
// components/case-study/ScrollytellingSection.tsx
interface ScrollytellingSlide {
  image: string;
  alt: string;
  caption?: string;
}

interface ScrollytellingSectionProps {
  id: string;
  number?: string;  // "1/3", "2/3", etc.
  title: string;
  description: string;
  slides: ScrollytellingSlide[];
}
```

Features:
- **Pinned text column** stays fixed while images transition
- Scroll progress drives image changes
- Numbered section indicator
- Click-to-jump slide indicators
- Respects `prefers-reduced-motion` (falls back to stacked layout)
- Mobile: Collapses to vertical stack

**Implementation notes**:
- Uses native scroll position tracking (no GSAP dependency)
- Section height = (slides.length + 1) * 100vh
- Images cross-fade on state change

### ScrollProgress

```tsx
// components/case-study/ScrollProgress.tsx
interface Chapter {
  id: string;
  title: string;
}

interface ScrollProgressProps {
  chapters: Chapter[];
  showPercentage?: boolean;
}
```

Features:
- Fixed progress bar at top
- Chapter navigation links
- Active chapter highlighting
- Smooth scroll to section on click
- Optional percentage display

### ScrollReveal

```tsx
// components/case-study/ScrollReveal.tsx
interface ScrollRevealProps {
  children: React.ReactNode;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
  delay?: number;      // ms
  duration?: number;   // ms (default 600)
  className?: string;
}
```

Features:
- Intersection Observer-based reveal
- Configurable direction and timing
- One-time animation (doesn't replay on scroll up)
- Respects `prefers-reduced-motion`

### CountUpMetric (Data/Metrics preset)

```tsx
// components/case-study/CountUpMetric.tsx
interface CountUpMetricProps {
  value: number;
  prefix?: string;    // "$", etc.
  suffix?: string;    // "%", "M", etc.
  label: string;
  duration?: number;  // ms (default 2000)
  decimals?: number;  // decimal places
}
```

Features:
- Animated number counting on scroll into view
- Eased animation (easeOutQuart)
- Locale-aware number formatting
- Respects `prefers-reduced-motion`

### ImageComparisonSlider (Data/Metrics preset)

```tsx
// components/case-study/ImageComparisonSlider.tsx
interface ImageComparisonSliderProps {
  beforeImage: string;
  afterImage: string;
  beforeAlt: string;
  afterAlt: string;
  beforeLabel?: string;  // default "Before"
  afterLabel?: string;   // default "After"
}
```

Features:
- Draggable divider to compare images
- Touch and mouse support
- Keyboard accessible (arrow keys)
- Labels appear based on slider position

### HorizontalGallery (Visual Campaign preset)

```tsx
// components/case-study/HorizontalGallery.tsx
interface GalleryImage {
  src: string;
  alt: string;
  caption?: string;
}

interface HorizontalGalleryProps {
  images: GalleryImage[];
  aspectRatio?: '16/9' | '4/3' | '3/2' | '1/1';
}
```

Features:
- Horizontal scroll with snap
- Arrow navigation on hover
- Touch swipe support
- Responsive widths (85vw mobile, 50vw desktop)

### NumberedPhase (Interactive Narrative preset)

```tsx
// components/case-study/NumberedPhase.tsx
interface NumberedPhaseProps {
  current: number;
  total: number;
  title: string;
  showProgress?: boolean;
}
```

Features:
- Phase indicator (1/3, 2/3, 3/3)
- Optional progress bar
- Creates narrative progression

## Page Structure

### App Router (`app/work/[slug]/page.tsx`)

```tsx
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getCaseStudy, getAllCaseStudySlugs } from '@/lib/case-studies';
import { Hero } from '@/components/case-study/Hero';
import { SectionBlock } from '@/components/case-study/SectionBlock';
// ... other imports

interface Props {
  params: { slug: string };
}

export async function generateStaticParams() {
  const slugs = await getAllCaseStudySlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const caseStudy = await getCaseStudy(params.slug);
  if (!caseStudy) return {};
  
  return {
    title: `${caseStudy.title} | [Portfolio Name]`,
    description: caseStudy.outcome,
    openGraph: {
      title: caseStudy.title,
      description: caseStudy.outcome,
      images: [caseStudy.ogImage || caseStudy.heroImage],
    },
  };
}

export default async function CaseStudyPage({ params }: Props) {
  const caseStudy = await getCaseStudy(params.slug);
  if (!caseStudy) notFound();

  return (
    <article className="case-study">
      <Hero {...caseStudy.hero} />
      
      <div className="case-study-content">
        <TableOfContents items={caseStudy.toc} sticky />
        
        <main>
          <SectionBlock id="tldr" title="TL;DR">
            {caseStudy.tldr}
          </SectionBlock>
          
          {/* ... remaining sections */}
        </main>
      </div>
      
      {caseStudy.nextProject && (
        <NextProject {...caseStudy.nextProject} />
      )}
    </article>
  );
}
```

### Pages Router (`pages/work/[slug].tsx`)

Similar structure but with `getStaticProps` and `getStaticPaths`.

## Accessibility Requirements (WCAG AA)

### Images
- All images have descriptive `alt` text
- Decorative images use `alt=""`
- Complex images have extended descriptions

### Headings
- Single H1 per page (in Hero)
- Logical heading hierarchy (H2 > H3, no skipping)
- Headings are descriptive, not generic

### Color
- Contrast ratio ≥ 4.5:1 for normal text
- Contrast ratio ≥ 3:1 for large text
- Color not sole indicator of meaning

### Navigation
- TOC links are keyboard accessible
- Focus states visible
- Skip link to main content

### Motion
- Respects `prefers-reduced-motion`
- No auto-playing videos with sound

### Semantic HTML
- Use `<article>` for case study
- Use `<section>` for content blocks
- Use `<figure>` and `<figcaption>` for images

## SEO Metadata

Generate for each case study:

```tsx
export const metadata: Metadata = {
  title: `${title} | Portfolio`,
  description: outcome,
  keywords: [role, ...platforms, company],
  authors: [{ name: 'Designer Name' }],
  openGraph: {
    type: 'article',
    title: title,
    description: outcome,
    images: [{
      url: ogImage,
      width: 1200,
      height: 630,
      alt: heroAlt,
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: title,
    description: outcome,
    images: [ogImage],
  },
};
```

### OG Image Generation

If portfolio uses dynamic OG images, integrate with existing system.

Otherwise, suggest manual creation or use:
```tsx
// app/api/og/[slug]/route.tsx
import { ImageResponse } from 'next/og';
```

## Template Selection

Based on detected styling system, use corresponding template:

| Styling | Template Path |
|---------|---------------|
| Tailwind | `templates/tailwind/` |
| CSS Modules | `templates/css-modules/` |
| styled-components | `templates/styled-components/` |
| Emotion | `templates/emotion/` |

Each template provides 17 components:
- **Core (10)**: Hero, SectionBlock, ImageWithCaption, BeforeAfter, MetricCallout, Quote, DecisionCard, TableOfContents, NextProject, MetaGrid
- **Interaction (7)**: ScrollytellingSection, ScrollProgress, ScrollReveal, CountUpMetric, ImageComparisonSlider, HorizontalGallery, NumberedPhase

## Preset Application

Apply the selected style preset from `style-presets/SKILL.md`:

### Interactive Narrative Preset
```tsx
import {
  Hero, SectionBlock, ScrollytellingSection, ScrollProgress,
  ScrollReveal, CountUpMetric, NumberedPhase, MetricCallout
} from '@/components/case-study';

// Structure solution sections with scrollytelling
<ScrollProgress chapters={[
  { id: 'context', title: 'Context' },
  { id: 'process', title: 'Process' },
  { id: 'solution', title: 'Solution' },
  { id: 'impact', title: 'Impact' },
]} />

<ScrollytellingSection
  id="solution-1"
  number="Design 1/3"
  title="Feature Name"
  description="What this feature does and why..."
  slides={[
    { image: '/images/feature-1a.png', alt: 'Initial state', caption: 'Starting point' },
    { image: '/images/feature-1b.png', alt: 'Final state', caption: 'After redesign' },
  ]}
/>
```

### Editorial Long-form Preset
```tsx
import {
  Hero, SectionBlock, ImageWithCaption, Quote, ScrollReveal
} from '@/components/case-study';

// Simple, continuous flow with subtle reveals
<ScrollReveal direction="up" delay={100}>
  <SectionBlock id="context" title="The Challenge">
    <p>Long-form narrative text...</p>
    <ImageWithCaption src="/images/research.png" alt="Research findings" />
  </SectionBlock>
</ScrollReveal>
```

### Data/Metrics-Led Preset
```tsx
import {
  Hero, SectionBlock, CountUpMetric, ImageComparisonSlider,
  BeforeAfter, DecisionCard
} from '@/components/case-study';

// Metrics prominent, comparisons emphasized
<div className="grid grid-cols-3 gap-8">
  <CountUpMetric value={35} suffix="%" label="Faster setup time" />
  <CountUpMetric value={100} suffix="%" label="Team adoption" />
  <CountUpMetric value={20} suffix="%" label="Error reduction" />
</div>

<ImageComparisonSlider
  beforeImage="/images/old-flow.png"
  afterImage="/images/new-flow.png"
  beforeAlt="Previous flow with 12 steps"
  afterAlt="New flow with 4 steps"
/>
```

### Visual Campaign Preset
```tsx
import {
  Hero, SectionBlock, HorizontalGallery, ImageWithCaption, ScrollReveal
} from '@/components/case-study';

// Gallery-focused, full-bleed imagery
<HorizontalGallery
  images={[
    { src: '/images/campaign-1.jpg', alt: 'Hero banner', caption: 'Launch campaign' },
    { src: '/images/campaign-2.jpg', alt: 'Social posts', caption: 'Social media' },
    { src: '/images/campaign-3.jpg', alt: 'OOH placement', caption: 'Billboard' },
  ]}
  aspectRatio="16/9"
/>
```

### Design System Doc Preset
```tsx
import {
  Hero, SectionBlock, TableOfContents, BeforeAfter,
  DecisionCard, NumberedPhase, ScrollProgress
} from '@/components/case-study';

// Systematic, scannable structure
<TableOfContents items={tocItems} sticky />

<NumberedPhase current={1} total={3} title="Audit existing components" />
<BeforeAfter
  before={{ src: '/images/button-old.png', alt: 'Inconsistent buttons', label: "Don't" }}
  after={{ src: '/images/button-new.png', alt: 'Unified button system', label: 'Do' }}
/>
```

## Output Checklist

After generation, verify:

- [ ] Page renders at `/work/[slug]`
- [ ] All sections present
- [ ] Images have alt text (or prompts)
- [ ] Mobile responsive
- [ ] Metadata populated
- [ ] Matches existing portfolio styling
- [ ] No TypeScript errors
- [ ] No ESLint errors
