import { Quiz, QuizAnswer } from './schema.js';

// Define the DAO functions
export const createQuiz = async (quizData) => {
    const quiz = new Quiz(quizData);
    await quiz.save();
    return quiz;
};

export const getQuizById = async (id) => {
    return await Quiz.findById(id);
};

export const getAllQuizzes = async () => {
    return await Quiz.find();
};

export const updateQuiz = async (id, updatedData) => {
    return await Quiz.findByIdAndUpdate(id, updatedData, { new: true });
};

export const deleteQuiz = async (id) => {
    return await Quiz.findByIdAndDelete(id);
};

export const createQuizAnswer = async (quizAnswerData) => {
    const quizAnswer = new QuizAnswer(quizAnswerData);
    await quizAnswer.save();
    return quizAnswer;
};

export const getQuizAnswer = async (quizId, userId) => {
    return await QuizAnswer.findOne({ quizId, userId });
};

export const updateQuizAnswer = async (quizId, userId, answers) => {
    return await QuizAnswer.findOneAndUpdate({ quizId, userId }, { answers, submittedAt: new Date() }, { new: true });
};
