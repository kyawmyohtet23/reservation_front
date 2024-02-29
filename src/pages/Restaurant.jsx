import React, { useCallback, useEffect, useState } from "react";
import BreadCrumb from "../components/BreadCrumb";
import useFetch from "../hooks/useFetch";
import Loader from "../components/Loader";
import { NavLink } from "react-router-dom";
import "./css/restaurant.css";
import { ThemeContext } from "../contexts/ThemeContext";
import useTheme from "../hooks/useTheme";
import HeroSection from "../components/HeroSection";
import axios from "axios";

const Restaurant = () => {
  let url = "http://127.0.0.1:8000/api/restaurants";
  let { data: restaurant, loading, error } = useFetch(url);

  let { data: cities } = useFetch("http://127.0.0.1:8000/api/cities");

  let { isDark } = useTheme(ThemeContext);

  const [restaurants, setRestaurants] = useState(null);
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    setRestaurants(restaurant);
  }, [restaurant]);

  const [cityId, setCityId] = useState(null);
  const [search, setSearch] = useState("");

  // filter

  const filter = async (e) => {
    e.preventDefault();

    let request = {
      cityId,
      search,
    };

    setLoader(true);

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/restaurants/search",
        request
      );
      if (response.data) {
        // console.log(response.data);
        setRestaurants(response.data);
        setLoader(false);
      }
    } catch (error) {
      // Handle error if any
      console.error("Error occurred while filtering:", error);
      setLoader(false);
    }
  };

  return (
    <>
      {/* <HeroSection /> */}
      <div className="bg-blue-500 h-56 flex justify-center items-center">
        <div className="space-y-5 text-center">
          <h1 className="text-white text-3xl">
            Discover and book the best restaurant
          </h1>

          <div className="">
            <form
              action=""
              className="mx-auto flex items-center"
              onSubmit={filter}
            >
              <select
                id="city"
                name="city"
                className="block w-1/2 px-4 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-tl-md rounded-bl-md"
                onChange={(e) => setCityId(e.target.value)}
              >
                <option value="">Select a city</option>
                {cities &&
                  cities.map((city) => (
                    <option key={city.id} value={city.id}>
                      {city.name}
                    </option>
                  ))}
              </select>

              <input
                id="text"
                name="text"
                type="text"
                className="block w-1/2 px-4 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Cuisine, restaurant name..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />

              <button
                type="submit"
                className="bg-white text-black border-l-2 py-[8px] px-5 text-sm rounded-tr-md rounded-br-md hover:bg-black hover:text-white transition duration-300 ease-in-out"
              >
                Search
              </button>
            </form>
          </div>
        </div>
      </div>

      <div className="">
        <BreadCrumb />
        <div className="mt-5">
          <h1 className="text-3xl font-serif">All Restaurants</h1>

          {loader && <Loader />}
          {loading && <Loader />}
          {error && <p>Error: {error}</p>}
          {!loader && !!restaurants && (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 my-5 ">
              {restaurants.map((restaurant) => (
                <NavLink
                  to={`/restaurants/${restaurant.slug}`}
                  key={restaurant.id}
                  className={`p-2 restaurant ${isDark ? "text-white" : ""}`}
                >
                  <img
                    src={restaurant.image_url}
                    className="img"
                    alt={restaurant.name}
                  />
                  <div className=" space-y-2 mt-3">
                    <h1 className="text-xl font-bold">{restaurant.name}</h1>
                    <div className="flex flex-wrap">
                      {/* <span className="bg-primary mx-1 my-1 text-white rounded-full px-2 pb-1 text-sm">
                        {restaurant.desc}
                      </span> */}
                    </div>

                    <div>{restaurant.description}</div>

                    <div>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 16 16"
                        fill="currentColor"
                        className="w-4 h-4"
                      >
                        <path
                          fillRule="evenodd"
                          d="m3.855 7.286 1.067-.534a1 1 0 0 0 .542-1.046l-.44-2.858A1 1 0 0 0 4.036 2H3a1 1 0 0 0-1 1v2c0 .709.082 1.4.238 2.062a9.012 9.012 0 0 0 6.7 6.7A9.024 9.024 0 0 0 11 14h2a1 1 0 0 0 1-1v-1.036a1 1 0 0 0-.848-.988l-2.858-.44a1 1 0 0 0-1.046.542l-.534 1.067a7.52 7.52 0 0 1-4.86-4.859Z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                  </div>
                </NavLink>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Restaurant;
