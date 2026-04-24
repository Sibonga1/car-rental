import jwt from "jsonwebtoken";
import User from "../models/User.js";

//middleware to protect routes
export const protect = async (req, res, next) => {
    //get token from the request header
    const token = req.headers.authorization;
    //check if token exists
    if (!token) {
        return res.status(401).json({ success: false, message: "Not authorized" });
    }
    //verify the token
    try {
        const userId = jwt.decode(token, process.env.JWT_SECRET);

        if (!userId) {
            return res.status(401).json({ success: false, message: "Not authorized" });
        }
        req.user = await User.findById(userId).select("-password")
        next();
    } catch (error) {
        return res.status(401).json({ success: false, message: "Not authorized" });
    }
}