import React, { useEffect } from "react";
import Navbar from "../../components/Navbar";
import { Outlet, useLocation } from "react-router-dom";
import HeroSection from "../../components/HeroSection";
import { CSSTransition, SwitchTransition } from "react-transition-group";
import "./style.css";
import useTheme from "../../hooks/useTheme";
import { ThemeContext } from "../../contexts/ThemeContext";

const Layout = () => {
  const location = useLocation();

  let { isDark } = useTheme(ThemeContext);

  useEffect(() => {
    let body = document.body;
    if (isDark) {
      // body class = 'bg-dbg'
      body.classList.add("bg-dbg");
    } else {
      body.classList.remove("bg-dbg");
    }
  }, [isDark]);

  return (
    <>
      <div className={`${isDark ? "bg-dbg" : ""}`}>
        <Navbar />
        {/* <HeroSection /> */}

        <SwitchTransition>
          <CSSTransition
            timeout={300}
            classNames="fade"
            key={location.pathname}
          >
            <div className="max-w-7xl mx-auto my-5">
              <Outlet />
            </div>
          </CSSTransition>
        </SwitchTransition>
      </div>
    </>
  );
};

export default Layout;
