import React, { useState, useMemo, useEffect } from 'react'
import { useAuth } from '../../providers/auth';
import { updatePost } from '../../App/postAPI';
import { Link } from "react-router-dom";
import { Radio, Tag, notification } from "antd";
import { createRequest, updateRequest } from '../../App/RequestApi';
import MultipleDatePicker from '../../Components/Helper/multiDate';
import { useAlert } from '../../Components/Alert';
import { NotiMassages } from '../../Components/Helper/NotiMassages';
import { createNotification } from '../../App/NotificationApi';
import { getTimeAgo } from '../../Components/Helper/helper';
import { formatDateToShow } from '../../Components/Helper/helper';


export default function ChoseSlot({ post, userData, _reqData }) {
    const hourArr = useMemo(() => {
        return ['0', '1', ' 2', '3', '4', '5', '6']
    }, [])

    const [showNotification, contextHolder] = useAlert();
    notification.config({
        duration: 0,
    })
    const auth = useAuth()
    const [reqData, setReqData] = useState({
        ..._reqData,
        reqDates: [],
        reqTime: '',//hour
        reqMassege: '',
        reqAccept: null,//true or false
    })

    const updatePostRequest = async (reqRes) => {
        // let data = {
        //   ...reqData,
        // }

        let temp = [...post.reqSlot]
        const index = temp.findIndex(e => e.requesterId == auth.user._id);
        if (index !== -1) {//found
            temp[index] = reqRes
            // temp.splice(index, 1);
        } else {//not found
            temp.push(reqRes);
        }

        const payload = {
            postId: post._id,
            payload: { reqSlot: temp }
        }

        const res = await updatePost(payload)
        if (res.error) {

        } else if (res.payload) {
        }


    };
    const onHandleRequest = async (e) => {

        const data = {
            ...reqData,
            requesterName: auth.user.name,
            requesterId: auth.user._id,

            postId: post._id,
            postName: post.postTitle,

            requestedId: userData._id,
            requestedName: userData.name,
        }

        const res = await createRequest(data)
        if (res.error) {
            //error
        } else if (res.payload) {
            // updatePostRequest(res.payload)
            setReqData(res.payload)
            showNotification("Request send successfully")

            //send notification
            let notiData = {
                recieverId: userData._id,
                senderId: auth.user._id,
                type: 'request',
                requestId: res.payload._id,
                postId: post._id,
                message: NotiMassages.REQUEST_RECEIVED,
                read: false,
            }
            const resNotify = await createNotification(notiData)

            if (resNotify.error) {
                //error
                showNotification(resNotify.error.errMessage)
            } else if (resNotify.payload) {
                //send notification to tutor that received request

                // showNotification(resNotify.message)
            }
        }
    };
    const onHandleRequestUpdate = async (e) => {


        const data = {
            ...reqData,

        }

        const res = await updateRequest(data)
        if (res.error) {
            //error
        } else if (res.payload) {
            // updatePostRequest(res.payload)
            setReqData(res.payload)
            showNotification("Request Updated successfully")

            //send notification
            let notiData = {
                recieverId: userData._id,
                senderId: auth.user._id,
                type: 'request',
                requestId: res.payload._id,
                postId: post._id,
                message: NotiMassages.REQUEST_UPDATED,
                read: false,
            }
            const resNotify = await createNotification(notiData)

            if (resNotify.error) {
                //error
                showNotification(resNotify.error.errMessage)
            } else if (resNotify.payload) {
                //send notification to tutor that received request

                // showNotification(resNotify.message)
            }
        }
    };
    const onRequestCancel = async (e) => {


        const data = {
            ...reqData,
            cancelStatus: true,

            reqDates: [],
            reqTime: '',//hour
            reqMassege: '',
            reqAccept: null,//true or false
        }

        const res = await updateRequest(data)
        if (res.error) {
            //error
        } else if (res.payload) {
            // updatePostRequest(res.payload)
            setReqData(res.payload)
            showNotification("Request Canceled successfully")

            //send notification
            let notiData = {
                recieverId: userData._id,
                senderId: auth.user._id,
                type: 'request',
                requestId: res.payload._id,
                postId: post._id,
                message: NotiMassages.REQUEST_CANCELED,
                read: false,
            }
            const resNotify = await createNotification(notiData)

            if (resNotify.error) {
                //error
                showNotification(resNotify.error.errMessage)
            } else if (resNotify.payload) {
                //send notification to tutor that received request

                // showNotification(resNotify.message)
            }
        }
    };

    console.log('reqData', reqData)
    useEffect(() => {
        setReqData(_reqData)
    }, [_reqData])
    return (
        <>
            <div className=" flex  flex-col w-2/5 p-2 xs:w-full transition-all duration-500 ease-in-out dark:bg-color-11 xs:p-1 sm:w-full  ">
                {contextHolder}
                {
                    reqData._id ?
                        <h4 className="text-lg font-semibold mt-2 dark:text-white">Your Previous Request </h4>
                        :
                        <h4 className="text-lg font-semibold mt-2 dark:text-white">Select available dates</h4>
                }
                {/* calender */}
                <div className="flex w-full py-2 justify-evenly placeholder:">
                    <div className="text-lg"><i class="fa-solid fa-calendar-check text-color-10 bg-color-5 rounded-full p-[5px]"> </i> Available</div>
                    <div className="text-lg"><i class="fa-solid fa-calendar-xmark text-color-13 bg-color-5 rounded-full p-[5px]"></i> Not Available</div>
                    <div className="text-lg"><i class="fa-solid fa-calendar-plus text-color-14 bg-color-5 rounded-full p-[5px]"></i> Selected</div>
                </div>
                <MultipleDatePicker
                    value={userData.slots.customDates}
                    available={userData.slots.available}
                    reqValue={reqData.reqDates}
                    onChangeReValue={e => setReqData({ ...reqData, reqDates: e })}
                />
                <div className="flex flex-col p-3 xs:p-1  xs:mt-3 xs:gap-2">
                    <h3 className="dark:text-white">Selected Dates</h3>
                    <p className='mb-4'>
                        {
                            reqData.reqDates.map((item, i) => (

                                <Tag
                                    onClose={(e) => { }}
                                    className=" text-sm border shadow-lg shadow-color-8 rounded-xl p-2"
                                    title={"test"}
                                    key={i}
                                >
                                    {formatDateToShow(item)}
                                </Tag>
                            ))
                        }
                    </p>
                    <span></span>
                    <h3 className="dark:text-white">Available Time Ranges</h3>
                    <div>
                        {
                            !userData.slots.isEveryTime && userData.slots.timeRange?.map((item, i) => (

                                <Tag
                                    onClose={(e) => { }}
                                    className=" text-sm border shadow-lg shadow-color-8 rounded-xl p-2"
                                    title={"bbjn"}
                                    key={i}
                                >
                                    {item.from} - {item.to}
                                </Tag>

                            ))
                        }
                    </div>
                    <h3 className="mt-5 dark:text-white">Select Available Time</h3>
                    <div className="w-full xs:w-full  h-auto p-2 xs:p-1 flex flex-wrap gap-2 xs:gap-1 justify-evenly dark:text-black ">


                        <Radio.Group
                            buttonStyle="solid"
                            optionType="button"
                            defaultValue={reqData.reqTime}
                            value={reqData.reqTime}
                            onChange={(e) => setReqData({ ...reqData, reqTime: e.target.value })}
                        >
                            {
                                hourArr.map((item, i) =>
                                    <Radio.Button
                                        value={item}
                                        key={i}
                                        style={{
                                            margin: 10
                                        }}
                                    >
                                        {item ? item : '< 1'} hour
                                    </Radio.Button>
                                )
                            }
                        </Radio.Group>
                    </div>
                </div>
                <div className="p-3 w-4/5 flex flex-col gap-1">
                    <h3 className="font-semibold dark:text-white">Message</h3>
                    <input
                        className="w-full p-2 rounded-2xl   dark:border  dark:bg-color-11 transition-all ease-in-out border-white focus:ring-[#6868ea] bg-color-3  duration-500 focus:border-color-17 border-[2px] outline-none"
                        placeholder="Write something..."
                        type='text'
                        value={reqData.reqMassege}
                        onChange={e => setReqData({ ...reqData, reqMassege: e.target.value })}
                    >

                    </input>
                </div>
                <div className="flex justify-end px-2">
                    {
                        auth.user._id ?
                            !auth.user.isVerified ?
                                <Link to={'/VerifyEmail'}>
                                    <button className="w-32 h-10 bg-color-4 text-white font-semibold dark:text-black  rounded-lg p-1"

                                    >
                                        Verify Email
                                    </button>
                                </Link>
                                :
                                reqData._id ?
                                    <>
                                        {
                                            !reqData.cancelStatus
                                            &&
                                            <button className="w-fit h-10 px-2 mx-2 bg-[#f86a6a] text-white font-semibold  dark:text-white  rounded-lg p-1"
                                                onClick={() => onRequestCancel()}
                                            >
                                                Cancel Request
                                            </button>
                                        }

                                        <button className="w-fit h-10 px-2 bg-color-4 text-white font-semibold dark:text-black  rounded-lg p-1"
                                            onClick={() => onHandleRequestUpdate()}
                                        >
                                            {reqData.cancelStatus ? "Request Again" : "Update"}
                                        </button>
                                    </>
                                    :
                                    <button className="w-fit h-10 px-2 bg-color-4 text-white font-semibold dark:text-white  rounded-lg p-1"
                                        onClick={() => onHandleRequest()}
                                    >
                                        Request for Slot
                                    </button>
                            :

                            <Link to={'/login'}>
                                <button className="w-32 h-10 bg-color-4 text-white font-semibold dark:text-black  rounded-lg p-1"
                                >
                                    Login first
                                </button>
                            </Link>
                    }

                </div>
            </div>

        </>
    )
}
