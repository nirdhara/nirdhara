const path = require('path');
const thisDir = path.resolve(__dirname);

module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: path.join(thisDir, 'tsconfig.eslint.json'),
    tsconfigRootDir: thisDir,
    sourceType: 'module',
    ecmaVersion: 'latest',
  },
  plugins: ['@typescript-eslint', 'import', 'functional', 'sonarjs', 'unicorn', 'promise'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    // 'plugin:@typescript-eslint/recommended-requiring-type-checking',
    'plugin:@typescript-eslint/strict',
    'plugin:prettier/recommended',
    'plugin:import/recommended',
    'plugin:import/typescript',
    'plugin:functional/no-exceptions',
    'plugin:functional/stylistic',
    'plugin:sonarjs/recommended',
    'plugin:unicorn/recommended',
    'plugin:promise/recommended',
  ],
  root: true,
  env: {
    node: true,
    es2022: true,
  },
  ignorePatterns: ['.eslintrc.js'],
  rules: {
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/require-await': 'error',
    '@typescript-eslint/no-unused-vars': ['error', { ignoreRestSiblings: true }],

    '@typescript-eslint/no-unnecessary-condition': 'off',
    '@typescript-eslint/no-extraneous-class': 'off',
    '@typescript-eslint/prefer-nullish-coalescing': 'off', // change it to warn

    '@typescript-eslint/prefer-optional-chain': 'error',
    '@typescript-eslint/no-non-null-assertion': 'error',

    // sonarjs
    'sonarjs/cognitive-complexity': 'warn',
    'sonarjs/no-duplicate-string': 'off',
    'sonarjs/no-identical-functions': 'error',

    // possible errors
    'for-direction': 'error',
    'no-prototype-builtins': 'error',
    'no-template-curly-in-string': 'error',
    'no-unsafe-negation': 'error',

    // best practices
    'array-callback-return': 'error',
    'block-scoped-var': 'error',
    complexity: 'error',
    'consistent-return': 'error',
    eqeqeq: ['error', 'smart'],
    'guard-for-in': 'error',
    'no-alert': 'error',
    'no-caller': 'error',
    'no-div-regex': 'error',
    'no-eval': 'error',
    'no-extend-native': 'error',
    'no-extra-bind': 'error',
    'no-extra-label': 'error',
    'no-floating-decimal': 'error',
    'no-implied-eval': 'error',
    'no-iterator': 'error',
    'no-labels': 'error',
    'no-lone-blocks': 'error',
    'no-loop-func': 'error',
    'no-new': 'error',
    'no-new-func': 'error',
    'no-new-wrappers': 'error',
    'no-proto': 'error',
    'no-restricted-properties': 'error',
    'no-return-assign': 'error',
    'no-return-await': 'error',
    'no-self-compare': 'error',
    'no-sequences': 'error',
    'no-throw-literal': 'error',
    'no-unmodified-loop-condition': 'error',
    'no-unused-expressions': 'error',
    'no-useless-call': 'error',
    'no-useless-concat': 'error',
    'no-useless-escape': 'error',
    'no-useless-return': 'error',
    'no-void': 'error',
    'no-with': 'error',
    radix: 'error',
    'require-await': 'error',
    'wrap-iife': 'error',
    yoda: 'error',

    // stylistic
    camelcase: 'off',
    'consistent-this': ['warn', 'that'],
    'func-name-matching': 'error',
    'func-style': ['warn', 'declaration', { allowArrowFunctions: true }],
    'lines-between-class-members': ['error', 'always', { exceptAfterSingleLine: true }],
    'max-depth': 'warn',
    'max-lines': ['warn', 1000],
    'max-params': ['warn', 4],
    'no-array-constructor': 'warn',
    'no-bitwise': 'warn',
    'no-lonely-if': 'error',
    'no-multi-assign': 'warn',
    'no-nested-ternary': 'warn',
    'no-new-object': 'warn',
    'no-unneeded-ternary': 'warn',
    'one-var': ['warn', 'never'],
    'operator-assignment': 'warn',
    'padding-line-between-statements': 'error',

    // es2015
    'no-useless-computed-key': 'error',
    'no-useless-rename': 'error',
    'no-var': 'error',
    'object-shorthand': 'error',
    'prefer-arrow-callback': 'error',
    'prefer-const': 'error',
    'prefer-destructuring': ['warn', { object: true, array: false }],
    'prefer-numeric-literals': 'warn',
    'prefer-rest-params': 'warn',
    'prefer-spread': 'warn',

    // disabled because of the usage of typescript-eslint-parser
    // https://github.com/eslint/typescript-eslint-parser/issues/77
    'no-undef': 'off',
    'no-unused-vars': 'off', // https://typescript-eslint.io/rules/no-unused-vars/#options

    // import
    'import/first': 'error',
    'import/newline-after-import': 'error',
    'import/no-absolute-path': 'error',
    'import/no-amd': 'error',
    'import/no-deprecated': 'error',
    'import/no-duplicates': 'error',
    'import/no-mutable-exports': 'error',
    'import/no-named-as-default': 'error',
    'import/no-named-as-default-member': 'error',
    'import/no-named-default': 'error',
    // does not properly work with ts
    'import/no-unresolved': 'off',

    // unicorn
    'unicorn/prevent-abbreviations': 'off',
    'unicorn/no-null': 'off',
    'unicorn/no-useless-promise-resolve-reject': 'off',
    'unicorn/consistent-destructuring': 'off',
    'unicorn/consistent-function-scoping': 'off',
    'unicorn/prefer-dom-node-text-content': 'off',
    'unicorn/no-array-reduce': 'off',
    'unicorn/no-array-callback-reference': 'off',
    'unicorn/no-nested-ternary': 'warn',
    'unicorn/prefer-query-selector': 'off',

    // promise
    'promise/no-return-wrap': 'off',
  },
};
