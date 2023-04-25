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
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'dist'),
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: 'src/pages/index.html',
        }),
        ...pages.reduce((prev, current) => {
            console.log(prev);
            console.log(current);
            return [...prev, new HtmlWebpackPlugin({
                template: current,
            })];
        }, []),
    ]
};

console.log(settings.plugins);
export default settings;
