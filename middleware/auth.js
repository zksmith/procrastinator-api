const jwt = require('jsonwebtoken');

const requireAuth = (req, res, next) => {
  const { authorizaton } = req.headers;

  if (!authorizaton) {
    return res.status(401).json('Unauthorized');
  }

  const jwtToken = authorizaton.slice(7, authorizaton.length);
  if (!jwt.verify(jwtToken, process.env.JWT_KEY)) {
    return res.status(401).json('Unauthorized');
  }

  return next();
};

module.exports = {
  requireAuth,
};
