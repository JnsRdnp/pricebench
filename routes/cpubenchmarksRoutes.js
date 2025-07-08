import express from 'express';
import cpubenchmarksController from '../controllers/cpubenchmarksController.js';

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Cpubenchmarks:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         name:
 *           type: string
 *         singlethread:
 *           type: number
 *         multithread:
 *           type: number

 *     Cpubenchmarks_create:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *         singlethread:
 *           type: number
 *         multithread:
 *           type: number

 *
 * /api/cpubenchmarks:
 *   get:
 *     summary: Get all cpubenchmarks (paginated)
 *     tags: [Cpubenchmarks]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Page number
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Number of items per page
 *     responses:
 *       200:
 *         description: List of cpubenchmarks
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Cpubenchmarks'
 *                 page:
 *                   type: integer
 *                 limit:
 *                   type: integer
 *                 total:
 *                   type: integer
 */
router.get('/', cpubenchmarksController.getAll);

/**
 * @swagger
 * /api/cpubenchmarks/by/{id}:
 *   get:
 *     summary: Get a single cpubenchmarks by ID
 *     tags: [Cpubenchmarks]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A single cpubenchmarks
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Cpubenchmarks'
 */
router.get('/by/:id', cpubenchmarksController.getById);

/**
 * @swagger
 * /api/cpubenchmarks:
 *   post:
 *     summary: Create a new cpubenchmarks
 *     tags: [Cpubenchmarks]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Cpubenchmarks_create'
 *     responses:
 *       201:
 *         description: Created cpubenchmarks
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Cpubenchmarks'
 */
router.post('/', cpubenchmarksController.create);

/**
 * @swagger
 * /api/cpubenchmarks/{id}:
 *   put:
 *     summary: Update an existing cpubenchmarks by ID
 *     tags: [Cpubenchmarks]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Cpubenchmarks_create'
 *     responses:
 *       200:
 *         description: Updated cpubenchmarks
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Cpubenchmarks'
 */
router.put('/:id', cpubenchmarksController.update);

/**
 * @swagger
 * /api/cpubenchmarks/{id}:
 *   delete:
 *     summary: Delete a cpubenchmarks by ID
 *     tags: [Cpubenchmarks]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Deleted cpubenchmarks
 */
router.delete('/:id', cpubenchmarksController.remove);

export default router;
