import * as path from 'path';
import {fileURLToPath} from 'url';
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
        filename: 'main.js',
        path: path.resolve(__dirname, 'dist'),
    },
    module: {
        rules: [
            {
                test: /\.s[ac]ss$/i,
                use: [
                    "style-loader",
                    "css-loader",
                    "sass-loader",
                ],
            },
        ],
    },
    plugins: [
        ...pages.reduce((prev, current) => {
            return [...prev, new HtmlWebpackPlugin({
                template: current,
            })];
        }, []),
    ]
};

export default settings;
