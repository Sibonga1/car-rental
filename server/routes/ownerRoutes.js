import express from "express";
import { protect } from "../middleware/auth.js";
import { addCar, changeRole, deleteCar, GetOwnerCars, getDashboardData, toggleCarAvailability, updateUserImage } from "../Controller/ownerController.js";
import upload from "../middleware/multer.js";

const ownerRoutes = express.Router();

ownerRoutes.post("/change-role", protect, changeRole);
ownerRoutes.post("/add-car", upload.single("image"), protect, addCar);
ownerRoutes.get("/cars", protect, GetOwnerCars);
ownerRoutes.post("/toggle-car", protect, toggleCarAvailability);
ownerRoutes.post("/delete-car", protect, deleteCar);

ownerRoutes.get("/dashboard", protect, getDashboardData);
ownerRoutes.post("/update-image", upload.single("image"), protect, updateUserImage);




export default ownerRoutes;
