const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("./schema");
const port = 3000;
mongoose
  .connect(
    "mongodb+srv://rajkumarnilakanta53552:rajukumar@cluster0.tku7rvc.mongodb.net/?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log("Connected to the database");
  })
  .catch((err) => {
    console.log("Error connecting to the database: ", err);
  });

app.use(express.json());
app.use(cors({ origin: "https://instacardf.onrender.com" }));

app.post("/api/signup", async (req, res) => {
  const { username, password, email, contact } = req.body;

  try {
    const alreadyUser = await User.findOne({ username });
    if (alreadyUser) {
      return res.status(400).json({ message: "Username already registered" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      username,
      password: hashedPassword,
      email,
      contact,
    });
    await newUser.save();

    res.status(201).json({ message: "User SignUp Successfully" });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ message: "SignUp Failed" });
  }
});

app.post("/api/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({ message: "User not Found" });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ message: "Inavalid credentials" });
    }

    const token = jwt.sign({ userId: user._id }, "secret-key", {
      expiresIn: "1h",
    });
    res.status(200).json({ token, userID: user._id });
  } catch (err) {
    res.status(500).json({ message: "login failed" });
  }
});

const jwtMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  try {
    const decode = jwt.verify(token, "secret-key");
    req.user = decode;
    console.log("Decoded token:", decode);
    next();
  } catch (err) {
    console.error("Token verification error:", err);
    return res.status(403).json({ message: "Invalid token" });
  }
};

app.get("/api/userdetails", jwtMiddleware, async (req, res) => {
  try {
    const user = req.user;

    const userDetails = await User.findById(user.userId);

    if (!userDetails) {
      return res.status(404).json({ message: "User not found" });
    }
    const { _id, username, email, contact } = userDetails;
    res.status(200).json({ _id, username, email, contact });
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
    console.log("User Details Error:", err.response?.data.message);
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
