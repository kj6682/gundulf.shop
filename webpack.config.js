var webpack = require('webpack')
var path = require('path')

var SRC_DIR = path.resolve(__dirname + '/src/main/app')
var TARGET_DIR = path.resolve(__dirname + '/src/main/resources/public')
var TEMPLATE_DIR = path.resolve(__dirname + '/src/main/resources/templates')

module.exports = (env = {}) => {


    const isProduction = env.production === true
    const isDevServer = env.devserver === true

    return {
        entry: {
            shop: SRC_DIR + "/shop/index.jsx",
        },
        output: {
            path: TARGET_DIR,
            filename: "[name].bundle.js",
            publicPath: '/'
        },
        module: {
            loaders: [
                {
                    test: /\.jsx?/,
                    include: SRC_DIR,
                    exclude: /node_modules/,
                    loader: 'babel-loader'
                },
                {
                    test: /\.json$/,
                    loader: "json-loader"
                },
                {
                    test: /\.css$/,
                    loader: "style-loader!css-loader"
                },
                {
                    test: /\.(eot|svg|ttf|woff|woff2)$/,
                    loader: 'file-loader?name=fonts/[name].[ext]'
                }
            ]
        },
        plugins: (function () {
            if (isProduction) {
                return [
                    new webpack.optimize.UglifyJsPlugin({minimize: true}),
                    new webpack.DefinePlugin({
                        'process.env': {
                            'NODE_ENV': JSON.stringify('production')
                        }
                    })]
            }
            else if(isDevServer) {
                return [new webpack.DefinePlugin({
                    'process.env': {
                        'NODE_ENV': JSON.stringify('dev'),
                        'DEV_SERVER' : JSON.stringify('true')
                    }
                })]
            }
            else {
                return [new webpack.DefinePlugin({
                    'process.env': {
                        'NODE_ENV': JSON.stringify('dev')
                    }
                })]
            }
        })(),

        devtool: (function () {
            if (!isProduction) return 'source-map'
        })(),

        devServer: (function () {
            if (!isProduction) return {
                headers: {
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Credentials": "true",
                    "Access-Control-Allow-Methods": "POST, GET, OPTIONS, DELETE, PUT",
                    "Access-Control-Max-Age": "3600",
                    "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept, remember-me"
                },

                contentBase: TEMPLATE_DIR,
                historyApiFallback: true,
                inline: true,
                port: 8081
            }
        })(),
    }
};


// simplified after reading this https://blog.flennik.com/the-fine-art-of-the-webpack-2-config-dc4d19d7f172