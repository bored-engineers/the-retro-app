import server from './server';
import supertest from 'supertest';

const request = supertest(server);

describe('Server', () => {
  it('should get ok for /api', async () => {
    const actualResponse = await request.get('/api');
    const expectedResponse = { status: 200, text: 'ok' };

    expect(expectedResponse.status).toEqual(actualResponse.status);
    expect(expectedResponse.text).toEqual(actualResponse.text);
  });
});
