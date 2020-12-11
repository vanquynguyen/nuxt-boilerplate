import fs from 'fs';
import dotenv from 'dotenv';
import _map from 'lodash/map';
import _assign from 'lodash/assign';
import _isArray from 'lodash/isArray';

const readFile = file => (fs.existsSync(file)
    ? dotenv.parse(fs.readFileSync(file))
    : {});

/**
 * @param   {Array|string} envfile
 * @returns {object}
 */
export function readEnv(envfile) {
    const dotenvEnv = _isArray(envfile)
        ? _map(envfile, readFile)
        : [readFile(envfile)];

    return _assign({}, ...dotenvEnv, process.env);
}
