import {
    cleanEnv, str, host, port, url, bool,
} from 'envalid';
import { base64str } from './validators';
import { readEnv } from './utils';

const env = readEnv('.env');

const validEnv = cleanEnv(env, {
    APP_KEY: base64str({
        desc: 'Encryption key',
    }),

    APP_DEBUG: bool({
        desc: 'Attach node debugger',
        default: false,
    }),

    API_HOST: url({
        desc: 'API host for server requests',
    }),

    REDIS_HOST: host({
        default: '127.0.0.1',
        desc: 'Redis host',
    }),

    REDIS_PORT: port({
        default: 6379,
        desc: 'Redis port',
    }),

    REDIS_PASSWORD: str({
        default: '',
        desc: 'Redis password',
    }),
}, {
    strict: true,
    dotEnvPath: null,
});

export const {
    APP_KEY,
    APP_DEBUG,
    API_HOST,
    REDIS_HOST,
    REDIS_PORT,
    REDIS_PASSWORD,
} = validEnv;
