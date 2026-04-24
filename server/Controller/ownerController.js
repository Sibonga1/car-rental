import User from "../models/User.js";

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
  const imageFile = req.file
} catch (error) {
  console.log(error.message);
    res.status(500).json({ success: false, message: error.message });
}
}