const express = require('express');
const router = express.Router();
const Todo = require('../models/Todo'); // Modelo importado

// Define las rutas (GET, POST, PUT, DELETE)
router.get('/', async (req, res) => {
    const todos = await Todo.find();
    res.json(todos);
  });
// Add a new todo
router.post('/', async (req, res) => {
    const newTodo = new Todo({
        title: req.body.title,
    });
    await newTodo.save();
    res.json(newTodo);
});

// Update a todo
router.put('/:id', async (req, res) => {
    const todo = await Todo.findByIdAndUpdate(req.params.id, { completed: req.body.completed }, { new: true });
    res.json(todo);
});

// Delete a todo
router.delete('/:id', async (req, res) => {
    await Todo.findByIdAndDelete(req.params.id);
    res.json({ message: 'Todo deleted' });
});

module.exports = router;

