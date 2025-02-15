const express = require("express");
const router = express.Router();
const {
  registerUser,
  getRegistrationInfo,
} = require("../controllers/registrationController");

// Register User for Event
router.post("/:event_id/register", registerUser);

// Get Registration Info
router.get("/:event_id/register/:user_id", getRegistrationInfo);

module.exports = router;