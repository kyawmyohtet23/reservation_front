import React from "react";

const RestaurantList = () => {
  return (
    <div className="">
      <h1 className="text-3xl font-medium mt-8 mb-5">Popular This Week</h1>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 my-3">
        <div className="p-2 border border-1 rounded-md">
          <img
            src="https://scontent-sin6-1.xx.fbcdn.net/v/t39.30808-6/403086020_372368985297336_626496315054394045_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=783fdb&_nc_ohc=k1aMPlJtkzYAX_WofZL&_nc_ht=scontent-sin6-1.xx&oh=00_AfDOE_352faafB34HamEgIz1XskX0CR-vmWrZ7Anw1jtNg&oe=65C08DE6"
            alt=""
          />
          <div className="text-center space-y-2 mt-3">
            <h1 className="text-2xl font-semibold">12 Inya</h1>
            <p>
              12 INYA is home to the ever-popular Whisky Society & Cigar Club!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RestaurantList;
