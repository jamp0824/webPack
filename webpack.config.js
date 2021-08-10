const path = require('path');

module.exports = {
mode: "development",
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
                use: ["css-loader"], // css-loader를 적용한다
            },
        ],
    },
}