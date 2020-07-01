import express from 'express';

jest.mock('express', () => {
  const mockedExpress = jest.fn(() => ({ use: jest.fn(), Router: () => jest.fn() }));
  Object.defineProperty(mockedExpress, 'static', { value: jest.fn() });
  return mockedExpress;
});
jest.mock('./routes', () => ({ mainRouter: jest.fn() }));
jest.mock('./db');

describe.skip('Server', () => {
  it('should instantiate express application', () => {
    expect(express).toHaveBeenCalled();
  });
});
