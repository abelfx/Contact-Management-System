import { toast } from "react-hot-toast";

const userAddContact = async (contact) => {
  try {
    const res = await fetch("http://localhost:3000/addContact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(contact),
    });

    if (res.status === 201) {
      toast.success("Contact has been added successfully");
      return true; // Indicate success
    } else {
      toast.error("Something went wrong, please try again");
      return false; // Indicate failure
    }
  } catch (error) {
    toast.error("An error occurred: " + error.message);
    return false; // Indicate failure
  }
};

export default userAddContact;
