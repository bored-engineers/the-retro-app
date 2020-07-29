import { Router, Request, Response, NextFunction } from 'express';
import { BoardService, CardService } from '../services';

const boardRouter = Router();
const boardService = new BoardService();
const cardService = new CardService();

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

boardRouter.post('/join/:boardId', async (_req: Request, res: Response, next: NextFunction) => {
  try {
    res.send(await boardService.joinBoard(_req.params.boardId));
  } catch (e) {
    next(e);
  }
});

boardRouter.get('/:boardId/export', async (req: Request, res: Response, next: NextFunction) => {
  try {
    res.send(await cardService.listCard(req.params.boardId));
  } catch (e) {
    next(e);
  }
});

export default boardRouter;
