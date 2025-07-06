import express from 'express';
import { getGiganttiPC } from '../controllers/giganttiController.js';

const router = express.Router();

/**
 * @swagger
 * /api/gigantti:
 *   get:
 *     summary: Get a list of Gigantti PCs
 *     description: Returns an array of PC products scraped from Gigantti.
 *     responses:
 *       200:
 *         description: A list of PC products
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   name:
 *                     type: string
 *                     example: "Gigantti PC Model XYZ"
 *                   price:
 *                     type: string
 *                     example: "949,99 €"
 *                   availability:
 *                     type: string
 *                     example: "In stock"
 *                   imageUrl:
 *                     type: string
 *                     example: "https://gigantti.fi/image.jpg"
 *                   link:
 *                     type: string
 *                     example: "https://www.gigantti.fi/product-link"
 *                   sku:
 *                     type: string
 *                     example: "123456"
 *                   specs:
 *                     type: array
 *                     items:
 *                       type: string
 *                     example: ["Intel i7", "16GB RAM", "512GB SSD"]
 *       500:
 *         description: Server error
 */

router.get('/', getGiganttiPC);

export default router;
