const webpack = require('webpack');

const isProd = process.env.NODE_ENV === 'production';

const APPLICATION_PATH = isProd ? '/approver-dashboard/' : '/';

const API_BASE_URL = (() => {
    const DEFAULT_API = 'https://viruscorona.co.in';
    const EPASS_API = 'https://epassapi.egovernments.org/ecurfew';

    if (!isProd) {
        return DEFAULT_API;
    }

    return !process.env.GITHUB_TOKEN ? EPASS_API : DEFAULT_API;
})();

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
                'process.env.APPLICATION_PATH': JSON.stringify(
                    APPLICATION_PATH
                ),
                'process.env.API_BASE_URL': JSON.stringify(API_BASE_URL)
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
