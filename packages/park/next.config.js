// @ts-check
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

/**
 * @type {import('next').NextConfig}
 */
const config = {
  env: {
    grpcWebUrl: process.env.GRPC_WEB,
  },
}

module.exports = withBundleAnalyzer(config)
