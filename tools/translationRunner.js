const manageTranslations = require('react-intl-translations-manager').default

manageTranslations({
  messagesDirectory: 'src/translations/messages/',
  translationsDirectory: 'src/translations/locales/',
  languages: ['jp', 'simp-en']
})
