#!/usr/bin/env node

/**
 * Validate the casestack package structure and example content
 */

const fs = require('fs');
const path = require('path');

const ROOT = __dirname;

console.log('╔═══════════════════════════════════════════════════════════╗');
console.log('║           CASESTACK PACKAGE VALIDATION                    ║');
console.log('╚═══════════════════════════════════════════════════════════╝\n');

let hasErrors = false;
let errorCount = 0;
let passCount = 0;

function check(description, condition) {
  if (condition) {
    console.log(`✅ ${description}`);
    passCount++;
  } else {
    console.log(`❌ ${description}`);
    hasErrors = true;
    errorCount++;
  }
}

function fileExists(filePath) {
  return fs.existsSync(path.join(ROOT, filePath));
}

function readJSON(filePath) {
  try {
    return JSON.parse(fs.readFileSync(path.join(ROOT, filePath), 'utf8'));
  } catch {
    return null;
  }
}

// ═══════════════════════════════════════════════════════════════
// Package Structure
// ═══════════════════════════════════════════════════════════════

console.log('📦 Package Structure\n');

check('package.json exists', fileExists('package.json'));
check('skill.json exists', fileExists('skill.json'));
check('cursor-plugin.json exists', fileExists('cursor-plugin.json'));
check('bin/casestack.js exists', fileExists('bin/casestack.js'));
check('lib/init.js exists', fileExists('lib/init.js'));
check('validate.js exists', fileExists('validate.js'));
check('README.md exists', fileExists('README.md'));
check('CHANGELOG.md exists', fileExists('CHANGELOG.md'));

// ═══════════════════════════════════════════════════════════════
// Skills
// ═══════════════════════════════════════════════════════════════

console.log('\n🎯 Skills\n');

const skills = [
  'skills/case-study/SKILL.md',
  'skills/case-study/ingest/SKILL.md',
  'skills/case-study/interview/SKILL.md',
  'skills/case-study/write/SKILL.md',
  'skills/case-study/architecture/SKILL.md',
  'skills/case-study/style-presets/SKILL.md',
  'skills/case-study/page-generator/SKILL.md',
  'skills/case-study/review/SKILL.md'
];

for (const skill of skills) {
  check(`${skill} exists`, fileExists(skill));
}

// ═══════════════════════════════════════════════════════════════
// References
// ═══════════════════════════════════════════════════════════════

console.log('\n📚 References\n');

const references = [
  'references/case-study-rubric.md',
  'references/career-levels.md',
  'references/ai-portfolio-rules.md',
  'references/writing-rules.md',
  'references/nda-handling.md'
];

for (const ref of references) {
  check(`${ref} exists`, fileExists(ref));
}

// ═══════════════════════════════════════════════════════════════
// Research
// ═══════════════════════════════════════════════════════════════

console.log('\n🔬 Research\n');

check('research/case-study-patterns.md exists', fileExists('research/case-study-patterns.md'));

// ═══════════════════════════════════════════════════════════════
// Templates - All 4 styling systems with all 17 components
// ═══════════════════════════════════════════════════════════════

console.log('\n🎨 Templates\n');

const CORE_COMPONENTS = [
  'Hero',
  'SectionBlock',
  'ImageWithCaption',
  'BeforeAfter',
  'MetricCallout',
  'Quote',
  'DecisionCard',
  'TableOfContents',
  'NextProject',
  'MetaGrid'
];

const INTERACTION_COMPONENTS = [
  'ScrollytellingSection',
  'ScrollProgress',
  'ScrollReveal',
  'CountUpMetric',
  'ImageComparisonSlider',
  'HorizontalGallery',
  'NumberedPhase'
];

const REQUIRED_COMPONENTS = [...CORE_COMPONENTS, ...INTERACTION_COMPONENTS];

const TEMPLATE_SYSTEMS = [
  { name: 'tailwind', ext: '.tsx' },
  { name: 'css-modules', ext: '.tsx' },
  { name: 'styled-components', ext: '.tsx' },
  { name: 'emotion', ext: '.tsx' }
];

for (const system of TEMPLATE_SYSTEMS) {
  console.log(`  ${system.name}/`);
  
  for (const component of REQUIRED_COMPONENTS) {
    const filePath = `templates/${system.name}/${component}${system.ext}`;
    check(`    ${component}${system.ext}`, fileExists(filePath));
  }
  
  // Check index.ts exports all components
  const indexPath = `templates/${system.name}/index.ts`;
  check(`    index.ts exists`, fileExists(indexPath));
  
  if (fileExists(indexPath)) {
    const indexContent = fs.readFileSync(path.join(ROOT, indexPath), 'utf8');
    const allExported = REQUIRED_COMPONENTS.every(comp => 
      indexContent.includes(`export { ${comp} }`)
    );
    check(`    index.ts exports all 17 components`, allExported);
  }
  
  // Check CSS modules have corresponding .module.css files
  if (system.name === 'css-modules') {
    for (const component of CORE_COMPONENTS) {
      const cssPath = `templates/css-modules/${component}.module.css`;
      check(`    ${component}.module.css`, fileExists(cssPath));
    }
    for (const component of INTERACTION_COMPONENTS) {
      const cssPath = `templates/css-modules/${component}.module.css`;
      check(`    ${component}.module.css`, fileExists(cssPath));
    }
  }
  
  console.log('');
}

// ═══════════════════════════════════════════════════════════════
// Example Case Study
// ═══════════════════════════════════════════════════════════════

console.log('📝 Example Case Study\n');

check('examples/fictional-case-study/content.json exists', 
  fileExists('examples/fictional-case-study/content.json'));
check('examples/fictional-case-study/page.mdx exists', 
  fileExists('examples/fictional-case-study/page.mdx'));
check('examples/fictional-case-study/README.md exists', 
  fileExists('examples/fictional-case-study/README.md'));

// Validate example content
const exampleContent = readJSON('examples/fictional-case-study/content.json');

if (exampleContent) {
  console.log('\n📋 Example Content Validation\n');
  
  // Required fields
  check('meta.slug present', !!exampleContent.meta?.slug);
  check('meta.title present', !!exampleContent.meta?.title);
  check('meta.role present', !!exampleContent.meta?.role);
  check('hero.title present', !!exampleContent.hero?.title);
  check('hero.outcome present', !!exampleContent.hero?.outcome);
  check('tldr present', !!exampleContent.tldr);
  check('context.businessProblem present', !!exampleContent.context?.businessProblem);
  check('myRole.responsibilities present', 
    Array.isArray(exampleContent.myRole?.responsibilities) && exampleContent.myRole.responsibilities.length > 0);
  check('research.methods present', 
    Array.isArray(exampleContent.research?.methods) && exampleContent.research.methods.length > 0);
  check('research.keyFindings present', 
    Array.isArray(exampleContent.research?.keyFindings) && exampleContent.research.keyFindings.length > 0);
  check('solution.overview present', !!exampleContent.solution?.overview);
  check('impact.metrics present', 
    Array.isArray(exampleContent.impact?.metrics) && exampleContent.impact.metrics.length > 0);
  
  // Level signal checks
  check('constraints documented (level signal)', 
    Array.isArray(exampleContent.constraints) && exampleContent.constraints.length >= 2);
  check('process decisions documented (level signal)', 
    Array.isArray(exampleContent.process) && 
    exampleContent.process.some(p => p.decisions && p.decisions.length > 0));
  check('reflection.learnings present (level signal)', 
    Array.isArray(exampleContent.reflection?.learnings) && exampleContent.reflection.learnings.length > 0);
  check('reflection.whatWouldChange present (level signal)', 
    Array.isArray(exampleContent.reflection?.whatWouldChange) && exampleContent.reflection.whatWouldChange.length > 0);
  
  // Content quality
  const tldrWords = exampleContent.tldr ? exampleContent.tldr.split(/\s+/).length : 0;
  check(`tldr length reasonable (${tldrWords} words, recommend <100)`, tldrWords < 100);
  
  check('user quotes included (evidence)', 
    Array.isArray(exampleContent.research?.quotes) && exampleContent.research.quotes.length > 0);
  
  check('metrics have before/after (impact clarity)', 
    exampleContent.impact?.metrics?.some(m => m.before !== null || m.after !== null));
} else {
  check('Example content.json is valid JSON', false);
}

// ═══════════════════════════════════════════════════════════════
// Package.json validation
// ═══════════════════════════════════════════════════════════════

console.log('\n⚙️  Package Configuration\n');

const pkg = readJSON('package.json');

if (pkg) {
  check('package name is "casestack-skills"', pkg.name === 'casestack-skills');
  check('bin/casestack defined', !!pkg.bin?.casestack);
  check('main points to lib/init.js', pkg.main === 'lib/init.js');
  check('validate script defined', !!pkg.scripts?.validate);
  check('files array includes skills/', pkg.files?.includes('skills/'));
  check('files array includes templates/', pkg.files?.includes('templates/'));
  check('files array includes references/', pkg.files?.includes('references/'));
} else {
  check('package.json is valid JSON', false);
}

// ═══════════════════════════════════════════════════════════════
// Template Completeness Summary
// ═══════════════════════════════════════════════════════════════

console.log('\n📊 Template Completeness Summary\n');

for (const system of TEMPLATE_SYSTEMS) {
  const coreCount = CORE_COMPONENTS.filter(comp => 
    fileExists(`templates/${system.name}/${comp}.tsx`)
  ).length;
  const interactionCount = INTERACTION_COMPONENTS.filter(comp => 
    fileExists(`templates/${system.name}/${comp}.tsx`)
  ).length;
  const totalCount = coreCount + interactionCount;
  const status = totalCount === 17 ? '✅' : '❌';
  console.log(`${status} ${system.name}: ${totalCount}/17 components (${coreCount} core + ${interactionCount} interaction)`);
}

// ═══════════════════════════════════════════════════════════════
// Summary
// ═══════════════════════════════════════════════════════════════

console.log('\n═══════════════════════════════════════════════════════════');
console.log(`\n📊 Results: ${passCount} passed, ${errorCount} failed\n`);

if (hasErrors) {
  console.log('❌ VALIDATION FAILED\n');
  process.exit(1);
} else {
  console.log('✅ ALL VALIDATIONS PASSED\n');
  console.log('Package is ready for use!\n');
  console.log('To install in a project:');
  console.log('  npx casestack init --platform cursor\n');
  process.exit(0);
}
