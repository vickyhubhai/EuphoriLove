/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: true,
    serverComponentsExternalPackages: ['socket.io-client']
  },
  webpack: (config, { isServer }) => {
    // Fix for the _document module resolution
    if (!isServer) {
      config.resolve = config.resolve || {};
      config.resolve.fallback = {
        ...config.resolve.fallback,
        punycode: false,
        bufferutil: false,
        'utf-8-validate': false,
        'next/dist/pages/_document': false
      };
    }
    
    // Optimize webpack configuration
    config.snapshot = {
      ...config.snapshot,
      managedPaths: [/^(.+?[\/]node_modules[\/])(?!@next[\/])/],
    };
    
    config.watchOptions = {
      ...config.watchOptions,
      ignored: /node_modules/,
      aggregateTimeout: 300,
      poll: 1000
    };
    
    return config;
  }
};

export default nextConfig;
