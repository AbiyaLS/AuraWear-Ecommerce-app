// middleware/auth/adminAuth.js
import jwt from "jsonwebtoken";

const adminAuth = async (req, res, next) => {
  try {
    let token = req.headers.token;

    // Also support Authorization header
    if (!token && req.headers.authorization) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
      return res.status(401).json({ message: "Not Authorized. Login again!" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const adminKey = process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD;

    if (decoded !== adminKey) {
      return res.status(401).json({ message: "Not Authorized. Login again!" });
    }

    next();
  } catch (error) {
    console.error("Admin Auth Error:", error.message);
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};

export default adminAuth;
