const jwt = require('jsonwebtoken');
const ErrorResponse = require('../utils/errorHandler');
const config = require('../config/config');

exports.protect = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return next(new ErrorResponse('Not authorized to access this route', 401));
  }

  try {
    const decoded = jwt.verify(token, config.JWT_SECRET);
    req.user = { id: decoded.id };
    next();
  } catch (err) {
    return next(new ErrorResponse('Not authorized to access this route', 401));
  }
};