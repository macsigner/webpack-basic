import {merge} from 'webpack-merge';
import settings from './webpack.config.js';

const prodSettings = merge(settings, {
    mode: 'production',
})

export default prodSettings;
