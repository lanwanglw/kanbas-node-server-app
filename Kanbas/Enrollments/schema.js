import mongoose from "mongoose";
const enrollmentSchema = new mongoose.Schema(
    {
        course: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Course",
        },
        student: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "UserModel",
        },
        grade: Number,
    },
    { collection: "enrollments" }
);
export default enrollmentSchema;