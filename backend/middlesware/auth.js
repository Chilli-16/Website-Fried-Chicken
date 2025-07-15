import jwt from "jsonwebtoken";

const authMiddleware = async (req, res, next) => {
    const authHeader = req.headers['authorization'];
    console.log("Authorization Header:", authHeader); // Log header for debugging

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ success: false, message: "Not Authorized. Invalid header format." });
    }

    const token = authHeader.split(' ')[1]; // Extract token

    if (!token) {
        return res.status(401).json({ success: false, message: "Not Authorized. Please log in again." });
    }

    try {
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        req.userId = decodedToken.id; // Attach `userId` to `req` object
        next(); // Proceed to next middleware or route handler
    } catch (error) {
        console.error("JWT Error:", error); // Improved logging
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({ success: false, message: "Token has expired" });
        } else if (error.name === 'JsonWebTokenError') {
            return res.status(401).json({ success: false, message: "Invalid token" });
        }
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};

export default authMiddleware;
