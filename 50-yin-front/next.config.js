/** @type {import('next').NextConfig} */

const rewrites = async () => {
  const host = 'http://localhost:8000'
  return {
    beforeFiles: [
      {
        source: '/api/:path*',
        destination: `${host}/:path*`,
        basePath: false,
      },
    ],
  }
}

const nextConfig = {
  rewrites,
}

module.exports = nextConfig
