const path = require("path")
const os = require("os")
const ESLintPlugin = require("eslint-webpack-plugin")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin")
const threads = os.cpus().length
const TerserWebpackPlugin = require("terser-webpack-plugin")
module.exports = {
  // 入口
  entry: "./src/main.js", // 相对路径
  // 输出
  output: {
    // 文件的输出路径
    // __dirname代表当前文件的文件夹目录
    path: path.resolve(__dirname, "../dist"), // 绝对路径
    // 入口文件(一般为js文件)打包输出文件名
    filename: "static/js/main.js",
    clean: true, // 打包前先清空输出目录
    chunkFilename: "static/js/[name].[chunkhash:8].js",
    assetModuleFilename: "static/media/[name].[hash][ext]",
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
              MiniCssExtractPlugin.loader, // 将js中css通过创建style标签的形式添加到html文件中
              "css-loader", // 将css资源编译成commonjs的模块到js中
              {
                loader: "postcss-loader",
                options: {
                  postcssOptions: {
                    plugins: [
                      "postcss-preset-env", // 解决大多数样式兼容问题
                    ],
                  },
                },
              },
            ],
          },
          {
            test: /\.less$/i,
            use: [
              // compiles Less to CSS
              MiniCssExtractPlugin.loader,
              "css-loader",
              {
                loader: "postcss-loader",
                options: {
                  postcssOptions: {
                    plugins: [
                      "postcss-preset-env", // 解决大多数样式兼容问题
                    ],
                  },
                },
              },
              "less-loader",
            ],
          },
          {
            test: /\.s[ac]ss$/i,
            use: [
              // 将 JS 字符串生成为 style 节点
              MiniCssExtractPlugin.loader,
              // 将 CSS 转化成 CommonJS 模块
              "css-loader",
              {
                loader: "postcss-loader",
                options: {
                  postcssOptions: {
                    plugins: [
                      "postcss-preset-env", // 解决大多数样式兼容问题
                    ],
                  },
                },
              },
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
            use: [
              {
                loader: "thread-loader",
                options: {
                  works: threads, // 开启几个线程
                },
              },
              {
                loader: "babel-loader",
                options: {
                  cacheDirectory: true, // 开启缓存
                  cacheCompression: false, // 关闭缓存文件压缩
                  plugins: ["@babel/plugin-transform-runtime"], // 开启babel-plugin-transform-runtime
                },
              },
            ], // 使用babel-loader
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
      threads,
    }),
    new HtmlWebpackPlugin({
      // 模板，以public/index.html文件创建心得html文件
      // 1. 结构和原来一致，会自动引入打包的资源
      template: path.resolve(__dirname, "../public/index.html"),
    }),
    new MiniCssExtractPlugin({
      filename: "static/css/main.css",
    }),
    new CssMinimizerPlugin(),
    new TerserWebpackPlugin({
      parallel: threads,
    }),
  ],
  // 模式
  mode: "production",
  devtool: "source-map",
}
