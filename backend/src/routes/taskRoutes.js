const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const {
  createTask,
  getTasks,
  getTask,
  updateTask,
  deleteTask,
  bulkUpdateTasks,
  bulkDeleteTasks,
  getTaskStats,
} = require("../controllers/taskController");

// All routes are protected
router.use(protect);

// Create new task
router.post("/", createTask);

// Get all tasks
router.get("/", getTasks);

// Task statistics
router.get("/stats", getTaskStats);

// Bulk operations
router.patch("/bulk-update", bulkUpdateTasks);
router.delete("/bulk-delete", bulkDeleteTasks);

// Get single task
router.get("/:id", getTask);

// Update task
router.put("/:id", updateTask);

// Delete task
router.delete("/:id", deleteTask);

module.exports = router;
