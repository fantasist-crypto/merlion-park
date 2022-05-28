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
    BECH32_PREFIX: process.env.BECH32_PREFIX,
    MINIMAL_DENOM: process.env.MINIMAL_DENOM,
    DENOM: process.env.DENOM,
    DECIMALS: process.env.DECIMALS,
  },
}

module.exports = withBundleAnalyzer(config)
