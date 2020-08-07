import MongoDB from '../db';
import { Collection, Db } from 'mongodb';
import { BoardNotFoundError } from '../errors/board-errors';

type BoardType = {
  boardId: string;
  safetyScores: number[];
  createdAt: Date;
  modifiedAt: Date;
  users: string[];
}

export default class Board {
  private async getCollection(): Promise<Collection> {
    return (await MongoDB() as Db).collection('boards');
  }

  public async createBoard(boardId: string): Promise<BoardType & { _id: string }> {
    const createPayload: BoardType = {
      boardId, createdAt: new Date(), modifiedAt: new Date(), safetyScores: [], users: []
    };
    return await (await (await this.getCollection()).insertOne(createPayload)).ops[0];
  }

  public async joinBoard(boardId: string, userId: string): Promise<{ boardId: string, userId: string }> {
    const board = (await (await this.getCollection()).findOneAndUpdate({ boardId }, { $push: { users: userId } }, { returnOriginal: false })).value;
    if (!board) throw new BoardNotFoundError(boardId);
    return { boardId, userId };
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

  public async getSafetyScores(boardId: string): Promise<number[]> {
    const boardData = (await (await this.getCollection()).findOne({ boardId }));
    if (boardData) return boardData.safetyScores;
    else return [];
  }
}
