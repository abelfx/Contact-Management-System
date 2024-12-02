const UserBase = require("../model/user.js");
const bcrypt = require("bcryptjs");

// deletes user account
const deleteAccount = async (req, res) => {
  try {
    const id = req.params.id;
    const deleted = await UserBase.deleteOne({ _id: new ObjectId(id) });
    if (deleted) {
      return res.status(201).json({ status: "successful!" });
    }

    res.status(401).json({ status: "unsuccessful!" });
  } catch (error) {
    res.status(501).send("Server error occured while deleting users");
    console.log(error);
  }
};

// changes current password
const changeAccountPassword = async (req, res) => {
  try {
    const username = req.body.username;
    const newPassword = req.body.newPassword;
    const currentPassword = req.body.oldPassword;

    console.log(username);

    const user = await UserBase.findOne({ Username: username });
    if (!user) {
      return res.status(401).json({ status: "username is incorrect" });
    }

    if (await !bcrypt.compare(currentPassword, user.Password)) {
      return res
        .status(401)
        .json({ status: "Current password is not correct! try again" });
    }

    const pass = await bcrypt.hash(newPassword, 10);
    const changed = await UserBase.findOneAndUpdate(
      {
        Username: username,
      },
      { $set: { Password: pass } },
      { new: true }
    );

    if (changed) {
      return res.status(201).json({ status: "password changed successfully!" });
    }

    return res.send("Something went wrong");
  } catch (error) {
    res.status(501).send("error while changing password");
    console.log(error);
  }
};

module.exports = { deleteAccount, changeAccountPassword };
