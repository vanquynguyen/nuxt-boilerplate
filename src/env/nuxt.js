import {
    cleanEnv, str, url, host, port,
} from 'envalid';

const env = cleanEnv(process.env, {
    APP_ENV: str({
        devDefault: 'local',
        desc: 'Application env',
    }),

    APP_URL: url({
        desc: 'App url',
    }),

    HOST: host({
        default: '0.0.0.0',
        desc: 'Application host',
    }),

    PORT: port({
        default: 3000,
        desc: 'Application port',
    }),

    ANALYTICS_TRACK_ID: str({
        desc: 'Google tracking ID for Analytics',
        devDefault: 'UA-00000000-0',
    }),

    SENTRY_DSN: str({
        desc: 'Sentry DSN key',
        default: '',
    }),
}, {
    strict: true,
});

export const {
    APP_ENV,
    APP_URL,
    HOST,
    PORT,
    ANALYTICS_TRACK_ID,
    SENTRY_DSN,
    isDev,
    isProduction,
} = env;
