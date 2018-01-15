const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const makeConfig = ({ name, buildHTML, useExternals }) => {
    const plugins = buildHTML ? [
        new HtmlWebpackPlugin({
            template: `packages/${name}/src/index.tpl.html`
        })
    ] : [];

    return {
        devtool: 'source-map',
        target: 'web',
        entry: `./packages/${name}/src/index.ts`,
        output: {
            path: path.join(__dirname, `./packages/${name}/dist`),
            filename: `bundle.js`,
            library: `@inless/${name}`,
            libraryTarget: 'umd'
        },
        resolve: {
            extensions: ['.ts', '.tsx', '.js', '.json'],
        },
        module: {
            rules: [
                { 
                    test: /\.tsx?$/,
                    loader: 'ts-loader',
                    options: {
                        configFile: path.join(__dirname, `tsconfig.${name}.json`)
                    }
                },
            ],
        },
        externals: useExternals ? [
            '@inless/core',
            '@inless/ui',
            '@inless/editor'
        ] : [],
        plugins: [
            new webpack.WatchIgnorePlugin([
                path.join(__dirname, `./packages/${name}/dist`)
            ]),
            new webpack.optimize.ModuleConcatenationPlugin(),
            ...plugins
        ],
    };
};

module.exports = [
    makeConfig({ name: 'core', useExternals: true }),
    makeConfig({ name: 'ui', useExternals: true }),
    makeConfig({ name: 'editor', buildHTML: true, useExternals: true })
];
