import React, { useEffect, useState } from "react";
import StarRatings from "react-star-ratings";
import useFetch from "../hooks/useFetch";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { useCookies } from "react-cookie";

const Review = ({ restaurant }) => {
  const [starCount, setStarCount] = useState(0);

  const [comment, setComment] = useState("");

  // const [allReviews, setAllReview] = useState(restaurant.review);

  const [reviews, setReviews] = useState(restaurant.review);

  const [cookies] = useCookies(["authToken"]);

  const token = cookies.authToken;

  // let { setPostData, data } = useFetch(
  //   "http://127.0.0.1:8000/api/make-review",
  //   "POST"
  // );

  // console.log(data);
  // console.log(reviews);

  // useEffect(() => {
  //   axios
  //     .get("http://127.0.0.1:8000/api/restaurants/" + restaurant.slug)
  //     .then((res) => {
  //       setReviews(res.data.review);

  //     });
  // }, []);

  // console.log(reviews);

  const cancel = () => {
    setComment("");
    setStarCount(0);
  };

  // make review
  const makeReview = async (e) => {
    e.preventDefault();

    let review = {
      starCount,
      comment,
      restaurantId: restaurant.id,
    };

    await axios
      .post("http://127.0.0.1:8000/api/make-review", review, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        if (res.data) {
          setReviews([...reviews, res.data]);

          setComment("");
          setStarCount(0);
          // console.log(data);
        }
      });
  };

  return (
    <>
      <div className="flex items-center mb-3">
        <img
          src="https://scontent-bom1-1.xx.fbcdn.net/v/t39.30808-1/286404760_1510383346046392_1606111783702275133_n.jpg?stp=dst-jpg_p240x240&_nc_cat=104&ccb=1-7&_nc_sid=5740b7&_nc_ohc=6m5m0LmC9roAX_NzPr7&_nc_ht=scontent-bom1-1.xx&oh=00_AfAyvT0BbqrHKa2D6T5KbHcA39Kl2v6jniqik298WxpQrg&oe=65E0B085"
          alt=""
          className="w-[7%] rounded-full mb-10"
        />
        <div className="ms-3 flex-1">
          <form action="" onSubmit={makeReview}>
            <div className="mt-5">
              <StarRatings
                starDimension="20px"
                starSpacing="1px"
                numberOfStars={5}
                rating={starCount}
                starRatedColor="orange"
                name="rating"
                changeRating={(rate) => {
                  setStarCount(rate);
                }}
              />

              <input
                type="text"
                className="w-full mt-4 bg-transparent border-b border-gray-300 focus:outline-none focus:border-black"
                placeholder="Add a comment..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              />
            </div>

            <div className="mt-1 float-end">
              <button
                className=" hover:bg-slate-300 transition-colors duration-300 px-3 py-2 text-sm font-semibold rounded-xl"
                onClick={cancel}
              >
                Cancel
              </button>

              <button
                className={`hover:bg-slate-300 transition-colors duration-300 px-3 py-2 text-sm font-semibold rounded-xl ${
                  comment || starCount != 0
                    ? ""
                    : "opacity-50 cursor-not-allowed"
                }`}
                type="submit"
                // onClick={makeReview}
              >
                Comment
              </button>
            </div>
          </form>
        </div>
      </div>
      <hr />

      {reviews &&
        reviews.map((review) => (
          <div key={review.id}>
            <div className="my-4 flex">
              <div>
                <img
                  src="https://scontent-bom1-1.xx.fbcdn.net/v/t39.30808-1/286404760_1510383346046392_1606111783702275133_n.jpg?stp=dst-jpg_p240x240&_nc_cat=104&ccb=1-7&_nc_sid=5740b7&_nc_ohc=6m5m0LmC9roAX_NzPr7&_nc_ht=scontent-bom1-1.xx&oh=00_AfAyvT0BbqrHKa2D6T5KbHcA39Kl2v6jniqik298WxpQrg&oe=65E0B085"
                  alt=""
                  className="w-[15%] rounded-full"
                />

                {review.user && (
                  <h1 className="text-sm mt-1">{review.user.name}</h1>
                )}
              </div>

              <div className="">
                <StarRatings
                  rating={review.rating}
                  starRatedColor="orange"
                  numberOfStars={5}
                  name="rating"
                  starSpacing="1px"
                  starDimension="20px"
                />

                <div>{review.review}</div>
              </div>
            </div>
            <hr />
          </div>
        ))}
    </>
  );
};

export default Review;
