import React, { useEffect, useState } from "react";
import "./css/model.css";
import useFetch from "../hooks/useFetch";
import axios from "axios";
import useAuth from "../hooks/useAuth";
import { useCookies } from "react-cookie";

const Model = ({ setIsModel, person, restaurant, date, time }) => {
  let [name, setName] = useState("");
  let [email, setEmail] = useState("");
  let [phone, setPhone] = useState("");
  let [occasion, setOccasion] = useState("");
  let [request, setRequest] = useState("");

  let [authError, setAuthError] = useState(false);

  const [cookies] = useCookies(["authToken"]);
  // console.log(cookies.authToken);

  const token = cookies.authToken;

  // let {
  //   setPostData,
  //   data: response,
  //   error,
  // } = useFetch("http://127.0.0.1:8000/api/restaurants/reserve", "POST");

  const reserve = async (e) => {
    e.preventDefault();

    let data = {
      restaurant_id: restaurant.id,
      name,
      email,
      phone,
      occasion,
      request,
      person,
      date,
      time,
    };

    // setPostData(data);
    try {
      await axios
        .post("http://127.0.0.1:8000/api/restaurants/reserve", data, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          if (res.status === 201) {
            setIsModel(false);
          }
        });
    } catch (error) {
      setAuthError(error);
    }
  };

  return (
    <>
      <div className="model-overlay active">
        <div className="model-content ">
          <div>
            {authError && (
              <p className="text-center text-[#ff0000]">Please Login First!</p>
            )}
            {/* {error && (
              <p className="text-center text-[#ff0000]">Please Login First!</p>
            )} */}
          </div>

          <div className="flex justify-between my-2">
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
                onClick={() => setIsModel(false)}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18 18 6M6 6l12 12"
                />
              </svg>
            </div>
          </div>

          <div className="flex">
            <img
              src={restaurant.image_url}
              className="max-w-[40%] ms-3 rounded"
              alt=""
            />

            <div className="ms-3">
              <h1 className="text-lg font-sans font-semibold">
                {restaurant.name}
              </h1>

              <p className="my-3 flex justify-start items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  className="w-4 h-4"
                >
                  <path d="M8.5 4.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0ZM10.9 12.006c.11.542-.348.994-.9.994H2c-.553 0-1.01-.452-.902-.994a5.002 5.002 0 0 1 9.803 0ZM14.002 12h-1.59a2.556 2.556 0 0 0-.04-.29 6.476 6.476 0 0 0-1.167-2.603 3.002 3.002 0 0 1 3.633 1.911c.18.522-.283.982-.836.982ZM12 8a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z" />
                </svg>

                <span className="ms-2 text-sm font-semibold">{person}</span>
              </p>

              <p className="my-3 flex justify-start items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  className="w-4 h-4"
                >
                  <path d="M5.75 7.5a.75.75 0 1 0 0 1.5.75.75 0 0 0 0-1.5ZM5 10.25a.75.75 0 1 1 1.5 0 .75.75 0 0 1-1.5 0ZM10.25 7.5a.75.75 0 1 0 0 1.5.75.75 0 0 0 0-1.5ZM7.25 8.25a.75.75 0 1 1 1.5 0 .75.75 0 0 1-1.5 0ZM8 9.5A.75.75 0 1 0 8 11a.75.75 0 0 0 0-1.5Z" />
                  <path
                    fillRule="evenodd"
                    d="M4.75 1a.75.75 0 0 0-.75.75V3a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2V1.75a.75.75 0 0 0-1.5 0V3h-5V1.75A.75.75 0 0 0 4.75 1ZM3.5 7a1 1 0 0 1 1-1h7a1 1 0 0 1 1 1v4.5a1 1 0 0 1-1 1h-7a1 1 0 0 1-1-1V7Z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="ms-2 text-sm font-semibold">{date}</span>
              </p>

              <p className="my-3 flex justify-start items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  className="w-4 h-4"
                >
                  <path
                    fillRule="evenodd"
                    d="M1 8a7 7 0 1 1 14 0A7 7 0 0 1 1 8Zm7.75-4.25a.75.75 0 0 0-1.5 0V8c0 .414.336.75.75.75h3.25a.75.75 0 0 0 0-1.5h-2.5v-3.5Z"
                    clipRule="evenodd"
                  />
                </svg>

                <span className="ms-2 text-sm font-semibold">{time}</span>
              </p>
            </div>
          </div>

          <form className="w-full mx-auto mt-5" onSubmit={reserve}>
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
                  Phone
                </label>
                <input
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id=""
                  type="text"
                  placeholder="Phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>

              <div className="w-full px-3 mt-3">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor=""
                >
                  Occasion
                </label>
                <input
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id=""
                  type="text"
                  placeholder="Occasion"
                  value={occasion}
                  onChange={(e) => setOccasion(e.target.value)}
                />
              </div>

              <div className="w-full px-3 mt-3">
                <label
                  htmlFor=""
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                >
                  Request
                </label>
                <textarea
                  name=""
                  id=""
                  cols="3"
                  rows="2"
                  placeholder="Add a special request"
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  value={request}
                  onChange={(e) => setRequest(e.target.value)}
                ></textarea>
              </div>
            </div>

            <button
              to={"/create"}
              className="text-white bg-red-500 px-3 py-2 rounded flex justify-center items-center gap-1 w-full"
              type="submit"
            >
              <span className="hidden md:block">Complete Reservation</span>
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Model;
