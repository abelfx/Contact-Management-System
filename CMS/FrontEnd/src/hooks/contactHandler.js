import { useState } from "react";
import { toast } from "react-hot-toast";

const contactHandler = () => {
  // Add Contacts button functionality useState
  const [contacts, setContacts] = useState({
    fullName: "",
    phoneNumber: "",
    email: "",
    notes: "",
  });

  const addContacts = async (e) => {
    e.preventDefault();

    const res = await fetch("http://localhost:3000/addContact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(contacts),
    });

    if (res.status === 201) {
      toast.success("Contact has been added successfully");
      await displayContacts();
    } else {
      toast.error("Something went wrong, please try again");
    }
  };

  const displayContacts = async () => {
    try {
      const response = await fetch("http://localhost:3000/contacts");
      const data = await response.json();

      const tableBody = document.querySelector("#dataTable tbody");
      tableBody.innerHTML = ""; // Clear any existing rows

      data.forEach((contact) => {
        const row = document.createElement("tr");
        row.classList.add("border-b"); // Add a bottom border to rows for better styling
        row.innerHTML = `
        <td class="border px-4 py-2">${count++}</td>
        <td class="border px-4 py-2">${contact.FullName}</td>
        <td class="border px-4 py-2">${contact.PhoneNumber}</td>
        <td class="border px-4 py-2">${contact.Email}</td>
        <td class="border px-4 py-2">${contact.Notes} </td>
      `;
        tableBody.appendChild(row);
      });

      setCNumber(count);
    } catch (error) {
      console.error("Error loading data:", error);
    }
  };

  return { addContacts };
};

export default contactHandler;
