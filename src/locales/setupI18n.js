// locales/i18n.ts
import { createI18n } from 'vue-i18n';
import { getLocal } from '@/utils/cache/localStorage'
import { LOCALE_KEY } from '@/config/cache'
import { LOCALE } from '@/config/locale'
import { setHtmlPageLang } from './helper'

const langDefault = LOCALE.ZH_CN

async function createI18nOptions() {
  const locale = getLocal(LOCALE_KEY)?.locale || langDefault
  const defaultLocal = await import(`./lang/${locale}.js`);
  const message = defaultLocal.default?.message ?? {};
  
  setHtmlPageLang(locale);

  return {
    legacy: false, // composition API
    locale,
    messages: {
      [locale]: message,
    }
  };
}

export let i18n = null

export async function setupI18n(app) {
  const options = await createI18nOptions();
  i18n = createI18n(options);
  app.use(i18n);
}
