import { Router, Request, Response } from 'express';
import { BoardService } from '../services';

const boardRouter = Router();
const boardService = new BoardService();

boardRouter.get('/:boardId', async (req: Request, res: Response) => {
    res.send(await boardService.getBoard(req.params.boardId));
});

boardRouter.post('/', async (_req: Request, res: Response) => {
    res.send(await boardService.createBoard());
});

export default boardRouter;
