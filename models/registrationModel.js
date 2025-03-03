const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const registrationSchema = new Schema(
  {
    eventId: {
      type: String,
      required: true,
      ref: "Event",
    },
    userId: {
      type: String,
      required: true,
      ref: "User",
    },
    registrationDate: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

const RegistrationModel = mongoose.model("Registration", registrationSchema);

module.exports = RegistrationModel;
