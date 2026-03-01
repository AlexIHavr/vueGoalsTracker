import js from '@eslint/js';
import prettier from 'eslint-config-prettier';
import importPlugin from 'eslint-plugin-import';
import prettierPlugin from 'eslint-plugin-prettier';
import vue from 'eslint-plugin-vue';
import tseslint from 'typescript-eslint';
import vueParser from 'vue-eslint-parser';

export default [
  js.configs.recommended,
  ...tseslint.configs.recommended,
  ...vue.configs['flat/recommended'],
  prettier,
  {
    files: ['**/*.{ts,js,vue}'],
    plugins: {
      prettier: prettierPlugin,
      import: importPlugin,
    },
    languageOptions: {
      parser: vueParser,
      parserOptions: {
        parser: tseslint.parser,
      },
      globals: {
        document: 'readonly',
        window: 'readonly',
      },
    },
    settings: {
      'import/resolver': {
        alias: {
          map: [
            ['app', './src/app'],
            ['pages', './src/pages'],
            ['widgets', './src/widgets'],
            ['features', './src/features'],
            ['entities', './src/entities'],
            ['shared', './src/shared'],
          ],
          extensions: ['.js', '.ts', '.jsx', '.tsx', '.vue', '.json'],
        },
      },
    },
    rules: {
      'prettier/prettier': 'error',
      'import/order': [
        'error',
        {
          groups: [
            'builtin',
            'external',
            'internal',
            ['parent', 'sibling', 'index'],
            'object',
            'type',
          ],
          'newlines-between': 'always',
          alphabetize: { order: 'asc', caseInsensitive: true },
        },
      ],
      'no-restricted-imports': [
        'error',
        {
          patterns: [
            'app/**',
            'pages/*/**',
            'widgets/*/**',
            'features/*/**',
            'entities/*/**',
            'shared/*/*/**',
            '../**/app',
            '../**/pages',
            '../**/features',
            '../**/entities',
            '../**/shared',
          ],
        },
      ],
    },
  },
];
