import { Router } from 'express';
import boardRouter from './board-route';
import auxRoutes from './aux-routes';

const mainRouter = Router();

mainRouter.use(auxRoutes);
mainRouter.use('/boards', boardRouter);

export default mainRouter;
