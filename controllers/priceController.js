import { findPerformancePerEuro, findPerformancePerEuroExact } from "../services/priceService.js";

export async function getPerformancePerEuro(req, res) {
  try {
    const { name = '', euro = '' } = req.query;

    // Validate inputs
    if (!name || !euro || isNaN(euro)) {
      return res.status(400).json({ error: 'Missing or invalid query parameters: name and euro are required.' });
    }

    const cpus = findPerformancePerEuro(name, parseFloat(euro));
    res.json(cpus);
  } catch (error) {
    console.error('Error fetching CPUs:', error);
    res.status(500).json({ error: 'Failed to fetch CPU data' });
  }
}

export async function getPerformancePerEuroExact(req, res) {
  try {
    const { name = '', euro = '' } = req.query;

    // Validate inputs
    if (!name || !euro || isNaN(euro)) {
      return res.status(400).json({ error: 'Missing or invalid query parameters: name and euro are required.' });
    }

    const cpus = findPerformancePerEuroExact(name, parseFloat(euro));
    res.json(cpus);
  } catch (error) {
    console.error('Error fetching CPUs:', error);
    res.status(500).json({ error: 'Failed to fetch CPU data' });
  }
}

