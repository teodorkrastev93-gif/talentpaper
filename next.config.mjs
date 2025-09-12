import createNextIntlPlugin from 'next-intl/plugin';

// Point the plugin to our config file:
const withNextIntl = createNextIntlPlugin('./i18n.ts');

export default withNextIntl({
  reactStrictMode: true
});
