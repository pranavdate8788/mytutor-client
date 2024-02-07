import React, { useEffect } from "react";
import Calender from "../Components/Calender";
import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import '../App.css'
import { getNotifications } from "../App/NotificationApi";
import { useAuth } from "../providers/auth";

const VerticalNav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [notification, setnotification] = useState([]);
  const auth = useAuth()
  const toggleSidebar = () => setIsOpen(!isOpen);

  useEffect(() => {
    const fetchData = async (id) => {
      const res = await getNotifications({ receiverId: auth.user._id, read: false });

      if (res.error) {
        // showNotification(res.error.errMessage)
      } else if (res.payload) {
        if (res.payload.length <= 0) return;
        setnotification(res.payload);
        // setisnotification(res.payload[0].isnotification);
      }
    };
    if (auth.user._id) {
      //minus one notification
      fetchData();
    }
  }, [auth.user]);
  console.log('notification', notification)

  return (
    <div className=" fixed left-0 footer w-16 h-screen transition-all duration-500 ease-in-out  bg-color-3 sm:border-t-[.5px] text-lg flex flex-col dark:bg-color-16 dark:text-white xs:bg-orange-100 xs:h-[5%] xs:p-1 xs:fixed z-[12]  xs:bottom-0 sm:z-[5]  sm:h-[8%] sm:text-2xl sm:p-1 sm:fixed  sm:bottom-0 sm:w-full   ">
      <div className="flex flex-col items-center p-8 gap-10 sm:flex  xs:flex sm:p-2 xs:p-2 sm:gap2 xs:gap-2 sm:flex-row xs:flex-row  sm:items-center xs:items-center  sm:justify-evenly xs:justify-evenly  ">
        <NavLink to={"/"}>

          <i title="Home" className="cursor-pointer p-2 rounded-full hover:bg-color-14 transition-all duration-500 ease-in-out  hover:text-white fa-solid fa-home"></i>


        </NavLink>
        <NavLink to={'/appointement'}>

          <i className="cursor-pointer p-2 dark:text-white hover:bg-color-14 transition-all duration-500 ease-in-out  hover:text-white rounded-full fa-solid fa-paper-plane" title="Your Appointments"></i>

        </NavLink>


        {/* <NavLink to={'/appointement'}>
          <i className="cursor-pointer p-2 hover:bg-gray-600 hover:text-white rounded-full fa-solid fa-wallet"></i>
        </NavLink> */}
        <NavLink to={'/favourite'}>
          <i className="cursor-pointer p-2 dark:text-white hover:bg-color-14 transition-all duration-500 ease-in-out  hover:text-white rounded-full fa-solid fa-heart" title="Favourite"></i>
        </NavLink>
        <NavLink to={'/notification'}>
          <div className=" relative">
            <i className="cursor-pointer p-2 dark:text-white hover:bg-color-14 transition-all duration-500 ease-in-out  hover:text-white rounded-full fa-solid fa-bell" title="Notifications"></i>
            <p className="text-color-13 -right-2 px-2 -top-3 absolute text-xs bg-white rounded-full p-1">{notification.length}</p></div>
        </NavLink>
        <NavLink to={'/aboutus'}>
          {/* <i className="cursor-pointer p-2 dark:text-white hover:bg-color-14 transition-all duration-500 ease-in-out  hover:text-white rounded-full fa-solid fa-heart" title="Favourite"></i> */}
          <i class="fa-solid fa-headset cursor-pointer p-2 dark:text-white hover:bg-color-14 transition-all duration-500 ease-in-out  hover:text-white rounded-full" title="Support"></i>
        </NavLink>
        {/* <NavLink to={'/landing_page'}>
          <i className="cursor-pointer p-2 dark:text-white hover:bg-color-14 transition-all duration-500 ease-in-out  hover:text-white rounded-full fa-solid fa-heart" title="Favourite"></i>
          <i class="fa-solid fa-scroll cursor-pointer p-2 dark:text-white hover:bg-color-14 transition-all duration-500 ease-in-out  hover:text-white rounded-full" title="Landing_page"></i>
        </NavLink> */}
      </div>/
    </div>
  );
};
export default VerticalNav;
//gjgj