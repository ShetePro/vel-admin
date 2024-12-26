/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution')

module.exports = {
  env: {
    node: true
  },
  root: true,
  // 声明全局变量 防止在单文件组件内无法找到
  globals: {
    Recordable: true,
    EventListener: true,
    KeyString: true,
    MainDialogStatus: true,
    MainDialogBaseFn: true,
    KeyRecordable: true,
    VoidFunction: true
  },
  parser: 'vue-eslint-parser',
  extends: [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    '@vue/eslint-config-prettier/skip-formatting'
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    parser: '@typescript-eslint/parser'
  },
  rules: {
    // 使用 2 个空格缩进
    indent: ['error', 2],
    // 忽略文件名多个字符串
    'vue/multi-word-component-names': 'off',
    'no-unused-vars': 'off'
  }
}
