module.exports = {
  env: {
    node: true,
    es2022: true,
  },
  extends: 'eslint:recommended',
  overrides: [],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  rules: {
    'no-unused-vars': [
      'error',
      {varsIgnorePattern: '^_', args: 'all', argsIgnorePattern: '^_'},
    ],
  },
}
