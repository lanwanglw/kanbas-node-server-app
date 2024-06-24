import moduleModel from "./model.js";

export function findAllModules() {
    return moduleModel.find();
}

export function createModule(module) {
    delete module._id;
    return moduleModel.create(module);
}

export function findModulesByCourse(courseId) {
    return moduleModel.find({ course: courseId });
}

export function deleteModule(moduleId) {
    return moduleModel.findByIdAndDelete(moduleId);
}

export function updateModule(moduleId, module) {
    return moduleModel.findByIdAndUpdate(moduleId, module, { new: true });
}