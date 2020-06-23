import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import MongoDB from './db';
import mainRouter from './routes';

const server = express();
MongoDB();

server.use(bodyParser.json());
server.use(express.static(path.join(__dirname, 'public')));
server.use('/api', mainRouter);

export default server;
