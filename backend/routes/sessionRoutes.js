const express = require('express');
const { createSession, getSessionByID, getMySessions, deleteSession } = require('../controllers/sessionController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

// Keep /my-sessions before /:id to avoid route conflict
router.get('/my-sessions', protect, getMySessions);
router.post('/create', protect, createSession);
router.get('/:id', protect, getSessionByID);
router.delete('/:id', protect, deleteSession);

module.exports = router;