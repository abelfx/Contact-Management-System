import Swal from "sweetalert2";

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

export default logoutHandler;
