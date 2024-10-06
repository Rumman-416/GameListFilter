import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const location = useLocation();
  const [visibleContent, setVisibleContent] = useState("");

  useEffect(()=>{
    if (location.pathname === "/contact-us") {
      setVisibleContent("Contact");
    } else if (location.pathname === "/") {
      setVisibleContent("Video");
    }
  },[location.pathname])

  const navHeading = [
    {
      label: "Video Games",
      content: "Video",
      link: "/",
    },
    {
      label: "Contact",
      content: "Contact",
      link: "/contact-us",
    },
  ];

  const showContent = (item) => {
    setVisibleContent(item.content); 
  };

  return (
    <div className="p-10 md:p-14">
      <ul className="py-5 text-2xl font-montserrat font-medium flex flex-col gap-5 lg:flex-row lg:gap-20 ">
        {navHeading.map((item, index) => (
          <Link to={item.link} key={index} onClick={() => showContent(item)}>
            <li
              className={`text-[#fff] z-10 relative uppercase 
                ${visibleContent === item.content ? 'after:content-["' + item.content + '"]' : 'after:content-[""]'} 
                after:absolute after:px-4 after:-top-[25px] after:-left-[40px] 
                after:text-5xl after:font-semibold after:text-text 
                after:opacity-15`}
            >
              {item.label}
            </li>
          </Link>
        ))}
      </ul>
    </div>
  );
};

export default Navbar;
