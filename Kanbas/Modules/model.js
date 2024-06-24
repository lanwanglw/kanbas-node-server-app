import mongoose from "mongoose";
import moduleSchema from "./schema.js";

const moduleModel = mongoose.model("Module", moduleSchema);

export default moduleModel;