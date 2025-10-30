// For more info, see https://github.com/storybookjs/eslint-plugin-storybook#configuration-flat-config-format
import storybook from 'eslint-plugin-storybook';
import boundaries from 'eslint-plugin-boundaries';

import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { FlatCompat } from '@eslint/eslintrc';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends('next/core-web-vitals', 'next/typescript'),
  {
    ignores: ['node_modules/**', '.next/**', 'out/**', 'build/**', 'next-env.d.ts'],
  },
  // Storybook
  ...storybook.configs['flat/recommended'],
  // Layered module boundaries
  {
    plugins: {
      boundaries,
    },
    settings: {
      'boundaries/elements': [
        { type: 'app', pattern: 'src/app/**' },
        { type: 'features', pattern: 'src/features/**' },
        { type: 'modules', pattern: 'src/modules/**' },
        { type: 'shared', pattern: 'src/shared/**' },
        { type: 'core', pattern: 'src/core/**' },
        { type: 'configs', pattern: 'src/configs/**' },
        { type: 'providers', pattern: 'src/providers/**' },
        { type: 'stores', pattern: 'src/stores/**' },
        { type: 'types', pattern: 'src/types/**' },
      ],
    },
    rules: {
      // Allow directions: app -> features/modules/shared/core; features/modules -> shared/core; shared -> core only
      'boundaries/element-types': [
        'error',
        {
          default: 'allow',
          rules: [
            { from: 'shared', disallow: ['app', 'features', 'modules'] },
            { from: 'core', disallow: ['app', 'features', 'modules', 'shared'] },
            { from: 'features', disallow: ['app'] },
            { from: 'modules', disallow: ['app'] },
            // Prevent cross-feature coupling unless through shared/core
            { from: 'features', disallow: ['features'], allowSameFolder: true },
            { from: 'modules', disallow: ['modules'], allowSameFolder: true },
          ],
        },
      ],
      'boundaries/no-unknown': 'error',
    },
  },
];

export default eslintConfig;
