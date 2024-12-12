exports.sendSuccessResponse = (res, status, message, data = {}) =>
  res.status(status).json({ success: true, message, data });

exports.sendErrorResponse = (res, status, message, error = null) =>
  res.status(status).json({ success: false, message, error });
