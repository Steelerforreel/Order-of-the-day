const router = require("express").Router();

const userRoutes = require("./user-routes");
const taskRoutes = require("./task-routes");

router.use("/user", userRoutes);
router.use("/task", taskRoutes);

module.exports = router;
