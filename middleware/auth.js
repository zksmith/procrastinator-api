const jwt = require('jsonwebtoken');

const requireAuth = (req, res, next) => {
  const token = req.header('x-auth-token');

  if (!token) {
    return res.status(401).json('Unauthorized');
  }

  // Verify token
  try {
    const decoded = jwt.verify(token, process.env.JWT_KEY);

    req.id = decoded.id;
    next();
  } catch (err) {
    res.status(401).json({ msg: 'User token is not valid' });
  }
};

module.exports = {
  requireAuth,
};
