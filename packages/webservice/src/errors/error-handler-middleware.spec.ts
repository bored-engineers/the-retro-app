import errorHandlerMiddleware from './error-handler-middleware';
import { BoardNotFoundError } from './board-errors';

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
    expect(mockedResponse.send).toHaveBeenCalledWith({code: 404, message: 'Requested board not found'});
  });
});
