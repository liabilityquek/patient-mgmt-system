const express = require("express");
const router = express.Router();
// You'll be creating this controller module next
const queuenoController = require("../controllers/queueno");

router.delete("/:id", queuenoController.deleteQueueNo);
router.post("/showqueue", queuenoController.createQueueNo);
router.get("/showqueue", queuenoController.showQueueNo);


module.exports = router;
