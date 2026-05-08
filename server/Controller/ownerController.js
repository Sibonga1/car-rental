import imageKit from "../configs/imageKit.js";
import User from "../models/User.js";
import fs from "fs";
import Car from "../models/Car.js";


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
