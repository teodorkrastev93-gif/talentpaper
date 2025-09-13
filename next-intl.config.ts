import {defineConfig} from 'next-intl/config';

export default defineConfig({
  locales: ['en', 'bg', 'ro', 'es', 'fr', 'de'],
  defaultLocale: 'en',
  messagesDir: 'messages'
});
