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
            const courseId = mongoose.Types.ObjectId(cid);
            const newModule = await dao.createModule({
                ...req.body,
                course: courseId,
                author: currentUser._id,
            });
            res.send(newModule);
        } catch (error) {
            console.error("Error creating module:", error);
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
            const courseId = mongoose.Types.ObjectId(cid);
            const modules = await dao.findModulesByCourse(courseId);
            res.send(modules);
        } catch (error) {
            console.error("Error fetching modules:", error);
            res.status(500).send(error);
        }
    });

    app.get("/api/modules", async (req, res) => {
        try {
            const modules = await dao.findAllModules();
            res.send(modules);
        } catch (error) {
            console.error("Error fetching all modules:", error);
            res.status(500).send(error);
        }
    });

    app.delete("/api/modules/:mid", async (req, res) => {
        const { mid } = req.params;
        try {
            await dao.deleteModule(mid);
            res.sendStatus(204);
        } catch (error) {
            console.error("Error deleting module:", error);
            res.status(500).send(error);
        }
    });

    app.put("/api/modules/:mid", async (req, res) => {
        const { mid } = req.params;
        const module = req.body;
        try {
            await dao.updateModule(mid, module);
            res.sendStatus(204);
        } catch (error) {
            console.error("Error updating module:", error);
            res.status(500).send(error);
        }
    });
}
