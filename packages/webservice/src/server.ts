import express, { Request, Response, NextFunction } from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import MongoDB from './db';
import mainRouter from './routes';
import errorHandlerMiddleware from './errors/error-handler-middleware';

const server = express();

MongoDB();

server.use(bodyParser.json());
server.use(express.static(path.join(__dirname, 'public')));
server.use('/api', mainRouter);

server.use(errorHandlerMiddleware);


export default server;
