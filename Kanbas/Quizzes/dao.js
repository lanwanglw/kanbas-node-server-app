import { Quiz, QuizAnswer } from './schema.js';

// Define the DAO functions
export const createQuiz = async (quizData) => {
    const quiz = new Quiz(quizData);
    await quiz.save();
    return quiz;
};

export const getQuizById = async (id) => {
    return Quiz.findById(id);
};

export const getAllQuizzes = async () => {
    return Quiz.find();
};

export const updateQuiz = async (id, updatedData) => {
    return Quiz.findByIdAndUpdate(id, updatedData, {new: true});
};

export const deleteQuiz = async (id) => {
    return Quiz.findByIdAndDelete(id);
};

export const createQuizAnswer = async (quizAnswerData) => {
    const quizAnswer = new QuizAnswer(quizAnswerData);
    await quizAnswer.save();
    return quizAnswer;
};

export const getQuizAnswer = async (quizId, userId) => {
    return QuizAnswer.findOne({quizId, userId});
};

export const updateQuizAnswer = async (quizId, userId, answers) => {
    return QuizAnswer.findOneAndUpdate({quizId, userId}, {answers, submittedAt: new Date()}, {new: true});
};

// Create or update quiz answers for a specific user and attempt
export const createOrUpdateQuizAnswer = async (quizAnswerData) => {
    const { quizId, userId, attempt } = quizAnswerData;
    const existingAnswer = await QuizAnswer.findOne({ quizId: quizAnswerData.quizId, userId: quizAnswerData.userId, attempt });
    if (existingAnswer) {
        existingAnswer.answers = quizAnswerData.answers;
        existingAnswer.score = quizAnswerData.score;
        existingAnswer.submittedAt = new Date();
        await existingAnswer.save();
        return existingAnswer;
    } else {
        const quizAnswer = new QuizAnswer(quizAnswerData);
        await quizAnswer.save();
        return quizAnswer;
    }
};

// Fetch quiz answers for a specific user
export const getQuizAnswerByQuizIdAndUserId = async (quizId, userId) => {
    return QuizAnswer.findOne({quizId, userId}).sort({ attempt: -1 });
};

// Fetch all quiz attempts for a specific user
export const getQuizAttemptsByQuizIdAndUserId = async (quizId, userId) => {
    return QuizAnswer.find({quizId, userId}).sort({attempt: 1});
};

export const getQuizzesByCourseIds = async (courseIds) => {
    return Quiz.find({course: {$in: courseIds}});
};