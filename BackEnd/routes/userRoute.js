const express = require("express");
const {
  deleteAccount,
  changeAccountPassword,
} = require("../controller/userController.js");

const router3 = express.Router();

router3.delete("/delete/users/:id", deleteAccount);
router3.post("/user/password", changeAccountPassword);

module.exports = router3;
