const { expect } = require('chai');
const supertest = require('supertest');

const app = require('../app');

describe('GET /apps', () => {
  it('should return an array of games', async () => {
    const res = await supertest(app)
      .get('/apps')
      .expect(200)
      .expect('Content-Type', /json/)

    expect(res.body).to.be.an('array');

    for (let app of res.body) {
      expect(app).to.be.an('object');
      expect(app).to.include.all.keys('App', 'Category', 'Rating', 'Reviews', 'Size', 'Installs', 'Type', 'Price', 'Content Rating', 'Genres', 'Last Updated', 'Current Ver', 'Android Ver');
    };
  });

  it('sort should succeed on valid query', async () => {
    const validSort = ['Rating', 'App'];

    for (let sort of validSort) {
      const res = await supertest(app)
        .get('/apps')
        .query({ sort })
        .expect(200);

      expect(res.body).to.be.an('array');

      let sorted = true;
      if (sort === 'Rating') {
        for (let i = 1; i < res.body.length; i++) {
          sorted = sorted && res.body[i - 1][sort] >= res.body[i][sort];
        }
      }
      else {
        for (let i = 1; i < res.body.length; i++) {
          sorted = sorted && res.body[i - 1][sort] < res.body[i][sort];
        }
      }
      expect(sorted).to.be.true;
    }
  });

  it('should fail on incorrect sort', () => {
    return supertest(app)
      .get('/apps')
      .query({ sort: 'cat' })
      .expect(400);
  });


  it('genre should be one of "Action", "Puzzle", "Strategy", "Casual", "Arcade", "Card"', async () => {
    const validGenres = ['Action', 'Puzzle', 'Strategy', 'Casual', 'Arcade', 'Card'];

    for (let genre of validGenres) {
      const res = await supertest(app)
        .get('/apps')
        .query({ genre })
        .expect(200);

      expect(res.body).to.be.an('array');

      for (let app of res.body) {
        expect(app['Genres']).to.include(genre);
      }
    }
  });

  it('should fail on incorrect genre', () => {
    return supertest(app)
      .get('/apps')
      .query({ genre: 'bat' })
      .expect(400);
  });

});