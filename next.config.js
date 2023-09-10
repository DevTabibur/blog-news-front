const path = require('path')

module.exports = {
    sassOptions: {
        includePaths: [path.join(__dirname, 'styles')],
    },
    trailingSlash: true,
    optimizeFonts: false,
    i18n: {
        locales: ['en', 'ar'],
        defaultLocale: 'en',
    },
}