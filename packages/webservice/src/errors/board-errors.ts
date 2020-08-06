export class BoardNotFoundError extends Error {
  name: string;
  message: string;
  constructor(id: string) {
    super();
    this.name = 'BoardNotFoundError';
    this.message = `Board not found for id:${id}`;
  }
}

export class BoardJoinError extends Error {
  name: string;
  message: string;
  constructor(id: string, userId: string) {
    super();
    this.name = 'BoardJoinError';
    this.message = `Error in joining board, invalid boardid:${id} or userid:${userId}`;
  }
}
