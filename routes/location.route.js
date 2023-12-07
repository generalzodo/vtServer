import express from 'express';
import { createLocation, deleteLocation, fetchSingleLocation, fetchLocations, updateLocation } from '../controllers/location.controller.js';

const router = express.Router();
/**
 * @swagger
 * tags:
 *   name: Locations
 *   description: Location management
 */

/**
 * @swagger
 * /api/:
 *   post:
 *     summary: Create a new Location item
 *     tags: [Locations]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Location'
 *     responses:
 *       201:
 *         description: Location created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Location'
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
// Create a new Location item
router.post('/', createLocation);
router.patch('/:id', updateLocation);
router.get('/', fetchLocations);
router.get('/:id', fetchSingleLocation);
router.delete('/:id', deleteLocation);

// Define other routes for reading, updating, and deleting Locations

export default router;