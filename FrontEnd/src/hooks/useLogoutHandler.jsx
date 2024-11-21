import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const useLogoutHandler = () => {
  const navigate = useNavigate();

  const logoutHandler = () => {
    Swal.fire({
      title: "LogOut?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes",
      cancelButtonText: "No",
      confirmButtonColor: "blue",
    }).then((result) => {
      if (result.isConfirmed) {
        navigate("/login");
      }
    });
  };

  return logoutHandler;
};

export default useLogoutHandler;
