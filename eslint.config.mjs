<<<<<<< HEAD
import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import typescriptParser from "@typescript-eslint/parser";
import pluginReact from "eslint-plugin-react";
import eslintPluginPrettierRecommended from "eslint-plugin-prettier/recommended";
=======
import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from 'typescript-eslint';
import typescriptParser from '@typescript-eslint/parser';
import pluginReact from 'eslint-plugin-react';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
>>>>>>> origin/main

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
<<<<<<< HEAD
    files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"],
    languageOptions: {
      globals: globals.browser,
      ecmaVersion: "latest",
      sourceType: "module",
=======
    files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'],
    languageOptions: {
      globals: globals.browser,
      ecmaVersion: 'latest',
      sourceType: 'module',
>>>>>>> origin/main
      parser: typescriptParser,
      parserOptions: {
        ecmaFeatures: {
          tsx: true,
        },
      },
    },
    settings: {
      react: {
<<<<<<< HEAD
        version: "detect",
=======
        version: 'detect',
>>>>>>> origin/main
      },
    },
  },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  pluginReact.configs.flat.recommended,
<<<<<<< HEAD
  pluginReact.configs.flat["jsx-runtime"],
=======
  pluginReact.configs.flat['jsx-runtime'],
>>>>>>> origin/main
  eslintPluginPrettierRecommended,
];
