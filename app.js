const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
require('dotenv').config();
const passport = require('passport');

// Import routes
const indexRouter = require('./routes/index');
const authentication = require('./routes/Auth');

// Initialize the application
const app = express();

// const apiUrl = process.env.API_URL;
// const apiFrontUrl = process.env.FRONTEND_API_URL;

// Middleware setup
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(passport.initialize());

// CORS setup
// app.use(cors({
//   origin: ['http://localhost:3000',[apiFrontUrl]],
//   credentials: true
// }));

// Routes setup
app.use('/api/v1/', indexRouter);
app.use('/api/v1/auth', authentication);

module.exports = app;