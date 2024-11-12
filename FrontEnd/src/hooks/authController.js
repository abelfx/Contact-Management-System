import { toast } from "react-hot-toast";
import { useState } from "react";
const authController = () => {
  const [input, setInput] = useState({
    username: "",
    password: "",
  });

  function checker({ username, password }) {
    if (!username || !password) {
      toast.error("Enter valid credentials");
    }
  }
};

export default authController;
