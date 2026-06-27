const Session = require('../models/Session');
const Question = require('../models/Question');

exports.createSession = async (req, res) => {
    try {
        const { role, experience, topicsToFocus, description, questions } = req.body;
        const userID = req.user.id;

        const session = await Session.create({
            user: userID,
            role,
            experience,
            topicsToFocus,
            description,
        });

        if (questions && questions.length > 0) {
            const questionDocs = await Question.insertMany(
                questions.map((q) => ({
                    session: session.id,
                    question: q.question,
                    answer: q.answer,
                }))
            );

            const questionIds = questionDocs.map(q => q.id);
        }

        const fullSession = await Session.findById(session.id);
        const sessionQuestions = await Question.find({ session: session.id });

        res.status(201).json({
            ...fullSession,
            questions: sessionQuestions
        });
    } catch (error) {
        console.error('Error creating session:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

exports.getMySessions = async (req, res) => {
    try {
        const sessions = await Session.find({ user: req.user.id });

        // Attach questions to each session
        const sessionsWithQuestions = await Promise.all(sessions.map(async session => {
            const questions = await Question.find({ session: session.id });
            return { ...session, questions };
        }));

        res.status(200).json(sessionsWithQuestions);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

exports.getSessionByID = async (req, res) => {
    try {
        const session = await Session.findById(req.params.id);

        if (!session) {
            return res.status(404).json({ success: false, message: 'Session not found' });
        }

        const questions = await Question.find({ session: session.id });

        res.status(200).json({ success: true, session: { ...session, questions } });
    } catch (error) {
        console.error('Error fetching session:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

exports.deleteSession = async (req, res) => {
    try {
        const session = await Session.findById(req.params.id);
        if (!session) {
            return res.status(404).json({ success: false, message: 'Session not found' });
        }
        if (session.user.toString() !== req.user.id) {
            return res.status(403).json({ success: false, message: 'Unauthorized' });
        }

        await Question.deleteMany({ session: session.id });
        await Session.findByIdAndDelete(session.id);

        res.status(200).json({ success: true, message: 'Session deleted' });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error' });
    }
};
