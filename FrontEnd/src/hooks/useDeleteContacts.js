import { toast } from "react-hot-toast";

const useDeleteContacts = () => {
  const deleteContacts = async () => {
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
  };

  return deleteContacts;
};

export default useDeleteContacts;
