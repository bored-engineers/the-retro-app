import { v4 as uuid } from 'uuid';
import Board from '../models/board';

export default class BoardService {
  boardDao: Board;
  constructor() {
    this.boardDao = new Board();
  }

  async createBoard() {
    const boardId = uuid();
    return await this.boardDao.createBoard(boardId);
  }

  async getBoard(boardId: string) {
    return await this.boardDao.getBoard(boardId);
  }

  async updateSafetyScore(boardId: string, newScore: number) {
    return await this.boardDao.updateSafetyScore(boardId, newScore);
  }

  async getSafetyScores(boardId: string) {
    return await this.boardDao.getSafetyScores(boardId);
  }
}
