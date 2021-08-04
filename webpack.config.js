const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    mode: "production",
    devServer: {
        contentBase: './examples/'
    },
    output: {
        filename: 'p5.textToLoops.min.js'
    },
    module: {
        rules: [{
            test: /\.js$/,
            exclude: /node_modules/
        }]
    },
    plugins: [
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: 'assets',
                    to: 'assets'
                }
            ]
        })
    ]
}