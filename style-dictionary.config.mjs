// Builds design tokens (tokens/**/*.tokens.json, W3C DTCG format) into:
//   src/tokens/tokens.css   — CSS custom properties for components
//   src/tokens/tokens.ts    — typed constants for TypeScript
//   src/tokens/tokens.json  — flat values for scripts and docs
// Run: npm run tokens. Generated files are not committed (see .gitignore).
export default {
  source: ['tokens/**/*.tokens.json'],
  platforms: {
    css: {
      transformGroup: 'css',
      buildPath: 'src/tokens/',
      files: [
        { destination: 'tokens.css', format: 'css/variables', options: { outputReferences: true } },
        // Same kebab-case names as the CSS variables, for scripts and docs
        { destination: 'tokens.json', format: 'json/flat' },
      ],
    },
    ts: {
      transformGroup: 'js',
      buildPath: 'src/tokens/',
      files: [{ destination: 'tokens.ts', format: 'javascript/es6' }],
    },
  },
};
