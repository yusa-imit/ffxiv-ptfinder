module.exports = {
  extends: [
    'mantine',
    'plugin:@next/next/recommended',
    'plugin:jest/recommended',
    'plugin:storybook/recommended',
    // prettier - eslint sync
    'plugin:prettier/recommended',
    'prettier',
  ],
  plugins: ['testing-library', 'jest', 'eslint-plugin-jest'],
  overrides: [
    {
      files: ['**/?(*.)+(spec|test).[jt]s?(x)'],
      extends: ['plugin:testing-library/react'],
    },
    {
      files: [
        "**/*.test.ts"
      ],
      env: {
        jest: true // now **/*.test.js files' env has both es6 *and* jest
      },
      // Can't extend in overrides: https://github.com/eslint/eslint/issues/8813
      // "extends": ["plugin:jest/recommended"]
      plugins: ["jest"],
      rules: {
        "jest/no-disabled-tests": "warn",
        "jest/no-focused-tests": "error",
        "jest/no-identical-title": "error",
        "jest/prefer-to-have-length": "warn",
        "jest/valid-expect": "error"
      }
    }
  ],
  parserOptions: {
    project: './tsconfig.json',
  },
  rules: {
    'react/react-in-jsx-scope': 'off',
    'react/self-closing-comp': 'off',
    // no-unused-vars as warning
    'no-unused-vars': 'off',
    'no-plusplus': 'off',
    'func-names': 'off',
    '@typescript-eslint/no-unused-vars': ["warn"],
  },
};
