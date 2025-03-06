const express = require("express");
const router = express.Router();
const passport = require("passport");
const { checkAuth } = require("../controllers/auth/authController");
require("../config/passport");

router.get('/', (req, res) => {
  res.send('Welcome to the API');
});

// exmaple routes implementation

/*
router.get("/api", apiController);

router.post(
  "/api",
  passport.authenticate("jwt", { session: false }),
  apiController
);
*/

router.post("/api/v1/event", (req, res, next) => {
  passport.authenticate("jwt", { session: false }), 
  checkAuth(["admin", "event_manager"], (req, res, next) => {
    const { name, date, location, description } = req.body;
    const newEvent = {id: events.length + 1, name, date, location, description};
    events.push(newEvents);
    res.status(200).json(newEvent);
  })
})

router.get("/api/v1/:event_id/about", (req, res, next) => {
  passport.authentication("jwt", { session: false}),
  checkAuth(["admin", "event_manager", "user"]),
  (req, res, next) => {
    const eventId = parseInt(req.params.event_id);
    const event = events.find(event => event.id === eventId);

    if(!event){
      return res.status(404).json({message: "Event not found"});
    }
    res.status(200).json(event);
  }
})

router.post(
  "/api/v1/:event_id/attendance/check-in/:user_id",
  passport.authenticate("jwt", { session: false }),
  checkAuth(["admin", "event_manager"]),
  (req, res) => {
    const eventId = parseInt(req.params.event_id, 10);
    const userId = parseInt(req.params.user_id, 10);
    const event = events.find(e => e.id === eventId);

    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    if (!event.attendees.includes(userId)) {
      event.attendees.push(userId);
      return res.status(200).json({ message: "User checked in successfully" });
    } else {
      return res.status(400).json({ message: "User already checked in" });
    }
  }
);

router.post(
  "/api/v1/:event_id/attendance/check-out/:user_id",
  passport.authenticate("jwt", { session: false }),
  checkAuth(["admin", "event_manager"]),
  (req, res) => {
    const eventId = parseInt(req.params.event_id, 10);
    const userId = parseInt(req.params.user_id, 10);
    const event = events.find(e => e.id === eventId);

    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    const attendeeIndex = event.attendees.indexOf(userId);
    if (attendeeIndex !== -1) {
      event.attendees.splice(attendeeIndex, 1);
      return res.status(200).json({ message: "User checked out successfully" });
    } else {
      return res.status(400).json({ message: "User not checked in" });
    }
  }
);

router.get(
  "/api/v1/:event_id/attendance",
  passport.authenticate("jwt", { session: false }),
  checkAuth(["admin", "event_manager", "user"]),
  (req, res) => {
    const eventId = parseInt(req.params.event_id, 10);
    const event = events.find(e => e.id === eventId);

    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    res.status(200).json({ attendees: event.attendees });
  }
);

module.exports = router;
