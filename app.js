const express = require('express');
const morgan = require('morgan');
const playStore = require('./playstore');

const app = express();
app.use(morgan('common'));

app.get('/apps', (req, res) => {
  const validSorts = ['Rating', 'App'];
  const validGenre = ['Action', 'Puzzle', 'Strategy', 'Casual', 'Arcade', 'Card'];
  let results = [...playStore];
  let sort;

  if (req.query.sort) {
    sort = req.query.sort;
    sort = sort[0].toUpperCase() + sort.slice(1);
    if (validSorts.includes(sort)) {
      results = results.sort((a, b) => {
        if (sort === 'Rating') return a[sort] < b[sort] ? 1 : -1;
        else return a[sort] > b[sort] ? 1 : -1;
      });
    }
    else {
      return res.status(400).json({
        error: 'Invalid Params: Sort must either be \'Rating\' or \'App\''
      });
    }
  }

  res.status(200).json(results);

});

module.exports = app;