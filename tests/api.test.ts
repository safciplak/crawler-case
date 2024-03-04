jest.mock('../worker', () => ({
  crawlForSponsoredLinks: jest.fn()
    .mockResolvedValueOnce(['Mocked Link 1', 'Mocked Link 2'])
    .mockResolvedValueOnce(['Mocked Link 3', 'Mocked Link 4'])
    .mockResolvedValueOnce(['Mocked Link 5', 'Mocked Link 6'])
}));

import * as request from 'supertest';
import { app } from '../index';

describe('API Endpoints', () => {
  it('GET /api/v1/sponsored-links should respond with JSON', async () => {
    const response = await request(app)
      .get('/api/v1/sponsored-links?pages=1&keywords=test')
      .expect('Content-Type', /json/)
      .expect(200);

    expect(response.body).toEqual([
      'Mocked Link 1', 'Mocked Link 2',
      'Mocked Link 3', 'Mocked Link 4',
      'Mocked Link 5', 'Mocked Link 6'
    ]);
  }, 10000);
});
