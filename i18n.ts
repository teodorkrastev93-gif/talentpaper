import {getRequestConfig} from 'next-intl/server';

export const locales = ['en','bg','ro','es','fr','de'] as const;
export const defaultLocale = 'en';

// Use the new requestLocale API to avoid deprecation warnings
export default getRequestConfig(async ({requestLocale}) => {
  let locale = requestLocale ?? defaultLocale;
  if (!locales.includes(locale as any)) locale = defaultLocale;

  return {
    locale: await Promise.resolve(locale),
    messages: (await import(`./messages/${locale}.json`)).default
  };
});
