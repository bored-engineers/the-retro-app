import { Router, Request, Response, NextFunction } from 'express';
import { BoardService, CardService } from '../services';
import { BoardJoinError } from '../errors/board-errors';

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

boardRouter.post('/join/:boardId', async (req: Request, res: Response, next: NextFunction) => {
  const boardId = req.params.boardId;
  const userId = req.query.userid as string;

  try {
    if (!boardId || !userId) throw new BoardJoinError(boardId, userId);
    res.send(await boardService.joinBoard(boardId, userId));
  } catch (e) {
    next(e);
  }
});

boardRouter.get('/:boardId/export', async (req: Request, res: Response, next: NextFunction) => {
  try {
    res.send({
      boardId: req.params.boardId,
      cards: (await cardService.listCard(req.params.boardId)).map(card => ({ ...card, votes: card.votes.length }))
    });
  } catch (e) {
    next(e);
  }
});

export default boardRouter;
