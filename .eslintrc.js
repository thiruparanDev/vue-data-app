module.exports = {
  root: true,
  env: {
    node: false
  },
  'extends': [
    'plugin:vue/vue3-essential',
    '@vue/typescript/recommended'
  ],
  parserOptions: {
    parser: '@typescript-eslint/parser'
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'semi': [2, 'always'],
    'max-len': [2, 400, 4, { 'ignoreUrls': true }],
    'no-useless-constructor': 0,
    'comma-dangle': ['error', 'never'],
    'linebreak-style': 'off',
    'space-before-function-paren': 0,
    'no-tabs': 0,
    "no-use-before-define": "off",
    "@typescript-eslint/no-use-before-define": ["off"],
    "@typescript-eslint/camelcase": ["off"],
    "@typescript-eslint/no-var-requires": ["off"]
  }
};