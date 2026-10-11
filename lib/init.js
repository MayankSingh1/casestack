/**
 * Casestack - Portfolio Case Study Generator
 * 
 * This module exports utilities for programmatic use of casestack.
 */

const fs = require('fs');
const path = require('path');

const PACKAGE_ROOT = path.resolve(__dirname, '..');

/**
 * Content model schema for case studies
 */
const CaseStudySchema = {
  meta: {
    slug: 'string',
    title: 'string',
    oneLiner: 'string',
    role: 'string',
    timeline: 'string',
    team: 'string[]',
    teamSize: 'number',
    platform: 'string[]',
    company: 'string',
    year: 'number',
    isNDA: 'boolean',
    ndaNote: 'string?'
  },
  hero: {
    title: 'string',
    outcome: 'string',
    heroImage: 'string?',
    heroAlt: 'string?'
  },
  tldr: 'string',
  context: {
    businessProblem: 'string',
    background: 'string',
    stakeholders: 'string[]'
  },
  myRole: {
    responsibilities: 'string[]',
    collaboration: 'string',
    ownership: 'string'
  },
  constraints: 'string[]',
  research: {
    methods: 'string[]',
    keyFindings: 'string[]',
    evidence: 'string[]',
    quotes: 'Quote[]?'
  },
  problemFraming: {
    hmw: 'string[]',
    successMetrics: 'SuccessMetric[]'
  },
  process: 'ProcessPhase[]',
  solution: {
    overview: 'string',
    features: 'Feature[]'
  },
  validation: {
    testing: 'string[]',
    iterations: 'string[]',
    feedback: 'string[]'
  },
  impact: {
    metrics: 'ImpactMetric[]',
    qualitative: 'string[]'
  },
  reflection: {
    learnings: 'string[]',
    whatWouldChange: 'string[]'
  },
  nextSteps: 'string[]?',
  assets: {
    images: 'Asset[]',
    videos: 'Asset[]?'
  }
};

/**
 * Get the path to a template directory
 * @param {string} style - The styling system (tailwind, css-modules, styled-components, emotion)
 * @returns {string} Path to template directory
 */
function getTemplatePath(style) {
  const validStyles = ['tailwind', 'css-modules', 'styled-components', 'emotion'];
  if (!validStyles.includes(style)) {
    throw new Error(`Unknown style: ${style}. Valid options: ${validStyles.join(', ')}`);
  }
  return path.join(PACKAGE_ROOT, 'templates', style);
}

/**
 * Get the path to a reference document
 * @param {string} name - Reference name (senior-rubric, writing-rules, nda-handling)
 * @returns {string} Path to reference file
 */
function getReferencePath(name) {
  const validRefs = ['senior-rubric', 'writing-rules', 'nda-handling'];
  if (!validRefs.includes(name)) {
    throw new Error(`Unknown reference: ${name}. Valid options: ${validRefs.join(', ')}`);
  }
  return path.join(PACKAGE_ROOT, 'references', `${name}.md`);
}

/**
 * Get the path to a skill
 * @param {string} name - Skill name (case-study, ingest, interview, write, architecture, page-generator, review)
 * @returns {string} Path to skill SKILL.md
 */
function getSkillPath(name) {
  if (name === 'case-study') {
    return path.join(PACKAGE_ROOT, 'skills', 'case-study', 'SKILL.md');
  }
  return path.join(PACKAGE_ROOT, 'skills', 'case-study', name, 'SKILL.md');
}

/**
 * Load the example case study
 * @returns {object} Parsed content.json from the example
 */
function loadExample() {
  const examplePath = path.join(PACKAGE_ROOT, 'examples', 'fictional-case-study', 'content.json');
  const raw = fs.readFileSync(examplePath, 'utf8');
  return JSON.parse(raw);
}

/**
 * Validate a case study content object
 * @param {object} content - Case study content object
 * @returns {{ valid: boolean, errors: string[], warnings: string[] }}
 */
function validateContent(content) {
  const errors = [];
  const warnings = [];

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

  if (content.tldr && content.tldr.split(' ').length > 100) {
    warnings.push('TL;DR exceeds recommended 80 words');
  }

  return {
    valid: errors.length === 0,
    errors,
    warnings
  };
}

module.exports = {
  CaseStudySchema,
  getTemplatePath,
  getReferencePath,
  getSkillPath,
  loadExample,
  validateContent,
  PACKAGE_ROOT
};
