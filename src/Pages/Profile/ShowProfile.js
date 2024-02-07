import React, { useEffect, useState } from "react";

import About from "./About";
import AllPost from "./AllPost";
import { useAuth } from "../../providers/auth";
import { getUser, updateUser } from "../../App/Api";
import Loader from "../../Components/Helper/Loader";
import { ConfigProvider, FloatButton, notification } from "antd";
import { useParams } from "react-router-dom";
import { useUserData } from "../../providers/userData";

const ShowProfile = () => {
    const [profileToggler, setProfileToggler] = useState('1')
    const auth = useAuth()
    const userData = useUserData()
    const param = useParams()
    const [api, contextHolder] = notification.useNotification();

    const showNotification = (e) => {
        api.info({
            message: ` ${e}`,
            description: "test",
            e,
        });
    };

    useEffect(() => {
        async function fetchData(id) {
            const res = await getUser(id);
            if (res.error) {
                userData.setUserDetails({})
            } else if (res.payload) {
                userData.setUserDetails(res.payload)
            }
        }
        if (param.id)
            fetchData(param.id)
    }, [param.id])

    if (auth.loading)
        return <Loader />
    if (!userData.userDetails._id)
        return null
    return (
        <div className="flex w-full ml-16 h-screen rounded-t-3xl bg-white dark:bg-color-11 transition-all duration-500 ease-in-out dark:text-white xs:flex-col xs:ml-0  xs:h-full " >
            {contextHolder}
            <div className="w-1/4 flex flex-col h-auto items-center p-1 gap-6 mt-5 overflow-y-hidden  rounded-tl-3xl xs:w-full   ">
                <h3 className="text-lg font-semibold text-color-13">Profile Photo</h3>
                <div className="h-28 w-28  rounded-full bg-color-4 dark:bg-color-11 dark:border  relative ">
                    <div className="absolute right-9 top-4 text-5xl p-2 text-white text-transform: uppercase"> {userData.userDetails.name[0]}</div>
                    {/* <i className="fa-solid fa-user-pen absolute bottom-2 h-8 w-8 dark:text-black bg-slate-50 rounded-full p-2 right-0 "></i> */}
                </div>
                <div className="flex flex-col flex items-center text-lg  ">
                    {/* <label className="text-[#1A0970]">UserName</label> */}
                    <input
                        type="text"
                        placeholder="Write something"
                        className="rounded-lg w-full outline-none text-center dark:bg-zinc-800 dark:border"
                        value={userData.userDetails.name}
                        disabled
                    />
                    {/* <label className="text-sm">{userData.userDetails.analytics.favorite} favorites</label> */}
                </div>

                <div className="flex gap-12 text-lg">
                    <div className="flex-col flex items-center ">
                        <label className="text-color-14 dark:text-white dark:bg-color-11">{userData.userDetails.analytics.lectures}</label>
                        <label className="text-sm">Lectures</label>
                    </div>
                    <div className="flex-col flex items-center ">
                        <label className="text-color-14 dark:text-white dark:bg-color-11">{userData.userDetails.analytics.favorite}</label>
                        <label className="text-sm">Favorites</label>
                    </div>
                </div>
                <div className="flex w-full flex-col  items-center gap-1 text-lg p-1">
                    <label className="text-color-14 dark:text-white">Bio</label>
                    <p className="text-sm p-1 w-full h-auto ">
                        <textarea
                            type="text"
                            placeholder="Write something"
                            className="rounded-lg w-full shadow-sm shadow-color-8 p-2 h-auto outline-none "
                            value={userData.userDetails.bio}
                            disabled
                        />
                    </p>
                </div>

                {/* <div className="text-lg w-11/12 gap-3 flex flex-col">
                    <h3 className="text-[#1A0970] dark:text-white">Something Heading</h3>
                    <div className="flex flex-col gap-8">
                        <div className="flex items-center  relative border dark:shadow-none border-gray-500 shadow-slate-400 shadow-md text-sm   rounded-xl p-1  ">
                            <input
                                type="number"
                                placeholder="Write something"
                                className="rounded-lg px-2 py-1  w-full dark:bg-zinc-800  outline-none "
                                value={userData.userDetails.phoneNumber}
                                disabled
                            ></input>


                            <button className="absolute rounded-xl text-sm  h-7 w-20  text-white right-1   bg-orange-500">Save</button>
                            <h6 className="text-xs left-2 absolute -bottom-5 ">Something content</h6>
                        </div>
                    </div>
                </div> */}

            </div>

            <div className="w-3/4 flex-col flex overflow-y-auto xs:w-full xs:relative   ">
                <div className="flex top-0 sticky bg-white p-2 gap-4 mt-1 dark:bg-color-11  ">

                    <button className="rounded-2xl dark:border dark:bg-color-11 bg-[#EAF0FF] text-sm w-24 h-8 shadow-md shadow-color-8 "
                        onClick={() => setProfileToggler('1')}
                    >
                        About
                    </button>
                    <button className="rounded-2xl dark:bg-color-11 dark:border bg-[#EAF0FF] text-sm w-24 h-8 shadow-md shadow-color-8"
                        onClick={() => setProfileToggler('2')}
                    >
                        All Post
                    </button>
                </div>
                {/* ccalender and about */}
                <div className=" xs:overflow-y-auto  dark:bg-zinc-800" >
                    {
                        profileToggler === '1' ?
                            <About
                                isEditable={false}
                            />
                            :
                            <AllPost
                                isEditable={false}

                            />
                    }
                </div>
            </div>
        </div>

    );
};

export default ShowProfile;
