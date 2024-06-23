import * as dao from "./dao.js";

export default function QuizRoutes(app) {
    const createQuiz = async (req, res) => {
        const quiz = await dao.createQuiz(req.body);
        res.json(quiz);
    };

    const findQuizById = async (req, res) => {
        const quiz = await dao.findQuizById(req.params.quizId);
        res.json(quiz);
    };

    const submitQuizAnswers = async (req, res) => {
        const { userId, answers } = req.body;
        const quiz = await dao.findQuizById(req.params.quizId);

        // Calculate score
        let score = 0;
        quiz.questions.forEach(question => {
            if (answers[question.id] === question.correctAnswer) {
                score += question.points;
            }
        });

        const result = await dao.submitQuizAnswers(req.params.quizId, userId, answers, score);
        res.json({ score: result.score });
    };

    const updateQuiz = async (req, res) => {
        const quizId = req.params.quizId;
        const status = await dao.updateQuiz(quizId, req.body);
        res.json(status);
    };

    app.post("/api/quizzes", createQuiz);
    app.get("/api/quizzes/:quizId", findQuizById);
    app.post("/api/quizzes/:quizId/submit", submitQuizAnswers);
    app.put("/api/quizzes/:quizId", updateQuiz);
}
