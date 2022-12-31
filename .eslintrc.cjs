module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
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
    'plugin:vue/vue3-recommended'
  ],
  rules: {
    quotes: [2, 'single'],
    semi: 2,
    '@typescript-eslint/no-non-null-assertion': 0
  }
};
