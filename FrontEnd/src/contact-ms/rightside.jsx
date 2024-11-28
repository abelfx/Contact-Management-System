import { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
const rightside = () => {
  const [visible, setVisible] = useState(false);
  const toggleFunctionality = () => {
    setVisible(!visible);
  };
  return (
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
  );
};

export default rightside;
