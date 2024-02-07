import React, { useState, useEffect } from "react";
import { useAuth } from "../../../providers/auth";



function AddWorkExpe({ show, setShow, }) {
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
        let edcs = [...auth.user.workExperience];
        edcs.push(userData)
        auth.setUser({
            ...auth.user,
            workExperience: edcs
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

    const onHandleChange = (e) => {
        setUserData({ ...userData, [e.target.name]: e.target.value })
    };
    const onCancelBtn = () => {
        setShow(!show)
    };


    if (!show)
        return null;
    return (
        <div className="flex w-full  items-center justify-center xs:flex-col fixed h-screen  top-0  overflow-scroll z-[12] left-0">
      <div className=" bg-color-3 dark:bg-color-11 transition-all duration-500 ease-in-out z-[9] dark:text-white dark:border absolute my-[10%] top-0 w-4/6 px-6 py-10 rounded-3xl flex flex-col  items-center justify-center  shadow-md shadow-slate-600 xs:flex-col xs:w-11/12   ">
                <div className="flex w-full px-3 font-bold text-xl">
                    <h2 className="text-color-14  sm:text-xl font-medium text-3xl px-4 py-3 ">Add Work Experience</h2>
                </div>
                <div className="flex p-1   w-full justify-between items-center text-sm xs:text-xs xs:gap-0 xs:p-1 xs:flex-col xs:w-full">
                    <div className="flex flex-col relative  w-[45%] p-2  xs:w-full">
                        <label className="w-full p-2 text-base xs:text-base">Role</label>
                        <input className="rounded-xl w-full  dark:bg-color-11 dark:border  transition-all ease-in-out border-[#4f6da877] focus:ring-[#6868ea] bg-color-3  duration-500 focus:border-color-17 border-[2px] outline-none p-2" type="text"
                            name="title"
                            onChange={(e) => onHandleChange(e)}
                            value={userData.title}
                        />
                        <p className="text-xs ml-2 p-1">Write something</p>
                    </div>
                    <div className="flex flex-col   w-[45%] p-2 xs:w-full">
                        <label className="w-full p-2 text-base xs:text-base">Company/Organization</label>
                        <input className="rounded-xl w-full  dark:bg-color-11 dark:border transition-all ease-in-out border-[#4f6da877] focus:ring-[#6868ea] bg-color-3  duration-500 focus:border-color-17 border-[2px] outline-none p-2" type="text"
                            name="orginization"
                            onChange={(e) => onHandleChange(e)}
                            value={userData.orginization}
                        />
                        <p className="text-xs ml-2 p-1">Write something</p>
                    </div>
                </div>

                <div className="flex p-1  items-center  w-full justify-between text-sm xs:text-xs xs:gap-0 xs:p-1 xs:flex-col xs:w-full">
                    <div className="flex flex-col   w-[45%]  p-2  xs:w-full  ">
                        <label className="w-full text-base p-2 ">From</label>
                        <input className="  rounded-xl w-full  p-2   dark:bg-color-11 dark:border transition-all ease-in-out border-[#4f6da877] focus:ring-[#6868ea] bg-color-3  duration-500 focus:border-color-17 border-[2px] outline-none " type="date"
                            name="from"
                            onChange={(e) => onHandleChange(e)}
                            value={userData.from}
                        />
                        <p className="text-xs ml-2 p-1">Write something</p>
                    </div>
                    <div className="flex flex-col  xs:w-full  w-[45%] p-2 justify-around  ">
                        <label className="w-full text-base p-2">To</label>
                        <input className="  rounded-xl w-full p-2    dark:bg-color-11 dark:border   transition-all ease-in-out border-[#4f6da877] focus:ring-[#6868ea] bg-color-3  duration-500 focus:border-color-17 border-[2px] outline-none " type="date"
                            name="to"
                            onChange={(e) => onHandleChange(e)}
                            value={userData.date}
                        />
                        <p className="text-xs ml-2 p-1">Write something</p>
                    </div>

                </div>

                <div className="flex p-1    w-full justify-between text-sm xs:text-xs xs:gap-0 xs:p-1 xs:flex-col xs:w-full">
                    <div className="flex  flex-col  w-[45%]  p-2 xs:w-full">
                        <label className="w-full p-2 text-base xs:w-1/4">Location</label>
                        <input className="  rounded-xl w-full p-2   dark:bg-color-11 dark:border transition-all ease-in-out border-[#4f6da877] focus:ring-[#6868ea] bg-color-3  duration-500 focus:border-color-17 border-[2px] outline-none "  type="text" 
                            name="location"
                            onChange={(e) => onHandleChange(e)}
                            value={userData.location}

                        />
                        <p className="text-xs ml-2 p-1">Write something</p>
                    </div>
                </div>

                <div className="py-2">
                    <h2 className="py-2">Description :</h2>
                    <textarea rows={5} cols={110} className="rounded-2xl  px-2 xs:h-24 w-4/5 xs:w-11/12   dark:bg-zinc-800 dark:border  transition-all ease-in-out border-[#4f6da877] focus:ring-[#6868ea] bg-color-3  duration-500 focus:border-color-17 border-[2px] outline-none"
                        name="descrp"
                        onChange={(e) => onHandleChange(e)}
                        value={userData.descrp}
                    ></textarea>
                </div>

                <div className="flex p-2 xs:w-full xs:justify-evenly gap-3 w-full justify-end">
          {/* <button className="btn w-[15%] sm:w-[45%] shadow-sm shadow-black group relative inline-flex items-center justify-start overflow-hidden transition-all bg-white rounded hover:bg-white group"> */}
            {/* <span className="w-0 h-0 rounded bg-[#f68f30]  absolute top-0 left-0 ease-out duration-500 transition-all group-hover:w-full group-hover:h-full -z-1"></span> */}
            <button
              className=" w-[15%] bg-color-14  p-2 text-white rounded-lg transition-colors duration-[90] ease-in-out group-hover:text-white z-10"
              onClick={() => onAddDetails()}>
              Add
            </button>
          {/* </button> */}

          {/* <button className="btn w-[15%] sm:w-[45%] shadow-sm shadow-black relative inline-flex items-center justify-start overflow-hidden transition-all bg-white rounded hover:bg-white group"> */}
            {/* <span className="w-0 h-0 rounded bg-[#f68f30]  absolute top-0 left-0 ease-out duration-500 transition-all group-hover:w-full group-hover:h-full -z-1"></span> */}
            <button
              className=" w-[15%] bg-color-14 p-2 text-white rounded-lg transition-colors duration-[90] ease-in-out group-hover:text-white z-10"
              onClick={() => setShow(!show)}>
              Cancel
            </button>
          {/* </button> */}
        </div>
            </div>
        </div>
    );
}

export default AddWorkExpe;
