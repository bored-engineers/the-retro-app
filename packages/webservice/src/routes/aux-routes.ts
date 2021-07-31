import { NextFunction, Request, Response, Router } from 'express';
import { version } from '../../package.json';

const auxRoutes = Router();

auxRoutes.get('/version', (request: Request, response: Response, next: NextFunction) => {
  try {
    response.status(200).send({ version });
  } catch (e) {
    next(e);
  }
});

auxRoutes.get('/health', (request: Request, response: Response, next: NextFunction) => {
  try {
    response.status(200).send({ status: 'up' });
  } catch (e) {
    next(e);
  }
});

export default auxRoutes;
