// middleware/auth/userAuth.js
import jwt from "jsonwebtoken";

const userAuth = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    // Check Authorization header
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Not Authorized. Login again!" });
    }

    // Extract token
    const token = authHeader.split(" ")[1];

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach user id to request
    req.userId = decoded.id;

    next();
  } catch (error) {
    console.error("User Auth Error:", error.message);
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};

export default userAuth;
