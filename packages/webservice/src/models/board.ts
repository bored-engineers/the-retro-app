import MongoDB from '../db';
import { Collection, Db } from 'mongodb';
import { BoardNotFoundError } from '../errors/board-errors';

type BoardType = {
  boardId: string;
  safetyScores: number[];
  createdAt: Date;
  modifiedAt: Date;
}

export default class Board {
  private async getCollection(): Promise<Collection> {
    return (await MongoDB() as Db).collection('boards');
  }

  public async createBoard(boardId: string): Promise<BoardType & { _id: string }> {
    const createPayload: BoardType = {
      boardId, createdAt: new Date(), modifiedAt: new Date(), safetyScores: []
    };
    return await (await (await this.getCollection()).insertOne(createPayload)).ops[0];
  }

  public async getBoard(boardId: string): Promise<BoardType & { _id: string }> {
    const board = (await (await this.getCollection()).findOne({ boardId }));
    if (!board) throw new BoardNotFoundError(boardId);
    return board;
  }

  public async updateSafetyScore(boardId: string, newScore: number): Promise<number[]> {
    const existingBoard = await this.getBoard(boardId);
    existingBoard.safetyScores.push(newScore);
    const updatedBoard = (await (await this.getCollection()).findOneAndUpdate({ boardId }, { $set: { ...existingBoard } }, { returnOriginal: false })).value;
    return updatedBoard.safetyScores;
  }
}
