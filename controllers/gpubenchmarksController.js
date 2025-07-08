import gpubenchmarksService from '../services/gpubenchmarksService.js';

const getAll = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const result = await gpubenchmarksService.getAll(page, limit);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getById = async (req, res) => {
  try {
    const item = await gpubenchmarksService.getById(req.params.id);
    if (!item) return res.status(404).json({ message: 'Gpubenchmarks not found' });
    res.json(item);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const create = async (req, res) => {
  try {
    const created = await gpubenchmarksService.create(req.body);
    res.status(201).json(created);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const update = async (req, res) => {
  try {
    const updated = await gpubenchmarksService.update(req.params.id, req.body);
    if (!updated) return res.status(404).json({ message: 'Gpubenchmarks not found' });
    res.json(updated);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const remove = async (req, res) => {
  try {
    const deleted = await gpubenchmarksService.remove(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Gpubenchmarks not found' });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export default {
  getAll,
  getById,
  create,
  update,
  remove,
};
