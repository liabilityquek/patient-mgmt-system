const express = require("express");
const router = express.Router();
// You'll be creating this controller module next
const queuenoController = require("../controllers/queueno");
const {isAuth} = require("../controllers/users");

router.delete("/:id", isAuth, queuenoController.deleteQueueNo);
router.post("/showqueue", isAuth, queuenoController.createQueueNo);
router.get("/showqueue", isAuth, queuenoController.showQueueNo);


module.exports = router;
