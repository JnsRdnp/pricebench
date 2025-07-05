import { findCpusByName } from '../services/cpuService.js';

/**
 * Express handler to get CPUs by name substring.
 */
export async function getCpusByName(req, res) {
  try {
    const { name = '' } = req.query;
    const cpus = findCpusByName(name);
    res.json(cpus);
  } catch (error) {
    console.error('Error fetching CPUs:', error); // <--- log full error here
    res.status(500).json({ error: 'Failed to fetch CPU data' });
  }
}