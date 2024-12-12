const UserModel = require("../../models/users/userSchema");
const { hashSync, compareSync } = require("bcrypt");
const dotenv = require("dotenv");
const { validateLogin, validateRegistration } = require("../../validators/userValidator");
const { generateToken, verifyToken } = require("../../utils/jwtUtils");
const { sendErrorResponse, sendSuccessResponse } = require("../../utils/responseUtils");

dotenv.config();

// Load secrets from config
const secretOrKey = process.env.JWT_SECRET;

/**
 * User login controller
 * - Validates user credentials
 * - Returns a JWT token in the response
 */
exports.login = async (req, res) => {
  const { email, password } = req.body;

  const { error } = validateLogin(req.body);
  if (error) return sendErrorResponse(res, 400, error.details[0].message);

  try {
    const user = await UserModel.findOne({
      $or: [
        { personalEmail: email },
        { collegeEmail: email }
      ]
    });    
    if (!user || !compareSync(password, user.password)) {
      return sendErrorResponse(res, 401, "Invalid email or password");
    }

    const payload = { email: user.email, id: user._id, userType: "internal" };
    const token = generateToken(payload, secretOrKey);

    sendSuccessResponse(res, 200, "Logged in successfully", { token, email: user.email, uid: user._id });
  } catch (err) {
    sendErrorResponse(res, 500, "Server error during login", err.message);
  }
};

/**
 * Check authentication middleware
 * - Verifies token in the Authorization header
 */
exports.checkAuth = (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return sendErrorResponse(res, 401, "User not authenticated");

  try {
    const decoded = verifyToken(token, secretOrKey);
    sendSuccessResponse(res, 200, "User is authenticated", { user: decoded });
  } catch (err) {
    sendErrorResponse(res, 401, "Invalid or expired token");
  }
};

/**
 * User logout controller
 * - Instructs frontend to clear the token
 */
exports.logout = (req, res) => {
  sendSuccessResponse(res, 200, "Logged out successfully. Please clear the token on the frontend.");
};

/**
 * User registration controller
 */
exports.register = async (req, res) => {
  const { error } = validateRegistration(req.body);
  if (error) return sendErrorResponse(res, 400, error.details[0].message);

  const { name, regNo, gender, phoneNumber, personalEmail, collegeEmail, facultyAdviserName, facultyAdviserEmail, section, branch, password } = req.body;

  try {
    const existingUser = await UserModel.findOne({ collegeEmail });
    if (existingUser) return sendErrorResponse(res, 400, "Email is already in use");

    const newUser = new UserModel({
      name,
      regNo,
      gender,
      phoneNumber,
      personalEmail,
      collegeEmail,
      facultyAdviserName,
      facultyAdviserEmail,
      section,
      branch,
      password: hashSync(password, 10),
    });

    const savedUser = await newUser.save();
    sendSuccessResponse(res, 201, "User registered successfully", {
      id: savedUser._id,
      name: savedUser.name,
      regNo: savedUser.regNo,
      email: savedUser.collegeEmail,
      section: savedUser.section,
      branch: savedUser.branch,
    });
  } catch (err) {
    sendErrorResponse(res, 500, "Error creating user", err.message);
  }
};

/**
 * Check if email exists
 */
exports.checkEmail = async (req, res) => {
  const { email } = req.body;

  if (!email) return sendErrorResponse(res, 400, "Email is required");

  try {
    const userExists = !!(await UserModel.findOne({ collegeEmail: email }));
    sendSuccessResponse(res, 200, "Email check completed", { exists: userExists });
  } catch (err) {
    sendErrorResponse(res, 500, "Error checking email", err.message);
  }
};
