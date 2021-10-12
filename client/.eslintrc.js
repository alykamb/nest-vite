module.exports = {
    root: true,
    env: {
        node: true,
    },
    plugins: ['react', 'import', '@typescript-eslint', 'sort-class-members', 'simple-import-sort', ],
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
    ],
    rules: {
        'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
        'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
        'no-extra-parens': 'off',
        'no-extra-semi': 'off',
        'no-unneeded-ternary': 'error',
        'sort-class-members/sort-class-members': [
            1,
            {
                order: [
                    '[static-properties]',
                    '[conventional-private-properties]',
                    '[properties]',
                    'constructor',
                    '[static-methods]',
                    '[conventional-private-methods]',
                    '[methods]',
                ],
                accessorPairPositioning: 'getThenSet',
            },
        ],

        'simple-import-sort/imports': 'error',

        '@typescript-eslint/no-explicit-any': 'off',
        '@typescript-eslint/member-delimiter-style': 'off',
        '@typescript-eslint/strict-null-checks': 'off',
        '@typescript-eslint/array-type': [
            2,
            {
                default: 'array-simple',
            },
        ],
        '@typescript-eslint/no-extra-semi': 'off',
        '@typescript-eslint/ban-ts-comment': 0,
        '@typescript-eslint/explicit-module-boundary-types': 0,
        '@typescript-eslint/no-unused-vars': 'error',
        '@typescript-eslint/naming-convention': [
            'error',
            {
                selector: 'interface',
                format: ['PascalCase'],
                custom: {
                    regex: '^I[A-Z]',
                    match: true,
                },
            },
        ],
    },
    parserOptions: {
        parser: '@typescript-eslint/parser',
        ecmaVersion: 2020,
        sourceType: 'module',
        createDefaultProgram: true,
        ecmaFeatures: {
            jsx: true, // Allows for the parsing of JSX
        },
        project: 'tsconfig.json',
    },
    overrides: [
        {
            files: ['**/__tests__/*.{j,t}s?(x)', '**/tests/unit/**/*.spec.{j,t}s?(x)'],
            env: {
                jest: true,
            },
        },
    ],
}
