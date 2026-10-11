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
