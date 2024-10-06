import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const location = useLocation();
  const [visibleContent, setVisibleContent] = useState("");

  useEffect(() => {
    if (location.pathname === "/contact-us") {
      setVisibleContent("Contact");
    } else if (location.pathname === "/") {
      setVisibleContent("Video");
    }
  }, [location.pathname]);

  const showContent = (content) => {
    setVisibleContent(content);
  };

  return (
    <div className="p-10 md:p-14">
      <ul className="py-5 text-2xl font-montserrat font-medium flex flex-col gap-5 lg:flex-row lg:gap-20 ">
        <Link to="/" onClick={() => showContent("Video")}>
          <li
            className={`text-[#fff] z-10 relative uppercase 
              ${
                visibleContent === "Video"
                  ? 'after:content-["Video"]'
                  : 'after:content-[""]'
              } 
              after:absolute after:px-4 after:-top-[25px] after:-left-[40px] 
              after:text-5xl after:font-semibold after:text-text 
              after:opacity-15`}
          >
            Video Games
          </li>
        </Link>
        <Link to="/contact-us" onClick={() => showContent("Contact")}>
          <li
            className={`text-[#fff] z-10 relative uppercase 
              ${
                visibleContent === "Contact"
                  ? 'after:content-["Contact"]'
                  : 'after:content-[""]'
              } 
              after:absolute after:px-4 after:-top-[25px] after:-left-[40px] 
              after:text-5xl after:font-semibold after:text-text 
              after:opacity-15`}
          >
            Contact
          </li>
        </Link>
      </ul>
    </div>
  );
};

export default Navbar;
