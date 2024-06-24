import * as dao from "./dao.js";
import mongoose from "mongoose";
import Course from "../Courses/model.js";

export default function ModuleRoutes(app) {
    app.post("/api/courses/:cid/modules", async (req, res) => {
        const { cid } = req.params;
        const currentUser = req.session.currentUser;
        if (!currentUser) {
            res.sendStatus(401);
            return;
        }
        try {
            const course = await Course.findById(cid);
            if (!course) {
                res.status(400).send({ error: "Invalid course ID" });
                return;
            }
            const courseId = mongoose.Types.ObjectId(cid); // Convert cid to ObjectId
            const newModule = await dao.createModule({
                ...req.body,
                course: courseId,
                author: currentUser._id,
            });
            res.send(newModule);
        } catch (error) {
            res.status(500).send(error);
        }
    });

    app.get("/api/courses/:cid/modules", async (req, res) => {
        const { cid } = req.params;
        const currentUser = req.session.currentUser;
        if (!currentUser) {
            res.send([]);
            return;
        }
        try {
            const course = await Course.findById(cid);
            if (!course) {
                res.status(400).send({ error: "Invalid course ID" });
                return;
            }
            const courseId = mongoose.Types.ObjectId(cid); // Convert cid to ObjectId
            const modules = await dao.findModulesByCourse(courseId);
            res.send(modules);
        } catch (error) {
            res.status(500).send(error);
        }
    });

    app.get("/api/modules", async (req, res) => {
        const modules = await dao.findAllModules();
        res.send(modules);
    });

    app.delete("/api/modules/:mid", async (req, res) => {
        const { mid } = req.params;
        await dao.deleteModule(mid);
        res.sendStatus(204);
    });

    app.put("/api/modules/:mid", async (req, res) => {
        const { mid } = req.params;
        const module = req.body;
        await dao.updateModule(mid, module);
        res.sendStatus(204);
    });
}
