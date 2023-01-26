const path = require("path")
const webpack = require("webpack")
const HtmlWebpackPlugin = require("html-webpack-plugin")

module.exports = {
    mode: "development",
    entry: "./src/index.tsx",
    output: { path: path.join(__dirname, "/build"), filename: "bundle.js" },
    devtool: "inline-source-map",
    devServer: { static: "./build", port: 3000 },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loader: "babel-loader",
            },
            { test: /\.tsx?$/, use: "ts-loader", exclude: /node_modules/ },
            { test: /\.css$/, use: ["style-loader", "css-loader"] },
            {
                test: /\.(png|svg|jpe?g|gif)$/,
                loader: "file-loader",
                options: {
                    name: "[name].[ext]",
                    outputPath: "src/images/",
                    publicPath: "src/images/",
                },
            },
            {
                test: /\.m?js/,
                resolve: {
                    fullySpecified: false,
                },
            },
        ],
    },
    resolve: {
        extensions: [".tsx", ".ts", ".js"],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./public/index.html",
            filename: "./index.html",
            // favicon: './public/favicon.ico',
        }),
        new webpack.ProvidePlugin({
            process: "process/browser",
        }),
    ],
}
