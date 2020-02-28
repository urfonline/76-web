const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const svgrTemplate = require("./utils/mithril-svg-template.js");

module.exports = {
    entry: './src/index.jsx',
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'dist'),
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: "Seventy Six Podcasting"
        }),
    ],
    devServer: {
        contentBase: './dist',
    },
    resolve: {
        extensions: ['.js', '.jsx']
    },
    module: {
        rules: [{
            test: /\.jsx?$/,
            exclude: /\/node_modules\//,
            loader: 'babel-loader',
        }, {
            test: /\.g(raph)?ql$/,
            exclude: /\/node_modules\//,
            loader: 'graphql-tag/loader',
        }, {
            test: /\.svg$/,
            use: [
                {
                    loader: 'babel-loader',
                },
                {
                    loader: '@svgr/webpack',
                    options: {
                        template: svgrTemplate,
                        babel: false,
                        svgo: false,
                    }
                }
            ]
        }, {
            test: /\.css$/,
            loaders: ['style-loader', 'css-loader'],
        }, {
            test: /\.ttf$/,
            loader: 'file-loader',
        }]
    }
};