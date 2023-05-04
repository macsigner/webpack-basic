import * as path from 'path';
import {fileURLToPath} from 'url';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const pages = [
    'src/pages/index.html',
]

const settings = {
    mode: 'development',
    entry: './src/js/main.js',
    devServer: {
        static: {
            directory: path.join(__dirname, 'dist'),
        }
    },
    output: {
        filename: '[name]-[hash].js',
        path: path.resolve(__dirname, 'dist'),
        assetModuleFilename: 'assets/[name]-[hash][ext]'
    },
    module: {
        rules: [
            {
                test: /\.s[ac]ss$/i,
                use: [
                    MiniCssExtractPlugin.loader,
                    "css-loader",
                    "sass-loader",
                ],
            },
            {
                test: /\.(png|jpe?g|webp|tiff?)$/i,
                type: 'asset/resource',
                generator: {
                    filename: 'assets/img/[name]-[hash][ext]'
                },
            },
            {
                test: /\.(woff|woff2)$/i,
                type: 'asset/resource',
                generator: {
                    filename: 'assets/fonts/[name]-[hash][ext]'
                },
            },
        ],
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'assets/css/[name]-[hash].css'
        }),
        ...pages.reduce((prev, current) => {
            return [...prev, new HtmlWebpackPlugin({
                template: current,
            })];
        }, []),
    ]
};

export default settings;
