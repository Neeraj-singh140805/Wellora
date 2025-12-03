const express = require('express');
const router = express.Router();
const Todo = require('../models/Todo');
const auth = require('../middleware/auth');

// @route   GET api/todos
// @desc    Get all todos for user
// @access  Private
router.get('/', auth, async (req, res) => {
    try {
        const todos = await Todo.find({ user: req.user }).sort({ dateAdded: -1 });
        res.json(todos);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   POST api/todos
// @desc    Add a todo
// @access  Private
router.post('/', auth, async (req, res) => {
    try {
        const { workoutId, title, category, isCustom, gifUrl, bodyPart, target } = req.body;

        // Check if already exists
        const existing = await Todo.findOne({ user: req.user, workoutId });
        if (existing) {
            return res.status(400).json({ msg: 'Workout already in list' });
        }

        const newTodo = new Todo({
            user: req.user,
            workoutId,
            title,
            category,
            isCustom,
            gifUrl,
            bodyPart,
            target
        });

        const todo = await newTodo.save();
        res.json(todo);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   PUT api/todos/:id
// @desc    Update todo (toggle complete)
// @access  Private
router.put('/:id', auth, async (req, res) => {
    try {
        let todo = await Todo.findById(req.params.id);

        if (!todo) return res.status(404).json({ msg: 'Todo not found' });

        // Make sure user owns todo
        if (todo.user.toString() !== req.user) {
            return res.status(401).json({ msg: 'Not authorized' });
        }

        // Toggle completed status or update other fields if provided
        if (req.body.completed !== undefined) {
            todo.completed = req.body.completed;
        }

        await todo.save();
        res.json(todo);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   DELETE api/todos/:id
// @desc    Delete todo
// @access  Private
router.delete('/:id', auth, async (req, res) => {
    try {
        let todo = await Todo.findById(req.params.id);

        if (!todo) return res.status(404).json({ msg: 'Todo not found' });

        // Make sure user owns todo
        if (todo.user.toString() !== req.user) {
            return res.status(401).json({ msg: 'Not authorized' });
        }

        await Todo.findByIdAndDelete(req.params.id);
        res.json({ msg: 'Todo removed' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
