import express from 'express';
import gigantti_productsController from '../controllers/gigantti_productsController.js';

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Gigantti_products:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         sku:
 *           type: string
 *         name:
 *           type: string
 *         price:
 *           type: number
 *         availability:
 *           type: string
 *         imageUrl:
 *           type: string
 *         link:
 *           type: string
 *         cpuName:
 *           type: string
 *         gpuName:
 *           type: string
 *         cpuPerformanceJson:
 *           type: string
 *         gpuPerformanceJson:
 *           type: string
 *         combinedValueScore:
 *           type: number
 *         specsJson:
 *           type: string

 *     Gigantti_products_create:
 *       type: object
 *       properties:
 *         sku:
 *           type: string
 *         name:
 *           type: string
 *         price:
 *           type: number
 *         availability:
 *           type: string
 *         imageUrl:
 *           type: string
 *         link:
 *           type: string
 *         cpuName:
 *           type: string
 *         gpuName:
 *           type: string
 *         cpuPerformanceJson:
 *           type: string
 *         gpuPerformanceJson:
 *           type: string
 *         combinedValueScore:
 *           type: number
 *         specsJson:
 *           type: string

 *
 * /api/gigantti_products:
 *   get:
 *     summary: Get all gigantti_products (paginated)
 *     tags: [Gigantti_products]
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
 *         description: List of gigantti_products
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Gigantti_products'
 *                 page:
 *                   type: integer
 *                 limit:
 *                   type: integer
 *                 total:
 *                   type: integer
 */
router.get('/', gigantti_productsController.getAll);

/**
 * @swagger
 * /api/gigantti_products/by/{id}:
 *   get:
 *     summary: Get a single gigantti_products by ID
 *     tags: [Gigantti_products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A single gigantti_products
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Gigantti_products'
 */
router.get('/by/:id', gigantti_productsController.getById);

/**
 * @swagger
 * /api/gigantti_products:
 *   post:
 *     summary: Create a new gigantti_products
 *     tags: [Gigantti_products]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Gigantti_products_create'
 *     responses:
 *       201:
 *         description: Created gigantti_products
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Gigantti_products'
 */
router.post('/', gigantti_productsController.create);

/**
 * @swagger
 * /api/gigantti_products/{id}:
 *   put:
 *     summary: Update an existing gigantti_products by ID
 *     tags: [Gigantti_products]
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
 *             $ref: '#/components/schemas/Gigantti_products_create'
 *     responses:
 *       200:
 *         description: Updated gigantti_products
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Gigantti_products'
 */
router.put('/:id', gigantti_productsController.update);

/**
 * @swagger
 * /api/gigantti_products/{id}:
 *   delete:
 *     summary: Delete a gigantti_products by ID
 *     tags: [Gigantti_products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Deleted gigantti_products
 */
router.delete('/:id', gigantti_productsController.remove);

export default router;
