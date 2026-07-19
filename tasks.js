// routes/tasks.js
// ----------------------------------------------------
// Yahan hum saare "endpoints" define karte hain.
// Har endpoint ek URL + HTTP method ka combination hai.
// Resource ka naam "tasks" hai (noun) — REST rule follow
// karte hue: /tasks (list/create), /tasks/:id (single item)
// ----------------------------------------------------

const express = require("express");
const router = express.Router();
const { tasks, getNextId } = require("../data/tasks");

// ------------------------------------------------------
// GET /tasks  -> Saare tasks ki list bhejo
// ------------------------------------------------------
router.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    count: tasks.length,
    data: tasks,
  });
});

// ------------------------------------------------------
// GET /tasks/:id  -> Ek specific task bhejo (uski id se)
// ------------------------------------------------------
router.get("/:id", (req, res) => {
  const id = Number(req.params.id);
  const task = tasks.find((t) => t.id === id);

  // Agar task nahi mila -> 404 Not Found
  if (!task) {
    return res.status(404).json({
      success: false,
      error: `Task with id ${id} not found`,
    });
  }

  res.status(200).json({ success: true, data: task });
});

// ------------------------------------------------------
// POST /tasks  -> Naya task banao
// ------------------------------------------------------
router.post("/", (req, res) => {
  const { title } = req.body;

  // -------- VALIDATION (yeh hi "API logic" ka core hai) --------
  // "Never trust the client" -> hamesha input check karo
  if (!title || typeof title !== "string" || title.trim() === "") {
    return res.status(400).json({
      success: false,
      error: "Title is required and must be a non-empty string",
    });
  }

  if (title.length > 100) {
    return res.status(400).json({
      success: false,
      error: "Title must be less than 100 characters",
    });
  }
  // ---------------------------------------------------------------

  const newTask = {
    id: getNextId(),
    title: title.trim(),
    done: false,
  };

  tasks.push(newTask);

  // 201 Created -> naya resource successfully bana
  res.status(201).json({ success: true, data: newTask });
});

// ------------------------------------------------------
// PUT /tasks/:id  -> Task update karo (e.g. done = true)
// ------------------------------------------------------
router.put("/:id", (req, res) => {
  const id = Number(req.params.id);
  const task = tasks.find((t) => t.id === id);

  if (!task) {
    return res.status(404).json({
      success: false,
      error: `Task with id ${id} not found`,
    });
  }

  const { title, done } = req.body;

  if (title !== undefined) {
    if (typeof title !== "string" || title.trim() === "") {
      return res.status(400).json({
        success: false,
        error: "Title must be a non-empty string",
      });
    }
    task.title = title.trim();
  }

  if (done !== undefined) {
    if (typeof done !== "boolean") {
      return res.status(400).json({
        success: false,
        error: "'done' must be true or false",
      });
    }
    task.done = done;
  }

  res.status(200).json({ success: true, data: task });
});

// ------------------------------------------------------
// DELETE /tasks/:id  -> Task delete karo
// ------------------------------------------------------
router.delete("/:id", (req, res) => {
  const id = Number(req.params.id);
  const index = tasks.findIndex((t) => t.id === id);

  if (index === -1) {
    return res.status(404).json({
      success: false,
      error: `Task with id ${id} not found`,
    });
  }

  tasks.splice(index, 1);

  // 204 No Content -> successfully delete hua, kuch return nahi karna
  res.status(204).send();
});

module.exports = router;
