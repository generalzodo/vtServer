import express from 'express';
import { createDriver, deleteDriver, fetchSingleDriver, fetchDrivers, updateDriver } from '../controllers/driver.controller.js';

const router = express.Router();
/**
 * @swagger
 * tags:
 *   name: Drivers
 *   description: Driver management
 */

/**
 * @swagger
 * /api/:
 *   post:
 *     summary: Create a new Driver item
 *     tags: [Drivers]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Driver'
 *     responses:
 *       201:
 *         description: Driver created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Driver'
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
// Create a new Driver item
router.post('/', createDriver);
router.patch('/:id', updateDriver);
router.get('/', fetchDrivers);
router.get('/:id', fetchSingleDriver);
router.delete('/:id', deleteDriver);

// Define other routes for reading, updating, and deleting Drivers

export default router;