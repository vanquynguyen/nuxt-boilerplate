import express from 'express';

const router = express.Router();

router.get('/ping', (req, res, next) => {
    if (req.connection.localAddress === req.connection.remoteAddress) {
        res.status(200).send('pong');
    } else {
        next();
    }
});

export default router;
