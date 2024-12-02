// basic imports for backEnd functionality
require("dotenv").config();

const router = require("./routes/authRoute.js");
const router2 = require("./routes/contactRoute.js");
const express = require("express");
const DataBase = require("./model/model.js");
const UserBase = require("./model/user.js");
const cors = require("cors");
const { ObjectId } = require("mongodb");
const app = express();
const bcrypt = require("bcryptjs");

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/", router);
app.use("/", router2);

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

// changes current password
app.post("/user/password", async (req, res) => {
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
});

// chatAssistant configuration
// const configuration = new Configuration({
//   apiKey:
//     "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",
// });

// const openai = new OpenAIApi(configuration);

// app.post("/api/chat", async (req, res) => {
//   try {
//     const userMessage = req.body.message;
//     const response = await openai.createChatCompletion({
//       model: "gpt-3.5-turbo",
//       messages: [{ role: "user", content: userMessage }],
//     });

//     res.json({ reply: response.data.choices[0].message.content });
//   } catch (error) {
//     console.error("Error in chat assistant:", error.message);
//     res.status(500).json({ error: "Something went wrong" });
//   }
// });

// server listener
app.listen(3000, (err) => {
  if (err) return console.log(err);
  console.log("listening on port 3000...");
});
