module.exports = {
  // 继承 Eslint 规则
  extends: ["eslint:recommended"],
  env: {
    node: true, // 启用node中的全局变量
    browser: true, // 启用浏览器中的全局变量
  },
  parserOptions: {
    ecmaVersion: 6, // 指定ECMAScript的版本
    sourceType: "module", // 指定源代码的类型，module表示CommonJS的模块化规范，script表示ECMAScript的规范
  },
  rules: {
    "no-var": 2, // 不能使用 var 定义变量
  },
}
