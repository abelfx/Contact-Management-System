const bcrypt = require("bcryptjs");
const UserBase = require("../model/user.js");
const generateToken = require("../util/generateToken.js");

// signup
const signup = async (req, res) => {
  try {
    const { fullname, username, email, password, confirmpassword } = req.body;

    if (password === confirmpassword) {
      const User = await UserBase.findOne({ Username: username });

      if (!User) {
        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new UserBase({
          Fullname: fullname,
          Username: username,
          Email: email,
          Password: hashedPassword,
        });

        await user.save();

        if (user) {
          generateToken(user._id, res);
        }

        res.status(201).json({
          id: user._id,
          username: user.Username,
          email: user.Email,
        });
      } else {
        res.status(401).json({ error: "Username already exists" });
      }
    }
  } catch (err) {
    console.log("Error when signing up", err);
    return res.status(500).json({ Error: "Internal server error" }); // Handle errors properly
  }
};

// login
const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await UserBase.findOne({ Username: username });
    const validpassword = await bcrypt.compare(password, user?.Password || "");

    if (!user || !validpassword) {
      return res.status(403).send("Invalid credentials");
    }

    generateToken(user._id, res);

    res.status(201).json({
      id: user.id,
      Fullname: user.Fullname,
      Username: user.Username,
      Email: user.Email,
    });
  } catch (err) {
    console.log("error while logging in", err);
    res.status(501).json({ error: "Internal Server Error" });
  }
};

const logout = (req, res) => {
  try {
    res.cookie("jwt", "", { maxAge: 0 });
    res.status(201).json({ status: "successful" });
  } catch (error) {
    console.log("Error while logging out", error);
    res.status(500).json({ error: "Error while logging out" });
  }
};

module.exports = {
  signup,
  login,
  logout,
};
