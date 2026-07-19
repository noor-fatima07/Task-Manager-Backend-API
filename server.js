// server.js
// ----------------------------------------------------
// Yeh humara MAIN file hai — server yahin se start hota hai.
// ----------------------------------------------------

const express = require("express");
const taskRoutes = require("./routes/tasks");

const app = express();

// Middleware: incoming JSON body ko parse karne ke liye
// (isके bina req.body undefined aayega)
app.use(express.json());

// Simple request logger (dekhne ke liye har request console mein aaye)
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

// Root route -> health check
app.get("/", (req, res) => {
  res.status(200).json({
    message: "Task Manager API is running 🚀",
    endpoints: {
      "GET /tasks": "Get all tasks",
      "GET /tasks/:id": "Get single task",
      "POST /tasks": "Create new task (body: { title })",
      "PUT /tasks/:id": "Update task (body: { title?, done? })",
      "DELETE /tasks/:id": "Delete task",
    },
  });
});

// Saare /tasks routes ko yahan "mount" karo
app.use("/tasks", taskRoutes);

// -----------------------------------------
// 404 Handler -> jo bhi route match na ho
// -----------------------------------------
app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: `Route ${req.method} ${req.originalUrl} not found`,
  });
});

// -----------------------------------------
// Global Error Handler -> agar kahin crash ho
// (500 Internal Server Error)
// -----------------------------------------
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    error: "Something went wrong on the server",
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
