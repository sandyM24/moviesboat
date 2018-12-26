const express = require('express');
const Joi = require('joi');
const app = express();

app.use(express.json());

const genres = [{ id: 1, name: 'comedy' }, { id: 2, name: 'action' }];

app.get('/api/genres', (req, res) => {
  res.send(genres);
});

app.get('/api/genres/:id', (req, res) => {
  const genre = genres.find(genre => genre.id === parseInt(req.params.id));
  if (!genre) {
    res.status(404).send('Genre you looking for is not found');
    return;
  }

  res.send(genre);
});

app.post('/api/genres', (req, res) => {
  const result = genreValidation(req.body);
  if (result.error) {
    res.status(400).send(result.error.details[0].message);
    return;
  }

  const genre = {
    id: genres.length + 1,
    name: req.body.name
  };
  genres.push(genre);

  res.send(genre);
});

app.put('/api/genres/:id', (req, res) => {
  const genre = genres.find(genre => genre.id === parseInt(req.params.id));
  if (!genre) {
    res.status(404).send('Genre you wanna update is not found');
    return;
  }

  const result = genreValidation(req.body);
  if (result.error) {
    res.status(400).send(result.error.details[0].message);
    return;
  }

  genre.name = req.body.name;
  res.send(genre);
});

app.delete('/api/genres/:id', (req, res) => {
  const genre = genres.find(genre => genre.id === parseInt(req.params.id));
  if (!genre) {
    res.status(404).send('Genre you wanna delete is not found');
    return;
  }

  const index = genres.indexOf(genre);
  genres.splice(index, 1);
  res.send(genre);
});

function genreValidation(genre) {
  const schema = {
    name: Joi.string()
      .min(3)
      .required()
  };

  return Joi.validate(genre, schema);
}

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Listening to port ${port}`);
});
