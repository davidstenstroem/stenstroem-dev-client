const path = require('path')
const webpack = require('webpack')
const TerserPlugin = require('terser-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')

const resolve = (dir) => path.resolve(__dirname, dir)

module.exports = (env, options) => {
  const isProduction = options.mode === 'production'

  const setup = {
    entry: './src/index.tsx',
    output: {
      path: path.join(__dirname, './dist'),
      publicPath: '/',
      filename: isProduction ? '[name].[hash].js' : '[name].js',
      chunkFilename: isProduction ? '[name].[chunkhash].js' : '[name].js',
    },
    resolve: {
      extensions: ['.js', '.ts', '.tsx', '.jsx'],
      alias: {
        src: resolve('src'),
      },
    },
    devtool: isProduction ? false : 'cheap-module-eval-source-map',
    devServer: {
      clientLogLevel: 'warning',
      hot: true,
      // port: 6000,
      overlay: { warnings: false, errors: true },
      publicPath: '/',
      // quiet: true,
      historyApiFallback: true,
    },

    module: {
      rules: [
        {
          test: /\.mjs$/,
          include: /node_modules/,
          type: 'javascript/auto',
        },
        {
          test: /\.js$/,
          use: ['babel-loader', 'source-map-loader'],
          exclude: /node_modules/,
        },
        {
          test: /\.tsx?$/,
          loader: ['babel-loader', 'awesome-typescript-loader'],
        },
        {
          test: /\.(ttf|woff2?|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/i,
          loader: 'url-loader',
          options: {
            limit: 10000,
          },
        },
        {
          test: /\.(png|jpe?g|gif|svg)$/i,
          loader: 'url-loader',
          options: {
            limit: 25000,
          },
        },
        {
          test: /\.scss$/,
          use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
        },
        {
          test: /\.css$/,
          use: [
            isProduction ? MiniCssExtractPlugin.loader : 'style-loader',
            {
              loader: 'css-loader',
              options: { modules: false },
            },
          ],
        },
      ],
    },

    plugins: [
      new HtmlWebpackPlugin({
        template: path.join('./index.html'),
        filename: 'index.html',
        hash: isProduction ? false : true,
        inject: true,
        favicon: './src/images/favicon.ico',
      }),
      new webpack.DefinePlugin({
        NODE_ENV: JSON.stringify(options.mode),
      }),
    ],
  }

  if (isProduction) {
    setup.optimization = {
      minimizer: [
        new TerserPlugin({
          terserOptions: {
            output: {
              comments: false,
            },
            compress: {
              drop_console: true,
            },
          },
        }),
        new OptimizeCSSAssetsPlugin({}),
      ],
      splitChunks: {
        cacheGroups: {
          commons: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendor',
            chunks: 'all',
          },
        },
      },
    }
  } else {
    setup.plugins.push(new webpack.HotModuleReplacementPlugin())
    setup.plugins.push(
      new MiniCssExtractPlugin({
        filename: '[name].[chunkhash].css',
        chunkFilename: '[name].[chunkhash].css',
      })
    )
  }

  return setup
}
