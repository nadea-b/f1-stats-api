const jwt = require("jsonwebtoken");
require("dotenv").config();

const authMiddleware = (requiredRoles = []) => (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Missing or invalid token" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;

    const hasPermission =
      decoded.role === "ADMIN" || requiredRoles.includes(decoded.role);
    if (!hasPermission) {
      return res.status(403).json({ message: "Forbidden" });
    }

    next();
  } catch (error) {
    res.status(401).json({ message: "Token expired or invalid" });
  }
};

module.exports = authMiddleware;
