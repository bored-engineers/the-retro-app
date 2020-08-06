import errorHandlerMiddleware from './error-handler-middleware';
import { BoardNotFoundError, BoardJoinError } from './board-errors';

describe('Error handler middleware', () => {
  let mockedRequest;
  let mockedResponse;
  let mockedNext;
  const setUpMockedResponse = () => {
    const resStatus = jest.fn();
    const resSend = jest.fn();
    mockedResponse = {
      send: resSend,
      status: resStatus
    };
    resStatus.mockImplementation(() => mockedResponse);
    resSend.mockImplementation(() => mockedResponse);
    return mockedResponse;
  };
  beforeEach(() => {
    mockedRequest = jest.fn();
    mockedResponse = setUpMockedResponse();
    mockedNext = jest.fn();
  });

  it('should return board not found response for board not found error', () => {
    errorHandlerMiddleware(new BoardNotFoundError('dummy-id'), mockedRequest, mockedResponse, mockedNext);
    expect(mockedResponse.status).toHaveBeenCalledWith(404);
    expect(mockedResponse.send).toHaveBeenCalledWith({ code: 404, message: 'Board not found for id:dummy-id' });
  });

  it('should return board joining error response for board not found error', () => {
    errorHandlerMiddleware(new BoardJoinError('dummy-id', 'dummy-user'), mockedRequest, mockedResponse, mockedNext);
    expect(mockedResponse.status).toHaveBeenCalledWith(400);
    expect(mockedResponse.send).toHaveBeenCalledWith({ code: 400, message: 'Error in joining board, invalid boardid:dummy-id or userid:dummy-user' });
  });
});
