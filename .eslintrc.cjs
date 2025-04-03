module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:react-hooks/recommended',
    'plugin:import/recommended'
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parserOptions: { ecmaVersion: 'latest', sourceType: 'module' },
  settings: { react: { version: '18.2' } },
  plugins: ['react-refresh', 'import', 'unused-imports', 'simple-import-sort'],
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
      'error',
      {
        groups: [['^react', '^next', '^[a-z]', '^@', '^\\.']]
      }
    ],
    'simple-import-sort/exports': 'warn',
    'react/prop-types': 'off',
    'no-unused-vars': ['warn']
  }
}
