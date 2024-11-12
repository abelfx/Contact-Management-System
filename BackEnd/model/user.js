const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost:27017/Contact-Management")
  .then((result) => {
    console.log("Connected To UserBase");
  })
  .catch((err) => {
    console.log("Error While Connected to DB", err);
  });

const schema = mongoose.Schema({
  Fullname: {
    type: String,
    required: true,
  },

  Username: {
    type: String,
    required: true,
  },
  Password: {
    type: String,
    required: true,
  },
});

const model = mongoose.model("users", schema);

module.exports = model;
