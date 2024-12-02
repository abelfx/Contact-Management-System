const {
  displayContacts,
  addContact,
  deleteContact,
  deleteAllContacts,
  searchContacts,
} = require("../controller/contactController.js");

const express = require("express");

const router2 = express.Router();

router2.get("/contacts", displayContacts);
router2.post("/addContact", addContact);
router2.delete("/delete/:id", deleteContact);
router2.delete("/delete", deleteAllContacts);
router2.post("/contact/search", searchContacts);

module.exports = router2;
