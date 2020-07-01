import { v4 as uuid } from 'uuid';
import Board from '../models/board';

export default class BoardService {
    boardDao: Board;
    constructor () {
      this.boardDao = new Board();
    }

    async createBoard () {
      const boardId = uuid();
      return await this.boardDao.createBoard(boardId);
    }

    async getBoard (boardId: string) {
      return await this.boardDao.getBoard(boardId);
    }
}
