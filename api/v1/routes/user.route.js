const express = require("express");
const router = express.Router();
const controller = require("../controllers/user.controller");
const userValidate = require("../../../validate/user.validate")

router.post("/register", userValidate.register, controller.register);
router.post("/login", userValidate.login, controller.login);
router.post("/password/forget", userValidate.forgetPassword, controller.forgetPassword);
router.post("/password/otp", userValidate.otpPassword, controller.otpPassword);
router.post("/password/reset", userValidate.resetPassword, controller.resetPassword);



module.exports = router;