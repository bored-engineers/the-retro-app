import { Router, Request, Response, NextFunction } from 'express';
import { BoardService } from '../services';

const boardRouter = Router();
const boardService = new BoardService();

boardRouter.get('/:boardId', async (req: Request, res: Response, next: NextFunction) => {
  try {
    res.send(await boardService.getBoard(req.params.boardId));
  } catch (e) {
    next(e);
  }
});

boardRouter.post('/', async (_req: Request, res: Response, next: NextFunction) => {
  try {
    res.send(await boardService.createBoard());
  } catch (e) {
    next(e);
  }
});

export default boardRouter;
