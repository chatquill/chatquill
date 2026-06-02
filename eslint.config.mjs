import eslintPluginAstro from 'eslint-plugin-astro';
import tseslint from 'typescript-eslint';

export default [
  {
    ignores: ['dist/**', 'node_modules/**', '.astro/**', '.claude/**'],
  },
  ...eslintPluginAstro.configs['flat/recommended'],
  // Apply TS rules only to .ts files — avoids parser conflict with .astro files
  ...tseslint.configs.recommended.map(config => ({
    ...config,
    files: ['**/*.ts', '**/*.tsx'],
  })),
  {
    // Astro uses triple-slash references in env.d.ts by convention
    files: ['**/*.d.ts'],
    rules: {
      '@typescript-eslint/triple-slash-reference': 'off',
    },
  },
];
