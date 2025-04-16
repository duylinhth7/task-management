const express = require("express");
const router = express.Router();
const controller = require("../controllers/user.controller");
const userValidate = require("../../../validate/user.validate")

router.post("/register", userValidate.register, controller.register);
router.post("/login", userValidate.login, controller.login);

module.exports = router;