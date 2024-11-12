// basic imports for backEnd functionality
require("dotenv").config();

const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const DataBase = require("./model/model.js");
const UserBase = require("./model/user.js");
const cors = require("cors");

const { ObjectId } = require("mongodb");
const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// renders the home page--note that the JWT authentication is commented here so currently it is not functional
app.get("/home", (req, res) => {
  DataBase.find()
    .sort({ createdAt: -1 })
    .then((result) => {
      res.render("home", { contacts: result });
    })
    .catch((error) => {
      console.log("Error on /home route / loading contacts from DB", error);
    });
});

// output all the avaliable contacts
app.get("/contacts", async (req, res) => {
  try {
    const contact = await DataBase.find({});

    if (contact) {
      return res.json(contact);
    }

    return sendStatus(404);
  } catch (error) {
    console.error("error fetching contact");
    res.status(501);
  }
});

// used to get detailed information about the contact
app.get("/contacts/:id", async (req, res) => {
  const id = req.params.id;

  try {
    // Ensure that the id is converted to an ObjectId
    const contact = await DataBase.findOne({ _id: new ObjectId(id) });

    if (contact) {
      return res.json(contact);
    }

    res.sendStatus(404);
  } catch (error) {
    console.error("Error fetching contact:", error);
    res.sendStatus(500);
  }
});

// signup
app.post("/signup", async (req, res) => {
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

        return res.status(200).json({ message: "successful" }); // Ensure this sends JSON
      } else {
        return res.status(401).json({ Error: "Username already exists" });
      }
    } else {
      return res.status(401).json({ Error: "Passwords do not match" });
    }
  } catch (err) {
    console.log("Error when signing up", err);
    return res.status(500).json({ Error: "Internal server error" }); // Handle errors properly
  }
});

// login 
app.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    const UserName = await UserBase.findOne({ Username: username });

    if (UserName) {
      if (await bcrypt.compare(password, UserName.Password)) {
        const accessToken = generateToken(username);
        return res
          .status(201)
          .json({ accessToken: accessToken, message: "success" });
      } else {
        return res.status(401).json({ message: "Invalid password" });
      }
    } else {
      return res.status(403).json({ message: "User does not exist" });
    }
  } catch (err) {
    console.log("Error while logging in", err);
    return res.status(500).json({ message: "Internal server error" });
  }
});


// adds contact to the database
app.post("/addContact", async (req, res) => {
  try {
    const { fullName, phoneNumber, email, notes } = req.body;
    const Contact = new DataBase({
      FullName: fullName,
      PhoneNumber: phoneNumber,
      Email: email,
      Notes: notes,
    });

    await Contact.save();

    res.sendStatus(201);
  } catch (err) {}
});

// token generating function
function generateToken(user) {
  return jwt.sign({ username: user }, process.env.ACCESS_TOKEN, {
    expiresIn: "1h",
  });
}

// authentication middleware
function authenticate(req, res, next) {
  const accessToken = req.headers["authorization"];
  console.log(accessToken);
  const token = accessToken && accessToken.split(" ")[1];

  console.log("Token Received:", token);

  if (token == null) {
    console.log("No token provided");
    return res.sendStatus(401);
  }

  jwt.verify(token, process.env.ACCESS_TOKEN, (err, user) => {
    if (err) {
      console.log("Token verification error:", err.message);
      return res.sendStatus(403);
    }
    req.user = user;
    next();
  });
}

// Delete Contact
app.delete("/delete/:id", async (req, res) => {
  try {
    const id = req.params.id;

    const deleted = await DataBase.deleteOne({ _id: new ObjectId(id) });

    if (deleted) {
      return res.status(201).json({ Status: "deleted" });
    }

    return res.status(401).send("not deleted");
  } catch (err) {
    console.log("Error while deleting", err);
  }
});

app.listen(3000, (err) => {
  if (err) return console.log(err);
  console.log("listening on port 3000...");
});
