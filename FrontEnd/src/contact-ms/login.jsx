import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
const login = () => {
  const [input, setInput] = useState({
    username: "",
    password: "",
  });

  const navigate = useNavigate();

  // Authentication using the backend will go here

  const handleLogin = async (e) => {
    e.preventDefault();
    if (input.username === "" || input.password === "") {
      toast.error("Enter Full Credentials");
    } else {
      toast.success("Loggin In!");
      const res = await fetch("http://localhost:3000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(input),
      });
      const data = await res.json();

      if (res.status === 201) {
        setTimeout(() => {
          navigate("/home");
          toast.success("Logged in Successfully");
        }, 2000);
      } else {
        setTimeout(() => {
          toast.error("Login failed, try again");
        }, 2000);
      }
    }
  };

  return (
    <>
      <div className="flex justify-center items-center h-screen bg-gray-100 ">
        <div className=" border border-black-50 p-10 rounded-md bg-gray-200">
          <h1 className="pb-5 font-bold text-center text-2xl text-gray-800">
            Login
          </h1>
          <form action="/login" method="post" id="login" onSubmit={handleLogin}>
            <div class="eachInput mb-3">
              <label for="username" className="text-gray-700 font-bold">
                Username
              </label>
              <input
                type="text"
                placeholder="Enter Username"
                className="input input-bordered w-full max-w-xs"
                value={input.username}
                onChange={(e) =>
                  setInput({ ...input, username: e.target.value })
                }
              />
            </div>
            <div class="eachInput mb-3">
              <label for="password" className="text-gray-700 font-bold">
                Password
              </label>
              <label class="input input-bordered flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  class="h-4 w-4 opacity-70"
                >
                  <path
                    fill-rule="evenodd"
                    d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                    clip-rule="evenodd"
                  />
                </svg>
                <input
                  type="password"
                  class="grow"
                  placeholder="john123"
                  value={input.password}
                  onChange={(e) =>
                    setInput({ ...input, password: e.target.value })
                  }
                />
              </label>
            </div>

            <div className="mb-2 mt-5">
              <Link
                to="/signup"
                className="text-sm text-gray-500 hover:text-blue-700"
              >
                Don't have an account?
              </Link>
            </div>

            <button
              type="submit"
              className=" btn bg-blue-500 hover:bg-blue-600 min-w-80 text-white font-bold text-center border font-bold border-none"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default login;
