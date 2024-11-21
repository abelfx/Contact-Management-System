const bcrypt = require("bcryptjs");
const UserBase = require("../model/user.js");
const generateToken = require("../util/generateToken.js");

// signup
const signup = async (req, res) => {
  try {
    const { fullname, username, password, confirmpassword } = req.body;

    if (password === confirmpassword) {
      const User = await UserBase.findOne({ Username: username });

      if (!User) {
        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new UserBase({
          Fullname: fullname,
          Username: username,
          Password: hashedPassword,
        });

        await user.save();

        if (user) {
          generateToken(user._id, res);
        }

        res.status(201).json({
          id: user._id,
          username: user.Username,
          password: user.Password,
        });
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
    });
  } catch (err) {
    console.log("error while logging in", err);
    res.status(501).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  signup,
  login,
};
