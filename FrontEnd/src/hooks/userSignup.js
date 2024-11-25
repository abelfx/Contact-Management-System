import { toast } from "react-hot-toast";
import { useState } from "react";
import { useAuthContext } from "../context/authContext";
const userSignup = () => {
  const [loading, setLoading] = useState(false);
  const { setAuthUser } = useAuthContext();

  const signup = async ({
    fullname,
    username,
    email,
    password,
    confirmpassword,
  }) => {
    const success = handleAuth({
      fullname,
      username,
      email,
      password,
      confirmpassword,
    });

    if (!success) return;

    setLoading(true);
    try {
      const res = await fetch("http://localhost:3000/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fullname,
          username,
          email,
          password,
          confirmpassword,
        }),
      });

      const data = await res.json();
      localStorage.setItem("user", JSON.stringify(data));
      setAuthUser(data);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return signup;
};

function handleAuth({ fullname, username, email, password, confirmpassword }) {
  if (!fullname || !username || !email || !password || !confirmpassword) {
    console.log(email);
    console.log(fullname);
    toast.error("Please fill all the fields");
    return false;
  }

  if (password !== confirmpassword) {
    toast.error("Passwords don't match");
    return false;
  }

  if (password < 6) {
    toast.error("Password must be at least 6 characters");
    return false;
  }

  return true;
}
export default userSignup;
