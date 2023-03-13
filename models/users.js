const mongoose = require("mongoose");
const validator = require("validator");
// optional shortcut to the mongoose.Schema class
const Schema = mongoose.Schema;

const usersSchema = new Schema(
  {
    userid: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      unique: true,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      validate: [validator.isEmail, "Please provide a valid email address"],
      lowercase: true,
    },
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
    toJSON: {
      transform: (_doc, ret) => {
        delete ret.password;
        return ret;
      },
      owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
    },
  }
);

usersSchema.virtual("createdAtFormatted").get(function () {
  return this.created_at.toLocaleString("en-UK");
});

usersSchema.virtual("updatedAtFormatted").get(function () {
  return this.updated_at.toLocaleString("en-UK");
});

const User = mongoose.model("users", usersSchema);
module.exports = User;
