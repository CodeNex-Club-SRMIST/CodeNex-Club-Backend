const mongoose = require("mongoose");
const { user } = require("../../config/dbManager");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    regNo: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    gender: {
      type: String,
      required: true,
      enum: ["Male", "Female", "Other"],
    },
    phoneNumber: {
      type: String,
      required: true,
      match: /^[0-9]{10}$/,
    },
    personalEmail: {
      type: String,
      required: false,
      match: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
      trim: true,
    },
    collegeEmail: {
      type: String,
      required: true,
      match: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
      trim: true,
    },
    facultyAdviserName: {
      type: String,
      required: true,
      trim: true,
    },
    facultyAdviserEmail: {
      type: String,
      required: true,
      match: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
      trim: true,
    },
    section: {
      type: String,
      required: true,
      trim: true,
    },
    branch: {
      type: String,
      required: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.index({ regNo: 1 });
userSchema.index({ collegeEmail: 1 });

const dbConnection = user;
if (!dbConnection) {
  console.error(
    "Database connection is not established. Check your configuration."
  );
  process.exit(1);
}

const UserModel = dbConnection.model("users", userSchema);

module.exports = UserModel;
