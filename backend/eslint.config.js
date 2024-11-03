import globals from 'globals';
import tseslint from 'typescript-eslint';

if (typeof structuredClone === 'undefined') {
  global.structuredClone = obj => JSON.parse(JSON.stringify(obj));
};

export default [
  {
    files: ['**/*.{js,mjs,cjs,ts}'],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node
      },
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module'
      }
    }
  },
  tseslint.configs.base,
  ...tseslint.configs.recommended,
  {
    rules: {
      'no-unused-vars': 'warn',
      'indent': ['error', 2, {'SwitchCase': 1}],
      'linebreak-style': ['error', 'unix'],
      'quotes': ['error', 'single', {
        'allowTemplateLiterals': false,
        'avoidEscape': true
      }],
      'semi': ['error', 'always'],
      'no-trailing-spaces': 'error',
      '@typescript-eslint/ban-ts-comment': 'off',
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
    }
  }
];
