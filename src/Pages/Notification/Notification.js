import React, { useEffect, useState } from "react";
import { useAuth } from "../../providers/auth";
import { Link } from "react-router-dom";
import { getNotifications, updateNotification } from "../../App/NotificationApi";
import { useAlert } from "../../Components/Alert";
import { postImgCollection } from "../../assets/postImages/postImg";
import moment from "moment";
import { getTimeAgo } from "../../Components/Helper/helper";
import { NotiMassagesToShow } from "../../Components/Helper/NotiMassages";

function Notification() {
    const auth = useAuth();
    const [notification, setnotification] = useState([]);
    const [isnotification, setisnotification] = useState(false);
    const [showNotification, contextHolder] = useAlert()
    //get fovourit
    useEffect(() => {
        const fetchData = async (id) => {
            const res = await getNotifications({ receiverId: auth.user._id });
            if (res.error) {
                showNotification(res.error.errMessage)
            } else if (res.payload) {
                if (res.payload.length <= 0) return;
                setnotification(res.payload);
                // setisnotification(res.payload[0].isnotification);
            }
        };
        // if (auth.user) {
        //minus one notification
        fetchData();
        // }
    }, [isnotification]);

    const onClickNotification = async (item) => {

        //update
        let data = {
            ...item,
            read: true
        };
        const res = await updateNotification(item._id, data);

        if (res.error) {
            showNotification(res.error.errMessage)
        } else if (res.payload) {
            setisnotification(!isnotification);
            showNotification(res.message)
        }

    };


    return (
        <div className="bg-white w-full dark:bg-color-11 transition-all duration-500 ease-in-out rounded-3xl sm:ml-0 sm:h-screen sm:mb-16 ml-16 py-4 px-2">
            <div id="result " className="w-1/2 mt-16 dark:bg-color-11  p-2 relative sm:w-full ">
                <div className="w-full fixed z-[10]  dark:bg-color-11 dark:text-white bg-white top-16 ">
                    <h1 className="text-color-14   font-semibold  px-4 py-4  w-fit text-2xl ">
                        Notification
                    </h1>
                </div>
                {notification.length > 0 ?
                    notification.map((item, i) => (
                        <Link to={"/postcontent/" + item.postId?._id} key={i}>
                            <div
                                className={item.read ? "bg-white border-sm border-[#4f6da877] border p-2 w-[100%] transition-all ease-in-out duration-300 hover:shadow-md hover:shadow-[#5d899795] h-auto dark:bg-color-11 dark:border dark:text-white rounded-lg m-2 flex sm:w-full "
                                    :
                                    "bg-color-3 border border-[#4f6da877]  p-2 w-[100%] transition-all ease-in-out duration-300 hover:shadow-md hover:shadow-[#5d899795] h-auto dark:bg-color-11 dark:border dark:text-white rounded-lg m-2 flex sm:w-full "
                                }
                                key={i}
                                onClick={() => onClickNotification(item)}
                            >
                                <div className="flex    w-full">
                                    <div className=" relative px-4 flex w-fit h-auto rounded-lg">

                                        <div className="flex justify-center  h-fit py-4 px-5 gap-2 sm:gap-[2px] rounded-full bg-color-14 items-center ">
                                            {
                                                item.type === 'payment'
                                                    ?
                                                    <i class="fa-solid fa-indian-rupee-sign text-white text-xl"></i>
                                                    :
                                                    item.type === 'request'
                                                        ?
                                                        <i class="fa-solid fa-paper-plane text-white text-xl"></i>
                                                        :
                                                        <i class="fa-solid fa-bell text-white text-xl"></i>
                                            }
                                        </div>
                                    </div>
                                    <div className="p-1 text-xs flex flex-col w-[100%]  dark:text-white">
                                        <span>
                                            {getTimeAgo(item.createdAt)}
                                        </span>
                                        <div className="flex flex-col p-1">
                                            <h1 className="text-base dark:text-white line-clamp-2 text-blue-900">
                                                {NotiMassagesToShow[item.message]} <b>{item.postId?.postTitle}</b> from <b>{item.senderId?.name}</b>
                                            </h1>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))
                    :
                    <p>No data found</p>
                }
            </div>
        </div>
    );
}

export default Notification;
