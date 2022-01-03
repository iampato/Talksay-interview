/** @type {import('next').NextConfig} */

const path = require('path');
module.exports = {
    basePath: '', // see: https://nextjs.org/docs/api-reference/next.config.js/basepath
    reactStrictMode: false,
    images: {
        domains: ['picsum.photos'],
    },
    cssModule: true,
    exportPathMap: async function(
        defaultPathMap, { dev, dir, outDir, distDir, buildId }
    ) {
        return {
            '/': { page: '/' },
            '/login': { page: '/login' },
            '/home': { page: '/home' },
            '/detail': { page: '/detail' },
            '/profile': {
                page: '/profile',
                query: {
                    id: 'id'
                }
            },
        }
    },
}