import { defineConfig } from 'eslint/config';

export default defineConfig(
  {
    files: ['src/app/**/*.ts', 'src/app/**/*.vue'],
    rules: {
      'no-restricted-imports': [
        'error',
        {
          patterns: [
            {
              group: ['app/**'],
              message: 'app не может импортировать сам себя',
            },
            {
              group: [
                'pages/*/**/*',
                'widgets/*/**/*',
                'features/*/**/*',
                'entities/*/**/*',
                'shared/*/**/*',
              ],
              message:
                'Используйте публичное API слоя. Импортируйте через index',
            },
            {
              group: ['**/index', '**/index.ts', '**/index.vue'],
              message: 'Запрещен импорт из index файлов напрямую',
            },
            {
              group: ['**/*.ts'],
              message: 'Не указывайте расширения файлов при импорте',
            },
          ],
        },
      ],
    },
  },
  {
    files: ['src/pages/**/*.ts', 'src/pages/**/*.vue'],
    rules: {
      'no-restricted-imports': [
        'error',
        {
          patterns: [
            {
              group: ['pages/**'],
              message: 'pages не могут импортировать друг друга ',
            },
            {
              group: ['app/**'],
              message: 'pages не могут импортировать app',
            },
            {
              group: [
                'widgets/*/**/*',
                'features/*/**/*',
                'entities/*/**/*',
                'shared/*/**/*',
              ],
              message:
                'Используйте публичное API слоя. Импортируйте через index',
            },
            {
              group: ['**/index', '**/index.ts', '**/index.vue'],
              message: 'Запрещен импорт из index файлов напрямую',
            },
            {
              group: ['**/*.ts'],
              message: 'Не указывайте расширения файлов при импорте',
            },
          ],
        },
      ],
    },
  },
  {
    files: ['src/widgets/**/*.ts', 'src/widgets/**/*.vue'],
    rules: {
      'no-restricted-imports': [
        'error',
        {
          patterns: [
            {
              group: ['widgets/**'],
              message: 'widgets не могут импортировать друг друга',
            },
            {
              group: ['pages/**', 'app/**'],
              message: 'widgets не могут импортировать pages и app',
            },
            {
              group: ['features/*/**/*', 'entities/*/**/*', 'shared/*/**/*'],
              message:
                'Используйте публичное API слоя. Импортируйте через index',
            },
            {
              group: ['**/index', '**/index.ts', '**/index.vue'],
              message: 'Запрещен импорт из index файлов напрямую',
            },
            {
              group: ['**/*.ts'],
              message: 'Не указывайте расширения файлов при импорте',
            },
          ],
        },
      ],
    },
  },
  {
    files: ['src/features/**/*.ts', 'src/features/**/*.vue'],
    rules: {
      'no-restricted-imports': [
        'error',
        {
          patterns: [
            {
              group: ['features/**'],
              message: 'features не могут импортировать друг друга',
            },
            {
              group: ['widgets/**', 'pages/**', 'app/**'],
              message: 'features не могут импортировать widgets, pages и app',
            },
            {
              group: ['entities/*/**/*', 'shared/*/**/*'],
              message:
                'Используйте публичное API слоя. Импортируйте через index',
            },
            {
              group: ['**/index', '**/index.ts', '**/index.vue'],
              message: 'Запрещен импорт из index файлов напрямую',
            },
            {
              group: ['**/*.ts'],
              message: 'Не указывайте расширения файлов при импорте',
            },
          ],
        },
      ],
    },
  },
  {
    files: ['src/entities/**/*.ts', 'src/entities/**/*.vue'],
    rules: {
      'no-restricted-imports': [
        'error',
        {
          patterns: [
            {
              group: ['entities/**'],
              message: 'entities не могут импортировать друг друга',
            },
            {
              group: ['features/**', 'widgets/**', 'pages/**', 'app/**'],
              message:
                'entities не могут импортировать features, widgets, pages и app',
            },
            {
              group: ['shared/*/**/*'],
              message:
                'Используйте публичное API слоя. Импортируйте через index',
            },
            {
              group: ['**/index', '**/index.ts', '**/index.vue'],
              message: 'Запрещен импорт из index файлов напрямую',
            },
            {
              group: ['**/*.ts'],
              message: 'Не указывайте расширения файлов при импорте',
            },
          ],
        },
      ],
    },
  },
  {
    files: ['src/shared/**/*.ts', 'src/shared/**/*.vue'],
    rules: {
      'no-restricted-imports': [
        'error',
        {
          patterns: [
            {
              group: [
                'app/**',
                'pages/**',
                'widgets/**',
                'features/**',
                'entities/**',
              ],
              message: 'shared не может импортировать из других слоев',
            },
            {
              group: ['shared/*/**/*'],
              message:
                'Используйте публичное API слоя. Импортируйте через index',
            },
            {
              group: ['**/index', '**/index.ts', '**/index.vue'],
              message: 'Запрещен импорт из index файлов напрямую',
            },
            {
              group: ['**/*.ts'],
              message: 'Не указывайте расширения файлов при импорте',
            },
          ],
        },
      ],
    },
  }
);
