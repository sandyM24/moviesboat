const Joi = require('joi');
const express = require('express');
const router = express();

const genres = [{ id: 1, name: 'comedy' }, { id: 2, name: 'action' }];

router.get('/', (req, res) => {
  res.send(genres);
});

router.get('/:id', (req, res) => {
  const genre = genres.find(genre => genre.id === parseInt(req.params.id));
  if (!genre) {
    res.status(404).send('Genre you looking for is not found');
    return;
  }

  res.send(genre);
});

router.post('/', (req, res) => {
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

router.put('/:id', (req, res) => {
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

router.delete('/:id', (req, res) => {
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

module.exports = router;
