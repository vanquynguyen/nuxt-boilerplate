import consola from 'consola';
import { nuxt } from './nuxt';
import expressApp from './app';
import { HOST, PORT } from '../nuxt/env';

nuxt.options.serverMiddleware = [expressApp];
nuxt.listen().then(() => {
    consola.success(`Listening on ${HOST}:${PORT}`);
});
