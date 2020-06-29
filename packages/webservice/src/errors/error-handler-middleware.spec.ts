import errorHandlerMiddleware from './error-handler-middleware';
import { BoardNotFoundError } from './board-errors';

describe('Error handler middleware', () => {
    let mockedRequest;
    let mockedResponse;
    const setUpMockedResponse = () => {
		let resStatus = jest.fn();
		let resSend= jest.fn();
		mockedResponse = {
				send: resSend,
				status: resStatus,
		};
		resStatus.mockImplementation(() => mockedResponse);
        resSend.mockImplementation(() => mockedResponse);
        return mockedResponse;
    }
    beforeEach(() => {
        mockedRequest = jest.fn();
        mockedResponse = setUpMockedResponse();
    });

    it('should return board not found response for board not found error', () => {
        errorHandlerMiddleware(new BoardNotFoundError('dummy-id'), mockedRequest, mockedResponse);
        expect(mockedResponse.status).toHaveBeenCalledWith(404);
        expect(mockedResponse.send).toHaveBeenCalledWith('Requested board not found');
    });
});