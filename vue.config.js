const webpack = require('webpack');

module.exports = {
    publicPath: './',

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
                __VERSION__: JSON.stringify(process.env.npm_package_version)
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
