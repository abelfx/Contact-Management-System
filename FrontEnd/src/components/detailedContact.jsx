import { useContactContext } from "../context/contactsContext";
import { AiOutlineClose } from "react-icons/ai";

const detailedContact = () => {
  const { contact, userToggleFunctionality } = useContactContext();

  return (
    <div className="text-gray-800">
      <div className="flex">
        <h1 className="font-bold pb-5 text-2xl mr-20">Contact Information</h1>

        <AiOutlineClose
          className="font-bold items-center justify-center mt-2 text-2xl hover:bg-blue-300 cursor-pointer"
          onClick={userToggleFunctionality}
        />
      </div>

      <div className="p-2">
        <p>
          <strong> FullName: </strong>
          {contact.name}
        </p>
      </div>

      <div className="p-2">
        <p>
          <strong>Phone Number: </strong>
          {contact.phoneNo}
        </p>
      </div>

      <div className="p-2">
        <p>
          <strong>Email: </strong>
          {contact.email}
        </p>
      </div>
      <div className="p-2">
        <p>
          <strong>Notes: </strong>
          {contact.notes}
        </p>
      </div>
    </div>
  );
};

export default detailedContact;
