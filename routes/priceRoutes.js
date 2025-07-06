import express from 'express';
import { getPerformancePerEuro, getPerformancePerEuroExact } from '../controllers/priceController.js';

const router = express.Router();

/**
 * @swagger
 * /api/price:
 *   get:
 *     summary: Get CPUs matching the name and calculate performance per euro
 *     parameters:
 *       - in: query
 *         name: name
 *         schema:
 *           type: string
 *         required: true
 *         description: Substring to search for in CPU names
 *       - in: query
 *         name: euro
 *         schema:
 *           type: number
 *         required: true
 *         description: Euro amount to calculate value score (multithread / euro)
 *     responses:
 *       200:
 *         description: List of CPUs with performance per euro
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   name:
 *                     type: string
 *                   singlethread:
 *                     type: number
 *                   multithread:
 *                     type: number
 *                   valueScore:
 *                     type: string
 *                     description: Multithread score divided by euro amount
 *       400:
 *         description: Missing or invalid query parameters
 *       500:
 *         description: Internal server error
 */
router.get('/', getPerformancePerEuro);


/**
 * @swagger
 * /api/price/exact:
 *   get:
 *     summary: Get more exact CPUs matching the name and calculate performance per euro
 *     parameters:
 *       - in: query
 *         name: name
 *         schema:
 *           type: string
 *         required: true
 *         description: Substring to search for in CPU names
 *       - in: query
 *         name: euro
 *         schema:
 *           type: number
 *         required: true
 *         description: Euro amount to calculate value score (multithread / euro)
 *     responses:
 *       200:
 *         description: List of more exact CPUs with performance per euro
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   name:
 *                     type: string
 *                   singlethread:
 *                     type: number
 *                   multithread:
 *                     type: number
 *                   valueScore:
 *                     type: string
 *                     description: Multithread score divided by euro amount
 *       400:
 *         description: Missing or invalid query parameters
 *       500:
 *         description: Internal server error
 */
router.get('/exact', getPerformancePerEuroExact)


export default router;
