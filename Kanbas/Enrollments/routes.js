import * as dao from "./dao.js";
export default function EnrollmentRoutes(app) {
    app.get("/api/enrollments", async (req, res) => {
        const currentUser = req.session.currentUser;
        if (!currentUser) {
            const enrollments = await dao.findAllEnrollments();
            res.json(enrollments);
            return;
        }
        const enrollments = await dao.findEnrollmentsByStudent(currentUser._id);
        const courses = enrollments.map((e) => e.course);
        res.json(courses);
    });
    app.delete("/api/enrollments/course/:courseId", async (req, res) => {
        const currentUser = req.session.currentUser;
        if (!currentUser) {
            res.sendStatus(401);
            return;
        }
        const courseId = req.params.courseId;
        const result = await dao.unenrollStudentFromCourse(
            currentUser._id,
            courseId
        );
        res.json(result);
    });
    app.post("/api/enrollments", async (req, res) => {
        const currentUser = req.session.currentUser;
        if (!currentUser) {
            const enrollment = req.body;
            const result = await dao.createEnrollment(enrollment);
            res.json(result);
            return;
        }
        const enrollment = { ...req.body, student: currentUser._id };
        const newEnrollment = await dao.createEnrollment(enrollment);
        res.json(newEnrollment);
    });
    app.get("/api/student/:student/courses", async (req, res) => {
        const student = req.params.student;
        const enrollments = await dao.findEnrollmentsByStudent(student);
        const courses = enrollments.map((e) => e.course);
        res.json(courses);
    });
    app.get("/api/course/:course/students", async (req, res) => {
        const course = req.params.course;
        const enrollments = await dao.findEnrollmentsByCourse(course);
        const students = enrollments.map((e) => e.student);
        res.json(students);
    });
}