const path = require("path")
const ESLintPlugin = require("eslint-webpack-plugin")
const HtmlWebpackPlugin = require("html-webpack-plugin")
module.exports = {
  // 入口
  entry: "./src/main.js", // 相对路径
  // 输出
  output: {
    // 文件的输出路径
    // __dirname代表当前文件的文件夹目录
    path: undefined,
    // 入口文件(一般为js文件)打包输出文件名
    filename: "static/js/main.js",
    clean: true, // 打包前先清空输出目录
  },
  // 加载器
  module: {
    rules: [
      // loader的配置
      {
        oneOf: [
          {
            test: /\.css$/, // 只检测.css结尾的文件,当匹配时调用use
            // use执行顺序从右到左，从下到上
            use: [
              "style-loader", // 将js中css通过创建style标签的形式添加到html文件中
              "css-loader", // 将css资源编译成commonjs的模块到js中
            ],
          },
          {
            test: /\.less$/i,
            use: [
              // compiles Less to CSS
              "style-loader",
              "css-loader",
              "less-loader",
            ],
          },
          {
            test: /\.s[ac]ss$/i,
            use: [
              // 将 JS 字符串生成为 style 节点
              "style-loader",
              // 将 CSS 转化成 CommonJS 模块
              "css-loader",
              // 将 Sass 编译成 CSS
              "sass-loader",
            ],
          },
          {
            test: /\.(png|jpg|gif|jpeg)$/,
            type: "asset",
            parser: {
              dataUrlCondition: {
                // 小于8kb的图片转base64
                maxSize: 8 * 1024, // 8kb
              },
            },
            generator: {
              // 输出图片名称
              filename: "static/images/[hash][ext][query]", // 图片名称
            },
          },
          {
            test: /\.(woff|woff2|eot|ttf|otf)$/,
            type: "asset/resource",
            generator: {
              // 输出图片名称
              filename: "static/media/[hash][ext][query]", // 图片名称
            },
          },
          {
            test: /\.js$/,
            exclude: /node_modules/, // 排除node_modules的js文件不处理
            use: "babel-loader", // 使用babel-loader
            options: {
              cacheDirectory: true, // 开启缓存
              cacheCompression: false, // 关闭缓存文件压缩
            },
          },
        ],
      },
    ],
  },
  // 插件
  plugins: [
    // plugin的配置
    new ESLintPlugin({
      // 指定检测的文件
      context: path.resolve(__dirname, "../src"),
    }),
    new HtmlWebpackPlugin({
      // 模板，以public/index.html文件创建心得html文件
      // 1. 结构和原来一致，会自动引入打包的资源
      template: path.resolve(__dirname, "../public/index.html"),
    }),
  ],
  // 模式
  mode: "development", // 开发环境
  devtool: "cheap-module-source-map",
  devServer: {
    host: "127.0.0.1", // 主机地址
    port: 3000, // 端口
    open: true, // 自动打开浏览器
  },
}
