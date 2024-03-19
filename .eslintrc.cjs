/** @type { import("eslint").Linter.Config } */
module.exports = {
	env: {
		browser: true,
		es2017: true,
		node: true
	},
	extends: [
		'eslint:recommended',
		'plugin:import/typescript',
		'plugin:jsx-a11y/recommended',
		'plugin:promise/recommended',
		'plugin:@typescript-eslint/recommended',
		'plugin:svelte/recommended',
		'plugin:perfectionist/recommended-natural',
		'plugin:tailwindcss/recommended',
		'plugin:prettier/recommended'
	],
	overrides: [
		{
			files: ['*.svelte'],
			parser: 'svelte-eslint-parser',
			parserOptions: {
				parser: '@typescript-eslint/parser'
			}
		}
	],
	parser: '@typescript-eslint/parser',
	parserOptions: {
		ecmaVersion: 2020,
		extraFileExtensions: ['.svelte'],
		sourceType: 'module'
	},
	plugins: ['@typescript-eslint', 'perfectionist'],
	root: true,
	rules: {
		'@typescript-eslint/array-type': 'error',
		'@typescript-eslint/consistent-type-definitions': ['error', 'type'],
		'@typescript-eslint/consistent-type-imports': 'error',
		'@typescript-eslint/no-unused-expressions': 'error',
		curly: 'error',
		eqeqeq: ['error', 'smart'],
		'jsx-a11y/label-has-associated-control': 'off',
		'max-params': ['error', 3],
		'no-await-in-loop': 'error',
		'no-console': 'warn',
		'no-constant-binary-expression': 'error',
		'no-lonely-if': 'error',
		'no-self-compare': 'error',
		'no-unneeded-ternary': 'error',
		'no-use-before-define': 'error',
		'prefer-arrow-callback': 'error',
		'prefer-const': 'error',
		'prettier/prettier': ['error', { endOfLine: 'auto' }],
		'require-await': 'error',
		'tailwindcss/no-custom-classname': 'off'
	}
};
