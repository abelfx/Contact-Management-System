import Swal from "sweetalert2";
import { toast } from "react-hot-toast";

const userDeleteAccount = () => {
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

  return deleteAccount;
};

export default userDeleteAccount;
