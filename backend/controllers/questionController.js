const Question = require('../models/Question');
const Session = require('../models/Session');

exports.addQuestionToSession = async (req, res) => {
    try {
        const { sessionId, questions } = req.body;
        if (!sessionId || !questions || !Array.isArray(questions)) {
            return res.status(400).json({ message: 'Invalid input data' });
        }

        const session = await Session.findById(sessionId);
        if (!session) {
            return res.status(404).json({ message: 'Session not found' });
        }

        const createdQuestions = await Question.insertMany(
            questions.map((q) => ({
                session: sessionId,
                question: q.question,
                answer: q.answer,
            }))
        );

        res.status(201).json(createdQuestions);

    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

exports.togglePinQustion = async (req, res) => {
    try {
        const question = await Question.findById(req.params.id);
        if (!question) {
            return res.status(404).json({ message: 'Question not found' });
        }

        const updatedQuestion = await Question.findByIdAndUpdate(req.params.id, {
            isPinned: !question.isPinned
        }, { new: true });

        res.status(200).json(updatedQuestion);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

exports.updateQuestionNote = async (req, res) => {
    try {
        const { note } = req.body;
        const question = await Question.findById(req.params.id);
        if (!question) {
            return res.status(404).json({ message: 'Question not found' });
        }

        const updatedQuestion = await Question.findByIdAndUpdate(req.params.id, {
            note: note || ""
        }, { new: true });

        res.status(200).json({ success: true, question: updatedQuestion });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};
