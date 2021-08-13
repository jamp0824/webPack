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
                test: /\.css$/, // .css 확장자로 끝나는 모든 파일
                use: [
                    process.env.NODE_ENV === "production"
                        ? MiniCssExtractPlugin.loader // 프로덕션 환경
                        : "style-loader", // 개발 환경
                    "css-loader",
                ], // css-loader를 적용한다
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
            templateParameters: { // 템플릿에 주입할 파라매터 변수 지정
                env: process.env.NODE_ENV === 'development' ? '(개발용)' : '',
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