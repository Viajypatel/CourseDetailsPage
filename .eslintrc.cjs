module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: [
    'react',
    'react-refresh',
    '@typescript-eslint',
  ],
  rules: {
    'react/react-in-jsx-scope': 'off', // Not needed with new JSX transform
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
    '@typescript-eslint/no-unused-vars': ['warn', { 'argsIgnorePattern': '^_' }], // Warn on unused vars, allow underscore prefix
    // You can add more custom rules here
  },
  settings: {
    react: {
      version: 'detect', // Automatically detect React version
    },
  },
  ignorePatterns: ['dist', 'node_modules', '*.cjs', '*.js'], // Ignore build outputs, node_modules, and JS config files
}; 