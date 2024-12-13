import Swal from "sweetalert2";
import { toast } from "react-hot-toast";
const useDeleteSingleContact = () => {
  const deleteContact = async (id) => {
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
      const res = await fetch(`http://localhost:3000/delete/${id}`, {
        method: "Delete",
      });

      const data = await res.json();
      if (data.Status === "deleted") {
        toast.success("Contact deleted successfully!");
      } else {
        toast.error("Contact is not deleted, please try again");
      }
    } catch (error) {
      console.log(error);
      toast.error("It is not you it's us");
    }
  };

  return deleteContact;
};

export default useDeleteSingleContact;
