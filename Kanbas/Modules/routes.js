import * as dao from "./dao.js";
export default function ModuleRoutes(app) {
    app.post("/api/courses/:cid/modules", async (req, res) => {
        const { cid } = req.params;
        const currentUser = req.session.currentUser;
        if (!currentUser) {
            res.sendStatus(401);
            return;
        }
        const newModule = await dao.createModule({
            ...req.body,
            course: cid,
            author: currentUser._id,
        });
        res.send(newModule);
    });

    app.get("/api/courses/:cid/modules", async (req, res) => {
        const { cid } = req.params;
        const currentUser = req.session.currentUser;
        if (!currentUser) {
            res.send([]);
            return;
        }
        const modules = await dao.findModulesByCourse(cid);
        res.send(modules);
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
