import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
// import AddPost from "../Pages/Posts/AddPost";
import { useAuth } from "../providers/auth";

const Sidebar = ({ open }) => {
  const [show, setShow] = useState(false);
  const [theme, setTheme] = useState("light");
  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);
  const handleThemeSwitch = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  // console.log(isOpen)
  return (
    <>
      <div
        className={`sidebar  sm:z-[13] border-color-8 border-[1px] sm:mt-2 z-[13] dark:bg-color-11  dark:text-white dark:border w-[330px] sm:w-[270px] h-screen bg-white  rounded-r-3xl left-0 top-0 fixed transition-transform ease-in-out duration-500 ${open
          ? "sidebar-open translate-x-[0%]"
          : "sidebar-close -translate-x-full"
          }`}>
        <div className="flex w-full flex-col p-2">
          <Link to={"/profile"}>
            {" "}
            <div className="flex p-2 w-full items-center gap-5">
              <div className="bg-color-6 relative dark:bg-orange-400 dark:text-white rounded-full h-14 w-14 xs:h-10 xs:w-10 ">
                <h1 className="absolute right-4 bottom-2  sm:right-3 sm:bottom-1 font-semibold text-2xl text-white p-1">
                  P
                </h1>
              </div>
              <label>{useAuth().user.name}</label>
            </div>
          </Link>
          <div className="flex justify-between items-center p-1">
            <h2 className="text-2xl ">My Tutor</h2>
          </div>
          <div className="flex flex-col gap-3 list-none p-2">
            <div
              className="flex gap-2 items-center  shadow-sm shadow-color-8 py-2 px-3 hover:bg-color-8 transition-all duration-500 ease-in-out hover:text-white  rounded-2xl "
              onClick={handleThemeSwitch}>
              <i className="fa-solid fa-moon cursor-pointer"> </i>
              <label>Dark Mode</label>
            </div>
          </div>
          <div className="flex flex-col gap-3 absolute bottom-0 w-full ">
            <div className="flex w-full text-sm gap-1  px-3 flex-wrap">
              <Link to={"/aboutus"}>
                {" "}
                <label className="px-2 hover:underline transition-all duration-300 ease-in-out hover:text-color-9">
                  About Us
                </label>
              </Link>
              <Link to={"/aboutus"}>
                {" "}
                <label className="px-2 hover:underline transition-all duration-300 ease-in-out hover:text-color-9">
                  FeedBack
                </label>
              </Link>
              <Link to={"/aboutus"}>
                <label className="px-2 hover:underline transition-all duration-300 ease-in-out hover:text-color-9">
                  Contact us
                </label>
              </Link>
              <label className="px-2 hover:underline transition-all duration-300 ease-in-out hover:text-color-9">
                Creaters
              </label>
              <label className="px-2 hover:underline  transition-all duration-300 ease-in-out hover:text-color-9">
                Developers
              </label>
            </div>
            <div className="flex w-full text-sm gap-1 px-3 flex-wrap">
              <label className="px-2 hover:underline transition-all duration-300 ease-in-out hover:text-color-9">
                Terms
              </label>
              <label className="px-2 hover:underline transition-all duration-300 ease-in-out hover:text-color-9">
                Privacy
              </label>
              <label className="px-2 hover:underline transition-all duration-300 ease-in-out hover:text-color-9 ">
                Policy & Safety
              </label>
              <label className="px-2 hover:underline transition-all duration-300 ease-in-out hover:text-color-9 ">
                How to use MyTutor
              </label>
              <label className="px-2 hover:underline transition-all duration-300 ease-in-out hover:text-color-9">
                New features
              </label>
            </div>
            <div className="px-4 py-2">
              <i className="fa-regular fa-copyright"></i>{" "}
              <label>2023 MyTutor LLC</label>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
