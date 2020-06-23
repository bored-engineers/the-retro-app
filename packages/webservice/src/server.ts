import express from 'express';
import bodyParser from 'body-parser';

import MongoDB from './db';
import mainRouter from './routes';

const server = express();
MongoDB();

server.use(bodyParser.json());

server.use('/api', mainRouter);

export default server;
