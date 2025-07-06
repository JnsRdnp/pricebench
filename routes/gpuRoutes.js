import express from 'express';
import { getGpusByName, getGpusByNameExact } from '../controllers/gpuController.js';

const router = express.Router();

/**
 * @swagger
 * /api/gpus:
 *   get:
 *     summary: Get GPUs that include the query substring in their name
 *     parameters:
 *       - in: query
 *         name: name
 *         schema:
 *           type: string
 *         required: false
 *         description: Substring to search for in GPU names
 *     responses:
 *       200:
 *         description: List of GPUs matching the search
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
router.get('/', getGpusByName);

/**
 * @swagger
 * /api/gpus/exact:
 *   get:
 *     summary: Get GPUs that match the query exactly or closely (dash/space aware)
 *     parameters:
 *       - in: query
 *         name: name
 *         schema:
 *           type: string
 *         required: true
 *         description: GPU model string to search for
 *     responses:
 *       200:
 *         description: List of GPUs with an exact or token-aware match
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
router.get('/exact', getGpusByNameExact);

export default router;
