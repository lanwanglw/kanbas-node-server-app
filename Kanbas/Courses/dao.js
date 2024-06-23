import courseModel from "./model.js";

export function findAllCourses() {
    return courseModel.find();
}
export function createCourse(course) {
    delete course._id;
    return courseModel.create(course);
}
export function findCoursesByAuthor(author) {
    return courseModel.find({ author });
}