// middleware/auth/adminAuth.js
import jwt from "jsonwebtoken";

const adminAuth = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Not Authorized. Login again!" });
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Only allow admins
    if (decoded.role !== "admin") {
      return res.status(403).json({ message: "Admin access only!" });
    }

    req.adminId = decoded.id; // optional, if you need admin id later
    next();
  } catch (error) {
    console.error("Admin Auth Error:", error.message);
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};

export default adminAuth;
