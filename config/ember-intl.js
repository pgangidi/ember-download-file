module.exports = function() {
  return {
    locales: ['en-us'],
    fallbackLocale: null,
    inputPath: 'translations',
    autoPolyfill: false,
    disabledPollyfill: false,
    publicOnly: false,
    errorOnNamesArgumentMismatch: true,
    errorOnMissingTranslations: true,
    stripEmptyTranslations: true,
    wrapTranslationsWithNamespace: false,
    requiresTranslation: function() {
      return true;
    }
  }
}