import React from "react";
import "./css/loader.css";

const Loader = () => {
  return (
    <div className="flex items-center justify-center">
      <div className="w-8 h-8 border-t-4 text-center border-primary border-solid border-opacity-50 rounded-full animate-spin"></div>
    </div>
  );
};

export default Loader;
