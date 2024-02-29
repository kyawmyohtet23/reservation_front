import React from "react";
import { useLocation } from "react-router-dom";
import { NavLink } from "react-router-dom";
import "./css/Crumb.css";
import useTheme from "../hooks/useTheme";
import { ThemeContext } from "../contexts/ThemeContext";

const BreadCrumb = () => {
  const location = useLocation();

  // console.log(location);
  let currentLink = "";

  const crumbs = location.pathname
    .split("/")
    .filter((crumb) => crumb !== "")
    .map((crumb) => {
      currentLink += `/${crumb}`;

      return (
        <div className="crumb" key={crumb}>
          <NavLink to={currentLink}>{crumb}</NavLink>
        </div>
      );
    });

  return <div className="breadcrumbs mt-8 font-serif capitalize">{crumbs}</div>;
};

export default BreadCrumb;
