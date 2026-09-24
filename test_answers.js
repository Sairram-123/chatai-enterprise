// Test script to verify AI code generation and prevent language mismatches
const fs = require('fs');
const path = require('path');

// Extract generateOfflineAIResponse by reading app.js in a mocked context
const appJs = fs.readFileSync(path.join(__dirname, 'app.js'), 'utf-8');

// Minimal mock environment for app.js offline generator
const mockContext = {
  state: { persona: 'general', messages: [] },
  PERSONAS: {
    general: { name: 'Assistant', icon: '🤖', prompt: 'You are a helpful assistant.' }
  },
  escHtml: (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
};

// Evaluate generateOfflineAIResponse in isolated function
const fnCode = appJs.slice(appJs.indexOf('function generateOfflineAIResponse('));
const endIdx = fnCode.indexOf('\nfunction getEffectiveSystemPrompt');
const isolatedFn = new Function('state', 'PERSONAS', 'escHtml', `
  ${fnCode.slice(0, endIdx)}
  return generateOfflineAIResponse;
`)(mockContext.state, mockContext.PERSONAS, mockContext.escHtml);

console.log('--- Testing Offline AI Code Generator ---');

const testCases = [
  { prompt: 'create a website based on attendence', expectedLang: 'html', forbidden: 'Python 3.12' },
  { prompt: 'create a website based on attendance', expectedLang: 'html', forbidden: 'def solve():' },
  { prompt: 'attendance management system', expectedLang: 'html', forbidden: 'def solve():' },
  { prompt: 'attendance system in python', expectedLang: 'python', forbidden: '<!DOCTYPE html>' },
  { prompt: 'attendance system in c', expectedLang: 'c', forbidden: '<!DOCTYPE html>' },
  { prompt: 'create a website based on hospital management', expectedLang: 'html', forbidden: 'Python 3.12' },
  { prompt: 'write a program in rust to process orders', expectedLang: 'rust', forbidden: 'Python 3.12' },
  { prompt: 'create a database table in sql for users', expectedLang: 'sql', forbidden: 'Python 3.12' },
  { prompt: 'write a bash script to backup logs', expectedLang: 'bash', forbidden: 'def solve():' },
  { prompt: 'create a dashboard for analytics', expectedLang: 'html', forbidden: 'def solve():' },
  { prompt: 'create a todo app', expectedLang: 'html', forbidden: 'def solve():' }
];

let allPassed = true;

testCases.forEach((tc, idx) => {
  const res = isolatedFn(tc.prompt);
  const hasExpected = res.includes('```' + tc.expectedLang);
  const hasForbidden = res.includes(tc.forbidden);

  if (hasExpected && !hasForbidden) {
    console.log(`[PASS] Case ${idx + 1}: "${tc.prompt}" -> correctly returned \`\`\`${tc.expectedLang}`);
  } else {
    console.error(`[FAIL] Case ${idx + 1}: "${tc.prompt}"`);
    if (!hasExpected) console.error(`  - Expected code block: \`\`\`${tc.expectedLang}`);
    if (hasForbidden) console.error(`  - Contained forbidden text: "${tc.forbidden}"`);
    console.error(`  - Output snippet: ${res.slice(0, 200)}...`);
    allPassed = false;
  }
});

if (allPassed) {
  console.log('\nAll 11 test cases PASSED successfully! No language mismatches.');
} else {
  console.error('\nSome test cases FAILED.');
  process.exit(1);
}
