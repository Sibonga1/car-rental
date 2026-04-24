import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

//function to generate token
const genarateToken = (userId) => {
  const payload = userId;
  return jwt.sign(payload, process.env.JWT_SECRET);
};

export const registerUser = async (req, res) => {
  try {
    //get all users
    const { name, email, password } = req.body;

    //validate the input
    if (!name || !email || !password || password.length < 8) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }

    //check if user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res
        .status(400)
        .json({ success: false, message: "User already exists" });
    }

    //hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    //create user
    const user = await User.create({ name, email, password: hashedPassword });

    //generate token
    const token = genarateToken(user._id.toString());
    res
      .status(201)
      .json({ success: true, message: "User created successfully", token });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};

//login user

export const loginUser = async (req, res) => {
  try {
    //get email and password from the request body
    const { email, password } = req.body;
    //validate the input
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid email or password" });
    }

    //compare the password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid credentials" });
    }

    //generate token
    const token = genarateToken(user._id.toString());
    res.status(200).json({ success: true, message: "Login successful", token });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getUserData = async (req, res) => {
    try {
        const {user} = req;
        res.status(200).json({success: true, message: "User data fetched successfully", user})
    } catch (error) {
        console.log(error.message);
        res.status(500).json({success: false, message: error.message})
    }
}