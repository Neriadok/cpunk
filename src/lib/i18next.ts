import i18next from "i18next";

i18next.init({
    fallbackLng: 'es',
    ns: ['en', 'es'],
    defaultNS: 'es',
    debug: true
});
i18next.addResourceBundle('en', 'en', require('../translations/en'), true, true);
i18next.addResourceBundle('es', 'es', require('../translations/es'), true, true);