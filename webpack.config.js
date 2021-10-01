const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

const isDevelopment = process.env.NODE_ENV !== 'production';

const devConfig = isDevelopment
    ? {
          devServer: {
              static: {
                  directory: path.join(__dirname, 'public'),
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
        game: './src/index.js',
    },
    output: {
        filename: '[name].[hash].js',
        path: path.resolve(__dirname, 'dist'),
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
            title: 'R3F Game Base',
            template: 'src/index.html',
        }),
        isDevelopment && new ReactRefreshWebpackPlugin(),
    ].filter(Boolean),
    ...devConfig,
};
