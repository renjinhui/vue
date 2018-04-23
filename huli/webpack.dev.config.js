const path = require('path');
const webpack = require('webpack');
const HappyPack = require('happypack');
const webpack_base = require('./webpack.base.config');
const merge = require('webpack-merge');

const arrProxy = [
    '/regist',
    '/login',
    '/connect',
    '/invest',
    '/myaccount',
    '/hqb',
    '/profile',
    '/monthbill',
    '/alert',
    '/findPassword',
    '/jjs',
    '/trust',
    '/export',
    '/ranking',
    '/ajax',
    '/element',
    '/asset',
    '/detail',
    '/agreement',
    '/user'
];

let proxy = {};
arrProxy.forEach((item, i) => {
    proxy[item] = {
        changeOrigin: true,
        target: 'http://webapi.soydai.cn:3499',
        secure: false,
        pathRewrite: {}
    }
    proxy[item].pathRewrite[item] = '/apitest' + item;
});

module.exports = merge(webpack_base, {
    output: {
        filename: '[name].js',
        chunkFilename: '[name].chunk.js'
    },
    debug: true,
    module: {
        loaders: [{
            test: /\.js$/,
            exclude: /node_modules/,
            loaders: ['babel-loader']
        },
        {
            test: /\.css$/,
            exclude: /node_modules/,
            loaders: ['style-loader','css-loader']
        }]
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': '"develop"'
            }
        }),
        new HappyPack({
            id: 'babel',
            threads: 4,
            loaders: ['babel-loader']
        })
    ],
    devServer: {
        proxy: proxy,
        watchOptions: {
            ignored: /node_modules/
        }
    }
});
