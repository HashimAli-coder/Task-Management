const Task = require("../models/Task");

// Create new task
exports.createTask = async (req, res) => {
  try {
    const { title, description, priority, status, dueDate } = req.body;

    // Simple validation
    if (!title || !dueDate) {
      return res.status(400).json({ message: "Title and dueDate are required" });
    }

    const task = await Task.create({
      user: req.user._id,
      title,
      description,
      priority: priority || "low",
      status: status || "pending",
      dueDate,
    });

    res.status(201).json(task);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};


// Get all tasks with filter, sort, pagination
exports.getTasks = async (req, res) => {
  try {
    const userId = req.user._id;

    let { page, limit, search, status, priority, sortBy, startDate, endDate } = req.query;

    page = parseInt(page) || 1;
    limit = parseInt(limit) || 10;
    const skip = (page - 1) * limit;

    const query = { user: userId };

    // Search by title or description
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
      ];
    }

    // Filter by status
    if (status) {
      query.status = status;
    }

    // Filter by priority
    if (priority) {
      query.priority = priority;
    }

    // Filter by dueDate range
    if (startDate || endDate) {
      query.dueDate = {};
      if (startDate) query.dueDate.$gte = new Date(startDate);
      if (endDate) query.dueDate.$lte = new Date(endDate);
    }

    // Sorting
    let sortOption = {};
    if (sortBy === "createdAt") sortOption.createdAt = -1;
    else if (sortBy === "dueDate") sortOption.dueDate = 1;
    else if (sortBy === "priority") sortOption.priority = 1;
    else sortOption.createdAt = -1; // default

    const tasks = await Task.find(query)
      .sort(sortOption)
      .skip(skip)
      .limit(limit);

    const total = await Task.countDocuments(query);

    res.json({
      tasks,
      total,
      page,
      pages: Math.ceil(total / limit),
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};


// Get single task
exports.getTask = async (req, res) => {};

// Update a task
exports.updateTask = async (req, res) => {
  try {
    const taskId = req.params.id;
    const userId = req.user._id;

    const task = await Task.findOne({ _id: taskId, user: userId });
    if (!task) return res.status(404).json({ message: "Task not found" });

    const { title, description, priority, status, dueDate } = req.body;

    // Update fields if provided
    if (title) task.title = title;
    if (description) task.description = description;
    if (priority) task.priority = priority;
    if (status) task.status = status;
    if (dueDate) task.dueDate = dueDate;

    await task.save();

    res.json(task);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};


// DELETE /api/tasks/:id
exports.deleteTask = async (req, res) => {
  try {
    const taskId = req.params.id;

    const task = await Task.findOne({ _id: taskId, user: req.user._id });
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    await Task.findByIdAndDelete(taskId);

    res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};


// Bulk update tasks (mark as completed)
exports.bulkUpdateTasks = async (req, res) => {
  try {
    const { taskIds, status } = req.body; // status can be "completed" or any

    if (!taskIds || !Array.isArray(taskIds) || taskIds.length === 0) {
      return res.status(400).json({ message: "taskIds array is required" });
    }

    const userId = req.user._id;

    const result = await Task.updateMany(
      { _id: { $in: taskIds }, user: userId },
      { $set: { status } }
    );

    res.json({ message: `${result.modifiedCount} tasks updated` });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.bulkDeleteTasks = async (req, res) => {
  try {
    const { taskIds } = req.body; // array of IDs

    if (!taskIds || taskIds.length === 0) {
      return res.status(400).json({ message: "No tasks selected for deletion" });
    }

    // Delete all tasks that belong to the authenticated user
    await Task.deleteMany({ _id: { $in: taskIds }, user: req.user._id });

    res.status(200).json({ message: "Selected tasks deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};


// Get task statistics
exports.getTaskStats = async (req, res) => {
  try {
    const userId = req.user._id;
    const now = new Date();

    const total = await Task.countDocuments({ user: userId });
    const completed = await Task.countDocuments({ user: userId, status: "completed" });
    const pending = await Task.countDocuments({ user: userId, status: { $in: ["pending", "in-progress"] } });
    const overdue = await Task.countDocuments({
      user: userId,
      status: { $ne: "completed" },
      dueDate: { $lt: now },
    });

    res.json({ total, completed, pending, overdue });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

