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
router.put('/update/:id', async (req,res) => {
    try{
      
      const TasksId = req.params.id;
      const task = await Tasks.update(
      {
       ...req.body,
        user_id: req.session.user_id,
      },
      {
      where: {
        id: TasksId,
      },

    });
    console.log("update post",req.body);
    // await task.save();
    res.render('task',{ task, loggedIn: true });
  } catch (err) {
    res.status(500).json(err);
  }
  
  });