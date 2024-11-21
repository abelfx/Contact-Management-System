require("dotenv").config();
const jwt = require("jsonwebtoken");

// token generating function
const generateToken = (userId, res) => {
  const token = jwt.sign({ userId }, process.env.ACCESS_TOKEN, {
    expiresIn: "10d",
  });

  res.cookie("jwt", token, {
    httpOnly: true, // prevents scripting attacks
    maxAge: 15 * 24 * 60 * 60 * 1000,
    sameSite: "strict", // prevents request forgery attacks
    secure: process.env.NODE_ENV !== "development",
  });
};

module.exports = generateToken;
