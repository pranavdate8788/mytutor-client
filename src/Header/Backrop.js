import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../providers/auth";

const Backrop = () => {
  const auth = useAuth()

  const logout = () => {
    localStorage.removeItem('_id');
    auth.setUser({})
  };

  return (

    <div className="flex flex-col absolute  top-[4.5rem] z-[1] right-4 w-[300px] h-auto p-4 rounded-3xl sm:w-auto border-color-6 border-[1px]  bg-color-3 dark:bg-color-11 transition-all duration-500 ease-in-out dark:border-white">
      <Link to={"/profile"}>
        <div className="flex w-full justify-around items-center">
          <div className="w-[30%] p-1">
            <div className="rounded-full relative h-12 w-12 bg-color-4">
              <div className="absolute sm:bottom-2 right-3 p-2 text-white text-transform: uppercase"> {auth.user.name[0]}</div></div></div>
          <div className="flex cursor-pointer dark:text-white w-[70%] flex-col text-sm font-semibold">
            <label className="cursor-pointer ">{auth.user.name}</label>
            <label className="cursor-pointer sm:text-xs">{auth.user.email}</label>
          </div>
        </div>
      </Link>

      <ul className="flex flex-col gap-4 m-4   justify-center ">

        <Link to={"/profile"}>
          <li className="flex  items-center sm:gap-5 gap-7">
            <i className="fa-solid fa-pen-to-square  dark:text-white"></i>
            <label className="cursor-pointer transition-all duration-300 ease-in-out dark:hover:text-color-8 dark:text-white hover:text-color-8">Edit profile </label>
          </li>
        </Link>
        {/* <li className="flex  items-center gap-7">
          <i className="fa-solid fa-gear"></i> <label className="cursor-pointer transition-all duration-300 ease-in-out hover:text-color-8">Setting </label>
        </li> */}
        <li className="flex  items-center gap-7 sm:gap-5 dark:text-white text-color-14"
          onClick={() => logout()}
        >
          <i className="fa-solid  fa-right-to-bracket"></i>
          <label className="cursor-pointer text-color-14 transition-all duration-300 ease-in-out hover:text-color-8"

          >Logout </label>
        </li>
      </ul>
    </div>


  );
}

export default Backrop;
