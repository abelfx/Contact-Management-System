import { toast } from "react-hot-toast";
const signUpHandler = () => {
  const signUp = async ({ fullname, username, password, confirmpassword }) => {
    e.preventDefault();

    console.log(fullname);
    console.log(username);
    console.log(password);
    console.log(confirmpassword);
    if (
      fullname === "" ||
      username === "" ||
      password === "" ||
      confirmpassword === ""
    ) {
      toast.error("Please Enter full credentials");
    } else {
      toast.success("Signing Up!");

      const res = await fetch("/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(input),
      });

      const data = await res.json();

      if (data.message === "successful") {
        setTimeout(() => {
          toast.success("success");
        }, 2500);
      } else {
        setTimeout(() => {
          toast.error("Something went wrong, please try again!");
        }, 2500);
      }
    }
  };

  return signUp;
};

export default signUpHandler;
