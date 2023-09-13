/** @type {import('next').NextConfig} */

const buidTime = Date.now();
const nextConfig = {
  env: {
    buildTime: buidTime,
  },
};

module.exports = nextConfig;
