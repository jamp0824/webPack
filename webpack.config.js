const path = require('path');

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
                    'style-loader',
                    'css-loader'], // css-loader�� �����Ѵ�
            },
            {
                test: /\.(png|jpg|gif|svg)$/,
                loader: 'file-loader',
                options: {
                    publicPath: './dist/',
                    name: '[name].[ext]?[hash]',
                },
            },
        ],
    },
}