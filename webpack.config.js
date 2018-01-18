const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const makeConfig = ({ name, buildHTML, useExternals, css }) => {
    const plugins = buildHTML ? [
        new HtmlWebpackPlugin({
            template: `packages/${name}/src/index.tpl.html`
        })
    ] : [];
    const rules = css ? [
        {
            test: /\.css$/,
            include: path.join(__dirname, `packages/${name}/src`),
            use: [
                'style-loader',
                'ts-cssdts-loader/src/cssLoader',
                {
                    loader: 'typings-for-css-modules-loader',
                    options: {
                        modules: true,
                        namedExport: true
                    }
                },
                'postcss-loader'
            ]
        }
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
        watchOptions: {
            aggregateTimeout: 300,
        },
        resolve: {
            extensions: ['.ts', '.tsx', '.js', '.json', '.css'],
        },
        module: {
            rules: [
                {
                    test: /\.tsx?$/,
                    use: [
                        {
                            loader: 'ts-loader',
                            options: {
                                configFile: path.join(__dirname, `tsconfig.${name}.json`)
                            }
                        },
                        {
                            loader: path.join(__dirname, 'ts-cssdts-loader'),
                        }
                    ]
                },
                ...rules
            ],
        },
        externals: useExternals ? [
            '@inless/core',
            '@inless/ui',
            '@inless/editor'
        ] : [],
        plugins: [
            new webpack.WatchIgnorePlugin([
                path.join(__dirname, `./packages/${name}/dist`),
                // /\.d\.ts$/,
                /index\.html$/,
                /bundle\.js$/,
                /bundle\.js\.map$/,
                /inde\.d\.ts$/,
            ]),
            new webpack.optimize.ModuleConcatenationPlugin(),
            ...plugins
        ],
    };
};

module.exports = [
    makeConfig({ name: 'core', useExternals: true }),
    makeConfig({ name: 'cycler', useExternals: true }),
    makeConfig({ name: 'ui', useExternals: true, css: true, buildHTML: true }),
    makeConfig({ name: 'editor', useExternals: true, buildHTML: true }),
];
