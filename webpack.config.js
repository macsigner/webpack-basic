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
        filename: 'main.js',
        path: path.resolve(__dirname, 'dist'),
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
                oneOf: [
                    {
                        resourceQuery: /srcset/,
                        use: [
                            {
                                loader: "webpack-image-srcset-loader",
                                options: {
                                    esModule: false,
                                    sizes: [
                                        "375w",
                                        "480w",
                                        "600w",
                                        "900w",
                                        "1200w",
                                        "1920w",
                                        "2560w",
                                    ],
                                },
                            },
                            "file-loader",
                            "webpack-image-resize-loader",
                            // add webpack-sharp-loader if you want to pre-process your image e.g. rotating, flipping
                        ],
                    },
                    {
                        // if no previous resourceQuery match
                        use: [
                            {
                                loader: "file-loader",
                                options: {
                                    esModule: false,
                                }
                            }
                        ],
                    },
                ],
            }
        ],
    },
    plugins: [
        new MiniCssExtractPlugin(),
        ...pages.reduce((prev, current) => {
            return [...prev, new HtmlWebpackPlugin({
                template: current,
            })];
        }, []),
    ]
};

export default settings;
