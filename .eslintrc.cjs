module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig.json'
  },
  ignorePatterns: [
    'node_modules',
    'dist'
  ],
  plugins: [
    '@typescript-eslint',
    'vue'
  ],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:vue/vue3-recommended',
    'airbnb-base',
    'airbnb-base-typescript'
  ],
  rules: {
    quotes: [2, 'single'],
    semi: 2,
    '@typescript-eslint/no-non-null-assertion': 0,
    'no-bitwise': 0,
    'no-plusplus': 0,
    'import/prefer-default-export': 0,
    'import/extensions': 0,
    '@typescript-eslint/no-use-before-define': 0
  }
};
