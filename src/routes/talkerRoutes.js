const express = require('express');
const {
  getTalkers,
  getTalkerById,
  addNewTalker,
  editTalkerById,
  deleteTalkerById,
  searchTalkersByQuery,
} = require('../utils/handleTalkers');
const validateTalker = require('../middlewares/validateTalker');
const validateToken = require('../middlewares/validateToken');

const talkerRouter = express.Router();

talkerRouter.get('/', async (_req, res) => {
  try {
    const talkers = await getTalkers();
    if (talkers.length === 0) throw new Error('No file data');
    return res.status(200).json(talkers);
  } catch (error) {
    return res.status(200).send([]);
  }
});

talkerRouter.get('/search', validateToken, async (req, res) => {
  const { q } = req.query;
  const talkers = await searchTalkersByQuery(q);
  res.status(200).json(talkers);
});

talkerRouter.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const talker = await getTalkerById(id);
    if (!talker) throw new Error('Pessoa palestrante não encontrada');
    return res.status(200).json(talker);
  } catch (error) {
    return res.status(404).json({ message: error.message });
  }
});

talkerRouter.post('/', validateTalker, async (req, res) => {
  const { body } = req;
  const newBody = await addNewTalker(body);
  return res.status(201).json({ ...newBody });
});

talkerRouter.put('/:id', validateTalker, async (req, res) => {
  const { body } = req;
  const { id } = req.params;
  const newBody = await editTalkerById(Number(id), body);
  return res.status(200).json({ ...newBody });
});

talkerRouter.delete('/:id', validateToken, async (req, res) => {
  const { id } = req.params;
  await deleteTalkerById(Number(id));
  return res.status(204).end();
});

module.exports = talkerRouter;