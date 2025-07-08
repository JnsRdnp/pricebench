import express from 'express';
import gpubenchmarksController from '../controllers/gpubenchmarksController.js';

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Gpubenchmarks:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         name:
 *           type: string
 *         benchmark:
 *           type: number

 *     Gpubenchmarks_create:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *         benchmark:
 *           type: number

 *
 * /api/gpubenchmarks:
 *   get:
 *     summary: Get all gpubenchmarks (paginated)
 *     tags: [Gpubenchmarks]
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
 *         description: List of gpubenchmarks
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Gpubenchmarks'
 *                 page:
 *                   type: integer
 *                 limit:
 *                   type: integer
 *                 total:
 *                   type: integer
 */
router.get('/', gpubenchmarksController.getAll);

/**
 * @swagger
 * /api/gpubenchmarks/by/{id}:
 *   get:
 *     summary: Get a single gpubenchmarks by ID
 *     tags: [Gpubenchmarks]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A single gpubenchmarks
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Gpubenchmarks'
 */
router.get('/by/:id', gpubenchmarksController.getById);

/**
 * @swagger
 * /api/gpubenchmarks:
 *   post:
 *     summary: Create a new gpubenchmarks
 *     tags: [Gpubenchmarks]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Gpubenchmarks_create'
 *     responses:
 *       201:
 *         description: Created gpubenchmarks
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Gpubenchmarks'
 */
router.post('/', gpubenchmarksController.create);

/**
 * @swagger
 * /api/gpubenchmarks/{id}:
 *   put:
 *     summary: Update an existing gpubenchmarks by ID
 *     tags: [Gpubenchmarks]
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
 *             $ref: '#/components/schemas/Gpubenchmarks_create'
 *     responses:
 *       200:
 *         description: Updated gpubenchmarks
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Gpubenchmarks'
 */
router.put('/:id', gpubenchmarksController.update);

/**
 * @swagger
 * /api/gpubenchmarks/{id}:
 *   delete:
 *     summary: Delete a gpubenchmarks by ID
 *     tags: [Gpubenchmarks]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Deleted gpubenchmarks
 */
router.delete('/:id', gpubenchmarksController.remove);

export default router;
