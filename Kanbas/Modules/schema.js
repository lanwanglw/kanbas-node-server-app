import mongoose from "mongoose";

const moduleSchema = new mongoose.Schema(
    {
        title: String,
        description: String,
        course: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "CourseModel",
        },
        author: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "UserModel",
        },
    },
    { collection: "modules" }
);

export default moduleSchema;