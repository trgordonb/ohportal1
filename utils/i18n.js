const path = require('path')
const NextI18Next = require('next-i18next').default

const NextI18NextInstance = new NextI18Next({
    defaultLanguage: 'zh',
    otherLanguages: ['en'],
    localePath: path.resolve("./public/static/locales"),
})

const { appWithTranslation, withTranslation } = NextI18NextInstance

module.exports = {
    nextI18next: NextI18NextInstance,
    appWithTranslation,
    withTranslation
}
