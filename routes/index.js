const express = require("express");
const router = express.Router();
const passport = require("passport");
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

module.exports = router;
