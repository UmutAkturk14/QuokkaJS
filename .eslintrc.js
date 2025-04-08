module.exports = {
  // =============================================
  // Parser and Basic Configuration
  // =============================================

  // Specifies the ESLint parser for TypeScript
  parser: '@typescript-eslint/parser',

  // Extends recommended rule sets
  extends: [
    'eslint:recommended', // ESLint's built-in recommended rules
    'plugin:@typescript-eslint/recommended', // TypeScript-specific recommended rules
  ],

  // Parser options for TypeScript
  parserOptions: {
    ecmaVersion: 2020, // Use ECMAScript 2020 features
    sourceType: 'module', // Use ES modules (import/export syntax)
    project: './tsconfig.json', // Path to your TypeScript configuration file
  },

  // Plugins used by ESLint
  plugins: [
    '@typescript-eslint', // Adds TypeScript-specific rules and functionality
  ],

  // =============================================
  // Custom Rules
  // =============================================

  rules: {
    // =============================================
    // Type Annotations
    // =============================================

    // Enforce explicit return types on functions
    '@typescript-eslint/explicit-function-return-type': 'error',

    // Enforce explicit return and argument types on module boundaries
    '@typescript-eslint/explicit-module-boundary-types': 'error',

    // Enforce explicit type annotations for variables, parameters, and other constructs
    '@typescript-eslint/typedef': [
      'error',
      {
        arrayDestructuring: true, // Require types for array destructuring
        arrowParameter: true, // Require types for arrow function parameters
        memberVariableDeclaration: true, // Require types for class member variables
        objectDestructuring: true, // Require types for object destructuring
        parameter: true, // Require types for function parameters
        propertyDeclaration: true, // Require types for class properties
        variableDeclaration: true, // Require types for variable declarations
      },
    ],

    // =============================================
    // Code Quality
    // =============================================

    // Disallow the use of `any` type
    '@typescript-eslint/no-explicit-any': 'error',

    // Disallow non-null assertions (`!`)
    '@typescript-eslint/no-non-null-assertion': 'error',

    // Disallow unused variables
    '@typescript-eslint/no-unused-vars': 'error',

    // =============================================
    // Consistency
    // =============================================

    // Enforce consistent usage of type imports (e.g., `import type`)
    '@typescript-eslint/consistent-type-imports': 'error',

    // Enforce consistent return types in functions
    '@typescript-eslint/consistent-return': 'error',

    // Enforce consistent naming conventions
    '@typescript-eslint/naming-convention': [
      'error',
      {
        selector: 'variable', // Applies to variables
        format: ['camelCase', 'UPPER_CASE'], // Allows camelCase and UPPER_CASE
      },
      {
        selector: 'function', // Applies to functions
        format: ['camelCase'], // Requires camelCase
      },
      {
        selector: 'typeLike', // Applies to types, interfaces, and classes
        format: ['PascalCase'], // Requires PascalCase
      },
    ],

    // =============================================
    // Readability
    // =============================================

    // Enforce a maximum line length of 100 characters
    'max-len': ['error', { code: 120, ignoreUrls: true }],

    // Enforce consistent indentation (2 spaces)
    indent: ['error', 2],

    // Enforce consistent brace style (1tbs with single-line allowed)
    'brace-style': ['error', '1tbs', { allowSingleLine: true }],

    // =============================================
    // Error Handling
    // =============================================

    // Disallow the use of `console` statements
    // 'no-console': 'error', // Commented out for now

    // Ensure promises are always handled (e.g., with `.catch` or `try/catch`)
    '@typescript-eslint/no-floating-promises': 'error',

    // Disallow unnecessary `await` in return statements
    '@typescript-eslint/return-await': 'error',

    // =============================================
    // Security
    // =============================================

    // Disallow the use of `eval`
    'no-eval': 'error',

    // Prefer optional chaining over nested ternary or logical checks
    '@typescript-eslint/prefer-optional-chain': 'error',

    // Use @ts-expect-error when an error is expected
    "@typescript-eslint/ban-ts-comment": "error",

    // =============================================
    // TypeScript-Specific
    // =============================================

    // Disallow `@ts-ignore` comments
    '@typescript-eslint/ban-ts-comment': 'error',

    // Enforce strict boolean expressions
    // '@typescript-eslint/strict-boolean-expressions': 'error',

    // Disallow unnecessary type assertions (e.g., `as`)
    '@typescript-eslint/no-unnecessary-type-assertion': 'error',

    // =============================================
    // Functional Programming
    // =============================================

    // Disallow reassigning function parameters
    'no-param-reassign': 'error',

    // Disallow reassigning variables declared with `const`
    'no-const-assign': 'error',

    // Enforce consistent array type definitions
    '@typescript-eslint/array-type': 'error',

    // Enforce consistent type definitions (e.g., `interface` vs `type`)
    '@typescript-eslint/consistent-type-definitions': 'error',

    // Disallow confusing void expressions
    // '@typescript-eslint/no-confusing-void-expression': 'error',

    // Disallow invalid `void` types
    '@typescript-eslint/no-invalid-void-type': 'error',

    // Disallow meaningless `void` operators
    '@typescript-eslint/no-meaningless-void-operator': 'error',

    // Disallow misuse of `new` operator
    '@typescript-eslint/no-misused-new': 'error',

    // Disallow misuse of promises
    '@typescript-eslint/no-misused-promises': 'error',

    // Disallow `require()` statements
    '@typescript-eslint/no-require-imports': 'error',

    // Disallow unsafe return statements
    '@typescript-eslint/no-unsafe-return': 'error',

    // =============================================
    // Documentation
    // =============================================

    // Require JSDoc comments for functions, classes, and exported members
    'require-jsdoc': [
      'warn',
      {
        require: {
          FunctionDeclaration: false, // Require JSDoc for functions
          MethodDefinition: false, // Require JSDoc for class methods
          ClassDeclaration: true, // Require JSDoc for classes
        },
      },
    ],
  },

  // =============================================
  // Ignored Files and Patterns
  // =============================================

  // Files and patterns to ignore
  ignorePatterns: [
    '**/*.js', // Ignore all JavaScript files (this is a TypeScript-only project)
  ],
};
