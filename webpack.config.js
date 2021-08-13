const path = require('path');
const webpack = require('webpack');
const childProcess = require('child_process');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
module.exports = {
mode: 'development',
entry: {
main: './src/app.js'
},
    output: {
        path: path.resolve('./dist'),
        filename: '[name].js'
    },
    module: {
        rules: [
            
            {
                test: /\.css$/, // .css Ȯ���ڷ� ������ ��� ����
                use: [
                    process.env.NODE_ENV === "production"
                        ? MiniCssExtractPlugin.loader // ���δ��� ȯ��
                        : "style-loader", // ���� ȯ��
                    "css-loader",
                ], // css-loader�� �����Ѵ�
            },
            {
                test: /\.(png|jpg|gif|svg)$/,
                loader: 'url-loader',
                options: {            
                    name: '[name].[ext]?[hash]', 
                    limit: 20000, //20kb
                },
            },
        ],
    },
    plugins: [
        new webpack.BannerPlugin({
            banner: `
            Build Date: ${new Date().toLocaleDateString()}
            Commit Version: ${childProcess.execSync('git rev-parse --short HEAD')}
            Author: ${childProcess.execSync('git config user.name')}
            `
        }),
        new webpack.DefinePlugin({
            TWO: '1+1',
            TW: JSON.stringify('1+1'),
            'api.domain': JSON.stringify('http://dev.api.domain.com')
        }),
        new HtmlWebpackPlugin({
            template: './src/index.html',
            templateParameters: { // ���ø��� ������ �Ķ���� ���� ����
                env: process.env.NODE_ENV === 'development' ? '(���߿�)' : '',
            },
            minify: process.env.NODE_ENV == 'production'?
            {
                collapseWhitespace: true,
                removeComments: true,
        }: false

        }),
        new CleanWebpackPlugin(),
        ...(process.env.NODE_ENV === "production"
            ? [new MiniCssExtractPlugin({ filename: `[name].css` })]
            : []),
    ],
}