const { ObjectId } = require("mongodb"); // Import ObjectId
const bcrypt = require("bcryptjs");
const UserBase = require("../model/user.js");

// Deletes user account
const deleteAccount = async (req, res) => {
  try {
    const id = req.params.id;

    // Delete user by ID
    const deleted = await UserBase.deleteOne({ _id: new ObjectId(id) });
    if (deleted.deletedCount > 0) {
      return res.status(200).json({ status: "successful!" });
    }

    res.status(404).json({ status: "User not found!" });
  } catch (error) {
    res.status(500).send("Server error occurred while deleting users");
    console.error(error);
  }
};

// Changes current password
const changeAccountPassword = async (req, res) => {
  try {
    const { username, newPassword, oldPassword } = req.body;

    // Check if the user exists
    const user = await UserBase.findOne({ Username: username });
    if (!user) {
      return res.status(404).json({ status: "Username is incorrect" });
    }

    // Compare current password
    const isMatch = await bcrypt.compare(oldPassword, user.Password);
    if (!isMatch) {
      return res
        .status(401)
        .json({ status: "Current password is not correct! Try again." });
    }

    // Hash the new password and update
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    const changed = await UserBase.findOneAndUpdate(
      { Username: username },
      { $set: { Password: hashedPassword } },
      { new: true }
    );

    if (changed) {
      return res.status(200).json({ status: "Password changed successfully!" });
    }

    res
      .status(500)
      .json({ status: "Something went wrong while updating password" });
  } catch (error) {
    res.status(500).send("Error while changing password");
    console.error(error);
  }
};

module.exports = { deleteAccount, changeAccountPassword };
