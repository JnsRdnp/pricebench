import { findCpuPerformancePerEuro, findCpuPerformancePerEuroExact, findGpuPerformancePerEuro, findGpuPerformancePerEuroExact } from "../services/priceService.js";

export async function getCpuPerformancePerEuro(req, res) {
  try {
    const { name = '', euro } = req.query;
    const euroValue = isNaN(parseFloat(euro)) ? 1 : parseFloat(euro);

    if (!name) {
      return res.status(400).json({ error: 'Missing required query parameter: name.' });
    }

    const cpus = findCpuPerformancePerEuro(name, euroValue);
    res.json(cpus);
  } catch (error) {
    console.error('Error fetching CPUs:', error);
    res.status(500).json({ error: 'Failed to fetch CPU data' });
  }
}

export async function getCpuPerformancePerEuroExact(req, res) {
  try {
    const { name = '', euro } = req.query;
    const euroValue = isNaN(parseFloat(euro)) ? 1 : parseFloat(euro);

    if (!name) {
      return res.status(400).json({ error: 'Missing required query parameter: name.' });
    }

    const cpus = findCpuPerformancePerEuroExact(name, euroValue);
    res.json(cpus);
  } catch (error) {
    console.error('Error fetching CPUs:', error);
    res.status(500).json({ error: 'Failed to fetch CPU data' });
  }
}

export async function getGpuPerformancePerEuro(req, res) {
  try {
    const { name = '', euro } = req.query;
    const euroValue = isNaN(parseFloat(euro)) ? 1 : parseFloat(euro);

    if (!name) {
      return res.status(400).json({ error: 'Missing required query parameter: name.' });
    }

    const gpus = findGpuPerformancePerEuro(name, euroValue);
    res.json(gpus);
  } catch (error) {
    console.error('Error fetching GPUs:', error);
    res.status(500).json({ error: 'Failed to fetch GPU data' });
  }
}

export async function getGpuPerformancePerEuroExact(req, res) {
  try {
    const { name = '', euro } = req.query;
    const euroValue = isNaN(parseFloat(euro)) ? 1 : parseFloat(euro);

    if (!name) {
      return res.status(400).json({ error: 'Missing required query parameter: name.' });
    }

    const gpus = findGpuPerformancePerEuroExact(name, euroValue);
    res.json(gpus);
  } catch (error) {
    console.error('Error fetching GPUs:', error);
    res.status(500).json({ error: 'Failed to fetch GPU data' });
  }
}