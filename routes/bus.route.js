import express from 'express';
import { createBus, deleteBus, fetchSingleBus, fetchBuses, updateBus } from '../controllers/bus.controller.js';

const router = express.Router();
/**
 * @swagger
 * tags:
 *   name: Buss
 *   description: Bus management
 */

/**
 * @swagger
 * /api/:
 *   post:
 *     summary: Create a new Bus item
 *     tags: [Buss]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Bus'
 *     responses:
 *       201:
 *         description: Bus created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Bus'
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
// Create a new Bus item
router.post('/', createBus);
router.patch('/:id', updateBus);
router.get('/', fetchBuses);
router.get('/:id', fetchSingleBus);
router.delete('/:id', deleteBus);

// Define other routes for reading, updating, and deleting Buss

export default router;