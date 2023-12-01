const router = require("express").Router();
const { Task } = require("../models");
const withAuth = require("../utils/auth");

// Add Task Route
router.get("/add", withAuth, (req, res) => {
  // Render the page for adding a new task
  res.render("add-task", { loggedIn: true });
});

// Edit Task Route
router.get("/edit/:id", withAuth, async (req, res) => {
  try {
    // Retrieve the task data based on the task ID
    const dbTaskData = await Task.findByPk(req.params.id, {
      attributes: ["id", "title", "description", "startTime", "endTime"],
    });

    // If the task is not found, return an error
    if (!dbTaskData) {
      res.status(404).json({ message: "Task not found" });
      return;
    }

    // Serialize data before passing to the template
    const task = dbTaskData.get({ plain: true });

    // Render the edit-task template with the task data
    res.render("edit-task", { task, loggedIn: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Delete Task Route
router.delete("/delete/:id", withAuth, async (req, res) => {
  try {
    const taskId = req.params.id;

    const deletedTask = await Task.destroy({
      where: { id: taskId, user_id: req.session.user_id },
    });

    if (deletedTask === 1) {
      res.status(204).end();
    } else {
      res.status(404).json({
        error: "Task not found or you do not have permission to delete",
      });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
