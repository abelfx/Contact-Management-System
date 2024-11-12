const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost:27017/Contact-Management")
  .then((result) => {
    console.log("Connected To DataBase");
  })
  .catch((err) => {
    console.log("Error While Connected to DB", err);
  });

const schema = mongoose.Schema({
  FullName: {
    type: String,
    required: true,
  },

  PhoneNumber: {
    type: String,
    required: true,
  },
  Email: {
    type: String,
  },

  Notes: {
    type: String,
  },
});

const model = mongoose.model("Contact", schema);

module.exports = model;
