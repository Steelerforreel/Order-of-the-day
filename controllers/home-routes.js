const router = require("express").Router();
const { Task, User } = require("../models");
const withAuth = require("../utils/auth");
const taskRoutes = require("./task-routes"); // Import task routes

// Home route
router.get("/", (req, res) => {
  if (req.session.logged_in) {
    return res.redirect("/dashboard");
  }

  res.render("login-signup");
});

// Login route
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });

    if (!user || !user.checkPassword(password)) {
      res.status(400).json({ message: "Incorrect email or password" });
      return;
    }

    req.session.save(() => {
      req.session.user_id = user.id;
      req.session.logged_in = true;
      res.json({ user, message: "Logged in successfully" });
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Signup route
router.post("/signup", async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const user = await User.create({ username, email, password });

    req.session.save(() => {
      req.session.user_id = user.id;
      req.session.logged_in = true;
      res.json({ user, message: "Signed up and logged in successfully" });
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Task dashboard route
router.get("/dashboard", withAuth, async (req, res) => {
  try {
    // Retrieve tasks associated with the logged-in user
    const dbTaskData = await Task.findAll({
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
router.use("/dashboard", taskRoutes);

module.exports = router;
