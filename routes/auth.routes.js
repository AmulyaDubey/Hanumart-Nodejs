const express = require("express");
const { signin, signup, signout, socialLogin } = require("../controllers/auth.controller");
const router = express.Router();

router.post("/signup", signup);
router.post("/signin", signin);
router.post("/social-login", socialLogin);
router.get("/signout", signout);

module.exports = router;
