import { FaUser } from "react-icons/fa";
import { toast } from "react-hot-toast";
import { AiOutlineSearch, AiOutlineClose } from "react-icons/ai";
import { useState } from "react";
import LeftSide from "../components/leftSide";
import RightSide from "../components/rightSide";
import userDisplayContact from "../hooks/userDisplayContact";
import userSearchContact from "../hooks/userSearchContact";
import DetailedContact from "../components/detailedContact";
import AccountSettings from "../components/accountSetting.jsx";
import { useRightSide } from "../context/RightSideContext.jsx";
import { useAccountSettingContext } from "../context/accountSettingContext.jsx";

const home = () => {
  const { contactNumber, displayContacts } = userDisplayContact();
  const [search, setSearch] = useState("");
  const [userVisible, setUserVisible] = useState(false);
  const searchContact = userSearchContact();
  const { accountVisible, accountToggleFunctionality } =
    useAccountSettingContext();

  const { visible, toggleFunctionality } = useRightSide();

  const searchContacts = async (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      await searchContact(search);
    }
  };

  const [dWritten, setDWritten] = useState("");
  // sets the visibillity of the delete functionality
  const [deleteVisible, setDeleteVisible] = useState(false);

  // sets the visibility of the detailed user information component
  const userToggleFunctionality = () => {
    setUserVisible(!userVisible);
  };

  const deleteAllContacts = async (e) => {
    e.preventDefault();

    if (dWritten === "Delete") {
      try {
        const res = await fetch("http://localhost:3000/delete", {
          method: "delete",
        });

        const data = await res.json();

        if (data.message === "Deleted") {
          toast.success("Contacts Deleted Successfully");
          displayContacts();
        } else {
          toast.error("failure to delete contacts");
        }
      } catch (err) {
        console.log(err);
      }
    } else {
      toast.error("Write 'Delete' Properly");
    }
  };

  displayContacts();

  // toggle button which makes the delete window appear
  const deletefunctionality = () => {
    setDeleteVisible(!deleteVisible);
  };

  return (
    <div id="main" className="flex relative bg-gray-300 h-screen">
      {/* Left Side Content*/}
      <LeftSide />
      {/* Main Content */}
      <div className="border-blue-900 bg-gray-100 text-gray-800 overflow-y-auto rounded-2xl absolute top-10 right-20 bottom-0">
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
            <ul className="menu menu-horizontal">
              <li>
                <details>
                  <summary>Last Activity</summary>
                </details>
              </li>
              <li>
                <details>
                  <summary>Fav Person</summary>
                </details>
              </li>
              <li>
                <details>
                  <summary>Status</summary>
                </details>
              </li>
              <li>
                <details>
                  <summary>Contact Person</summary>
                  <ul>
                    <li>
                      <input type="text" placeholder="name/Id" />
                    </li>
                  </ul>
                </details>
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
                onKeyDown={searchContacts}
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                }}
                placeholder="search name, phone"
                className=" input bg-gray-100 border border-gray-400 p-1 pl-8 rounded-lg"
              />
              <AiOutlineSearch className="absolute left-2 top-1/2 transform -translate-y-1/2 text-blue-500 font-bold" />
              <button
                onClick={toggleFunctionality}
                className="ml-5 text-white font-bold hover:bg-blue-600 bg-blue-500 p-2 rounded-md border border-gray-300 "
              >
                Add Contact
              </button>

              <button
                onClick={deletefunctionality}
                className="ml-5 text-white font-bold hover:bg-red-600 bg-red-500 p-2 rounded-md border border-gray-300 absolute right-0"
              >
                Delete Contact
              </button>

              <button onClick={accountToggleFunctionality}>Tester</button>
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
                    <th
                      onClick={userToggleFunctionality}
                      className="border px-4 py-2"
                    >
                      Email
                    </th>
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
          visible && <RightSide /> ? "block" : "hidden"
        }`}
      >
        <RightSide />
      </div>

      <div
        id="delete"
        className={` absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gray-100 border border-black shadow-lg  p-10 ${
          deleteVisible ? "block" : "hidden"
        }`}
      >
        <AiOutlineClose
          className="absolute top-3 right-3 text-2xl text-black hover:bg-red-200"
          onClick={deletefunctionality}
        />
        <h1 className="text-black font-bold text-2xl text-center m-4">
          Delete All Contacts?
        </h1>
        <form onSubmit={deleteAllContacts}>
          <input
            type="text"
            className="input w-full mb-3 bg-blue-100"
            placeholder="write Delete "
            value={dWritten}
            onChange={(e) => setDWritten(e.target.value)}
          />
          <button
            className="delete btn bg-red-500 border-none hover:bg-red-600 text-white w-full"
            type="submit"
          >
            Delete
          </button>
        </form>
      </div>

      <div
        id="detailed-user"
        className={` absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gray-100 border rounded-lg shadow-2xl  p-10  max-w-lg ${
          userVisible ? "block" : "hidden"
        }`}
      >
        <DetailedContact />
      </div>

      <div
        id="accountSetting"
        className={` absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gray-100 border rounded-lg shadow-2xl  p-10  max-w-lg ${
          accountVisible ? "block" : "hidden"
        }`}
      >
        <AccountSettings />
      </div>
    </div>
  );
};

export default home;
