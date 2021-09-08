const express = require("express");
const { signin, signup, signout } = require("../controllers/auth.controller");
const router = express.Router();

router.post("/signup", signup);
router.post("/signin", signin);
router.get("/signout", signout);

// any route containing :userId, our app will first execute userByID()
// router.param("userId", userById);

module.exports = router;
