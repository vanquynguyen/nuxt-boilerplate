import _find from 'lodash/find';

export const state = () => ({
    locales: [
        { value: 'vi', label: 'VI' },
        { value: 'en', label: 'EN' },
        { value: 'jp', label: 'JP' },
    ],
    locale: 'vi',
});

export const mutations = {
    set(state, locale) {
        const check = _find(state.locales, { value: locale });
        if (check) {
            state.locale = locale;
        }
    },
};
