#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const PLATFORMS = {
  cursor: {
    skillDir: '.cursor/skills',
    configFile: null,
    description: 'Cursor IDE'
  },
  'claude-code': {
    skillDir: '.claude/skills',
    configFile: null,
    description: 'Claude Code'
  },
  codex: {
    skillDir: '.codex/skills',
    configFile: null,
    description: 'Codex'
  }
};

const PACKAGE_ROOT = path.resolve(__dirname, '..');

function printHelp() {
  console.log(`
casestack - Portfolio Case Study Generator

USAGE:
  npx casestack init --platform <platform>
  npx casestack validate [path]
  npx casestack help

COMMANDS:
  init       Install casestack skills to your project
  validate   Validate a case study content file
  help       Show this help message

OPTIONS:
  --platform <platform>  Target platform: cursor, claude-code, or codex

PLATFORMS:
  cursor       Cursor IDE (.cursor/skills/)
  claude-code  Claude Code (.claude/skills/)
  codex        Codex (.codex/skills/)

EXAMPLES:
  npx casestack init --platform cursor
  npx casestack validate ./content/case-study.json
  npx casestack validate ./examples/fictional-case-study/content.json
`);
}

function copyRecursive(src, dest) {
  const stat = fs.statSync(src);
  
  if (stat.isDirectory()) {
    fs.mkdirSync(dest, { recursive: true });
    const files = fs.readdirSync(src);
    for (const file of files) {
      copyRecursive(path.join(src, file), path.join(dest, file));
    }
  } else {
    fs.copyFileSync(src, dest);
  }
}

function init(platform) {
  if (!platform) {
    console.error('Error: --platform is required');
    console.error('Usage: npx casestack init --platform <cursor|claude-code|codex>');
    process.exit(1);
  }

  const platformConfig = PLATFORMS[platform];
  if (!platformConfig) {
    console.error(`Error: Unknown platform "${platform}"`);
    console.error('Valid platforms: cursor, claude-code, codex');
    process.exit(1);
  }

  const cwd = process.cwd();
  const skillsDir = path.join(cwd, platformConfig.skillDir, 'casestack');
  const referencesDir = path.join(cwd, platformConfig.skillDir, 'casestack', 'references');
  
  console.log(`\nInstalling casestack for ${platformConfig.description}...\n`);

  // Create directories
  fs.mkdirSync(skillsDir, { recursive: true });
  fs.mkdirSync(referencesDir, { recursive: true });

  // Copy skills
  const srcSkills = path.join(PACKAGE_ROOT, 'skills', 'case-study');
  copyRecursive(srcSkills, path.join(skillsDir, 'case-study'));
  console.log(`✓ Copied skills to ${platformConfig.skillDir}/casestack/case-study/`);

  // Copy references
  const srcRefs = path.join(PACKAGE_ROOT, 'references');
  copyRecursive(srcRefs, referencesDir);
  console.log(`✓ Copied references to ${platformConfig.skillDir}/casestack/references/`);

  // Copy templates
  const srcTemplates = path.join(PACKAGE_ROOT, 'templates');
  const destTemplates = path.join(skillsDir, 'templates');
  copyRecursive(srcTemplates, destTemplates);
  console.log(`✓ Copied templates to ${platformConfig.skillDir}/casestack/templates/`);

  console.log(`
Installation complete!

To use casestack, ask your AI assistant:
  "I want to create a case study for my recent project"

Or reference the skill directly:
  "Use the case-study skill to help me document my checkout redesign"

Skills installed:
  - case-study (main router)
  - case-study/ingest
  - case-study/interview
  - case-study/write
  - case-study/architecture
  - case-study/page-generator
  - case-study/review

References:
  - senior-rubric.md
  - writing-rules.md
  - nda-handling.md
`);
}

function validate(filePath) {
  if (!filePath) {
    // Default to example
    filePath = path.join(PACKAGE_ROOT, 'examples', 'fictional-case-study', 'content.json');
    console.log('No file specified. Validating example case study...\n');
  }

  const absolutePath = path.isAbsolute(filePath) ? filePath : path.resolve(process.cwd(), filePath);

  if (!fs.existsSync(absolutePath)) {
    console.error(`Error: File not found: ${absolutePath}`);
    process.exit(1);
  }

  let content;
  try {
    const raw = fs.readFileSync(absolutePath, 'utf8');
    content = JSON.parse(raw);
  } catch (e) {
    console.error(`Error: Failed to parse JSON: ${e.message}`);
    process.exit(1);
  }

  console.log(`Validating: ${absolutePath}\n`);

  const errors = [];
  const warnings = [];

  // Required fields
  const requiredFields = [
    'meta.slug',
    'meta.title',
    'meta.role',
    'hero.title',
    'hero.outcome',
    'tldr',
    'context.businessProblem',
    'myRole.responsibilities',
    'research.methods',
    'research.keyFindings',
    'solution.overview',
    'impact.metrics'
  ];

  for (const field of requiredFields) {
    const value = field.split('.').reduce((obj, key) => obj?.[key], content);
    if (!value || (Array.isArray(value) && value.length === 0)) {
      errors.push(`Missing required field: ${field}`);
    }
  }

  // Recommended fields
  const recommendedFields = [
    'constraints',
    'problemFraming.hmw',
    'problemFraming.successMetrics',
    'process',
    'validation.testing',
    'reflection.learnings'
  ];

  for (const field of recommendedFields) {
    const value = field.split('.').reduce((obj, key) => obj?.[key], content);
    if (!value || (Array.isArray(value) && value.length === 0)) {
      warnings.push(`Missing recommended field: ${field}`);
    }
  }

  // Content quality checks
  if (content.tldr && content.tldr.split(' ').length > 100) {
    warnings.push('TL;DR exceeds recommended 80 words');
  }

  if (content.research?.keyFindings && content.research.keyFindings.length < 2) {
    warnings.push('Research should have at least 2-3 key findings');
  }

  if (content.impact?.metrics && content.impact.metrics.length < 1) {
    errors.push('Impact section should have at least one metric');
  }

  if (content.process && content.process.length > 0) {
    for (let i = 0; i < content.process.length; i++) {
      const phase = content.process[i];
      if (!phase.decisions || phase.decisions.length === 0) {
        warnings.push(`Process phase "${phase.phase}" has no decisions documented`);
      }
    }
  }

  // Asset references
  if (content.assets?.images) {
    for (const img of content.assets.images) {
      if (!img.alt) {
        warnings.push(`Image missing alt text: ${img.path}`);
      }
    }
  }

  // Print results
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  
  if (errors.length === 0 && warnings.length === 0) {
    console.log('✅ PASSED - No issues found\n');
    console.log(`Title: ${content.meta?.title || 'Unknown'}`);
    console.log(`Role: ${content.meta?.role || 'Unknown'}`);
    console.log(`Company: ${content.meta?.company || 'Unknown'}`);
    process.exit(0);
  }

  if (errors.length > 0) {
    console.log(`\n❌ ERRORS (${errors.length}):`);
    for (const error of errors) {
      console.log(`   • ${error}`);
    }
  }

  if (warnings.length > 0) {
    console.log(`\n⚠️  WARNINGS (${warnings.length}):`);
    for (const warning of warnings) {
      console.log(`   • ${warning}`);
    }
  }

  console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  
  if (errors.length > 0) {
    console.log('\n❌ FAILED - Fix errors above');
    process.exit(1);
  } else {
    console.log('\n✅ PASSED with warnings');
    process.exit(0);
  }
}

// Parse arguments
const args = process.argv.slice(2);
const command = args[0];

if (!command || command === 'help' || command === '--help' || command === '-h') {
  printHelp();
  process.exit(0);
}

if (command === 'init') {
  const platformIndex = args.indexOf('--platform');
  const platform = platformIndex !== -1 ? args[platformIndex + 1] : null;
  init(platform);
} else if (command === 'validate') {
  const filePath = args[1];
  validate(filePath);
} else {
  console.error(`Unknown command: ${command}`);
  console.error('Run "npx casestack help" for usage');
  process.exit(1);
}
