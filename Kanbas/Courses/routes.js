import Database from "../Database/index.js";
import * as dao from "./dao.js";
export default function CourseRoutes(app) {
    app.post("/api/courses", async (req, res) => {
        const currenUser = req.session.currentUser;
        if (!currenUser) {
            res.sendStatus(401);
            return;
        }
        const course = await dao.createCourse({
            ...req.body,
            author: currenUser._id,
        });
        // Database.courses.push(course);
        res.send(course);
    });
    app.get("/api/courses/published", async (req, res) => {
        const currentUser = req.session.currentUser;
        if (!currentUser) {
            res.send([]);
            return;
        }
        const courses = await dao.findCoursesByAuthor(currentUser._id);
        res.send(courses);
    });
    app.get("/api/courses", async (req, res) => {
        // const courses = Database.courses;
        const courses = await dao.findAllCourses();
        res.send(courses);
    });
    app.delete("/api/courses/:id", (req, res) => {
        const { id } = req.params;
        Database.courses = Database.courses.filter((c) => c._id !== id);
        res.sendStatus(204);
    });
    app.put("/api/courses/:id", (req, res) => {
        const { id } = req.params;
        const course = req.body;
        console.log(id, course);
        Database.courses = Database.courses.map((c) =>
            c._id === id ? { ...c, ...course } : c
        );
        console.log(Database.courses);
        res.sendStatus(204);
    });
}