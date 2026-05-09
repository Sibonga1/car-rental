import imageKit from "../configs/imageKit.js";
import User from "../models/User.js";
import fs from "fs";
import Car from "../models/Car.js";
import Booking from "../models/Booking.js";

//function to change role to owner
export const changeRole = async (req, res) => {
  try {
    const { _id } = req.user;
    await User.findByIdAndUpdate(_id, { role: "owner" });
    res.status(200).json({ success: true, message: "Now you can list cars" });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};

//API to list car
export const addCar = async (req, res) => {
  try {
    const { _id } = req.user;
    let car = JSON.parse(req.body.carData);
    const imageFile = req.file;

    // Upload image to imageKit
    const fileBuffer = fs.readFileSync(imageFile.path);

    const response = await imageKit.upload({
      file: fileBuffer,
      fileName: imageFile.originalname,
      folder: "/cars",
    });

    //optimization through imagekit URL transformation
    var optimizedImageUrl = imageKit.url({
      path: response.filePath,
      transform: [
        { width: "1280" }, // width resizing
        { quality: "auto" }, //auto compression
        { format: "webp" }, //convert to mordern format
      ],
    });

    //store in mongodb database
    const image = optimizedImageUrl;
    await Car.create({ ...car, image, owner: _id });

    res.json({ success: true, message: "Car added successfully" });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};

//api to list owner cars
export const GetOwnerCars = async (req, res) => {
  try {
    const { _id } = req.user;
    const cars = await Car.find({ owner: _id });
    res.json({ success: true, cars });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};

//api to toggle car availability
export const toggleCarAvailability = async (req, res) => {
  try {
    const { _id } = req.user;
    const { carId } = req.body;
    const car = await Car.findById(carId);

    //checking if car belongs to the user
    if (car.owner.toString() !== _id.toString()) {
      return res.status(403).json({ success: false, message: "Unauthorized" });
    }

    car.isAvailable = !car.isAvailable;
    await car.save();

    res.json({
      success: true,
      message: "Car availability toggled successfully",
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};

//api to delete car
export const deleteCar = async (req, res) => {
  try {
    const { _id } = req.user;
    const { carId } = req.body;
    const car = await Car.findById(carId);

    //checking if car belongs to the user
    if (car.owner.toString() !== _id.toString()) {
      return res.status(403).json({ success: false, message: "Unauthorized" });
    }

    car.owner = null;
    car.isAvailable = false;

    await car.save();

    res.json({ success: true, message: "Car removed successfully" });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};

//api to get dashboard data
export const getDashboardData = async (req, res) => {
  try {
    const { _id, role } = req.user;

    if (role !== "owner") {
      return res.status(403).json({ success: false, message: "Unauthorized" });
    }
//get owner cars and bookings
    const cars = await Car.find({ owner: _id });
    const booking = await Booking.find({ owner: _id })
      .populate("car")
      .sort({ createdAt: -1 });

    const pendingBookings = await Booking.find({
      owner: _id,
      status: "pending",
    });
    const completedBookings = await Booking.find({
      owner: _id,
      status: "confirmed",
    });
    const cancelledBookings = await Booking.find({
      owner: _id,
      status: "cancelled",
    });

    //Calculate monthlyRevenue from bookinga where status is confirmed
    const monthlyRevenue = booking
      .slice()
      .filter((booking) => booking.status === "confirmed")
      .reduce((acc, booking) => acc + booking.price, 0);

      const dashboardData = {
        totalCars: cars.length,
        totalBookings: booking.length,
        pendingBookings: pendingBookings.length,
        completedBookings: completedBookings.length,
        recentBookings: booking.slice(0, 5),
        monthlyRevenue: monthlyRevenue,
      }

      res.status(200).json({ success: true, dashboardData });

  } catch (error) {
    console.log(error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};


//api to update owner image
export const updateUserImage = async (req, res) => {
  try {
    const { _id } = req.user;
    
    const imageFile = req.file;

    // Upload image to imageKit
    const fileBuffer = fs.readFileSync(imageFile.path);

    const response = await imageKit.upload({
      file: fileBuffer,
      fileName: imageFile.originalname,
      folder: "/user",
    });

    //optimization through imagekit URL transformation
    var optimizedImageUrl = imageKit.url({
      path: response.filePath,
      transform: [
        { width: "400" }, // width resizing
        { quality: "auto" }, //auto compression
        { format: "webp" }, //convert to mordern format
      ],
    });

    //store in mongodb database
    const image = optimizedImageUrl;
    await User.findByIdAndUpdate(_id, { image });

    res.json({ success: true, message: "Profile image updated successfully" });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};
