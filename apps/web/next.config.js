const { composePlugins, withNx } = require('@nx/next');

const nextConfig = {
  transpilePackages: ['@shared-libs'],
  nx: {},
};

module.exports = composePlugins(withNx)(nextConfig);