import React, { useState, useEffect, useRef, useContext } from "react";
import { useLocation, useParams } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import BreadCrumb from "../components/BreadCrumb";
import Navbar from "../components/Navbar";
import Loader from "../components/Loader";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import "./css/detail.css";
import Model from "../components/Model";
import { io } from "socket.io-client";
import { ThemeContext } from "../contexts/ThemeContext";
import Review from "../components/Review";
import useAuth from "../hooks/useAuth";
import { useCookies } from "react-cookie";

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3,
    slidesToSlide: 3, // optional, default to 1.
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
    slidesToSlide: 2, // optional, default to 1.
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
    slidesToSlide: 1, // optional, default to 1.
  },
};

const RestaurantDetail = () => {
  const params = useParams();

  const [person, setPerson] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [isModel, setIsModel] = useState(false);

  const [personError, setPersonError] = useState(false);
  const [dateError, setDateError] = useState(false);
  const [timeError, setTimeError] = useState(false);

  const carouselRef = useRef(null);
  let {
    data: restaurant,
    loading,
    error,
  } = useFetch("http://127.0.0.1:8000/api/restaurants/" + params.slug);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // const currentDate = new Date();
  // console.log(currentDate);

  const location = useLocation();

  const reserve = () => {
    if (!person) {
      setPersonError(true);
    } else if (!date) {
      setDateError(true);
    } else if (!time) {
      setTimeError(true);
    } else {
      setIsModel(true);
      setPersonError(false);
      setDateError(false);
      setTimeError(false);
    }
  };

  return (
    <>
      {isModel && (
        <Model
          setIsModel={setIsModel}
          restaurant={restaurant}
          person={person}
          date={date}
          time={time}
        />
      )}
      {/* <Navbar /> */}

      <div className="max-w-[95%] mx-auto z-0">
        <BreadCrumb />

        <div ref={carouselRef} className="carousel">
          <Carousel
            swipeable={false}
            draggable={false}
            responsive={responsive}
            ssr={true} // means to render carousel on server-side.
            infinite={true}
            autoPlaySpeed={1000}
            keyBoardControl={true}
            customTransition="all .5"
            transitionDuration={500}
            containerClass="carousel-container"
            removeArrowOnDeviceType={["tablet", "mobile"]}
            dotListClass="custom-dot-list-style"
            itemClass="carousel-item-padding-40-px"
            className="bg-slate-200 h-96"
          >
            {!!restaurant &&
              restaurant.image.map((i) => (
                <img
                  key={i.id}
                  src={i.image_url}
                  className="d-block w-100"
                  alt="..."
                />
              ))}
          </Carousel>
        </div>
      </div>

      <div className="tabs flex justify-evenly">
        <nav className="w-[50%] sticky bg-white shadow rounded px-10 py-3">
          <ul className="flex justify-between">
            <li>
              <a href="#overview">Overview</a>
            </li>

            <li>
              <a href="#menu">Menu</a>
            </li>

            <li>
              <a href="#photo">Photos</a>
            </li>

            <li>
              <a href="#review">Reviews</a>
            </li>
          </ul>
          <hr className="my-3" />

          {!!restaurant && (
            <div className="">
              <div id="overview">
                <h1 className="text-4xl font-semibold font-sans my-4">
                  {restaurant.name}
                </h1>
                <hr />
                <p className="my-4">{restaurant.description}</p>
              </div>
              <div id="menu" className="mt-10">
                <h1 className="text-2xl font-semibold font-sans my-4">Menu</h1>
                <hr />
                <div className="grid grid-cols-2 gap-10 font-serif my-4">
                  {restaurant.menu.map((m) => (
                    <div key={m.id}>
                      <div className="flex justify-between gap-2">
                        <h1 className="">{m.name}</h1>
                        <span>{m.price} Ks</span>
                      </div>

                      <p className="text-wrap text-sm text-slate-600 mt-2">
                        {m.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
              <div id="photo" className="my-10">
                <h1 className="text-2xl font-semibold font-sans my-4">
                  Photos
                </h1>
                <hr />
                <div className="grid grid-cols-2 font-serif my-4">
                  {restaurant.image.map((i) => (
                    <div key={i.id}>
                      <img src={i.image_url} alt="" />
                    </div>
                  ))}
                </div>
              </div>
              <hr />

              {/* reviews */}

              <div id="review">
                <Review
                  restaurant={restaurant}
                  // setReviews={setReviews}
                  // reviews={reviews}
                />
              </div>
            </div>
          )}
        </nav>

        <div className="reserve w-[25%] h-auto bg-white  me-12 font-sans px-8 shadow rounded">
          <h1 className="py-3 font-semibold text-center">Make a Reservation</h1>
          <hr />

          <div className="mt-4">
            <div>
              <label htmlFor="" className="text-gray-800">
                Total Person
              </label>
              <select
                value={person}
                onChange={(e) => setPerson(e.target.value)}
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              >
                <option value="">Select an option</option>
                <option value="1">1 person</option>
                <option value="2">2 people</option>
                <option value="3">3 people</option>
              </select>
              {personError && (
                <small className="text-[#ff0000]">
                  Please Choose Total Person.
                </small>
              )}
            </div>

            <div className="my-2">
              <label htmlFor="" className="text-gray-800">
                Date
              </label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              />
              {dateError && (
                <small className="text-[#ff0000]">Please Choose Date.</small>
              )}
            </div>

            <div className="my-2">
              <label htmlFor="" className="text-gray-800">
                Time
              </label>
              <input
                type="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              />
              {timeError && (
                <small className="text-[#ff0000]">Please Choose Time.</small>
              )}
            </div>

            <button
              className="pt-0 pb-1 rounded px-3 text-white mt-3 flex mx-auto bg-blue-500"
              onClick={reserve}
            >
              Reserve
            </button>
          </div>
        </div>
      </div>

      {/* <div className="max-w-7xl mx-auto">
        {error && <p>{error}</p>}
        {loading && <Loader />}
        {restaurant && (
          <div className="grid grid-cols-2 gap-6 mt-10">
            <div>
              <img src={restaurant.image_url} className="w-[100%]" />
            </div>

            <div className="space-y-6">
              <h1 className="text-3xl font-bold">{restaurant.name}</h1>

              <div className="">
                <div className="flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fillRule="currentColor"
                    className="w-4 h-4"
                  >
                    <path
                      fillRule="evenodd"
                      d="M1.5 4.5a3 3 0 0 1 3-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 0 1-.694 1.955l-1.293.97c-.135.101-.164.249-.126.352a11.285 11.285 0 0 0 6.697 6.697c.103.038.25.009.352-.126l.97-1.293a1.875 1.875 0 0 1 1.955-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 0 1-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 6.75V4.5Z"
                      clipRule="evenodd"
                    />
                  </svg>

                  <span className="ms-5 text-primary font-medium">
                    {restaurant.phone}
                  </span>
                </div>

                <div className="flex items-center my-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fillRule="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      fillRule="evenodd"
                      d="m11.54 22.351.07.04.028.016a.76.76 0 0 0 .723 0l.028-.015.071-.041a16.975 16.975 0 0 0 1.144-.742 19.58 19.58 0 0 0 2.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 0 0-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 0 0 2.682 2.282 16.975 16.975 0 0 0 1.145.742ZM12 13.5a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"
                      clipRule="evenodd"
                    />
                  </svg>

                  <span className="ms-3 text-primary font-medium">
                    {restaurant.address}
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div> */}
    </>
  );
};

export default RestaurantDetail;
