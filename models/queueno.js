const mongoose = require("mongoose");
// optional shortcut to the mongoose.Schema class
const Schema = mongoose.Schema;

const options = {
  weekday: "long",
  year: "numeric",
  month: "numeric",
  day: "numeric",
};
let today = new Date();
let currentDay = today.toLocaleDateString("en-Uk", options) + " Queue";

const queueNoSchema = new Schema(
  {
    queueNo: {
      type: Number,
      unique: true,
      required: true,
    },
    name: {
      type: String,
      unique: true,
      required: true,
    },
    type: {
      type: String,
      enum: ['Priority', 'Normal'],
      validate: {
        validator: function(v) {
          return ['Priority', 'Normal'].includes(v);
        },
        message: "Queue Type is invalid"
      }
    },
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  }
);

queueNoSchema.virtual("createdAtFormatted").get(function () {
  return this.created_at.toLocaleString("en-UK");
});

queueNoSchema.virtual("updatedAtFormatted").get(function () {
  return this.updated_at.toLocaleString("en-UK");
});

const QueueNo = mongoose.model(currentDay, queueNoSchema);
module.exports = QueueNo;
