// basic imports for backEnd functionality
require("dotenv").config();

const router = require("./routes/authRoute.js");
const router2 = require("./routes/contactRoute.js");
const router3 = require("./routes/userRoute.js");
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
app.use("/", router3);

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
