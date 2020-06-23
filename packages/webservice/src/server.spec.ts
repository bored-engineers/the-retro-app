import server from './server';
import express from 'express';

import supertest from 'supertest';

jest.mock('express', () => {
  const mockedExpress = jest.fn(() => ({ use: jest.fn(), Router: () => jest.fn() }));
  Object.defineProperty(mockedExpress, "static", { value: jest.fn() });
  return mockedExpress;
});
jest.mock('./routes', () => ({ mainRouter: jest.fn() }));
jest.mock('./db');
describe('Server', () => {
  let request;
  beforeAll(() => {
    request = supertest(server);
  });

  it('should instantiate express application', () => {
    expect(express).toHaveBeenCalled();
  });
});
