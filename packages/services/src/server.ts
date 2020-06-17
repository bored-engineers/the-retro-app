import express from 'express';
import bodyParser from 'body-parser';

import { mainRouter } from './routes';

const server = express();

server.use(bodyParser.json());

server.use('/api', mainRouter);

export default server;
