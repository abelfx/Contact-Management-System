import { FaUser } from "react-icons/fa";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import logoutHandler from "../hooks/logoutHandler.js";
import {
  AiOutlineDown,
  AiOutlineSearch,
  AiOutlineClose,
  AiOutlineLogout,
  AiOutlineDelete,
} from "react-icons/ai";

import { useState } from "react";

const home = () => {
  // Add Contacts button functionality useState
  const [contacts, setContacts] = useState({
    fullName: "",
    phoneNumber: "",
    email: "",
    notes: "",
  });

  // related the contac ID from Mongo DB with the ID on the UI
  // will be used for deletion/searching and other purposes
  // currently not functional since I am not sure what collection to use- maybe a hash-map

  // number of contacts counter
  const [contactNumber, setCNumber] = useState(0);
  let count = 1;

  const navigate = useNavigate();
  const [visible, setVisible] = useState(false);

  const toggleFunctionality = () => {
    setVisible(!visible);
  };

  const addContacts = async (e) => {
    e.preventDefault();

    const res = await fetch("http://localhost:3000/addContact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(contacts),
    });

    if (res.status === 201) {
      toast.success("Contact has been added successfully");
      setContacts({ ...contacts, fullName: "" });
      setContacts({ ...contacts, phoneNumber: "" });
      setContacts({ ...contacts, email: "" });
      setContacts({ ...contacts, notes: "" });

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
        <td class="border px-4 py-2" data-id = ${console.log(contact._id)}>${
          contact.FullName
        }</td>
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

  displayContacts();

  // contact deleting function / currently not functional
  const deleteContact = async () => {
    const res = await fetch(`http://localhost:3000/delete/`, {
      method: "DELETE",
    });

    const data = await res.json();

    if (data.status === "deleted") {
      toast.success("Contact Deleted!");
    } else {
      toast.error("Its my its not you, try again!");
    }
  };

  const deleteAccount = async () => {
    Swal.fire({
      title: "Are you sure?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Delete",
      cancelButtonText: "Cancel",
      confirmButtonColor: "red",
    }).then((result) => {
      if (result.isConfirmed) {
        toast.success("Account Deleted");
        navigate("/signup");
      }
    });
  };
  return (
    <div id="main" className="relative bg-gray-300 h-screen">
      {/* Left Sidebar */}
      <div
        id="left"
        className="fixed top-10 left-20 bottom-10 h-screen w-[300px] bg-gray-100 rounded-lg shadow-lg p-5 flex flex-col items-center"
      >
        {/* Profile Image */}
        <div className="flex justify-center mb-4">
          <img
            src="../public/me.jpg"
            alt="Profile"
            className="rounded-full h-40 w-40 object-cover border-4 border-blue-700 shadow-md"
          />
        </div>

        {/* Profile Information */}
        <p className="text-center text-xl text-blue-800 font-semibold mt-4">
          Abel Tesfa
        </p>
        <p className="text-center text-md text-blue-800 mb-8">
          abeltesfa198@gmail.com
        </p>

        {/* Settings Links */}
        <div className="w-full">
          <p className="text-center border-b-2 py-3 cursor-pointer text-gray-700 hover:bg-gray-200 rounded-md transition">
            Account Settings
          </p>
          <p className="text-center border-b-2 py-3 cursor-pointer text-gray-700 hover:bg-gray-200 rounded-md transition">
            Overview
          </p>
          <p className="text-center border-b-2 py-3 cursor-pointer text-gray-700 hover:bg-gray-200 rounded-md transition">
            Unsubscribe
          </p>
          <p
            onClick={deleteAccount}
            className="text-center py-3 cursor-pointer text-red-500 hover:bg-red-100 rounded-md transition"
          >
            Delete Account
          </p>
        </div>

        {/* Logout Button */}
        <AiOutlineLogout
          className="text-blue-800 hover:text-blue-500 cursor-pointer mt-auto mb-10 transition"
          size={30}
          onClick={logoutHandler}
        />
      </div>

      {/* Main Content */}
      <div className="border-blue-900 bg-gray-100 text-gray-800 overflow-y-auto rounded-lg absolute top-10 right-20 bottom-0">
        <div className="max-w-[1300px] m-auto w-full">
          <nav className="navbar bg-blue-800 text-gray-100">
            <div className="flex-1">
              <a className="btn btn-ghost text-xl">
                <FaUser />
              </a>
            </div>
            <div className="flex-none">
              <ul className="menu menu-horizontal px-1">
                <li>
                  <details>
                    <summary>Contacts</summary>
                    <ul className="bg-blue-600 rounded-t-none p-2">
                      <li>
                        <a>Link 1</a>
                      </li>
                      <li>
                        <a>Link 2</a>
                      </li>
                    </ul>
                  </details>
                </li>
                <li>
                  <details>
                    <summary>Conversations</summary>
                    <ul className="bg-blue-600 rounded-t-none p-2">
                      <li>
                        <a>Link 1</a>
                      </li>
                      <li>
                        <a>Link 2</a>
                      </li>
                    </ul>
                  </details>
                </li>
                <li>
                  <details>
                    <summary>Marketing</summary>
                    <ul className="bg-blue-600 rounded-t-none p-2">
                      <li>
                        <a>Link 1</a>
                      </li>
                      <li>
                        <a>Link 2</a>
                      </li>
                    </ul>
                  </details>
                </li>
                <li>
                  <details>
                    <summary>Sales</summary>
                    <ul className="bg-blue-600 rounded-t-none p-2">
                      <li>
                        <a>Link 1</a>
                      </li>
                      <li>
                        <a>Link 2</a>
                      </li>
                    </ul>
                  </details>
                </li>
                <li>
                  <details>
                    <summary>Service</summary>
                    <ul className="bg-blue-600 rounded-t-none p-2">
                      <li>
                        <a>Link 1</a>
                      </li>
                      <li>
                        <a>Link 2</a>
                      </li>
                    </ul>
                  </details>
                </li>
              </ul>
            </div>
          </nav>

          <div className="pl-10 pt-5">
            <h1 className="text-blue-700 font-bold text-xl">Contacts</h1>
            <p className="font-bold text-sm">{contactNumber} records</p>
          </div>

          <div className="pl-10 pt-5 mr-10">
            <ul className="flex">
              <li className="flex items-center border border-gray-400 min-w-[15px] p-2 border-b-0 hover:bg-blue-100">
                All Contacts <AiOutlineClose className="ml-32 " />
              </li>
              <li className="flex items-center pl-3 border border-gray-400 border-l-0 bg-gray-200 hover:bg-blue-100">
                Fav Contacts <AiOutlineClose className="ml-32 text-gray-100 " />
              </li>
              <li className="flex items-center pl-3 border border-gray-400 border-l-0 bg-gray-200 hover:bg-blue-100">
                Last Activity
                <AiOutlineClose className="ml-32 text-gray-100 border-l-0" />
              </li>
              <li className="flex items-center pl-3 border border-gray-400 bg-gray-200 border-l-0 hover:bg-blue-100">
                Status
                <AiOutlineClose className="ml-32 text-gray-100 b-l-gray-100" />
              </li>
            </ul>
          </div>

          <div className="pl-12 mt-5 text-blue-600 font-bold">
            <ul className="flex gap-10">
              <li className="flex items-center">
                Contact person <AiOutlineDown size={12} />
              </li>
              <li className="flex items-center">
                Create Date <AiOutlineDown size={12} />
              </li>
              <li className="flex items-center">
                Last Activity <AiOutlineDown size={12} />
              </li>
              <li className="flex items-center">
                Status <AiOutlineDown size={12} />
              </li>
            </ul>
          </div>

          <div
            id="hero"
            className="mt-5 ml-12 p-3 border border-gray-400 mr-12"
          >
            <div className="relative" id="searchBar">
              <input
                type="text"
                placeholder="search name, phone"
                className="bg-gray-100 border border-gray-400 p-1 pl-8 rounded-sm"
              />
              <AiOutlineSearch className="absolute left-2 top-1/2 transform -translate-y-1/2 text-blue-500 font-bold" />
              <button
                onClick={toggleFunctionality}
                className="ml-5 text-blue-500 font-bold hover:text-blue-600"
              >
                Add Contact
              </button>
            </div>

            {/* Table with max height and overflow */}
            <div className="border border-gray-400 mt-2 overflow-y-auto max-h-72">
              <table
                id="dataTable"
                className="min-w-full divide-y divide-gray-500"
              >
                <thead className="bg-blue-200">
                  <tr>
                    <th className="border px-4 py-2">ID</th>
                    <th className="border px-4 py-2">Name</th>
                    <th className="border px-4 py-2">Phone No</th>
                    <th className="border px-4 py-2">Email</th>
                    <th className="border px-4 py-2">Notes</th>
                  </tr>
                </thead>
                <tbody className="relative"></tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/*Right Side*/}

      <div
        id="right"
        className={`fixed top-0 right-0 h-screen w-[350px] bg-gray-100 ${
          visible ? "block" : "hidden"
        }`}
      >
        <div className="p-3 pt-10 text-black">
          <div>
            <div className="flex items-center justify-between">
              <h2 className="text-3xl text-center pb-7">Add a Contact</h2>
              <AiOutlineClose
                onClick={toggleFunctionality}
                className="mb-6 hover:cursor-pointer "
                size={25}
              />
            </div>

            <form onSubmit={addContacts} action="/addContact" method="post">
              <div class="eachInput">
                <label for="fullname" className="block pt-4">
                  Full Name:
                </label>
                <input
                  type="text"
                  id="fullname"
                  name="fullName"
                  placeholder="Enter Name"
                  required
                  className="bg-gray-200 input border border-gray-500 mt-2 w-full"
                  value={contacts.fullName}
                  onChange={(e) =>
                    setContacts({ ...contacts, fullName: e.target.value })
                  }
                />
              </div>
              <div class="eachInput">
                <label for="phoneNumber" className="block pt-4">
                  Phone No:
                </label>
                <input
                  type="text"
                  id="phoneNumber"
                  name="phoneNumber"
                  placeholder="Enter number"
                  required
                  className="bg-gray-200 input border border-gray-500 mt-2 w-full"
                  value={contacts.phoneNumber}
                  onChange={(e) =>
                    setContacts({ ...contacts, phoneNumber: e.target.value })
                  }
                />
              </div>
              <div class="eachInput">
                <label for="email" className="block pt-4">
                  Email:
                </label>
                <input
                  type="text"
                  id="email"
                  name="email"
                  placeholder="Enter email"
                  className="bg-gray-200 input border border-gray-500 mt-2 w-full"
                  value={contacts.email}
                  onChange={(e) =>
                    setContacts({ ...contacts, email: e.target.value })
                  }
                />
              </div>
              <div class="eachInput">
                <label for="notes" className="block pt-4">
                  Notes:
                </label>
                <textarea
                  id="notes"
                  name="notes"
                  placeholder="Type any extra information here..."
                  className="bg-gray-200 border border-gray-500 p-1 mt-2 w-full h-36"
                  value={contacts.notes}
                  onChange={(e) =>
                    setContacts({ ...contacts, notes: e.target.value })
                  }
                ></textarea>
              </div>

              <button
                type="submit"
                className="btn w-full mt-8 bg-blue-500 text-white p-3 rounded-md border-none hover:bg-blue-600"
              >
                Add Contact
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default home;
