const express = require("express");
const router = express.Router();
const controller = require("../controllers/task.controller")

router.get("/", controller.index);
router.get("/detail/:id", controller.detail);
router.patch("/change-status/:id", controller.changeStatus);
router.patch("/change-mutil", controller.changeMutil)

module.exports = router;