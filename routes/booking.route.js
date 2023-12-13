import express from 'express';
import { createBooking, deleteBooking, fetchSingleBooking,fetchUserBooking, fetchBookings, updateBooking } from '../controllers/booking.controller.js';

const router = express.Router();
/**
 * @swagger
 * tags:
 *   name: Bookings
 *   description: Booking management
 */

/**
 * @swagger
 * /api/:
 *   post:
 *     summary: Create a new Booking item
 *     tags: [Bookings]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Booking'
 *     responses:
 *       201:
 *         description: Booking created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Booking'
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
// Create a new Booking item
router.post('/', createBooking);
router.patch('/:id', updateBooking);
router.get('/', fetchBookings);
router.get('/:id', fetchSingleBooking);
router.get('/user/:id', fetchUserBooking);
router.delete('/:id', deleteBooking);

// Define other routes for reading, updating, and deleting Bookings

export default router;