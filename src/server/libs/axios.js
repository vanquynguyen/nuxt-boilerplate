import axios from 'axios';
import { API_HOST } from '../../env/server';

export default axios.create({
    baseURL: API_HOST,
    headers: {
        'content-type': 'application/json',
    },
});
