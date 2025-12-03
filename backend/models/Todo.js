const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    workoutId: {
        type: String, // Can be ID from API or custom ID
        required: true
    },
    title: {
        type: String,
        required: true
    },
    category: {
        type: String,
        default: 'Other'
    },
    completed: {
        type: Boolean,
        default: false
    },
    isCustom: {
        type: Boolean,
        default: false
    },
    gifUrl: {
        type: String
    },
    bodyPart: {
        type: String
    },
    target: {
        type: String
    },
    dateAdded: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Todo', todoSchema);
