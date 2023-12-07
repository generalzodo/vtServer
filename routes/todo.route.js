import express from 'express';
import { createTodo, deleteTodo, fetchSingleTodo, fetchTodos, updateTodo } from '../controllers/todo.controller.js';

const router = express.Router();
/**
 * @swagger
 * tags:
 *   name: Todos
 *   description: Todo management
 */

/**
 * @swagger
 * /api/todos:
 *   post:
 *     summary: Create a new Todo item
 *     tags: [Todos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Todo'
 *     responses:
 *       201:
 *         description: Todo created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Todo'
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
// Create a new Todo item
router.post('/todos', createTodo);
router.patch('/todos/:id', updateTodo);
router.get('/todos', fetchTodos);
router.get('/todos/:id', fetchSingleTodo);
router.delete('/todos/:id', deleteTodo);

// Define other routes for reading, updating, and deleting Todos

export default router;