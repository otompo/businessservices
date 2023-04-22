/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env: {
    REACT_APP_GOOGLE_API_KEY: "AIzaSyA9_KO9N6wV-EAJq3mxUy94QkAlf5Mqgxo",
  },
  publicRuntimeConfig: {
    APP_NAME: "Grace Business Services",
    DOMAIN: "https://www.gracebusinessservices.co.uk",
    DEFAULT_URL:
      "https://res.cloudinary.com/codesmart/image/upload/v1670025543/codesmart/defualt_uad7hy.png",
  },
  images: {
    unoptimized: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

module.exports = nextConfig;
