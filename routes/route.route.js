import express from 'express';
import { createRoute, deleteRoute, fetchSingleRoute, fetchRoutes, updateRoute,findRoutes } from '../controllers/route.controller.js';

const router = express.Router();
/**
 * @swagger
 * tags:
 *   name: Routes
 *   description: Route management
 */

/**
 * @swagger
 * /api/:
 *   post:
 *     summary: Create a new Route item
 *     tags: [Routes]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Route'
 *     responses:
 *       201:
 *         description: Route created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Route'
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
// Create a new Route item
router.post('/', createRoute);
router.patch('/:id', updateRoute);
router.get('/', fetchRoutes);
router.post('/findRoutes', findRoutes);
router.get('/:id', fetchSingleRoute);
router.delete('/:id', deleteRoute);

// Define other routes for reading, updating, and deleting Routes

export default router;