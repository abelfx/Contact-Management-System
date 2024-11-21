import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import userSignup from "../hooks/userSignup.js";

const signup = () => {
  // import function from userSignup
  const signup = userSignup();

  const [input, setInput] = useState({
    fullname: "",
    username: "",
    password: "",
    confirmpassword: "",
  });

  const handler = async (e) => {
    e.preventDefault();
    await signup(input);
  };

  return (
    <>
      <div className="flex justify-center items-center h-screen bg-gray-100 ">
        <div className=" border border-black-50 p-10 rounded-md bg-gray-200">
          <h1 className="pb-5 font-bold text-center text-2xl text-gray-800">
            Signup
          </h1>
          <form action="/signup" method="post" id="signup" onSubmit={handler}>
            <div className="eachInput mb-3">
              <label for="username" className="text-gray-700 font-bold">
                Fullname:{" "}
              </label>
              <input
                type="text"
                placeholder="Enter your Fullname"
                className="input input-bordered w-full max-w-xs text-white"
                id="fullname"
                value={input.fullname}
                onChange={(e) =>
                  setInput({ ...input, fullname: e.target.value })
                }
              />
            </div>

            <div className="eachInput mb-3">
              <label for="username" className="text-gray-700 font-bold">
                Username:{" "}
              </label>
              <input
                type="text"
                placeholder="Enter Username"
                className="input input-bordered w-full max-w-xs"
                value={input.username}
                id="username"
                onChange={(e) =>
                  setInput({ ...input, username: e.target.value })
                }
              />
            </div>
            <div className="eachInput mb-3">
              <label for="password" className="text-gray-700 font-bold">
                Password
              </label>
              <label className="input input-bordered flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  className="h-4 w-4 opacity-70"
                >
                  <path
                    fill-rule="evenodd"
                    d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                    clip-rule="evenodd"
                  />
                </svg>
                <input
                  type="password"
                  className="grow"
                  placeholder="john123"
                  value={input.password}
                  id="password"
                  onChange={(e) =>
                    setInput({ ...input, password: e.target.value })
                  }
                />
              </label>
            </div>
            <div className="eachInput mb-3">
              <label for="confirmpassword" className="text-gray-700 font-bold">
                Confrim Password:{" "}
              </label>
              <label className="input input-bordered flex items-center gap-2">
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
                  className="grow"
                  value={input.confirmpassword}
                  onChange={(e) =>
                    setInput({ ...input, confirmpassword: e.target.value })
                  }
                />
              </label>
            </div>

            <div className="mb-2 mt-5">
              <Link to="/login" className="text-sm hover:text-blue-400">
                Already have an account?
              </Link>
            </div>

            <button
              type="submit"
              className=" btn bg-blue-500 hover:bg-blue-600 min-w-80 text-center font-bold text-white border-none"
            >
              Signup
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default signup;
