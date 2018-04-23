var webpack = require('webpack');
const path = require('path');

module.exports = {
    entry: {
        index: './src/index.js',
        vendors: [
            'es5-shim',
            'es5-shim/es5-sham',
            'react',
            'react-dom',
            'react-router',
            'redux',
            'react-redux',
            'redux-thunk',
            'js-base64',
            'echarts/lib/echarts',
            'echarts/lib/chart/line',
            'echarts/lib/component/tooltip',
            'classnames',
            'lodash',
            'react-document-title',
            'rc-pagination',
            'history',
            'console-polyfill',
            'fetch-jsonp'
        ]
    },
    devtool: 'cheap-module-source-map',
    plugins: [
        new webpack.ProvidePlugin({
            $: "jquery",
            fetchJsonp: 'fetch-jsonp'
        })
    ],
    resolve: {
        modules: [path.resolve(__dirname, 'node_modules')],
        alias: {
            common: path.resolve(__dirname, 'src/components/common'),
            commonjs: path.resolve(__dirname, 'src/common'),
            reducers: path.resolve(__dirname, 'src/reducers'),
            components: path.resolve(__dirname, 'src/components')
        }
    }
};
