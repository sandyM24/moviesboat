const mongoose = require('mongoose');
const Joi = require('joi');
const express = require('express');
const router = express();

const genresSchema = new mongoose.Schema({
  name: { type: String, required: true, minlength: 2, maxlength: 50 }
});

const Genre = mongoose.model('Genre', genresSchema);

router.get('/', async (req, res) => {
  const genres = await Genre.find().sort('name');
  res.send(genres);
});

router.get('/:id', async (req, res) => {
  const genre = await Genre.findById(req.params.id)
  .catch(err => console.log(err.message));

  if (!genre) {
    res.status(404).send('Genre you looking for is not found');
    return;
  }
  res.send(genre);
});

router.post('/', async (req, res) => {
  const result = genreValidation(req.body);
  if (result.error) {
    res.status(400).send(result.error.details[0].message);
    return;
  }

  let genre = new Genre({
    name: req.body.name
  });

  genre = await genre.save();

  res.send(genre);
});

router.put('/:id', async (req, res) => {
  const result = genreValidation(req.body);
  if (result.error) {
    res.status(400).send(result.error.details[0].message);
    return;
  }

  const genre = await Genre.findByIdAndUpdate(
    req.params.id,
    { name: req.body.name },
    { new: true }
  );

  if (!genre) {
    res.status(404).send('Genre you wanna update is not found');
    return;
  }

  res.send(genre);
});

router.delete('/:id', async (req, res) => {
  const genre = await Genre.findByIdAndRemove(req.params.id);

  if (!genre) {
    res.status(404).send('Genre you wanna delete is not found');
    return;
  }

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
