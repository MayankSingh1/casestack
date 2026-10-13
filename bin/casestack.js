#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const os = require('os');

const PACKAGE_ROOT = path.resolve(__dirname, '..');
const SKILL_NAME = 'casestack';
const VERSION = require('../package.json').version;

const GLOBAL_SKILL_DIR = path.join(os.homedir(), '.cursor', 'skills');
const PROJECT_SKILL_DIR = '.cursor/skills';

function printHelp() {
  console.log(`
casestack-skills v${VERSION}
Portfolio Case Study Generator for Cursor, Claude Code, and Codex

USAGE:
  npx casestack-skills <command> [options]

COMMANDS:
  install      Install casestack skills
  uninstall    Remove casestack skills
  list         Show installed skills and location
  validate     Validate package structure
  help         Show this help message

OPTIONS:
  --global, -g    Install to ~/.cursor/skills/ (default)
  --project       Install to ./.cursor/skills/ in current directory

EXAMPLES:
  npx casestack-skills install              # Install globally
  npx casestack-skills install --project    # Install to current project
  npx casestack-skills uninstall            # Remove global installation
  npx casestack-skills list                 # Show what's installed

MANUAL INSTALL:
  Copy the following directories to your skills folder:
    - skills/case-study/  -> ~/.cursor/skills/casestack/case-study/
    - templates/          -> ~/.cursor/skills/casestack/templates/
    - references/         -> ~/.cursor/skills/casestack/references/
`);
}

function getSkillDir(isProject) {
  if (isProject) {
    return path.join(process.cwd(), PROJECT_SKILL_DIR, SKILL_NAME);
  }
  return path.join(GLOBAL_SKILL_DIR, SKILL_NAME);
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

function removeRecursive(dir) {
  if (!fs.existsSync(dir)) return;
  
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat.isDirectory()) {
      removeRecursive(filePath);
    } else {
      fs.unlinkSync(filePath);
    }
  }
  fs.rmdirSync(dir);
}

function countFiles(dir) {
  if (!fs.existsSync(dir)) return 0;
  let count = 0;
  const items = fs.readdirSync(dir);
  for (const item of items) {
    const itemPath = path.join(dir, item);
    const stat = fs.statSync(itemPath);
    if (stat.isDirectory()) {
      count += countFiles(itemPath);
    } else {
      count++;
    }
  }
  return count;
}

function install(isProject) {
  const destDir = getSkillDir(isProject);
  const location = isProject ? 'project' : 'global';
  const displayPath = isProject ? PROJECT_SKILL_DIR : '~/.cursor/skills';

  console.log(`\nInstalling casestack-skills v${VERSION} (${location})...\n`);

  if (fs.existsSync(destDir)) {
    console.log(`Removing existing installation at ${destDir}...`);
    removeRecursive(destDir);
  }

  fs.mkdirSync(destDir, { recursive: true });

  // Copy skills
  const srcSkills = path.join(PACKAGE_ROOT, 'skills', 'case-study');
  const destSkills = path.join(destDir, 'case-study');
  copyRecursive(srcSkills, destSkills);
  const skillFiles = countFiles(destSkills);
  console.log(`✓ Copied skills (${skillFiles} files)`);

  // Copy templates
  const srcTemplates = path.join(PACKAGE_ROOT, 'templates');
  const destTemplates = path.join(destDir, 'templates');
  copyRecursive(srcTemplates, destTemplates);
  const templateFiles = countFiles(destTemplates);
  console.log(`✓ Copied templates (${templateFiles} files)`);

  // Copy references
  const srcRefs = path.join(PACKAGE_ROOT, 'references');
  const destRefs = path.join(destDir, 'references');
  copyRecursive(srcRefs, destRefs);
  const refFiles = countFiles(destRefs);
  console.log(`✓ Copied references (${refFiles} files)`);

  // Copy skill.json
  const srcMeta = path.join(PACKAGE_ROOT, 'skill.json');
  if (fs.existsSync(srcMeta)) {
    fs.copyFileSync(srcMeta, path.join(destDir, 'skill.json'));
    console.log(`✓ Copied skill.json`);
  }

  const totalFiles = skillFiles + templateFiles + refFiles + 1;

  console.log(`
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
✅ Installed ${totalFiles} files to ${displayPath}/${SKILL_NAME}/

Skills:
  • case-study (main router)
  • case-study/ingest
  • case-study/interview
  • case-study/write
  • case-study/architecture
  • case-study/style-presets
  • case-study/page-generator
  • case-study/review

Templates (17 components × 4 styling systems):
  • tailwind/
  • css-modules/
  • styled-components/
  • emotion/

References:
  • senior-rubric.md (68-point scoring)
  • writing-rules.md
  • nda-handling.md

To create a case study, ask your AI assistant:
  "Use the case-study skill to document my project"
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
`);
}

function uninstall(isProject) {
  const destDir = getSkillDir(isProject);
  const location = isProject ? 'project' : 'global';

  console.log(`\nUninstalling casestack-skills (${location})...\n`);

  if (!fs.existsSync(destDir)) {
    console.log(`⚠️  No installation found at ${destDir}`);
    return;
  }

  const fileCount = countFiles(destDir);
  removeRecursive(destDir);

  console.log(`✅ Removed ${fileCount} files from ${destDir}\n`);
}

function list() {
  console.log(`\ncasestack-skills v${VERSION}\n`);
  console.log('Checking installations:\n');

  const globalDir = path.join(GLOBAL_SKILL_DIR, SKILL_NAME);
  const projectDir = path.join(process.cwd(), PROJECT_SKILL_DIR, SKILL_NAME);

  let found = false;

  if (fs.existsSync(globalDir)) {
    const count = countFiles(globalDir);
    console.log(`✅ Global:  ~/.cursor/skills/${SKILL_NAME}/ (${count} files)`);
    
    // List sub-skills
    const skillsDir = path.join(globalDir, 'case-study');
    if (fs.existsSync(skillsDir)) {
      const skills = fs.readdirSync(skillsDir).filter(f => 
        fs.statSync(path.join(skillsDir, f)).isDirectory() || f === 'SKILL.md'
      );
      console.log(`            Skills: ${skills.length}`);
    }
    
    // List templates
    const templatesDir = path.join(globalDir, 'templates');
    if (fs.existsSync(templatesDir)) {
      const templates = fs.readdirSync(templatesDir).filter(f => 
        fs.statSync(path.join(templatesDir, f)).isDirectory()
      );
      console.log(`            Templates: ${templates.join(', ')}`);
    }
    
    found = true;
  } else {
    console.log(`○  Global:  Not installed`);
  }

  if (fs.existsSync(projectDir)) {
    const count = countFiles(projectDir);
    console.log(`✅ Project: .cursor/skills/${SKILL_NAME}/ (${count} files)`);
    found = true;
  } else {
    console.log(`○  Project: Not installed in ${process.cwd()}`);
  }

  if (!found) {
    console.log(`
To install:
  npx casestack-skills install              # Global
  npx casestack-skills install --project    # This project
`);
  }

  console.log('');
}

function runValidate() {
  const validateScript = path.join(PACKAGE_ROOT, 'validate.js');
  if (fs.existsSync(validateScript)) {
    require(validateScript);
  } else {
    console.error('Error: validate.js not found');
    process.exit(1);
  }
}

// Parse arguments
const args = process.argv.slice(2);
const command = args[0];
const isProject = args.includes('--project');
const isGlobal = args.includes('--global') || args.includes('-g');

if (!command || command === 'help' || command === '--help' || command === '-h') {
  printHelp();
  process.exit(0);
}

if (command === '--version' || command === '-v') {
  console.log(`casestack-skills v${VERSION}`);
  process.exit(0);
}

switch (command) {
  case 'install':
    install(isProject && !isGlobal);
    break;
  case 'uninstall':
  case 'remove':
    uninstall(isProject && !isGlobal);
    break;
  case 'list':
  case 'ls':
    list();
    break;
  case 'validate':
    runValidate();
    break;
  default:
    console.error(`Unknown command: ${command}`);
    console.error('Run "npx casestack-skills help" for usage');
    process.exit(1);
}
