import { useContactContext } from "../context/contactsContext";
import Swal from "sweetalert2";
const useDeleteSingleContact = () => {
  const { contact } = useContactContext();

  const DeleteContact = async () => {
    try {
      const result = await Swal.fire({
        title: "Delete Contact?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "yes",
        cancelButtonText: "No",
        confirmButtonColor: "red",
      });

      if (!result.isConfirmed) {
        return;
      }
      const res = await fetch(`http://localhost:3000/${contact._id}`, {
        method: "Delete",
      });

      const data = await res.json();
      if (data.Status === "deleted") {
        toast.error("Contact deleted successfully!");
      } else {
        toast.error("Contact is not deleted, please try again");
      }
    } catch (error) {
      console.log(error);
      toast.error("It is not you it's us");
    }
  };

  return DeleteContact;
};

export default useDeleteSingleContact;
