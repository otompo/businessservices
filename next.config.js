/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  // env: {
  //   API: "https://backendapi.gracebusinessservices.co.uk",
  //   API: "http://localhost:8000/api",
  //   NEXT_PUBLIC_API: "https://backendapi.gracebusinessservices.co.uk",
  // },
  publicRuntimeConfig: {
    APP_NAME: "Grace Business Services",
    DOMAIN: "https://www.gracebusinessservices.co.uk",
    DEFAULT_URL:
      "https://res.cloudinary.com/codesmart/image/upload/v1682680587/gracebusiness/default_vzw1ow.png",
  },
  images: {
    unoptimized: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

module.exports = nextConfig;
