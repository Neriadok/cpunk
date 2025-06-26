import i18next from 'i18next';
import es from '../translations/es.json';
import en from '../translations/en.json';

i18next.init({
  fallbackLng: 'es',
  defaultNS: 'translation',
  debug: true,
  resources: {
    en: {
      translation: en,
    },
    es: {
      translation: es,
    },
  },
});
