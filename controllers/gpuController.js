import { findGpusByNameExact, findGpusByName } from '../services/gpuService.js';

/**
 * Express handler to get GPUs by name substring.
 */
export async function getGpusByName(req, res) {
  try {
    const { name = '' } = req.query;
    const cpus = findGpusByName(name);
    res.json(cpus);
  } catch (error) {
    console.error('Error fetching GPUs:', error); // <--- log full error here
    res.status(500).json({ error: 'Failed to fetch GPU data' });
  }
}

export async function getGpusByNameExact(req, res) {
  try {
    const { name = '' } = req.query;
    const cpus = findGpusByNameExact(name);
    res.json(cpus);
  } catch (error) {
    console.error('Error fetching GPUs:', error); // <--- log full error here
    res.status(500).json({ error: 'Failed to fetch GPU data' });
  }
}