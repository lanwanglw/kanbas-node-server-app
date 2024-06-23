import mongoose from 'mongoose';

const questionSchema = new mongoose.Schema({
    id: Number,
    title: String,
    text: String,
    type: String,
    points: Number,
    choices: [String],
    correctAnswer: String
});

const quizSchema = new mongoose.Schema({
    id: Number,
    title: String,
    description: String,
    questions: [questionSchema],
    published: Boolean,
    score: Number
});

const quizAnswerSchema = new mongoose.Schema({
    quizId: Number,
    userId: String,
    answers: Object,
    score: Number,
    submittedAt: Date
});

const Quiz = mongoose.model('Quiz', quizSchema);
const QuizAnswer = mongoose.model('QuizAnswer', quizAnswerSchema);

export { Quiz, QuizAnswer };
