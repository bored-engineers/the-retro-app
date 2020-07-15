import { v4 as uuid } from 'uuid';
import Board from '../models/board';

export default class BoardService {
  board: Board;
  constructor() {
    this.board = new Board();
  }

  async createBoard() {
    const boardId = uuid();
    return await this.board.createBoard(boardId);
  }

  async getBoard(boardId: string) {
    return await this.board.getBoard(boardId);
  }

  async updateSafetyScore(boardId: string, newScore: number) {
    return await this.board.updateSafetyScore(boardId, newScore);
  }

  async getSafetyScores(boardId: string) {
    return await this.board.getSafetyScores(boardId);
  }
}
