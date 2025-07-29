import jwt from "jsonwebtoken";

const verifyToken = (req, res, next) => {
 const authHeader = req.headers.authorization;

 if (!authHeader?.startsWith("Bearer ")) {
    console.log("Token received: No token");
    return res.status(401).json({
      success: false,
      message: "Not Authorized. Log in first!",
    });
  }

  const token = authHeader.split(" ")[1];
  console.log("Token received:", token);

  try {
    console.log("Verifying token with JWT_SECRET:", process.env.JWT_SECRET ? "Set" : "Missing");
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Decoded JWT:", decoded);
    req.userId = decoded.userId;
    next();
  } catch (error) {
    console.error("JWT verification error:", error.message);
    res.status(401).json({
      success: false,
      message: "Invalid or expired token",
    });
  }

};

export default verifyToken;