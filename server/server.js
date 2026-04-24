import express from "express";
import "dotenv/config";
import cors from "cors";

//initialize express app
const app = express();

//middleware
app.use(cors());
app.use(express.json());

//routes
app.get("/", (req, res) => {
  res.send("Hello World!");
});

//start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
