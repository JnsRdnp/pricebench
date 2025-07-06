import express from 'express';
import {
  getCpuPerformancePerEuro,
  getCpuPerformancePerEuroExact,
  getGpuPerformancePerEuro,
  getGpuPerformancePerEuroExact
} from '../controllers/priceController.js';

const router = express.Router();

/**
 * @swagger
 * /api/price/cpu:
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
 *       400:
 *         description: Missing or invalid query parameters
 *       500:
 *         description: Internal server error
 */
router.get('/cpu', getCpuPerformancePerEuro);

/**
 * @swagger
 * /api/price/cpu/exact:
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
 *       400:
 *         description: Missing or invalid query parameters
 *       500:
 *         description: Internal server error
 */
router.get('/cpu/exact', getCpuPerformancePerEuroExact);

/**
 * @swagger
 * /api/price/gpu:
 *   get:
 *     summary: Get GPUs matching the name and calculate performance per euro
 *     parameters:
 *       - in: query
 *         name: name
 *         schema:
 *           type: string
 *         required: true
 *         description: Substring to search for in GPU names
 *       - in: query
 *         name: euro
 *         schema:
 *           type: number
 *         required: true
 *         description: Euro amount to calculate value score (benchmark score / euro)
 *     responses:
 *       200:
 *         description: List of GPUs with performance per euro
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
 *                   benchmark:
 *                     type: number
 *                   valueScore:
 *                     type: string
 *       400:
 *         description: Missing or invalid query parameters
 *       500:
 *         description: Internal server error
 */
router.get('/gpu', getGpuPerformancePerEuro);

/**
 * @swagger
 * /api/price/gpu/exact:
 *   get:
 *     summary: Get more exact GPUs matching the name and calculate performance per euro
 *     parameters:
 *       - in: query
 *         name: name
 *         schema:
 *           type: string
 *         required: true
 *         description: Substring to search for in GPU names
 *       - in: query
 *         name: euro
 *         schema:
 *           type: number
 *         required: true
 *         description: Euro amount to calculate value score (benchmark score / euro)
 *     responses:
 *       200:
 *         description: List of more exact GPUs with performance per euro
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
 *                   benchmark:
 *                     type: number
 *                   valueScore:
 *                     type: string
 *       400:
 *         description: Missing or invalid query parameters
 *       500:
 *         description: Internal server error
 */
router.get('/gpu/exact', getGpuPerformancePerEuroExact);

export default router;
