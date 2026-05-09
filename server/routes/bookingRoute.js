import express from "express";
import { checkAvalabilityOfCar, createBooking, getOwnerBookings, getUserBookings, changeBookingStatus } from "../Controller/bookingController.js";
import { protect } from "../middleware/auth.js";


const bookingRoute = express.Router();

bookingRoute.post("/check-availability", checkAvalabilityOfCar);
bookingRoute.post("/create", protect, createBooking);
bookingRoute.get("/user", protect, getUserBookings);
bookingRoute.get("/owner", protect, getOwnerBookings);
bookingRoute.post("/change-status", protect, changeBookingStatus);

export default bookingRoute;