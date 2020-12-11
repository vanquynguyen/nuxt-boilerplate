import consola from 'consola';
import chokidar from 'chokidar';
import _last from 'lodash/last';
import _debounce from 'lodash/debounce';
import { nuxt, devBuild } from './nuxt';
import { HOST, PORT } from '../nuxt/env';

function invalidateRequireCache() {
    Object.keys(require.cache).forEach((id) => {
        if (id.startsWith(__dirname)) {
            delete require.cache[id];
        }
    });
}

function setServerMiddleware(nuxtInstance) {
    const app = require('./app').default;

    nuxtInstance.options.serverMiddleware = [app];

    return app;
}

setServerMiddleware(nuxt);

devBuild().then(async () => {
    if (process.env.NODE_DEBUG) {
        require('inspector').open(9229, HOST);
    }

    consola.info('Server starting');

    await nuxt.listen();

    consola.success(`Server listening on ${HOST}:${PORT}`);

    const listener = _last(nuxt.server.listeners);

    chokidar.watch('server/**/*.js', {
        ignored: [
            'server/nuxt.js',
            'server/dev.js',
            'server/index.js',
        ],
    }).on('change', _debounce(async () => {
        try {
            consola.log('');
            consola.info('Server files changed. Restarting...');

            // Shut down
            await listener.close();

            invalidateRequireCache();

            // Emptying connect's middleware stack and reload
            setServerMiddleware(nuxt);
            nuxt.renderer.app.stack = [];
            await nuxt.server.setupMiddleware();

            await listener.listen();

            consola.success('Updated');
        } catch (error) {
            consola.error(error);
        }
    }, 250));
});
