module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  parser: '@typescript-eslint/parser',
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:react-hooks/recommended',
    'plugin:import/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:import/typescript'
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: './tsconfig.json'
  },
  settings: { react: { version: '18.2' } },
  plugins: [
    'react-refresh',
    'import',
    'unused-imports',
    'simple-import-sort',
    '@typescript-eslint'
  ],
  rules: {
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true }
    ],
    'import/named': 'error',
    'import/no-unresolved': 'off',
    'import/no-extraneous-dependencies': 'error',
    'import/no-cycle': 'error',
    'unused-imports/no-unused-imports': 'warn',
    'unused-imports/no-unused-vars': [
      'warn',
      { vars: 'all', args: 'after-used', ignoreRestSiblings: true }
    ],
    'simple-import-sort/imports': [
      'warn',
      {
        groups: [['^react', '^next', '^[a-z]', '^@', '^\\.']]
      }
    ],
    'simple-import-sort/exports': 'warn',
    'react/prop-types': 'off',
    'no-unused-vars': 'off'
  }
}
