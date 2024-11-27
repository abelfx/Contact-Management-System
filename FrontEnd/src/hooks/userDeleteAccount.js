import Swal from "sweetalert2";
import { toast } from "react-hot-toast";
import { useState } from "react";
import { useAuthContext } from "../context/authContext";
import { useNavigate } from "react-router-dom";
import userLogout from "./userLogout";

const userDeleteAccount = () => {
  const { authUser, setAuthUser } = useAuthContext();
  const navigate = useNavigate();
  const logout = userLogout();

  const deleteAccount = async () => {
    try {
      const result = await Swal.fire({
        title: "Are you sure?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Delete",
        cancelButtonText: "Cancel",
        confirmButtonColor: "red",
      });

      if (!result.isConfirmed) {
        console.log("john sucks");
        return;
      }

      const res = await fetch(
        `http://localhost:3000/delete/users/${authUser.id}`,
        {
          method: "delete",
        }
      );

      const data = await res.json();

      if (data.status === "successful!") {
        toast.success("User Deleted Successfully");
        localStorage.removeItem("user");
        setAuthUser(null);
      } else {
        toast.error("Action failed, please try again!");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return deleteAccount;
};

export default userDeleteAccount;
