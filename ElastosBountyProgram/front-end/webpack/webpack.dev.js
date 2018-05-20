const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const webpackNotifier = require('webpack-notifier');
const merge = require('webpack-merge');
const common = require('./common.js');
const util = require('./util');
const resolve = util.resolve;

module.exports = merge(common, {
    cache: true, //for rebuilding faster
    output: {
        path: resolve('dev_dist'),
        filename: 'static/js/bundle.js',
        publicPath: '/',
        pathinfo: true,
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                use: ['babel-loader'],
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader', 'postcss-loader'],
            },
            {
                test: /\.scss$/,
                exclude: /node_modules/,
                use: ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader'],
            },
            {
                test: /\.(eot|svg|ttf|woff|woff2)$/,
                use: ['url-loader'],
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['es2015', 'react'],
                        cacheDirectory: true,
                        plugins: ['react-hot-loader/babel', 'react-html-attrs'],
                    },
                },
            },
            {
                test: /\.svg$/,
                use: ['svg-inline-loader'],
            },
            {
                test: /\.(png|jpg)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: { name: 'image/[name]-[hash:8].[ext]' },
                    },
                ],
            },
        ],
    },
    devtool: 'cheap-module-source-map',
    devServer: {
        historyApiFallback: true,
        contentBase: 'dev_dist',
        port: 3001,
        hot: true,
        watchOptions: {
            ignored: /node_modules/,
        },
        compress: true,
        disableHostCheck: true
    },
    plugins: [
        new webpackNotifier(),
        new HtmlWebpackPlugin({
            inject: true,
            template: resolve('public/index.html'),
            minify: {
                minifyJS: false,
                minifyCSS: false,
            },
        }),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('development'),
                PLATFORM_ENV: JSON.stringify('web'),
                SERVER_URL: JSON.stringify('http://127.0.0.1:3000')
            },
        }),
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),
        new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
    ]
});
