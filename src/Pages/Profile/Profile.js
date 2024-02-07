import React, { useEffect, useState } from "react";

import About from "./About";
import AllPost from "./AllPost";
import { useAuth } from "../../providers/auth";
import { updateUser } from "../../App/Api";
import Loader, { LoaderSmall } from "../../Components/Helper/Loader";
import { ConfigProvider, FloatButton, notification } from "antd";
import { useAlert } from "../../Components/Alert";

const Profile = ({ toggler = '1' }) => {
  const [profileToggler, setProfileToggler] = useState(toggler)
  const [loader, setLoader] = useState({
    user: false,
    post: false
  })
  const auth = useAuth()
  const [showNotification, contextHolder] = useAlert();

  const updateUserData = async (data) => {
    setLoader({ ...loader, user: true })
    const res = await updateUser(data);
    if (res.error) {
      setLoader({ ...loader, user: false })
      showNotification(res.error.errMessage)
      // setErr(res.error.errMessage)
    } else if (res.payload) {
      setLoader({ ...loader, user: false })
      showNotification("Profile Updated successfully")
    }
  };
  if (auth.loading || loader.user)
    return <Loader />

  return (
    <>
      <div className="flex flex-col w-full ml-16 h-screen rounded-t-3xl bg-white dark:bg-color-11  transition-all duration-500 ease-in-out dark:text-white  sm:flex-col  sm:p-2    sm:ml-0  sm:h-full sm:w-full" >
        <div className="flex dark:bg-color-11 dark:text-white w-full sm:flex sm:flex-col sm:w-full rounded-t-3xl">
          {contextHolder}
          <div className="w-1/4 flex dark:text-white flex-col h-auto items-center p-1 gap-6 mt-5 overflow-y-hidden  rounded-tl-3xl  sm:w-full  ">
            <h3 className="text-xl font-semibold dark:text-white text-color-14 ">Profile Details</h3>
            <div className="h-28 w-28  rounded-full bg-color-4 dark:bg-color-11 dark:border  relative ">
              <div className="absolute right-7 top-6 text-5xl p-2 text-white text-transform: uppercase"> {auth.user.name[0]}</div>
              {/* <i className="fa-solid fa-user-pen absolute bottom-2 h-8 w-8 dark:text-black bg-slate-50 rounded-full p-2 right-0 "></i> */}
            </div>
            <div className="flex flex-col  items-center text-lg  ">
              {/* <label className="text-[#1A0970]">UserName</label> */}
              <input
                type="text"
                placeholder="Write something"
                className="rounded-lg w-full dark:bg-color-11 dark:border  outline-none text-center"
                value={auth.user.name}
                onChange={(e) => auth.setUser({ ...auth.user, name: e.target.value })}
              />
              {/* <label className="text-sm">{auth.user.analytics.favorite} favorite</label> */}
            </div>

            <div className="flex justify-center gap-10 w-full   text-lg">
              <div className="flex-col flex items-center ">
                <label className="text-color-14 dark:text-white">{auth.user.analytics.lectures}</label>
                <label className="text-sm">Lectures</label>
              </div>
              <div className="flex-col flex items-center ">
                <label className="text-color-14 dark:text-white">{auth.user.analytics.favorite}</label>
                <label className="text-sm">Favorites</label>
              </div>
            </div>
            <div className="flex flex-col w-[95%]  mx-2 items-center gap-1 text-base p-1">
              <label className="text-color-14 text-xl dark:text-white">Bio</label>
              <p className="w-full ">
                <textarea

                  type="text"
                  placeholder="Write something"
                  className="rounded-lg w-full dark:text-white text-sm px-2 py-1    dark:border-white sm:w-[95%] sm:px-4  dark:bg-color-11  dark:border transition-all ease-in-out border-white focus:ring-[#6868ea] bg-color-3  duration-500 focus:border-color-17 border-[2px] outline-none "
                  value={auth.user.bio}
                  onChange={(e) => auth.setUser({ ...auth.user, bio: e.target.value })}
                />
              </p>
            </div>
            <div className="text-lg w-11/12 gap-3 flex flex-col">
              <h3 className="text-color-14 dark:text-white">Your UPI id</h3>
              <div className="flex flex-col gap-8">
                <div className="flex items-center sm:w-full relative border border-gray-500 dark:border-white   text-xs bg-color-3  rounded-xl p-1  ">
                  <input
                    type="text"
                    placeholder="91850*******"
                    className="rounded-lg px-2 py-1 text-[10px]  sm:px-4 dark:bg-color-11 dark:text-white  w-full  transition-all border-none ease-in-out dark:border-none border-white focus:ring-[#6868ea] bg-color-3  duration-500 focus:border-color-17 border-[2px] outline-none"
                    value={auth.user.payment.upiId}
                    onChange={(e) => auth.setUser({ ...auth.user, payment: { ...auth.user.payment, upiId: e.target.value } })}
                  ></input>


                  {/* <button className="absolute rounded-xl text-sm  h-7 w-20  text-white right-1   bg-orange-500">Save</button> */}
                  <h6 className="text-xs left-2 absolute -bottom-7 ">
                    <label className="text-xs dark:text-white ml-2 p-1">e.g. 9824xxxxx@ybl, 9824xxxxx@okayhdfs, etc </label>
                  </h6>
                </div>

                {/* <div className="flex items-center relative border border-gray-500 shadow-slate-400 shadow-md text-sm rounded-xl p-1  ">
              <input
                type="text"
                placeholder="Write something"
                className="rounded-lg w-full outline-none px-2 py-1 "></input>


              <button className="absolute rounded-xl text-sm  h-7 w-16 text-white right-1   bg-orange-500">Verify</button>
              <h6 className="text-xs left-2 absolute -bottom-5 ">Something content</h6>
            </div> */}
              </div>
            </div>
          </div>

          <div className="w-3/4 flex-col flex overflow-y-auto xs:w-full dark:bg-zinc-800  xs:relative sm:w-full ">
            <div className="flex top-0 sticky bg-white dark:bg-color-11  p-2 gap-4 mt-1  ">

              <button
                className={profileToggler == 1 ? "bg-color-14 text-white rounded-2xl text-md px-4 py-1  shadow-md dark:shadow-sm shadow-color-8 " : " bg-color-3 dark:shadow-sm dark:bg-color-11  dark:border dark:text-white  text-black rounded-2xl text-md px-4 py-1 shadow-md shadow-color-8 "}
                onClick={() => setProfileToggler('1')}
              >
                About
              </button>
              <button
                className={profileToggler == 2 ? "bg-color-14 text-white rounded-2xl text-md px-4 py-1  shadow-md dark:shadow-sm shadow-color-8 " : " bg-color-3 dark:bg-color-11 dark:border dark:shadow-sm  dark:text-white text-black rounded-2xl text-md px-4 py-1 shadow-md shadow-color-8 "}

                onClick={() => setProfileToggler('2')}
              >
                All Post
              </button>
            </div>
            {/* ccalender and about */}

            <div className=" xs:overflow-y-auto sm:flex sm:flex-col  " >
              {
                profileToggler === '1' ?
                  <About />
                  :
                  <AllPost />
              }
            </div>
          </div>
        </div>

      </div>
      <div className="absolute  w-full bottom-0 ">
        <ConfigProvider
          theme={{
            token: {
              colorPrimary: '#1a0970',
              fontSize: '25',
              lineHeight: '0'
            },
          }}
        >
          <FloatButton
            className="sm:mb-16"
            onClick={() => updateUserData(auth.user)}
            description={"Update"}
            shape="square"
            style={{ right: '40%', width: 100, zIndex: 2 }}
            type="primary"
          />
        </ConfigProvider></div>
    </>
  );
};

export default Profile;
