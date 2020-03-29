module.exports = {
    devServer: {
        port: 9090,
        watchOptions: {
            poll: true
        }
    },
    publicPath: './',

    chainWebpack: config => {
        config.plugin('html').tap(args => {
            args[0].title = 'Approver Dashboard';
            return args;
        });
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
