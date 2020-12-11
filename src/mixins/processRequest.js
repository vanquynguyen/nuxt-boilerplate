/**
 * @param {Promise} promise
 */
async function processPromise(promise) {
    this.state.processing = true;

    try {
        return await promise;
    } catch (error) {
        throw error;
    } finally {
        this.state.processing = false;
    }
}

function processRequest(request) {
    const callPromise = processPromise.bind(this);

    if (typeof request === 'function') {
        return (...args) => {
            const promise = request.call(this, ...args);
            return callPromise(promise);
        };
    }

    if (typeof request.then !== 'function') {
        throw new Error('Invalid request argument');
    }

    return callPromise(request);
}

export const mixin = {
    data: () => ({
        state: {
            processing: false,
        },
    }),

    methods: {
        processRequest,
    },
};

export default mixin;
