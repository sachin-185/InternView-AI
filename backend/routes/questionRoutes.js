const express = require('express');
const { togglePinQustion, updateQuestionNote, addQuestionToSession } = require('../controllers/questionController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/add', protect, addQuestionToSession);
router.put('/:id/pin', protect, togglePinQustion);
router.put('/:id/note', protect, updateQuestionNote);

module.exports = router;