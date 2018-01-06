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
    entry: "./src/js/extension.js",
    output: {
        filename: "build.js",
        path: path.resolve(__dirname + "/dist")
    },
    module: {
        rules: [
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