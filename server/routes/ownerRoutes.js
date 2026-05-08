import express from "express";
import { protect } from "../middleware/auth.js";
import { addCar, changeRole } from "../Controller/ownerController.js";
import upload from "../middleware/multer.js";

const ownerRoutes = express.Router();

ownerRoutes.post("/change-role", protect, changeRole);
ownerRoutes.post("/add-car", upload.single("image"), protect, addCar);

export default ownerRoutes;
