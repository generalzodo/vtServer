import express from 'express';
import { createSubRoute, deleteSubRoute, fetchSingleSubRoute, fetchSubRoutes, updateSubRoute,findSubRoutes } from '../controllers/subroute.controller.js';

const router = express.Router();
/**
 * @swagger
 * tags:
 *   name: SubRoutes
 *   description: SubRoute management
 */

/**
 * @swagger
 * /api/:
 *   post:
 *     summary: Create a new SubRoute item
 *     tags: [SubRoutes]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/SubRoute'
 *     responses:
 *       201:
 *         description: SubRoute created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SubRoute'
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
// Create a new SubRoute item
router.post('/', createSubRoute);
router.patch('/:id', updateSubRoute);
router.get('/', fetchSubRoutes);
router.post('/findSubRoutes', findSubRoutes);
router.get('/:id', fetchSingleSubRoute);
router.delete('/:id', deleteSubRoute);

// Define other routes for reading, updating, and deleting SubRoutes

export default router;