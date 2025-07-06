import { findAllGiganttiProducts } from "../services/giganttiService.js";

/**
 * Express handler to get CPUs by name substring.
 */
export async function getAllGiganttiProducts(req, res) {
  try {
    const products = findAllGiganttiProducts();
    res.json(products);
  } catch (error) {
    console.error('Error fetching Gigantti PCs:', error);
    res.status(500).json({ error: 'Failed to load products' });
  }
}