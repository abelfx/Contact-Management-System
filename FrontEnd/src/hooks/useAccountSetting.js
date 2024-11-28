import { useState } from "react";

const useAccountSettings = () => {
  const [username, setUsername] = useState("JohnDoe123");
  const [email, setEmail] = useState("johndoe@example.com");
  const [password, setPassword] = useState("");
  const [emailNotifications, setEmailNotifications] = useState(true);

  const updateSettings = (field, value) => {
    switch (field) {
      case "username":
        setUsername(value);
        break;
      case "email":
        setEmail(value);
        break;
      case "password":
        setPassword(value);
        break;
      case "emailNotifications":
        setEmailNotifications(value);
        break;
      default:
        break;
    }
  };

  return {
    username,
    email,
    password,
    emailNotifications,
    updateSettings,
  };
};

export default useAccountSettings;
