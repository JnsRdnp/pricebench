import { findCpuPerformancePerEuro, findCpuPerformancePerEuroExact, findGpuPerformancePerEuro, findGpuPerformancePerEuroExact } from "../services/priceService.js";

export async function getCpuPerformancePerEuro(req, res) {
  try {
    const { name = '', euro = '' } = req.query;

    // Validate inputs
    if (!name || !euro || isNaN(euro)) {
      return res.status(400).json({ error: 'Missing or invalid query parameters: name and euro are required.' });
    }

    const cpus = findCpuPerformancePerEuro(name, parseFloat(euro));
    res.json(cpus);
  } catch (error) {
    console.error('Error fetching CPUs:', error);
    res.status(500).json({ error: 'Failed to fetch CPU data' });
  }
}

export async function getCpuPerformancePerEuroExact(req, res) {
  try {
    const { name = '', euro = '' } = req.query;

    // Validate inputs
    if (!name || !euro || isNaN(euro)) {
      return res.status(400).json({ error: 'Missing or invalid query parameters: name and euro are required.' });
    }

    const cpus = findCpuPerformancePerEuroExact(name, parseFloat(euro));
    res.json(cpus);
  } catch (error) {
    console.error('Error fetching CPUs:', error);
    res.status(500).json({ error: 'Failed to fetch CPU data' });
  }
}


export async function getGpuPerformancePerEuro(req, res) {
  try {
    const { name = '', euro = '' } = req.query;

    // Validate inputs
    if (!name || !euro || isNaN(euro)) {
      return res.status(400).json({ error: 'Missing or invalid query parameters: name and euro are required.' });
    }

    const cpus = findGpuPerformancePerEuro(name, parseFloat(euro));
    res.json(cpus);
  } catch (error) {
    console.error('Error fetching GPUs:', error);
    res.status(500).json({ error: 'Failed to fetch GPU data' });
  }
}

export async function getGpuPerformancePerEuroExact(req, res) {
  try {
    const { name = '', euro = '' } = req.query;

    // Validate inputs
    if (!name || !euro || isNaN(euro)) {
      return res.status(400).json({ error: 'Missing or invalid query parameters: name and euro are required.' });
    }

    const cpus = findGpuPerformancePerEuroExact(name, parseFloat(euro));
    res.json(cpus);
  } catch (error) {
    console.error('Error fetching GPUs:', error);
    res.status(500).json({ error: 'Failed to fetch GPU data' });
  }
}


