import Todo from '../models/todo.model.js';
/**
 * Create a new Todo item.
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {Promise<void>}
 */
// Create a new Todo
export const createTodo = async (req, res) => {
  try {
    const newTodo = new Todo({
      title: req.body.title,
      description: req.body.description
    });

    const result = await newTodo.save();
    res.status(201).json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
