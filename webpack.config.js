const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const path = require('path');

const NODE_ENV = process.env.NODE_ENV || "development";

module.exports = {
    mode: 'development',
    entry: [
        'babel-polyfill',
        './src/index.jsx'
    ],
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'bundle.js',
        library: 'home',
        publicPath: '/',
    },
    watch: NODE_ENV === "development",

    devServer: {
        contentBase: './build',
        historyApiFallback: true,
    },

    watchOptions: {
        aggregateTimeout: 100,
    },

    devtool: NODE_ENV === "development" ? 'cheap-inline-module-source-map' : "source-map",

    plugins: [
        new CopyWebpackPlugin([
            { from: './public' }
        ])
    ],

    module: {
        rules: [
            {
                test: /.js$/,
                use: [
                    {
                        loader: 'babel',
                        options: {
                            presets: ["@babel/preset-env", "@babel/preset-react"],
                        }
                    }
                ],
            },
            {
                test: /.jsx$/,
                use: [
                    {
                        loader: 'babel',
                        options: {
                            presets: ["@babel/preset-env", "@babel/preset-react", ],
                        }
                    }
                ],
            },
            {
                test:/\.(s*)css$/,
                use:['style-loader','css-loader', 'sass-loader']
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: [
                    'file-loader'
                    ]
            }
        ],
    },

    resolve: {
        modules: ['node_modules'],
        extensions: ['.js']
    },

    resolveLoader: {
        modules: ['node_modules'],
        moduleExtensions: ['-loader'],
        extensions: ['.js'],
    },

};

if(NODE_ENV === 'production') {
    module.exports.optimization = {
            minimize: true,
            minimizer: [new UglifyJsPlugin({
                uglifyOptions: {
                    compress: { drop_debugger: false }
                }
            })],
        };
}