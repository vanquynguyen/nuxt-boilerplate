import { Nuxt, Builder } from 'nuxt';
import nuxtConfig from '../nuxt.config';

export const nuxt = new Nuxt(nuxtConfig);

export function devBuild() {
    const builder = new Builder(nuxt);
    builder.unwatch = () => {};

    return builder.build();
}
