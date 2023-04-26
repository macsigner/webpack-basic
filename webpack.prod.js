import {merge} from 'webpack-merge';
import settings from './webpack.config.js';
import {CleanWebpackPlugin} from 'clean-webpack-plugin';

const prodSettings = merge(settings, {
    mode: 'production',
    plugins: [
        new CleanWebpackPlugin(),
    ]
})

export default prodSettings;
