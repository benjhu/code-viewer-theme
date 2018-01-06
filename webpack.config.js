const path = require("path");
const ExtractTextPlugin = require("extract-text-webpack-plugin");

const extractExtension = new ExtractTextPlugin("./css/[name].min.css");
const extractOptionsPage = new ExtractTextPlugin("./css/options/options.min.css");

const extractOptions = {
    fallback: "style-loader",
    use: [
        {
            loader: "css-loader",
            options: {
                minimize: false
            }
        },
        {
            loader: "postcss-loader",
            options: {
                plugins: () => [ require("autoprefixer")() ]
            }
        },
        {
            loader: "sass-loader"
        }
    ]
};

module.exports = {
    devtool: "cheap-module-source-map",
    entry: {
        extension: "./src/js/extension.js",
        options: "./src/js/options/options.export.js"
    },
    output: {
        filename: "[name].build.js",
        path: path.resolve(__dirname + "/dist")
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: [
                    {
                        loader: "babel-loader",
                        options: {
                            presets: ["env"]
                        }
                    }
                ]
            },
            {
                test: /options\.scss$/,
                use: extractOptionsPage.extract(extractOptions)
            },
            {
                test: /main\.scss$/,
                exclude: /node_modules$/,
                use: extractExtension.extract(extractOptions)
            }
        ]
    },
    plugins: [
        extractExtension,
        extractOptionsPage
    ]
};