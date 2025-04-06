import TerserPlugin from "terser-webpack-plugin";

const isProd = process.env.NODE_ENV === "production";

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true, // Keep this for SWC compiler optimization

  // Rewrite API requests to the backend
  async rewrites() {
    const backendUrl = process.env.BACKEND_API_URL || "http://localhost:5000"; // ตั้งค่า default
    console.log("Rewrites to:", backendUrl);

    return [
      {
        source: "/api/:path((?!auth).*)",
        destination: `${backendUrl}/:path*`,
      },
    ];
  },

  // Custom Webpack configuration
  webpack(config, { dev }) {
    if (!dev) {
      config.optimization.minimizer.push(
        new TerserPlugin({
          terserOptions: {
            compress: {
              drop_console: true, // Drop console logs in production
            },
          },
        })
      );
    }

    // Additional performance optimizations can be added here
    return config;
  },
};

export default nextConfig;
