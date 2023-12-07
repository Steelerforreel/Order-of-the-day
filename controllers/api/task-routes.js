const router = require("express").Router();
const { Tasks } = require("../../models");
const withAuth = require("../../utils/auth");



router.post('/', withAuth, async (req, res) => {
console.log("router.post tasks");
  try {
    const newTask = await Tasks.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newTask);
  } catch (err) {
    res.status(400).json(err);
  }
});



// Delete Tasks Route
router.delete("/delete/:id", withAuth, async (req, res) => {
  try {
    const TasksId = req.params.id;

    const deletedTasks = await Tasks.destroy({
      where: { id: TasksId, user_id: req.session.user_id },
    });

    if (deletedTasks === 1) {
      res.status(204).end();
    } else {
      res.status(404).json({
        error: "Tasks not found or you do not have permission to delete",
      });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;

//update route
router.put('/:id', async (req,res) => {
    try{
      const TasksId = req.params.id;
      const task = await Tasks.update(
      {
        title: req.body.title,
        description: req.body.description,
        starting_time: req.body.starting_time,
        ending_time: req.body.ending_time,
        has_completed: req.body.has_completed
      },
      {
      where: {
        id: TasksId,
      },

    });
    // await task.save();
    res.status(200).json(dish);
  } catch (err) {
    res.status(500).json(err);
  }
  
  });

// Edit Tasks Route
// router.get("/edit/:id", withAuth, async (req, res) => {
//   try {
//     // Retrieve the Tasks data based on the Tasks ID
//     const dbTasksData = await Tasks.findByPk(req.params.id, {
//       attributes: ["id", "title", "description", "startTime", "endTime"],
//     });

//     // If the Tasks is not found, return an error
//     if (!dbTasksData) {
//       res.status(404).json({ message: "Tasks not found" });
//       return;
//     }

//     // Serialize data before passing to the template
//     const Tasks = dbTasksData.get({ plain: true });

//     // Render the edit-Tasks template with the Tasks data
//     res.render("edit-Tasks", { Tasks, loggedIn: true });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// });