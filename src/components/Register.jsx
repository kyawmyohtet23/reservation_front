import React, { useState } from "react";
import useFetch from "../hooks/useFetch";

const Register = ({ setIsRegisterModel }) => {
  let [name, setName] = useState("");
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");

  let { setPostData, error } = useFetch(
    "http://127.0.0.1:8000/api/register",
    "POST"
  );

  const register = (e) => {
    e.preventDefault();

    let data = {
      name,
      email,
      password,
    };

    console.log(data);

    setPostData(data);

    setName("");
    setEmail("");
    setPassword("");
  };

  return (
    <div className="model-overlay active">
      <div className="model-content ">
        {error && <p className="text-[#ff0000]">{error}</p>}

        <div className="flex justify-between">
          <h1 className="text-lg font-semibold">You're almost done!</h1>

          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-6 h-6"
              cursor="pointer"
              onClick={() => setIsRegisterModel(false)}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18 18 6M6 6l12 12"
              />
            </svg>
          </div>
        </div>

        <form className="w-full mx-auto mt-5" onSubmit={register}>
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full px-3 mt-3">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor=""
              >
                Name
              </label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id=""
                type="text"
                placeholder="Your Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="w-full px-3 mt-3">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor=""
              >
                Email
              </label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id=""
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="w-full px-3 mt-3">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor=""
              >
                Password
              </label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id=""
                type="password"
                placeholder="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <button
            to={"/create"}
            className="text-white bg-red-500 px-3 py-2 rounded flex justify-center items-center gap-1 w-full"
            type="submit"
          >
            <span className="hidden md:block">Register</span>
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
