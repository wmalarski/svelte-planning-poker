/** @type { import("eslint").Linter.Config } */
module.exports = {
	root: true,
	extends: [
		'eslint:recommended',
		"plugin:import/typescript",
		"plugin:jsx-a11y/recommended",
		"plugin:promise/recommended",
		'plugin:@typescript-eslint/recommended',
		'plugin:svelte/recommended',
		"plugin:perfectionist/recommended-natural",
		"plugin:tailwindcss/recommended",
		'plugin:prettier/recommended',
	],
	parser: '@typescript-eslint/parser',
	plugins: ['@typescript-eslint', "perfectionist"],
	parserOptions: {
		sourceType: 'module',
		ecmaVersion: 2020,
		extraFileExtensions: ['.svelte']
	},
	env: {
		browser: true,
		es2017: true,
		node: true
	},
	overrides: [
		{
			files: ['*.svelte'],
			parser: 'svelte-eslint-parser',
			parserOptions: {
				parser: '@typescript-eslint/parser'
			}
		}
	],
	rules: {
		"no-await-in-loop": "error",
		"no-constant-binary-expression": "error",
		"no-self-compare": "error",
		"no-use-before-define": "error",
		"curly": "error",
		"eqeqeq": ["error", "smart"],
		"max-params": ["error", 3],
		"no-console": "warn",
		"no-lonely-if": "error",
		"no-unneeded-ternary": "error",
		"prefer-arrow-callback": "error",
		"prefer-const": "error",
		"require-await": "error",
		"@typescript-eslint/array-type": "error",
		"@typescript-eslint/consistent-type-imports": "error",
		"@typescript-eslint/consistent-type-definitions": ["error", "type"],
		"@typescript-eslint/no-unused-expressions": "error",
		"prettier/prettier": ["error", { "endOfLine": "auto" }],
		"tailwindcss/no-custom-classname": "off",
		"jsx-a11y/label-has-associated-control": "off"	
	}
};
