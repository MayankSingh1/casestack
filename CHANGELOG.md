# Changelog

All notable changes to casestack-skills will be documented in this file.

## [1.1.0] - 2026-10-13

### Added
- **Style Presets Skill** (`case-study/style-presets/SKILL.md`)
  - Interactive Narrative (Sanvithi-style scrollytelling)
  - Editorial Long-form
  - Data/Metrics-Led
  - Visual Campaign
  - Design System Doc

- **7 Interaction Components** (all 4 styling systems)
  - `ScrollytellingSection` - Pinned text + transitioning images
  - `ScrollProgress` - Chapter-based navigation with progress bar
  - `ScrollReveal` - Intersection Observer fade/slide reveals
  - `CountUpMetric` - Animated number counting on scroll
  - `ImageComparisonSlider` - Before/after with draggable divider
  - `HorizontalGallery` - Horizontal scroll image gallery
  - `NumberedPhase` - Phase progression indicator (1/3, 2/3, 3/3)

- **Research documentation** (`research/case-study-patterns.md`)
  - Analysis of 12 senior designer portfolios
  - Cross-site pattern synthesis
  - Sanvithi scrollytelling deep dive

- **npm package installer** (`bin/casestack.js`)
  - `install` / `uninstall` / `list` commands
  - `--global` (default) and `--project` modes
  - Zero external dependencies

- **Package metadata** (`skill.json`)

### Changed
- Renamed package from `casestack` to `casestack-skills`
- Senior rubric expanded from 57 to 68 points (+11 presentation patterns)
- Templates now include 17 components (was 10)
- Router skill updated with preset selection step

### Removed
- `examples/` directory excluded from npm package (keeps tarball small)
- `research/screenshots/` excluded from npm package

## [1.0.0] - 2026-10-11

### Added
- Initial release
- 8 skills (router, ingest, interview, write, architecture, page-generator, review)
- 10 core components across 4 styling systems
- Senior rubric (57 points)
- Writing rules and NDA handling references
- Fictional example case study
- Package validation script
