import Board from './board';
import MongoDB from '../db';
import { v4 as uuid } from 'uuid';
import { BoardNotFoundError } from '../errors/board-errors';

jest.mock('../db');
jest.mock('uuid');

describe('Board Model', () => {
  const board = new Board();
  const sampleUUID = 'sample-uuid';
  let insertOneMock;
  let findOneMock;
  let findOneAndUpdateMock;
  const sampleDate = new Date(1466424490000);

  const sampleBoard = { _id: 'id from mongo', boardId: 'sample-board-id', createdAt: sampleDate, modifiedAt: sampleDate };

  beforeEach(() => {
    jest.spyOn(global, 'Date').mockImplementation(() => sampleDate as unknown as string);
    insertOneMock = jest.fn().mockResolvedValue({ ops: [sampleBoard] });
    findOneMock = jest.fn().mockResolvedValue(sampleBoard);
    findOneAndUpdateMock = jest.fn().mockResolvedValue({value: sampleBoard});
    (uuid as jest.Mock).mockReturnValue(sampleUUID);
    (MongoDB as jest.Mock).mockImplementation(() => ({ collection: () => ({ findOneAndUpdate: findOneAndUpdateMock, insertOne: insertOneMock, findOne: findOneMock }) }));
  });

  it('should read a board', async () => {
    const boardId = 'sample-board-id';
    const expectedResult = { ...sampleBoard };

    const readResult = await board.getBoard(boardId);

    expect(readResult).toEqual(expectedResult);
    expect(findOneMock).toHaveBeenCalledWith({ boardId });
  });

  describe('join board', () => {
    it('should join a board', async () => {
      const boardId = 'smaple-board-id';

      const result = await board.joinBoard(boardId);

      expect(result.boardId).toEqual(boardId);
      expect(result.userId).toEqual(sampleUUID);
      expect(findOneAndUpdateMock).toHaveBeenCalledWith({ boardId }, { $push: { users: sampleUUID } }, { returnOriginal: false });
    });

    it('should throw error when board does not exist', async () => {
      findOneAndUpdateMock.mockResolvedValue({value: null});
      const boardId = 'smaple-board-id';

      const errorPromise = board.joinBoard(boardId);

      await expect(errorPromise).rejects.toThrow(BoardNotFoundError);
      const error = await errorPromise.catch(err => err);
      expect(error.message).toEqual(`Board not found for id:${boardId}`);
      expect(findOneAndUpdateMock).toHaveBeenCalledWith({ boardId }, { $push: { users: sampleUUID } }, { returnOriginal: false });
    });
  });

  it('should create a new board', async () => {
    const boardId = 'sample-board-id';
    const expectedResult = { ...sampleBoard };

    const createResult = await board.createBoard(boardId);

    expect(createResult).toEqual(expectedResult);
    expect(insertOneMock).toHaveBeenCalledWith({ boardId, createdAt: sampleDate, modifiedAt: sampleDate, safetyScores: [], users: [] });
  });
});
