const mongoose = require("mongoose");
// optional shortcut to the mongoose.Schema class
const Schema = mongoose.Schema;

let today = new Date();

const midnight = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 0, 0, 0, 0 );
const expireDuration = (midnight - today) / 1000;

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
  },
  
);

queueNoSchema.virtual("createdAtFormatted").get(function () {
  return this.created_at.toLocaleString("en-UK");
});

queueNoSchema.virtual("updatedAtFormatted").get(function () {
  return this.updated_at.toLocaleString("en-UK");
});

queueNoSchema.index({created_at: 1}, { expireAfterSeconds: expireDuration });

const QueueNo = mongoose.model('QueueNo', queueNoSchema);
module.exports = QueueNo;
