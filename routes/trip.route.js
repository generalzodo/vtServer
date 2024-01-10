import express from 'express';
import { createTrip, deleteTrip, fetchSingleTrip, fetchTrips, updateTrip, deleteMultiTrip, fetchTripsManifest } from '../controllers/trips.controller.js';

const router = express.Router();
/**
 * @swagger
 * tags:
 *   name: Trips
 *   description: Trip management
 */

/**
 * @swagger
 * /api/:
 *   post:
 *     summary: Create a new Trip item
 *     tags: [Trips]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Trip'
 *     responses:
 *       201:
 *         description: Trip created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Trip'
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
// Create a new Trip item
router.post('/', createTrip);
router.post('/deleteTrips', deleteMultiTrip);
router.patch('/:id', updateTrip);
router.get('/', fetchTrips);
router.get('/manifest/:id', fetchTripsManifest);
router.get('/:id', fetchSingleTrip);
router.delete('/:id', deleteTrip);

// Define other routes for reading, updating, and deleting Trips

export default router;