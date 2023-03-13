const mongoose = require("mongoose");
// optional shortcut to the mongoose.Schema class
const Schema = mongoose.Schema;

const loginSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: String,
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  }
);
loginSchema.virtual("createdAtFormatted").get(function () {
  return this.created_at.toLocaleString("en-UK");
});

loginSchema.virtual("updatedAtFormatted").get(function () {
  return this.updated_at.toLocaleString("en-UK");
});

const Login = mongoose.model("login", loginSchema);
module.exports = Login;
