// @ts-check
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

/**
 * @type {import('next').NextConfig}
 */
const config = {
  reactStrictMode: true,
  env: {
    DENOM: process.env.DENOM,
    DECIMALS: process.env.DECIMALS,
    MINIMAL_DENOM: process.env.MINIMAL_DENOM,
    BECH32_PREFIX: process.env.BECH32_PREFIX,
    CHAIN_ID: process.env.CHAIN_ID,
    CHAIN_NAME: process.env.CHAIN_NAME,
    EXPLORER_URL: process.env.EXPLORER_URL,
    RPC_ENDPOINT: process.env.RPC_ENDPOINT,
    REST_ENDPOINT: process.env.REST_ENDPOINT,
    GRPC_ENDPOINT: process.env.GRPC_ENDPOINT,
  },
}

module.exports = withBundleAnalyzer(config)
