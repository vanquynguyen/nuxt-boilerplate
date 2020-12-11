import path from 'path';
import { ProvidePlugin } from 'webpack';

import favicon from './nuxt/favicon';
import fonts from './nuxt/fonts';

const head = require('./nuxt/head');

import {
    APP_ENV,
    HOST,
    PORT,
    APP_URL,
    ANALYTICS_TRACK_ID,
    SENTRY_DSN,
    isProduction,
} from './nuxt/env';

export default {
    dev: !isProduction,

    ssr: false,

    srcDir: path.resolve(__dirname, 'app'),

    loading: '~/components/Loading.vue',

    loadingIndicator: {
        name: 'folding-cube',
        color: '#3E6F8D',
    },

    head: {
        link: [...fonts.link, ...favicon.link],
        meta: [...head.meta],
        script: [...head.script],
    },

    build: {
        extractCSS: isProduction,

        uglify: {
            cache: path.resolve(__dirname, '.build-cache/webpack-uglify'),
            sourceMap: true,
        },

        plugins: [
            new ProvidePlugin({
                io: 'socket.io-client',
            }),
        ],
    },

    env: {
        APP_URL,
        ANALYTICS_TRACK_ID,
    },

    css: [
        '~/assets/styles/index.scss',
    ],

    server: {
        host: HOST,
        port: PORT,
    },

    render: {
        http2: {
            push: true,
        },
    },

    plugins: [
        '~/plugins/element-ui',
        '~/plugins/i18n.js',
    ],

    buildModules: [
        '@nuxtjs/style-resources',
        '@nuxtjs/google-analytics',
        '@nuxtjs/robots',
        '@nuxtjs/sentry',
    ],

    // Modules options
    styleResources: {
        scss: [
          '~/assets/styles/_variable.scss',
        ],
    },

    googleAnalytics: {
        id: ANALYTICS_TRACK_ID,
    },

    sentry: {
        dsn: SENTRY_DSN,
        config: {
            environment: APP_ENV,
        },
    },

    robots: [
        {
            UserAgent: '*',
            Disallow: APP_ENV === 'production' ? [
                '/*.json',
                '/*.xml',
            ] : '/',
        },
    ],
};
