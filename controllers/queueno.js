const QueueNo = require("../models/queueno");

const createQueueNo = async (req, res) => {
  try {
    const maxQueueNo = await QueueNo.findOne().sort("-queueNo").exec();
    const nextQueueNo = maxQueueNo ? maxQueueNo.queueNo + 1 : 1;
    const queueNo = new QueueNo({
      ...req.body,
      queueNo: nextQueueNo,
    });

    const savedQueueNo = await queueNo.save(); 

    console.log(`savedQueueNo: ${savedQueueNo}`);

    res.redirect("/queueno/showqueue");

  } catch (err) {
    if (err.code === 11000) {
      console.log(`Create queue error: ${err}`);
      res.render("queueno/error", { message: "Error generating queueno" });
    } else {
      console.log(err);
      res.status(500).send("Internal Server Error");
    }
  }
};

const showQueueNo = async (req, res) => {

  try {
    const queueno = await QueueNo.find().sort({type: 1}).exec();

    res.render("queueno/showqueue", { queueno });
  } catch (err) {
    console.log(`Error showing queueno: ${err}`);
    res.render("queueno/error", { message: "Error showing queue no" });
  }
};

const deleteQueueNo = (req, res) => {
  const id = req.params.id;
  console.log(`objectID: ${id}`);
  QueueNo.findByIdAndDelete(id)
    .exec()
    .then(() => {
      res.redirect("/queueno/showqueue");
    });
};

module.exports = {
  createQueueNo,
  showQueueNo,
  deleteQueueNo,
};
