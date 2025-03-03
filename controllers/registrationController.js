const RegistrationModel = require("../models/registrationModel");

// Register User for an Event
exports.registerUser = async (req, res) => {
  try {
    const { event_id } = req.params;
    const { userId } = req.body;

    if (!userId) {
      return res.status(400).json({ message: "User ID is required" });
    }

    // Check if the user is already registered for the event
    const existingRegistration = await RegistrationModel.findOne({
      eventId: event_id,
      userId,
    });

    if (existingRegistration) {
      return res.status(409).json({ message: "User already registered for this event" });
    }

    // Create a new registration
    const registration = new RegistrationModel({
      eventId: event_id,
      userId,
    });

    await registration.save();

    res.status(201).json({
      message: "User registered successfully",
      registration,
    });
  } catch (error) {
    console.error("Registration Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Get Registration Information
exports.getRegistrationInfo = async (req, res) => {
  try {
    const { event_id, user_id } = req.params;

    const registration = await RegistrationModel.findOne({
      eventId: event_id,
      userId: user_id,
    }).populate("userId", "name regNo collegeEmail");

    if (!registration) {
      return res.status(404).json({ message: "Registration not found" });
    }

    res.status(200).json({ registration });
  } catch (error) {
    console.error("Fetch Registration Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
