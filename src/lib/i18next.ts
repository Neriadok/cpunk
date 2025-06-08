import i18next from 'i18next';
import * as es from '../translations/es.json';
import * as en from '../translations/en.json';

i18next.init({
  fallbackLng: 'es',
  ns: ['en', 'es'],
  defaultNS: 'es',
  debug: true,
});
i18next.addResourceBundle('en', 'en', en, true, true);
i18next.addResourceBundle('es', 'es', es, true, true);
