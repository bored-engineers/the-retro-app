import Board from './board';
import MongoDB from '../db';

jest.mock('../db');
describe('Board Model', () => {
  const board = new Board();
  let insertOneMock;
  let findOneMock;
  const sampleDate = new Date(1466424490000);

  const sampleBoard = { _id: 'id from mongo', boardId: 'sample-board-id', createdAt: sampleDate, modifiedAt: sampleDate };

  beforeEach(() => {
    jest.spyOn(global, 'Date').mockImplementation(() => sampleDate as unknown as string);
    insertOneMock = jest.fn().mockReturnValue({ ops: [sampleBoard] });
    findOneMock = jest.fn().mockReturnValue(sampleBoard);
    (MongoDB as jest.Mock).mockImplementation(() => ({ collection: () => ({ insertOne: insertOneMock, findOne: findOneMock }) }));
  });

  it('should read a board', async () => {
    const boardId = 'sample-board-id';
    const readResult = await board.getBoard(boardId);
    const expectedResult = { ...sampleBoard };
    expect(readResult).toEqual(expectedResult);
    expect(findOneMock).toHaveBeenCalledWith({ boardId });
  });

  it('should create a new board', async () => {
    const boardId = 'sample-board-id';
    const createResult = await board.createBoard(boardId);
    const expectedResult = { ...sampleBoard };
    expect(createResult).toEqual(expectedResult);
    expect(insertOneMock).toHaveBeenCalledWith({ boardId, createdAt: sampleDate, modifiedAt: sampleDate, safetyScores: []  });
  });
});
