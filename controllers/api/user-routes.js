const router = require("express").Router();
const { User } = require("../../models");
const bcrypt = require("bcrypt");
const withAuth = require("../../utils/auth");

/// Login route
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

    const user = await User.create({
      username,
      email,
      password: hashedPassword,
    });

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

// Logout
router.post("/logout", (req, res) => {
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;
