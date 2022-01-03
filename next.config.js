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
            '/profile': {
                page: '/profile',
                query: {
                    id: 'id'
                }
            },
            '/detail': {
                page: '/detail',
                query: {
                    chatId: 'chatId',
                    senderId: 'senderId',
                    receipentId: 'receipentId',
                    displayName: 'displayName',
                    photoUrl: 'photoUrl',
                }
            },

        }
    },
}