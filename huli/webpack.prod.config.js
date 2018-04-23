const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const webpack_base = require('./webpack.base.config.js');
const HappyPack = require('happypack');
const merge = require('webpack-merge');

module.exports = merge(webpack_base, {
    output: {
        filename: '[name]-[chunkhash].js',
        path: path.resolve(__dirname, '../..', 'hl'),
        chunkFilename: '[name].[chunkhash:8].chunk.js'
    },
    module: {
        loaders: [{
                test: /\.js$/,
                exclude: /node_modules/,
                loaders: ['happypack/loader?id=babel']
            },
            {
                test: /\.js$/,
                include: /node_modules/,
                loaders: ['es3ify-loader']
            },
            {
                test: /\.css$/,
                exclude: /node_modules/,
                loaders: ['css-loader']
            }
        ],
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': '"production"'
            }
        }),
        new CleanWebpackPlugin(path.resolve(__dirname, '../..', 'hl'), {
            allowExternal: true
        }),
        new HappyPack({
            id: 'babel',
            threads: 4,
            loaders: ['babel-loader']
        }),
        new webpack.optimize.CommonsChunkPlugin({
            names: ['vendors', 'manifest']
        }),
        new HtmlWebpackPlugin({
            filename: './index.html',
            template: './template/index.ejs',
            inject: false
        }),
        new SetStaticSuffixPlugin()
    ]
});

function SetStaticSuffixPlugin(options) {
    const fs = require('fs');
    const huli_dir = path.join(__dirname, '../..', 'static/pc/js/config/config.jsp');
    this.jsHuliMap = {};
    this.cssHuliMap = {};
    const page_huli = fs.readFileSync(huli_dir, 'utf-8');
    const reg_huli_js = /target=\'\$\{jsHuliMap\}\'\sproperty\=\'(.*?)\'\svalue\=\'(.*?)\'/g;
    page_huli.replace(reg_huli_js, (s0, s1, s2) => {
        this.jsHuliMap[s1] = s2;
    });
    const reg_huli_css = /target=\'\$\{cssHuliMap\}\'\sproperty\=\'(.*?)\'\svalue\=\'(.*?)\'/g;
    page_huli.replace(reg_huli_css, (s0, s1, s2) => {
        this.cssHuliMap[s1] = s2;
    });
}

SetStaticSuffixPlugin.prototype.apply = function(compiler) {
    let jsHuliMap = this.jsHuliMap;
    let cssHuliMap = this.cssHuliMap;
    compiler.plugin('emit', function(compilation, callback) {

        const _templateHtml = compilation.assets['./index.html'].source();
        let configJsp = _templateHtml;

        configJsp = configJsp.replace(/https\:\/\/static\.huli\.com\/js\/(.*?)\.js/g, (s0, s1) => {
            const _t = jsHuliMap[s1 + '.js'];
            const src = _t ? ("https://static.huli.com/js/" + s1 + ".js?t=" + _t) : s0;
            return src;
        })
        configJsp = configJsp.replace(/https\:\/\/static\.huli\.com\/css\/(.*?)\.css/g, (s0, s1) => {
            const _t = cssHuliMap[s1 + '.css'];
            const src = _t ? ("https://static.huli.com/css/" + s1 + ".css?t=" + _t) : s0;
            return src;
        })
        compilation.assets['./index.html'].source = function() {
            return configJsp;
        }

        callback();
    });
};
