import Booking from "../models/Booking.js";
import Car from "../models/Car.js";

//function to check availability of car for a given date range
const checkAvailability = async (car, pickupDate, returnDate) => {
  const bookings = await Booking.find({
    car,
    pickupDate: { $lt: returnDate },
    returnDate: { $gt: pickupDate },
  });
  return bookings.length === 0;
};

//api to check availability of cars for the given date and location
export const checkAvalabilityOfCar = async (req, res) => {
  try {
    const { pickupDate, returnDate, location } = req.body;

    //fecthing all available cars for the given location
    const cars = await Car.find({ location, isAvailable: true });

    //check cars availability for the given date range using promise
    const availableCarsPromise = cars.map(async (car) => {
      const isAvailable = await checkAvailability(car._id, pickupDate, returnDate);
      return {...car._doc, isAvailable: isAvailable};
    });

    let availableCars = await Promise.all(availableCarsPromise);
    availableCars = availableCars.filter(car => car.isAvailable === true);

    res.status(200).json({ success: true, cars: availableCars });


  } catch (error) {
    console.log(error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};


//api to create nooking 
export const createBooking = async (req, res) => {
    try{
        const { car, pickupDate, returnDate } = req.body;
        const { _id } = req.user;

        const isAvailable = await checkAvailability(car, pickupDate, returnDate);
        if (!isAvailable) {
            return res.status(400).json({ success: false, message: "Car is not available for the selected dates" });
        }

        const carData = await Car.findById(car);

        //calculate price based on pickup and return date
        const picked = new Date(pickupDate);
        const returned = new Date(returnDate);
        const noOfDays = Math.ceil(picked - returned / (1000 * 60 *  60 * 24));
        const price = carData.pricePerDay * noOfDays;

        await Booking.create({car, user: _id, owner: carData.owner, pickupDate, returnDate, price});

        res.status(201).json({ success: true, message: "Booking created successfully" });

    }catch (error) {
        console.log(error.message);
        res.status(500).json({ success: false, message: error.message });
    }
}


//api to get user bookings
export const getUserBookings = async (req, res) => {
    try {
        const { _id } = req.user;
        const booking = await Booking.find({ user: _id }).populate("car").sort({ createdAt: -1 });
        res.status(200).json({ success: true, booking });
    
    }catch (error) {
        console.log(error.message);
        res.status(500).json({ success: false, message: error.message });
    }
}

//api to get owner bookings
export const getOwnerBookings = async (req, res) => {
    try {
        if (req.user.role !== "owner") {
            return res.status(403).json({ success: false, message: "Unauthorized" });
        }
        const booking = await Booking.find({ owner: req.user._id }).populate("car user").select("-user.password").sort({ createdAt: -1 });
        res.status(200).json({ success: true, booking });
    }catch (error) {
        console.log(error.message);
        res.status(500).json({ success: false, message: error.message });
    }
}

//api to change booking status
export const changeBookingStatus = async (req, res) => {
    try {
        const {_id} = req.user;
        const { bookingId, status } = req.body;

        const booking = await Booking.findById(bookingId);

        if (booking.owner.toString() !== _id.toString()) {
            return res.status(404).json({ success: false, message: "not authorized" });
        }

        booking.status = status;
        await booking.save();

        res.status(200).json({ success: true, message: "Booking status updated successfully" });

    }catch (error) {
        console.log(error.message);
        res.status(500).json({ success: false, message: error.message });
    }
}