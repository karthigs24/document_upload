import globals from 'globals'
import pluginJs from '@eslint/js'
import pluginReact from 'eslint-plugin-react'
import pluginPrettier from 'eslint-plugin-prettier'
import configPrettier from 'eslint-config-prettier'

/** @type {import('eslint').Linter.Config[]} */
export default [
  { files: ['**/*.{js,mjs,cjs,jsx}'] },
  { languageOptions: { globals: globals.browser } },
  pluginJs.configs.recommended,
  pluginReact.configs.flat.recommended,
  {
    // Add Prettier plugin
    plugins: {
      prettier: pluginPrettier,
    },
    rules: {
      // Enable Prettier rules
      'prettier/prettier': 'error',
    },
  },
  // Include Prettier config to disable conflicting rules
  configPrettier,
  {
    settings: {
      react: {
        version: 'detect',
      },
    },
  },
]
