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
  plugins: ['testing-library', 'jest'],
  overrides: [
    {
      files: ['**/?(*.)+(spec|test).[jt]s?(x)'],
      extends: ['plugin:testing-library/react'],
    },
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
