// @ts-check

/**
 * @type {import('next').NextConfig}
 */
const config = {
  env: {
    grpcWebUrl: process.env.GRPC_WEB,
  },
}

module.exports = config
