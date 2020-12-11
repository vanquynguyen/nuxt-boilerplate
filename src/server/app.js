import csrf from 'csurf';
import express from 'express';
import cookie from 'cookie-parser';
import bodyParser from 'body-parser';
import router from './routes';
import session from './libs/session';

const app = express();

app.disable('x-powered-by');

app.use(session);
app.use(cookie());
app.use(bodyParser.json());
app.use(csrf({ cookie: true }));

app.use(router);

export default app;
