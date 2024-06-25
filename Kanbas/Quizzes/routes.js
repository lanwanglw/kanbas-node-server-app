import * as dao from "./dao.js";
import Course from "../Courses/model.js";
import mongoose from "mongoose";

export default function QuizRoutes(app) {
    // Create a quiz
    app.post("/api/quizzes", async (req, res) => {
        try {
            const quiz = await dao.createQuiz(req.body);
            res.status(201).json(quiz);
        } catch (error) {
            res.status(500).send(error);
        }
    });

    // Get a quiz by ID
    app.get("/api/quizzes/:quizId", async (req, res) => {
        try {
            const quiz = await dao.getQuizById(req.params.quizId);
            if (quiz) {
                res.json(quiz);
            } else {
                res.status(404).send('Quiz not found');
            }
        } catch (error) {
            res.status(500).send(error);
        }
    });

    // Get quizzes by student ID
    app.get("/api/students/:studentId/quizzes", async (req, res) => {
        const { studentId } = req.params;
        try {
            const courses = await Course.find({ students: studentId });
            const courseIds = courses.map(course => course._id);
            const quizzes = await dao.getQuizzesByCourseIds(courseIds);
            res.json(quizzes);
        } catch (error) {
            res.status(500).send(error);
        }
    });

    // Submit quiz answers
    app.post("/api/quizzes/:quizId/submit", async (req, res) => {
        const { userId, answers, attempt } = req.body;
        try {
            const quiz = await dao.getQuizById(req.params.quizId);
            if (!quiz) {
                return res.status(404).send('Quiz not found');
            }

            // Calculate score
            let score = 0;
            quiz.questions.forEach(question => {
                if (answers[question.id] === question.correctAnswer) {
                    score += question.points;
                }
            });

            const result = await dao.createOrUpdateQuizAnswer({
                quizId: req.params.quizId,
                userId,
                answers,
                score,
                attempt,
                submittedAt: new Date()
            });
            res.json({ score: result.score });
        } catch (error) {
            res.status(500).send(error);
        }
    });

    // Get quiz answers by quiz ID and user ID
    app.get("/api/quizzes/:quizId/answers/:userId", async (req, res) => {
        const { quizId, userId } = req.params;
        try {
            const quizAnswer = await dao.getQuizAnswerByQuizIdAndUserId(quizId, userId);
            if (quizAnswer) {
                res.json(quizAnswer);
            } else {
                res.status(404).send('Quiz answer not found');
            }
        } catch (error) {
            res.status(500).send(error);
        }
    });

    // Update a quiz
    app.put("/api/quizzes/:quizId", async (req, res) => {
        const quizId = req.params.quizId;
        try {
            const updatedQuiz = await dao.updateQuiz(quizId, req.body);
            res.json(updatedQuiz);
        } catch (error) {
            res.status(500).send(error);
        }
    });
}
