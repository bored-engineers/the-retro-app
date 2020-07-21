import { v4 as uuid } from 'uuid';
import Board from '../models/board';

export default class BoardService {
  board: Board;
  constructor() {
    this.board = new Board();
  }

  async createBoard() {
    const boardId = uuid();
    return this.board.createBoard(boardId);
  }

  async getBoard(boardId: string) {
    return this.board.getBoard(boardId);
  }

  async updateSafetyScore(boardId: string, newScore: number) {
    return this.board.updateSafetyScore(boardId, newScore);
  }

  async getSafetyScores(boardId: string) {
    return this.board.getSafetyScores(boardId);
  }
}
