import db from "../Database/index.js";

export default function AssignmentRoutes(app) {
    app.get("/api/courses/:cid/modules/assignments", (req, res) => {
        const { cid } = req.params;
        const assignments = db.assignments.filter((a) => a.course === cid);
        res.json(assignments);
    });

    app.post("/api/courses/:cid/modules/assignments", (req, res) => {
        const { cid } = req.params;
        const { title, points, due_date, available_date, description } = req.body;

        if (!title || !points || !due_date || !available_date || !description) {
            return res.status(400).json({ error: "All fields are required" });
        }

        const newAssignment = {
            title,
            points: Number(points),
            due_date,
            available_date,
            description,
            course: cid,
            _id: new Date().getTime().toString(),
        };
        db.assignments.push(newAssignment);
        res.status(201).json(newAssignment);
    });

    app.put("/api/assignments/:aid", (req, res) => {
        const { aid } = req.params;
        const assignmentIndex = db.assignments.findIndex((a) => a._id === aid);
        if (assignmentIndex === -1) {
            return res.status(404).json({ error: "Assignment not found" });
        }
        db.assignments[assignmentIndex] = {
            ...db.assignments[assignmentIndex],
            ...req.body
        };
        res.sendStatus(204);
    });

    app.delete("/api/courses/:cid/modules/assignments/:aid", (req, res) => {
        const { aid } = req.params;
        const index = db.assignments.findIndex((a) => a._id === aid);
        if (index === -1) {
            return res.status(404).json({ error: "Assignment not found" });
        }
        db.assignments.splice(index, 1);
        res.sendStatus(204);
    });
}
