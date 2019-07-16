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
  let genre;

  if (req.query.sort) {
    sort = req.query.sort;
    sort = sort[0].toUpperCase() + sort.slice(1);
    if (validSorts.includes(sort)) {
      results.sort((a, b) => {
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
  if(req.query.genre){
    genre = req.query.genre;
    genre = genre[0].toUpperCase() + genre.slice(1);
    if(validGenre.includes(genre)){
      results = results.filter((app)=>app.Genres.includes(genre));

    }else{
      return res.status(400).json({error:"Invalid Params: Genre must be one of 'Action', 'Puzzle', 'Strategy', 'Casual', 'Arcade', 'Card' "});
    }
  }

  res.status(200).json(results);

});



app.listen(8080, () => {
  console.log('server listening on port 8080');
});