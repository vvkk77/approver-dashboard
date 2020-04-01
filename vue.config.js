const webpack = require('webpack');

const APPLICATION_PATH =
    process.env.NODE_ENV === 'production' ? '/approver-dashboard/' : '/';

module.exports = {
    devServer: {
        port: 9090,
        watchOptions: {
            poll: true
        }
    },
    publicPath: APPLICATION_PATH,

    chainWebpack: config => {
        config.plugin('html').tap(args => {
            args[0].title = 'Approver Dashboard';
            return args;
        });
    },

    pwa: {
        workboxOptions: {
            skipWaiting: true
        }
    },

    configureWebpack: {
        performance: {
            maxEntrypointSize: 512000,
            maxAssetSize: 512000
        },
        plugins: [
            new webpack.DefinePlugin({
                __VERSION__: JSON.stringify(process.env.npm_package_version),
                'process.env.__APPLICATION_PATH__': JSON.stringify(
                    APPLICATION_PATH
                )
            })
        ]
    },

    pluginOptions: {
        i18n: {
            locale: 'en',
            fallbackLocale: 'en',
            localeDir: 'locales',
            enableInSFC: true
        }
    }
};
