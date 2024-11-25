import { toast } from "react-hot-toast";
import { useState } from "react";
import { useAuthContext } from "../context/authContext";

const userLogin = () => {
  const [loading, setLoading] = useState(false);
  const { setAuthUser } = useAuthContext();

  const login = async ({ username, password }) => {
    const success = loginHandler({ username, password });

    console.log(success);
    if (!success) return;
    setLoading(true);
    try {
      const res = await fetch("http://localhost:3000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      localStorage.setItem("user", JSON.stringify(data));
      setAuthUser(data);
      console.log("Login successful:", data);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return login;
};

function loginHandler({ username, password }) {
  if (!username || !password) {
    toast.error("please fill all credentials");
    return false;
  }
  return true;
}

export default userLogin;
