import { Request, Response } from 'express';
import { BoardNotFoundError } from './board-errors';

class ErrorResponse {
    status: number;
    message: string;
    constructor (status: number, message: string) {
      this.status = status;
      this.message = message;
    }
}

const errorHandlingMap = new Map()
  .set(BoardNotFoundError.name, new ErrorResponse(404, 'Requested board not found'));

export default (error: Error, _req: Request, res: Response) => {
  const errorResponse: ErrorResponse = errorHandlingMap.get(error.name);

  res.status(errorResponse.status).send(errorResponse.message);
};
