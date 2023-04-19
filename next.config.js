/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env: {
    DB_URI:
      "mongodb+srv://codesmart:otompo123@cluster0.sgflf.mongodb.net/codesmartdb?retryWrites=true&w=majority",
    CLIENT_URL: "http://localhost:3000",
    JWT_SECRET: "sfskftsfdssdsp3405059o53H530smdslf",
    JWT_COOKIE_EXPIRES_IN: "50",
    EMAIL_FROM: "codesmartwebsoft@gmail.com",
    NEXTAUTH_URL: "https://gracebusinessservices.co.uk",
    CLOUDINARY_NAME: "codesmart",
    CLOUDINARY_KEY: "924552959278257",
    CLOUDINARY_SECRET: "nyl74mynmNWo5U0rzF8LqzcCE8U",
    PERPAGE: 8,
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
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
};

module.exports = nextConfig;
