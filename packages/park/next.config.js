// @ts-check
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

/**
 * @type {import('next').NextConfig}
 */
const config = {
  env: {
    GRPC_WEB_URL: process.env.GRPC_WEB_URL,
    EXPLORER_URL: process.env.EXPLORER_URL,
  },
}

module.exports = withBundleAnalyzer(config)
