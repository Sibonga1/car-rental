import express from "express";
import { protect } from "../middleware/auth.js";
import { changeRole } from "../Controller/ownerController.js";


const ownerRoutes = express.Router();

ownerRoutes.get("/change-role", protect, changeRole);

export default ownerRoutes;