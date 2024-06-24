import enrollmentModel from "./model.js";

export function findAllEnrollments() {
    return enrollmentModel.find();
}
export function createEnrollment(enrollment) {
    return enrollmentModel.create(enrollment);
}
export function unenrollStudentFromCourse(student, course) {
    return enrollmentModel.deleteOne({ student, course });
}

export function findEnrollmentsByStudent(student) {
    return enrollmentModel.find({ student }).populate("course");
}
export function findEnrollmentsByCourse(course) {
    return enrollmentModel.find({ course }).populate("student");
}