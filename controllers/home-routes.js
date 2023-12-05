const router = require("express").Router();
const { Tasks, User } = require("../models");
const withAuth = require("../utils/auth");
const taskRoutes = require("./api/task-routes"); // Import task routes

// Home route
router.get("/", (req, res) => {
  if (req.session.logged_in) {
    return res.redirect("/profile");
  }

  res.render("login");
});


router.get('/login', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  // if (req.session.logged_in) {
  //   res.redirect('/profile');
  //   return;
  // }

  res.render('login');
});



// Task dashboard route
router.get("/dashboard", withAuth, async (req, res) => {
  try {
    // Retrieve tasks associated with the logged-in user
    const dbTaskData = await Tasks.findAll({
      where: {
        user_id: req.session.user_id,
      },
      attributes: ["id", "title", "description", "startTime", "endTime"],
    });

    // Serialize data before passing to the template
    const tasks = dbTaskData.map((task) => task.get({ plain: true }));

    // Render the dashboard template with tasks data
    res.render("dashboard", { tasks, loggedIn: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Use task routes under /dashboard
// router.use("/dashboard", taskRoutes);

module.exports = router;
