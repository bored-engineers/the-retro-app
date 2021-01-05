import { Request, Response, NextFunction } from 'express';
import { BoardNotFoundError, BoardJoinError } from './board-errors';

class ErrorResponse {
  status: number;
  message: string;
  constructor(status: number, message: string) {
    this.status = status;
    this.message = message;
  }
}

const getErrorResponse = (error) => {
  switch (error.name) {
    case BoardNotFoundError.name: return new ErrorResponse(404, error.message || 'Requested board not found');
    case BoardJoinError.name: return new ErrorResponse(400, error.message || 'Requested board can not be joined');
    default: return new ErrorResponse(500, 'Something weird happen, try after sometime');
  }
};

export default (error: Error, _req: Request, res: Response, _next: NextFunction) => {
  const errorResponse: ErrorResponse = getErrorResponse(error);

  res.status(errorResponse.status).send({ message: errorResponse.message, code: errorResponse.status });
};
