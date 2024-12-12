const passport = require('passport');
const { Strategy: JwtStrategy, ExtractJwt } = require('passport-jwt');
const UserModel = require("../models/users/userSchema");
require('dotenv').config();

const cookieExtractor = (req) => {
  if (req && req.cookies) {
    return req.cookies['token'] || null;
  }
  return null;
};

const jwtOpts = {
  jwtFromRequest: ExtractJwt.fromExtractors([cookieExtractor]),
  secretOrKey: process.env.JWT_SECRET,
  algorithms: ['HS256'],
};

passport.use(
  new JwtStrategy(jwtOpts, async (jwt_payload, done) => {
    try {
      if (jwt_payload.userType === "external") {
        return done(null, true);
      }

      const user = await UserModel.findById(jwt_payload.id);
      if (user) {
        return done(null, user);
      }

      return done(null, false, { message: 'User not found' });
    } catch (error) {
      console.error('Error in JWT Strategy:', error.message);
      return done(error, false);
    }
  })
);

module.exports = {
  initialize: () => passport.initialize(),
  authenticate: (options) => passport.authenticate('jwt', { session: false, ...options }),
};
