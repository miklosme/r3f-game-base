const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

const isDevelopment = process.env.NODE_ENV !== 'production';

const devConfig = isDevelopment
    ? {
          devServer: {
              static: {
                  directory: path.join(__dirname, 'assets'),
              },
              compress: true,
              port: 9000,
              hot: true,
          },
          // eval: "Recommended choice for development builds with maximum performance."
          devtool: 'eval',
      }
    : {
          optimization: {
              minimize: true,
              minimizer: [new TerserPlugin()],
          },
      };

module.exports = {
    mode: isDevelopment ? 'development' : 'production',
    entry: {
        app: './src/index.js',
    },
    output: {
        filename: '[name].[contenthash].js',
        path: path.resolve(__dirname, 'dist'),
    },
    resolve: {
        alias: {
            '@engine': path.resolve(__dirname, 'src/@engine'),
            '@objects': path.resolve(__dirname, 'src/@objects'),
        },
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            [
                                '@babel/preset-env',
                                {
                                    useBuiltIns: 'entry',
                                    corejs: { version: '3.18', proposals: true },
                                },
                            ],
                            [
                                '@babel/preset-react',
                                {
                                    development: process.env.BABEL_ENV === 'development',
                                    runtime: 'automatic',
                                },
                            ],
                        ],
                        plugins: [
                            '@babel/plugin-transform-runtime',
                            '@babel/plugin-proposal-optional-chaining',
                            '@babel/plugin-proposal-nullish-coalescing-operator',
                            'react-refresh/babel',
                        ],
                    },
                },
            },
            {
                test: /\.css$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'style-loader',
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 1,
                        },
                    },
                    {
                        loader: 'postcss-loader',
                    },
                ],
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'R3F Game Bootstrap',
            template: 'src/index.html',
        }),
        isDevelopment && new ReactRefreshWebpackPlugin(),
    ].filter(Boolean),
    ...devConfig,
};
