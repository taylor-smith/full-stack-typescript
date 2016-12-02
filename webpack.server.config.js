const fs = require('fs');
const path = require('path');
const webpack = require('webpack');
const PROJECT_ROOT = __dirname;
const NODE_MODULES_DIR = path.resolve(PROJECT_ROOT, 'node_modules');
const PUBLIC_DIR = path.resolve(PROJECT_ROOT, 'public');
const DB_PATH = path.resolve(PROJECT_ROOT, 'private', 'data.db');
const nodeModules = fs.readdirSync(NODE_MODULES_DIR).reduce((result, m) => {
    if (m !== '.bin') {
        result[m] = 'commonjs ' + m;
    }
    return result;
}, {});

module.exports = {
    entry: {
        'server.js': './src/server/app.ts',
        'setup.js': './src/server/setup.ts'
    },
    output: {
        path: './private',
        filename: '[name]',
        devtoolModuleFilenameTemplate: '[absolute-resource-path]', // Makes sure that path is put into sourcemaps correctly
    },
    target: 'node',
    externals: nodeModules,
    devtool: 'source-map',
    resolve: {
        extensions: ['.ts'],
        enforceExtension: false
    },
    module: {
        rules: [{
            test: /\.ts$/,
            use: 'ts-loader'
        }, {
            test: /\.json$/,
            use: 'json-loader'
        }]
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env.PUBLIC_DIR': JSON.stringify(process.env.PUBLIC_DIR || PUBLIC_DIR),
            'process.env.DB_PATH': JSON.stringify(process.env.DB_PATH || DB_PATH)
    })
    ]
}