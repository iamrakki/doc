/** @type {import('next').NextConfig} */
const nextConfig = {
    images:{
        domains: ['tecdn.b-cdn.net'],
    },
    eslint: {
        ignoreDuringBuilds: true,
    },
}

module.exports = nextConfig
