const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const svgrTemplate = require("./utils/mithril-svg-template.js");

module.exports = {
    entry: ['lazysizes', './src/index.jsx'],
    output: {
        filename: '[name].entry.js',
        chunkFilename: '76.[name].[hash].chunk.js',
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/',
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: "Seven Six Podcasting",
            meta: {
                viewport: "width=device-width; initial-scale=1"
            }
        }),
    ],
    devServer: {
        contentBase: './dist',
        historyApiFallback: true,
    },
    devtool: "eval-source-map",
    resolve: {
        modules: ['node_modules'],
        extensions: ['.js', '.jsx', '.css']
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
            exclude: /\/node_modules\//,
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
            test: /\.(ttf|woff2?|eot|svg)$/,
            loader: 'file-loader',
        }]
    },
    optimization: {
        splitChunks: {
            chunks: "all",
        }
    }
};
