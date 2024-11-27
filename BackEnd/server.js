// basic imports for backEnd functionality
require("dotenv").config();

const router = require("./routes/authRoute.js");
const express = require("express");
const DataBase = require("./model/model.js");
const UserBase = require("./model/user.js");
const cors = require("cors");
const { ObjectId } = require("mongodb");
const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/", router);
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

app.delete("/delete/users/:id", async (req, res) => {
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
});
// search contacts functionality
app.post("/contact/search", async (req, res) => {
  try {
    const name = req.body.name.toLowerCase();

    const contact = await DataBase.aggregate([
      {
        $addFields: {
          lowerFullName: { $toLower: "$FullName" },
        },
      },
      {
        $match: {
          lowerFullName: name,
        },
      },
    ]);

    if (contact.length > 0) {
      return res.status(201).json(contact);
    }

    return res.status(401).json({ error: "Contact not found" });
  } catch (error) {
    console.log(error);
  }
});

// delete all contacts
app.delete("/delete", async (req, res) => {
  try {
    await DataBase.deleteMany({});
    return res.status(201).json({ message: "Deleted" });
  } catch (err) {
    console.log(err);
  }
});

// server listener
app.listen(3000, (err) => {
  if (err) return console.log(err);
  console.log("listening on port 3000...");
});
