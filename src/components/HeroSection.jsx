import React from "react";

const HeroSection = () => {
  return (
    <>
      <div className=" flex justify-center items-center bg-gray-100 overflow-x-hidden">
        <h3 className="text-4xl ms-44 p-2 w-[35%] font-normal font-serif">
          It's the food and groceries you love, delivered
        </h3>

        <div className="w-[55%]">
          <img
            src="https://images.deliveryhero.io/image/foodpanda/homepage/refresh-hero-home-mm.png?width=1264"
            alt=""
            className="w-full ms-52"
          />
        </div>
      </div>
    </>
  );
};

export default HeroSection;
