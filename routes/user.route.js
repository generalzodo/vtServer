import express from 'express';
import { createUser, deleteUser,loginUser, fetchSingleUser, fetchUsers, updateUser, changePassword } from '../controllers/user.controller.js';

const router = express.Router();
/**
 * @swagger
 * tags:
 *   name: Users
 *   description: User management
 */

/**
 * @swagger
 * /api/:
 *   post:
 *     summary: Create a new User item
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       201:
 *         description: User created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
// Create a new User item
router.post('/', createUser);
router.post('/register', createUser);
router.post('/login', loginUser);
router.patch('/:id', updateUser);
router.post('/changePassword/:id', changePassword);
router.get('/', fetchUsers);
router.get('/:id', fetchSingleUser);
router.delete('/:id', deleteUser);

// Define other routes for reading, updating, and deleting Users

export default router;