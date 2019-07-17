const { expect } = require('chai');
const supertest = require('supertest');

const app = require('../app');

describe('GET /apps', () => {
  it('should return an array of games', () => {
    return supertest(app)
      .get('/apps')
      .expect(200)
      .expect('Content-Type', /json/)
      .then(res => {
        expect(res.body).to.be.an('array');
        // expect(res.body).to.have.lengthOf.at.least(1);
        res.body.forEach(app => {
          expect(app).to.be.an('object');
          expect(app).to.include.all.keys('App', 'Category', 'Rating', 'Reviews', 'Size', 'Installs', 'Type', 'Price', 'Content Rating', 'Genres', 'Last Updated', 'Current Ver', 'Android Ver');
        });
      });
  });

  it('sort should succeed on Rating', () => {
    const validSort = ['rating', 'app'];
    validSort.forEach(sort => {
      return supertest(app)
        .get('/apps')
        .query({sort})
        .expect(200);
    });
  });

  it('should fail on incorrect sort', () => {
    return supertest(app)
      .get('/apps')
      .query({sort: 'cat'})
      .expect(400);
  });

  it('genre should be one of "Action", "Puzzle", "Strategy", "Casual", "Arcade", "Card"', () => {
    const validGenres = ['Action', 'Puzzle', 'Strategy', 'Casual', 'Arcade', 'Card'];
    validGenres.forEach(genre => {
      return supertest(app)
        .get('/apps')
        .query({genre})
        .expect(200);
    });
  });

  it('should fail on incorrect genre', () => {
    return supertest(app)
      .get('/apps')
      .query({genre: 'bat'})
      .expect(400);
  });

  it('params should only be sort or genre', () => {
    
  });

  it('should be 400 if sort is incorrect');

});