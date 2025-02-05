// next.config.js
const withTM = require('next-transpile-modules')([
    '@ant-design/icons',
    '@ant-design/icons-svg',
    'rc-util'
  ]);
  
  module.exports = withTM({
    // If you continue to experience issues with ES modules, you can try disabling ESM externals:
    experimental: {
      esmExternals: false,
    },
    // You can add other Next.js configuration options here if needed.
  });
  