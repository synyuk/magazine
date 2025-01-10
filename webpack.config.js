const CopyPlugin = require("copy-webpack-plugin");
const HtmlMinimizerPlugin = require("html-minimizer-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");

module.exports = {
    resolve: {
        extensions: ['.js', '.jsx', '.json', '.html', '.css'],
    },
    output: {
        path: __dirname,
    },
    module: {
        rules: [
            {
                test: /\.html$/i,
                type: "asset/resource",
                generator: {
                    filename: '[name][ext]',
                },

            },
            {
                test: /.s?css$/,
                use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
            },
        ],
    },
    plugins: [
        new CopyPlugin({
            patterns: [
                {
                    from: 'src/*.html',
                    to: '[name][ext]',
                },
                {
                    from: 'assets/css/*.css',
                    to: 'dist/css/[name][ext]',
                },
                {
                    from: 'assets/js/*.js',
                    to: 'dist/js/[name][ext]',
                },
            ],
        }),
    ],
    optimization: {
        minimizer: [
            new HtmlMinimizerPlugin(),
            new CssMinimizerPlugin(),
            new TerserPlugin()
        ],
    },
};
