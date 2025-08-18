module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2022,
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint'],
  extends: [
    'eslint:recommended',
  ],
  env: {
    node: true,
    jest: true,
  },
  rules: {
    'prefer-const': 'error',
    'no-var': 'error',
    'no-unused-vars': 'off', // Disable base rule
    '@typescript-eslint/no-unused-vars': 'error',
  },
};