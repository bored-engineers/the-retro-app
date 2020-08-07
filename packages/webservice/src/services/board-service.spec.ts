import Board from '../models/board';
import { v4 as uuid } from 'uuid';
import BoardService from './board-service';

jest.mock('../models/board');
jest.mock('uuid');

describe('Board Service', () => {
  const sampleBoard = {
    boardId: 'some board id',
    safetyScores: [2, 3, 1, 4],
    createdAt: Date.now(),
    modifiedAt: Date.now(),
    users: []
  };
  let boardMock;
  let boardService;
  let getSafetyScoresMock;
  let createBoardMock;
  let getBoardMock;
  let updateSafetyScoreMock;
  let joinBoardMock;

  beforeAll(() => {
    joinBoardMock = jest.fn();
    getSafetyScoresMock = jest.fn();
    createBoardMock = jest.fn();
    getBoardMock = jest.fn();
    updateSafetyScoreMock = jest.fn();
    boardMock = {
      createBoard: createBoardMock,
      getBoard: getBoardMock,
      updateSafetyScore: updateSafetyScoreMock,
      getSafetyScores: getSafetyScoresMock,
      joinBoard: joinBoardMock
    };
    (Board as jest.Mock).mockImplementation(() => boardMock);
    boardService = new BoardService();
    expect(Board).toHaveBeenCalled();
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('create', () => {
    const sampleUuid = 'sample uuid';

    beforeEach(() => {
      (uuid as jest.Mock).mockReturnValue(sampleUuid);
      boardMock.createBoard.mockResolvedValue(sampleBoard);
    });

    it('should create board', async () => {
      const result = await boardService.createBoard();

      expect(createBoardMock).toHaveBeenCalledWith(sampleUuid);
      expect(result).toEqual(sampleBoard);
    });
  });

  describe('get Board', () => {
    beforeEach(() => {
      getBoardMock.mockResolvedValue(sampleBoard);
    });

    it('should get Board for the corresponding board Id', async () => {
      const boardId = 'sample board id';

      const result = await boardService.getBoard(boardId);

      expect(result).toEqual(sampleBoard);
      expect(getBoardMock).toHaveBeenCalledWith(boardId);
    });
  });

  describe('update Safety Score', () => {
    beforeEach(() => {
      updateSafetyScoreMock.mockResolvedValue(sampleBoard);
    });

    it('should update safety score of a card', async () => {
      const boardId = 'sample board id';
      const newSafetyScore = 3;

      const result = await boardService.updateSafetyScore(boardId, newSafetyScore);

      expect(result).toEqual(sampleBoard);
      expect(updateSafetyScoreMock).toHaveBeenCalledWith(boardId, newSafetyScore);
    });
  });

  describe('get Safety Score', () => {
    beforeEach(() => {
      getSafetyScoresMock.mockResolvedValue(sampleBoard);
    });

    it('should update safety score of a card', async () => {
      const boardId = 'sample board id';

      const result = await boardService.getSafetyScores(boardId);

      expect(result).toEqual(sampleBoard);
      expect(getSafetyScoresMock).toHaveBeenCalledWith(boardId);
    });
  });

  describe('join Board', () => {
    const boardId = 'dummy-boardId';
    const userId = 'dummy-userID';

    const boardResult = { boardId: boardId, userId: userId };

    beforeEach(() => {
      joinBoardMock.mockResolvedValue(boardResult);
    });

    it('should join a new user to the board', async () => {
      const result = await boardService.joinBoard(boardId, userId);

      expect(result).toEqual(boardResult);
      expect(joinBoardMock).toHaveBeenCalledWith(boardId, userId);
    });
  });
});
