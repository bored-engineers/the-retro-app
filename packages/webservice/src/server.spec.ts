import server from './server';
import express from 'express';

import supertest from 'supertest';

jest.mock('express', () => jest.fn(() => ({ use: jest.fn(), Router: () => jest.fn() })));
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
