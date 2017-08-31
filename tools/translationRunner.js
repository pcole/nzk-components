const manageTranslations = require('react-intl-translations-manager').default

manageTranslations({
  messagesDirectory: 'translations/messages/',
  translationsDirectory: 'translations/locales/',
  languages: ['jp', 'simp-en']
})
