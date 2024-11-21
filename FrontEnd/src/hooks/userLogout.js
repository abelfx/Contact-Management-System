import { useAuthContext } from "../context/authContext";
import { useState } from "react";
import Swal from "sweetalert2";

const userLogout = () => {
  const [loading, setLoading] = useState(false);
  const setAuthUser = useAuthContext();

  const logout = async () => {
    var success = false;

    try {
      const result = await Swal.fire({
        title: "LogOut?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes",
        cancelButtonText: "No",
        confirmButtonColor: "red",
      });

      if (!result.isConfirmed()) return;

      setLoading(true);
      const res = await fetch("localhost://3000/logout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });

      const data = await res.json();

      if (data.error) {
        throw new Error(data.error);
      }

      localStorage.removeItem("user");
      setAuthUser(null);
    } catch (error) {
      toast.error(error.message);
    }
  };

  return logout;
};

export default userLogout;
