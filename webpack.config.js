let webpack = require('webpack');

module.exports = {
    entry : [
        './components/root.jsx',
    ],
    output: {
        path:     'static',
        filename: 'bundle.js',
    },
    module: {
        loaders: [
            {
                test:   /\.jsx?$/,
                loader: 'babel',
                exclude: /node_modules/,
                query: {
                    presets: ['es2015', 'react', 'stage-0'],
                    plugins: ['transform-decorators-legacy','transform-class-properties']
                },
            },
            {
                test: /\.scss/,
                loader: 'style!css?modules&localIdentName=[hash:base64:5]!sass'
            },
            {
                test: /\.svg$/,
                loader: 'svg-url?noquotes!svgo'
            },
        ],
    },
    plugins: [
        new webpack.ProvidePlugin({
            React: 'react'
        }),
    ],
    eslint: {
        configFile: '.eslintrc',
        failOnWarning: false,
        failOnError: false,
        emitError: false,
        fix: true
    }
};

if (~process.argv.indexOf('--crush')) {

    module.exports.plugins.push(
        new webpack.optimize.UglifyJsPlugin({
            output: { comments: false },
            compress: { warnings: false },
        }),
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('production')
            }
        })
    )

}

if (~process.argv.indexOf('--dev')) {

    module.exports.devtool = 'cheap-source-map';

    module.exports.module.preLoaders = [
        {
            test: /\.jsx?$/,
            loader: "eslint-loader",
            exclude: /node_modules/
        }
    ];

}


module.exports.plugins.push(
    new webpack.DefinePlugin({
        __DEV__: ~process.argv.indexOf('--dev')
    })
);
