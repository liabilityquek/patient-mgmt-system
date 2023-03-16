const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const options = {
  year: "numeric",
  month: "numeric",
  day: "numeric",
};

const patientLogSchema = new Schema(
  {
    content: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: {
      createdAt: "created_time",
      updatedAt: "updated_time",
    },
  }
);

patientLogSchema.virtual("createdAtFormatted").get(function () {
  return new Date(this.created_time).toLocaleString("en-UK", {
    day: "numeric",
    month: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
  });
});

patientLogSchema.virtual("updatedAtFormatted").get(function () {
  return new Date(this.updated_time).toLocaleString("en-UK", {
    day: "numeric",
    month: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
  });
});

const patientSchema = new Schema(
  {
    nricfin: {
      type: String,
      unique: true,
      required: true,
      match: /^[0-9]{4}[A-Za-z]{1}$/,
      minlength: 5,
      message: "NRIC/FIN must be 5 characters long",
    },
    name: {
      type: String,
      unique: true,
      required: true,
    },
    contactno: {
      type: String,
      unique: true,
      required: true,
    },
    dob: {
      type: Date,
      required: true,
    },
    gender: {
      type: String,
      required: true,
      enum: ["MALE", "FEMALE"],
      validate: {
        validator: function (v) {
          return ["MALE", "FEMALE"].includes(v);
        },
        message: "Invalid gender type",
      },
    },
    nationality: {
      type: String,
      required: true,
      enum: ["SINGAPOREAN", "WORK PERMIT", "PR", "S-PASS", "E-PASS"],
      validate: {
        validator: function (v) {
          return [
            "SINGAPOREAN",
            "WORK PERMIT",
            "PR",
            "S-PASS",
            "E-PASS",
          ].includes(v);
        },
        message: "Invalid Nationality",
      },
    },
    streetaddress: {
      type: String,
      required: true,
    },
    postalcode: {
      type: String,
      required: true,
      validate: {
        validator: function (v) {
          return (v.toString().length = 6);
        },
        message: "Postal Code must be 6 digits long",
      },
    },
    unitno: {
      type: String,
      required: true,
    },
    drugallergies: {
      type: [String],
      required: true,
    },
    vaccination: {
      type: String,
      required: true,
      enum: ["YES", "NO"],
      validate: {
        validator: function (v) {
          return ["YES", "NO"].includes(v);
        },
        message: "Invalid option",
      },
    },
    vaccinationtype: {
      type: String,
      enum: [" ", "PFIZER", "MODERNA", "NOVAVAX", "SINOVAC"],
      validate: {
        validator: function (v) {
          return [" ", "PFIZER", "MODERNA", "NOVAVAX", "SINOVAC"].includes(v);
        },
        message: "Invalid vaccination type",
      },
    },

    log: [patientLogSchema],
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  }
);
patientSchema.virtual("createdAtFormatted").get(function () {
  return this.created_at.toLocaleString("en-UK");
});

patientSchema.virtual("updatedAtFormatted").get(function () {
  return this.updated_at.toLocaleString("en-UK");
});

patientSchema.virtual("dobFormatted").get(function () {
  const date = new Date(this.dob);
  return date.toLocaleDateString("en-Uk", options);
});

const Patient = mongoose.model("Patient", patientSchema);
module.exports = Patient;
