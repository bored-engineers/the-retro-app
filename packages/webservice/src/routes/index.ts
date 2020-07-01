import { Router } from 'express';
import boardRouter from './board-route';

const mainRouter = Router();

mainRouter.use('/boards', boardRouter);

export default mainRouter;
