import express from "express";
import { registerUser, loginUser } from "../Controller/userController.js";
import { protect } from "../middleware/auth.js";
import { getUserData } from "../Controller/userController.js";

const userRouter = express.Router();

//register user
userRouter.post("/register", registerUser);
//login user
userRouter.post("/login", loginUser);
//get user data
userRouter.get("/data", protect, getUserData);

export default userRouter;
