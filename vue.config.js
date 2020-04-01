const webpack = require('webpack');

const APPLICATION_PATH =
    process.env.NODE_ENV === 'production' ? '/requester-dashboard/' : '/';

module.exports = {
    publicPath: APPLICATION_PATH,

    chainWebpack: config => {
        config.plugin('html').tap(args => {
            args[0].title = 'Applicant Dashboard';
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
