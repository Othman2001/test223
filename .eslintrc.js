module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'airbnb',
    'airbnb-typescript',
    'eslint-config-prettier',
    'prettier',
    'next',
  ],
  parser: '@typescript-eslint/parser',
  ignorePatterns: ['.eslintrc.js', 'tailwind.config.js', 'lint-staged.config.js', 'postcss.config.js'],
  parserOptions: {
    project: './tsconfig.json',
    tsconfigRootDir: __dirname,
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['react', '@typescript-eslint'],
  rules: {
    'react/react-in-jsx-scope': 'off',
    'react/jsx-props-no-spreading': 'off',
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx', '.ts', '.tsx'] }],
    'no-console': ['warn', { allow: ['warn', 'error'] }],
    'no-var': 'error',
    'spaced-comment': ['warn', 'always'],
    'prefer-const': 'error',
    'no-invalid-this': 'off',
    'default-case': 'error',
    'react/no-unknown-property': ['error', { ignore: ['jsx'] }],
  },
};
