module.exports = {
  // 智能预设，能编译ES6语法
  presets: [
    [
      "@babel/preset-env",
      {
        useBuiltIns: "usage", // 按需加载自动引入
        corejs: 3,
      },
    ],
  ],
}
