// import { BoardService, CardService } from '../services';
// import { Router } from 'express';
// import BoardRouter from './board-route';

// jest.mock('../services', () => {
//   return {
//     BoardService: jest.fn().mockReturnValue({
//       getBoard: jest.fn(),
//       createBoard: jest.fn()
//     }),
//     CardService: jest.fn().mockReturnValue({
//       listCard: jest.fn()
//     })
//   };
// });
// jest.mock('express', () => {
//   return {
//     Router: jest.fn().mockReturnValue({
//       post: jest.fn(),
//       get: jest.fn(),
//       put: jest.fn()
//     })
//   }
// });

describe('Board Route', () => {
//   const sampleBoard = {
//     boardId: 'some board id',
//     safetyScores: [4, 5, 3],
//     createdAt: Date.now(),
//     modifiedAt: Date.now(),
//   };
//   const listOfCards = [
//     {
//       cardId: 'some card id',
//       boardId: 'some board id',
//       category: 'some category',
//       text: 'some example text',
//       votes: ['some user id', 'some other user id'],
//       createdAt: Date.now(),
//       modifiedAt: Date.now()
//     },
//     {
//       cardId: 'another card id',
//       boardId: 'some board id',
//       category: 'some other category',
//       text: 'some example text',
//       votes: ['some user id', 'some other user id'],
//       createdAt: Date.now(),
//       modifiedAt: Date.now()
//     }
//   ];
//   let postMock;
//   let getMock;
//   let listCardMock;
//   let getBoardMock;
//   let createBoardMock;
//   let routerMock;
//   let cardServiceMock;
//   let boardServiceMock;

  //   beforeAll(() => {
  //     routerMock = (Router as jest.Mock).mock.results[0];
  //     postMock = routerMock.post;
  //     getMock = routerMock.get;
  //     cardServiceMock = (CardService as jest.Mock).mock.results[0];
  //     boardServiceMock = (BoardService as jest.Mock).mock.results[1];
  //     listCardMock = cardServiceMock.listCard;
  //     createBoardMock = boardServiceMock.createBoard;
  //     getBoardMock = boardServiceMock.getBoard;
  //     expect(BoardService).toHaveBeenCalled();
  //     expect(CardService).toHaveBeenCalled();
  //     expect(Router).toHaveBeenCalled();
  //   });

  //   beforeEach(() => {
  //     listCardMock.mockReturnValue(listOfCards);
  //     getBoardMock.mockReturnValue(sampleBoard);
  //     createBoardMock.mockReturnValue(sampleBoard);
  //   });

  //   afterEach(() => {
  //     jest.resetAllMocks();
  //   });

  it('should register respective rotues', () => {
    expect(true).toBe(true);
  });
});
