const jwt = require('jsonwebtoken');
require('dotenv').config();

const SECRET_KEY = process.env.JWT_SECRET;

// ========================
// Middleware: Authenticate JWT
// ========================
exports.authenticate = (req, res, next) => {
  const authHeader = req.headers.authorization ;

  

  const token = authHeader?.split(" ")[1] || req?.body?.token || req.cookies?.token;

  console.log(token)

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    
    // Insert user info into request body
    req.body.user = {
      id: decoded.userId,
      username: decoded.username,
      role: decoded.role || 'user' // default to user if not present
    };

    next();
  } catch (err) {
    return res.status(401).json({ success: false, message: "Invalid or expired token" });
  }
};

// ========================
// Middleware: Role Authorization
// Usage: authorizeRoles('admin', 'moderator')
// ========================
exports.authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!req.body.user || !roles.includes(req.body.user.role)) {
      return res.status(403).json({ success: false, message: "Access denied. Insufficient permissions." });
    }
    next();
  };
};
