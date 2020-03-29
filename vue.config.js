module.exports = {
    publicPath: './',

    chainWebpack: config => {
        config.plugin('html').tap(args => {
            args[0].title = 'Applicant Dashboard';
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
