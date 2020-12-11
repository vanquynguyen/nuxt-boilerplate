import { makeValidator, EnvError } from 'envalid';

export const base64str = makeValidator((input) => {
    if (typeof input !== 'string' || input.length === 0) {
        throw new EnvError(`"${input}" is not a string`);
    }

    try {
        return Buffer.from(input, 'base64').toString('utf8');
    } catch (e) {
        throw new EnvError(`String was not correctly encoded: "${input}"`);
    }
});
