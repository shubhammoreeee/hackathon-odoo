const express = require("express");
const authController = require("../controller/user.controller");

const router = express.Router();

router.post("/signup", authController.signup);
router.post("/verify-email", authController.verifyEmail);

module.exports = router;
