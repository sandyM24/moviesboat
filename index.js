const mongoose = require('mongoose');
const genres = require('./routes/genres');
const express = require('express');
const app = express();

app.use(express.json());
app.use('/api/genres', genres);

mongoose
  .connect(
    'mongodb://localhost/moviesboat',
    { useNewUrlParser: true }
  )
  .then(() => console.log('Connected to mongodb..'))
  .catch(err => console.error(err.message));

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Listening to port ${port}`);
});
