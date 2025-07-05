import express from 'express';
import { getCpusByName } from '../controllers/cpuController.js';

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
 */
router.get('/', getCpusByName);

export default router;