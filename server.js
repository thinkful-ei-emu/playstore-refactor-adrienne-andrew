const express = require('express');
const morgan = require('morgan');
const playStore = require('./playstore');

const app = express();
app.use(morgan('common'));

app.get('/apps',(req,res)=>{
  const validSorts = ['rating','app'];
  const validGenre = ['Action', 'Puzzle', 'Strategy', 'Casual', 'Arcade', 'Card'];
  let results = [...playStore];


  res.status(200).json(results);

});
app.listen(8080, ()=>{
  console.log('server listening on port 8080');
});