module.exports = {
  root: true,
  parser: 'vue-eslint-parser',
  plugins: ['vue'],
  env: {
    node: true,
    browser: true,
    es2020: true,
  },
  extends: [
    'plugin:vue/essential',
    'plugin:prettier/recommended',
    '@vue/prettier',
  ],
  rules: {
    'no-console': 'error',
    'no-debugger': 'error',
    'vue/multi-word-component-names': [
      'error',
      {
        ignores: ['Default', 'Layout', 'Index'],
      },
    ],
  },
  overrides: [
    {
      files: [
        '**/__tests__/*.{j,t}s?(x)',
        '**/tests/unit/**/*.spec.{j,t}s?(x)',
      ],
      env: {
        jest: true,
      },
    },
  ],
}
