import { Router, Request, Response } from 'express';

const mainRouter = Router();

mainRouter.use('/', (req: Request, res: Response) => {
  res.send('ok');
});

export { mainRouter };
