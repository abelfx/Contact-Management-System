import { useState } from "react";

const userDisplayContact = () => {
  const [contactNumber, setCNumber] = useState(0);

  const displayContacts = async () => {
    let count = 1;

    try {
      const response = await fetch("http://localhost:3000/contacts");
      const data = await response.json();

      const tableBody = document.querySelector("#dataTable tbody");
      tableBody.innerHTML = ""; // Clear any existing rows

      data.forEach((contact) => {
        const row = document.createElement("tr");
        row.classList.add("border-b"); // Add a bottom border to rows for better styling

        row.setAttribute("data-id", contact._id);

        row.innerHTML = `
        <td class="border px-4 py-2">${count++}</td>
        <td class="border px-4 py-2">${contact.FullName}</td>
        <td class="border px-4 py-2">${contact.PhoneNumber}</td>
        <td class="border px-4 py-2">${contact.Email}</td>
        <td class="border px-4 py-2 relative group">
          ${contact.Notes}
          <!-- Place the Delete button inside the Notes column -->
          <button class="absolute right-3 bottom-1 bg-red-200 p-1 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity text-sm" onclick="deleteContact('${
            contact._id
          }')">D</button>
        </td>
      `;
        tableBody.appendChild(row);
      });

      setCNumber(count - 1);
    } catch (error) {
      console.error("Error loading data:", error);
    }
  };

  return { contactNumber, displayContacts };
};

export default userDisplayContact;
