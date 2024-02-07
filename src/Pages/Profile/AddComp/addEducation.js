import React, { useState, useEffect } from "react";
import { useAuth } from "../../../providers/auth";



function Education({ show, setShow, }) {
  const auth = useAuth()
  const [userData, setUserData] = useState({
    title: '',
    orginization: '',
    location: '',
    descrp: '',
    from: '',
    to: ''
  })
  const onAddDetails = () => {
    if (!auth.user._id)
      return
    let edcs = [...auth.user.education];
    edcs.push(userData)
    auth.setUser({
      ...auth.user,
      education: edcs
    })
    setShow(!show)
    setUserData({
      title: '',
      orginization: '',
      location: '',
      descrp: '',
      from: '',
      to: ''
    })
  };

  const onCancelBtn = () => {
    setShow(!show)
  };


  if (!show)
    return null;
  return (
    <div className="flex w-full  items-center justify-center xs:flex-col fixed overflow-scroll h-screen top-0 left-0 z-[12]">
      <div className=" bg-color-3 dark:bg-color-11 transition-all duration-500 ease-in-out dark:border dark:text-white z-[9] absolute my-[10%] top-0 px-6  w-4/6 h-auto py-10 rounded-3xl flex flex-col  items-center justify-center  shadow-md shadow-color-8 xs:flex-col xs:w-11/12">
        <div className="flex w-full">
          <h2 className="text-color-14 text-3xl sm:text-xl  font-medium px-4 py-3  ">Education</h2></div>

        <div className="flex p-1   w-full justify-between text-sm xs:text-xs xs:gap-0 xs:p-1 xs:flex-col xs:w-full sm:flex-col sm:w-full">
          <div className="flex flex-col relative  w-[45%] p-2  xs:w-full sm:w-full">
            <label className="w-full p-2  text-base xs:text-base">Name of Education</label>
            <input className="rounded-xl dark:bg-color-11 dark:border w-full transition-all ease-in-out border-[#4f6da877] focus:ring-[#6868ea] bg-color-3  duration-500 focus:border-color-17 border-[2px] outline-none p-2" type="text"
              name="title"
              onChange={(e) => setUserData({ ...userData, [e.target.name]: e.target.value })}
              value={userData.title}
            />
            <p className="text-xs ml-2 p-1">e.g. SSC,HSC,B.TECH, etc</p>
          </div>
          <div className="flex flex-col   w-[45%] p-2 xs:w-full sm:w-full">
            <label className="w-full p-2 text-base xs:text-base">School/College/University</label>
            <input className="rounded-xl w-full dark:bg-color-11 dark:border transition-all ease-in-out border-[#4f6da877] focus:ring-[#6868ea] bg-color-3  duration-500 focus:border-color-17 border-[2px] outline-none p-2" type="text"
              name="orginization"
              onChange={(e) => setUserData({ ...userData, [e.target.name]: e.target.value })}
              value={userData.orginization}
            />
            <p className="text-xs ml-2 p-1">Write something</p>
          </div>
        </div>

        <div className="flex p-1   w-full justify-between text-sm xs:text-xs xs:gap-0 xs:p-1 xs:flex-col xs:w-full sm:flex-col sm:w-full">
          <div className="flex flex-col   w-[45%]  p-2  xs:w-full sm:w-full  ">
            <label className="w-full text-base p-2 ">From</label>
            <input className="  rounded-xl w-full dark:bg-color-11 dark:text-white dark:border  p-2 transition-all ease-in-out border-[#4f6da877] focus:ring-[#6868ea] bg-color-3  duration-500 focus:border-color-17 border-[2px] outline-none" type="date"
              name="from"
              onChange={(e) => setUserData({ ...userData, [e.target.name]: e.target.value })}
              value={userData.from}
            />
            <p className="text-xs ml-2 p-1">Select Date</p>

          </div>
          <div className="flex flex-col  xs:w-full  w-[45%] p-2 justify-around sm:w-full ">
            <label className="w-full text-base p-2">To</label>
            <input className="  rounded-xl w-full p-2 dark:bg-color-11 dark:text-white dark:border  transition-all ease-in-out border-[#4f6da877] focus:ring-[#6868ea] bg-color-3  duration-500 focus:border-color-17 border-[2px] outline-none" type="date"
              name="to"
              onChange={(e) => setUserData({ ...userData, [e.target.name]: e.target.value })}
              value={userData.date}
            />
            <p className="text-xs ml-2 p-1">Select Date</p>
          </div>
        </div>

        <div className="flex p-1    w-full justify-between text-sm xs:text-xs xs:gap-0 xs:p-1 xs:flex-col xs:w-full">


          <div className="flex  flex-col  w-[45%]  p-2 xs:w-full sm:w-full">
            <label className="w-full p-2 text-base xs:w-1/4">Location</label>
            <input className="  rounded-xl w-full p-2 dark:bg-color-11 dark:border transition-all ease-in-out border-[#4f6da877] focus:ring-[#6868ea] bg-color-3  duration-500 focus:border-color-17 border-[2px] outline-none" type="text"
              name="location"
              onChange={(e) => setUserData({ ...userData, [e.target.name]: e.target.value })}
              value={userData.location}

            />
            <p className="text-xs ml-2 p-1">Where done in short</p>
          </div>
        </div>

        <div className="p-1">
          <h2>Description :</h2>
          <textarea rows={5} cols={110} className="rounded-2xl px-2 py-1 xs:h-24 w-4/5 xs:w-11/12 dark:bg-color-11 dark:border transition-all ease-in-out border-[#4f6da877] focus:ring-[#6868ea] bg-color-3  duration-500 focus:border-color-17 border-[2px] outline-none sm:w-full"
            name="descrp"
            onChange={(e) => setUserData({ ...userData, [e.target.name]: e.target.value })}
            value={userData.descrp}
          ></textarea>
        </div>

        <div className="flex px-4 py-4 xs:w-full xs:justify-evenly gap-3 w-full justify-end">
          {/* <button className="btn w-[15%] sm:w-[45%] shadow-sm shadow-black group relative inline-flex items-center justify-start overflow-hidden transition-all bg-white rounded hover:bg-white group"> */}
            {/* <span className="w-0 h-0 rounded bg-[#f68f30]  absolute top-0 left-0 ease-out duration-500 transition-all group-hover:w-full group-hover:h-full -z-1"></span> */}
            <button
              className=" w-[15%] bg-color-14 p-2 text-white rounded-lg transition-colors duration-[90] ease-in-out  z-10"
              onClick={() => onAddDetails()}>
              Add
            </button>
          {/* </button> */}

          {/* <button className="btn w-[15%] sm:w-[45%] shadow-sm shadow-black relative inline-flex items-center justify-start overflow-hidden transition-all bg-white rounded hover:bg-white group"> */}
            {/* <span className="w-0 h-0 rounded bg-[#f68f30]  absolute top-0 left-0 ease-out duration-500 transition-all group-hover:w-full group-hover:h-full -z-1"></span> */}
            <button
              className=" w-[15%] bg-color-14 rounded-lg p-2 text-white transition-colors duration-[90] ease-in-out  z-10"
              onClick={() => setShow(!show)}>
              Cancel
            </button>
          {/* </button> */}
        </div>
      </div>
    </div>
  );
}

export default Education;
