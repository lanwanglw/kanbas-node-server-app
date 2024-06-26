import moduleModel from "./model.js";

export async function findAllModules() {
    try {
        return await moduleModel.find();
    } catch (error) {
        console.error("Error finding all modules:", error);
        throw error;
    }
}

export async function createModule(module) {
    try {
        delete module._id;
        return await moduleModel.create(module);
    } catch (error) {
        console.error("Error creating module:", error);
        throw error;
    }
}

export async function findModulesByCourse(courseId) {
    try {
        return await moduleModel.find({ course: courseId });
    } catch (error) {
        console.error("Error finding modules by course:", error);
        throw error;
    }
}

export async function deleteModule(moduleId) {
    try {
        return await moduleModel.findByIdAndDelete(moduleId);
    } catch (error) {
        console.error("Error deleting module:", error);
        throw error;
    }
}

export async function updateModule(moduleId, module) {
    try {
        return await moduleModel.findByIdAndUpdate(moduleId, module, { new: true });
    } catch (error) {
        console.error("Error updating module:", error);
        throw error;
    }
}
