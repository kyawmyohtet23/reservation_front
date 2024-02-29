import React, { useState, useEffect } from "react";
import useFetch from "../hooks/useFetch";
import useAuth from "../hooks/useAuth";
import axios from "axios";

const Login = ({ setIsLoginModel, setIsLoggedIn }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { login } = useAuth();

  // let {
  //   setPostData,
  //   data: response,
  //   error,
  //   statusCode,
  // } = useFetch("http://127.0.0.1:8000/api/login", "POST");

  // setPostData(data);
  // localStorage.setItem("isLoggedIn", true);
  // setEmail("");
  // setPassword("");

  // console.log(response.message);

  // useEffect(() => {
  //   const storedIsLoggedIn = localStorage.getItem("isLoggedIn");

  //   if (response && storedIsLoggedIn === "true") {
  //     setIsLoginModel(false);
  //     setIsLoggedIn(true);

  //   }
  // }, [response, setIsLoginModel]);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      // setError(null);
    } catch (error) {
      // setError("Invalid email or password");
      console.log(error);
    }
  };

  return (
    <div className="model-overlay active">
      <div className="model-content ">
        {/* {error && <p className="text-[#ff0000]">{error}</p>} */}

        <div className="flex justify-between">
          <h1 className="text-lg font-semibold">Login</h1>

          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-6 h-6"
              cursor="pointer"
              onClick={() => setIsLoginModel(false)}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18 18 6M6 6l12 12"
              />
            </svg>
          </div>
        </div>

        <form className="w-full mx-auto mt-5" onSubmit={handleLogin}>
          <div className="flex flex-wrap -mx-3 mb-6">
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
            className="text-white bg-blue-500 px-3 py-2 rounded flex justify-center items-center gap-1 w-full"
            type="submit"
          >
            <span className="hidden md:block">Login</span>
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
