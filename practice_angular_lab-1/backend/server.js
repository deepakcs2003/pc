require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors({
  origin: "http://localhost:4200",
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));


// Connect to MongoDB (Database name: PRN)
mongoose.connect("mongodb://127.0.0.1:27017/22510094");

const UserSchema = new mongoose.Schema({
  email: String,
  name: String,
  password: String,
});

const User = mongoose.model("User", UserSchema);

// Create User
app.post("/create", async (req, res) => {
  const user = new User(req.body);
  await user.save();
  res.send(user);
});


// get Users
app.get("/get", async (req, res) => {
  const users = await User.find({});
  res.send(users);
});

app.listen(5000, () => console.log("Server running on port 5000"));
