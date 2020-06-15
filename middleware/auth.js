const jwt = require('jsonwebtoken');

const requireAuth = (req, res, next) => {
  const { authorizaton } = req.headers;

  if (!authorizaton) {
    return res.status(401).json('Unauthorized');
  }

  return next();
};

module.exports = {
  requireAuth,
};
