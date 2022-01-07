const path = require('path')
const NextI18Next = require('next-i18next').default

const localePath = "/locales";
const NextI18NextInstance = new NextI18Next({
    defaultLanguage: 'zh',
    otherLanguages: ['en'],
    localeSubpaths: {},
    localePath,
})

const { appWithTranslation, withTranslation } = NextI18NextInstance

module.exports = {
    nextI18next: NextI18NextInstance,
    appWithTranslation,
    withTranslation
}