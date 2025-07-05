import express from 'express';
import { getCpusByName, getCpusByNameExact } from '../controllers/cpuController.js';

const router = express.Router();

/**
 * @swagger
 * /api/cpus:
 *   get:
 *     summary: Get CPUs that include the query substring in their name
 *     parameters:
 *       - in: query
 *         name: name
 *         schema:
 *           type: string
 *         required: false
 *         description: Substring to search for in CPU names
 *     responses:
 *       200:
 *         description: List of CPUs matching the search
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
 *       500:
 *         description: Internal server error
 */
router.get('/', getCpusByName);

/**
 * @swagger
 * /api/cpus/exact:
 *   get:
 *     summary: Get CPUs that match the query exactly or closely (dash/space aware)
 *     parameters:
 *       - in: query
 *         name: name
 *         schema:
 *           type: string
 *         required: true
 *         description: CPU model string to search for
 *     responses:
 *       200:
 *         description: List of CPUs with an exact or token-aware match
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
 *       400:
 *         description: Missing or invalid name parameter
 *       500:
 *         description: Internal server error
 */
router.get('/exact', getCpusByNameExact);

export default router;
