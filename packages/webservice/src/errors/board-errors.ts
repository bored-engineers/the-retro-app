export class BoardNotFoundError extends Error {
    name: string;
    message: string;
    constructor (id: string) {
      super();
      this.name = 'BoardNotFoundError';
      this.message = `Board not found for id:${id}`;
    }
}
