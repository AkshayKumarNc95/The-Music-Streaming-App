const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ProgressBarPlugin = require("progress-bar-webpack-plugin");

module.exports = {
  entry: {
    app:  ['babel-polyfill',"./src/app"]
  },
  output: {
    path: path.join(__dirname, "public"),
    filename: "bundle.js",
    chunkFilename: "[id].js",
    publicPath: "/"
  },
  devServer: {
    headers: {
      "Access-Control-Allow-Origin": "*"
    },
    stats: "errors-only",
    hot: true,
    inline: true,
    historyApiFallback: true,
    port: 8000,
    proxy: {
      "/api": "http://localhost:3000"
    }
  },
  resolve: {
    extensions: [".js", ".sass", ".json"],
    modules: ["node_modules", "app", "seed"]
  },
  devtool: "cheap-module-source-map",
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      },
      {
        test: /\.(scss|sass)$/,
        use: [
          {
            loader: "style-loader"
          },
          {
            loader: "css-loader"
          },
          {
            loader: "sass-loader",
            options: {
              includePaths: ["./app/styles"]
            }
          }
        ]
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules)/,
        loader: "babel-loader",
        query: {
          presets: ["es2015", "stage-0", "react"]
        }
      },
      {
        test: /\.(jpg|jpeg|png)$/,
        use: ["file-loader", { loader: "url-loader?limit=100000" }]
      },{
        test: /\.(woff|woff2|ttf|eot|svg)(\?v=[a-z0-9]\.[a-z0-9]\.[a-z0-9])?$/,
        loader: 'url-loader?limit=100000'
    },
      {
        test: /\.(gif|png|jpe?g|svg)$/i,
        use: [
          {
            loader: "image-webpack-loader",
            options: {
              bypassOnDebug: true, // webpack@1.x
              disable: true // webpack@2.x and newer
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/app/index.html"
    }),
    new ProgressBarPlugin()
  ]
};
