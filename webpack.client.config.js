module.exports = {
    entry: './src/client/index.tsx',
    output: {
        path: './public',
        filename: 'client.js'
    },
    devtool: 'inline-source-map',
    resolve: {
        extensions: ['.js', '.ts', '.tsx'],
        enforceExtension: false
    },
    module: {
        rules: [{
            test: /\.tsx?$/,
            use: 'ts-loader'
        }]
    }
}