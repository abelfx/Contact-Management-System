const DataBase = require("../model/model.js");

// output all the avaliable contacts
const displayContacts = async (req, res) => {
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
};

// adds contact to the database
const addContact = async (req, res) => {
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
};

// Delete Contact
const deleteContact = async (req, res) => {
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
};

// search contacts functionality
const searchContacts = async (req, res) => {
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
};

// delete all contacts
const deleteAllContacts = async (req, res) => {
  try {
    await DataBase.deleteMany({});
    return res.status(201).json({ message: "Deleted" });
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  displayContacts,
  addContact,
  deleteContact,
  deleteAllContacts,
  searchContacts,
};
