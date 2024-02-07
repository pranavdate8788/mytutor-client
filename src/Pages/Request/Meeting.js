import React, { useState, useEffect } from "react";
import { useAuth } from "../../providers/auth";
import { Button, Radio, TimePicker, notification } from "antd";
import moment from 'moment'
import { createMeeting, generateMeetingId, getUserallMeets } from "../../App/videoApi";
import { updateRequest } from "../../App/RequestApi";
import { NotiMassages } from "../../Components/Helper/NotiMassages";
import { createNotification } from "../../App/NotificationApi";




function Meeting({ show, setShow, data, setData, refresh }) {
    const auth = useAuth()
    const [api, contextHolder] = notification.useNotification();




    const showNotification = (e) => {
        api.info({
            message: ` ${e}`,
            description: "test",
            e,
        });
    };

    const [loadings, setLoadings] = useState(false)
    const [reqData, setReqData] = useState({
        reqDates: '',
        reqTime: '',//hour
        reqMassege: '',
        reqAccept: null,//true or false
    })

    const [meeting, setMeeting] = useState({
        tutorId: '',
        meetingName: '',
        meetingCode: '',
        participants: []
    })

    const [meets, setMeets] = useState([])

    // all meeting fetch
    useEffect(() => {
        const fetchAllUserMeeting = async () => {
            const res = await getUserallMeets(auth.user._id)

            if (res.payload) {
                setMeets(res.payload)
                showNotification("All meet fetch")
            } else if (res.error) {
                showNotification("Something Went Wrong")
            }
        };
        // if (!reqData._id)
        fetchAllUserMeeting()
        return () => {

        };
    }, [])

    // request updated from data
    useEffect(() => {
        if (data._id) {
            setReqData(data)
        }
        if (data._id && data.meetingId) {
            setMeeting(data.meetingId)
        }
    }, [data])

    //updated meeting data from previeouse meeting data seted
    const generateMeetId = async () => {
        setLoadings(true)
        const id = await generateMeetingId()
        if (id) {
            const _data = {
                ...meeting,
                tutorId: auth.user._id,
                meetingCode: id
            }
            const resp = await createMeeting(_data)
            if (resp.payload) {
                setMeeting(resp.payload)
                showNotification("Meeting is created")
                setLoadings(false)
            } else if (resp.error) {
                setLoadings(false)
                showNotification("Something Went Wrong")
            }
        } else {
            setLoadings(false)
            showNotification("Code is not generating, try after some time or contact support")
        }
    };

    const updateRequestDetails = async () => {
        const participant = {
            learnerId: data.requesterId,
            name: data.requesterName,
        }

        //! TODO after click send meeting should update meeting wiht "participants" array
        // const _meeting = {
        //     ...meeting,
        //     participants: participant
        // }
        // const resp = await createMeeting(_meeting)
        // console.log('resp', resp)
        // if (resp.payload) {
        //     setMeeting(resp.payload)
        //     showNotification("Meeting is created")
        //     setLoadings(false)
        // } else if (resp.error) {
        //     setLoadings(false)
        //     showNotification("Something Went Wrong")
        // }


        const _data = {
            ...data,
            ...reqData,
            meetingId: meeting._id,
            meetingName: meeting.meetingName,
            meetingCode: meeting.meetingCode
        }
        const res = await updateRequest(_data)

        if (res.payload) {
            setMeeting(res.payload)
            showNotification("Request sended Successfull")
            // setShow(!show)
            //send notification
            let notiData = {
                recieverId: res.payload.requesterId,
                senderId: auth.user._id,
                type: 'request',
                requestId: res.payload._id,
                postId: res.payload.postId,
                message: NotiMassages.REQUEST_ACCEPTED,
                read: false,
            }
            if (reqData.reqAccept == false) {
                notiData = {
                    ...notiData,
                    message: NotiMassages.REQUEST_REJECTED,
                }
            }
            const resNotify = await createNotification(notiData)

            if (resNotify.error) {
                //error
                showNotification(resNotify.error.errMessage)
            } else if (resNotify.payload) {
                //send notification to tutor that received request
                // showNotification(resNotify.message)
            }
        } else if (res.error) {
            showNotification(res.error.errMessage)
        }
    };

    const onCreateMeeting = async () => {
        const participant = {
            learnerId: data.requesterId,
            name: data.requesterName,
        }
        const _data = {
            ...meeting,
            tutorId: auth.user._id,
            participants: [...meeting.participants, participant]
        }

        const res = await createMeeting(_data)

        if (res.payload) {
            setMeeting(res.payload)
            showNotification("Meeting is created")
            // setLoadings(false)
        } else if (res.error) {
            // setLoadings(false)
            showNotification("Something Went Wrong")

        }
    };

    const onMeetingChange = (e) => {
        if (e.target.value == '') {
            //create new meeting
            setMeeting({
                tutorId: '',
                meetingName: '',
                meetingCode: '',
                participants: []
            })
        } else if (meets.length > 0) {
            //select exitsting meeting
            let temp = [...meets]

            temp = temp.filter(m => m.meetingName == e.target.value)
            setMeeting({
                ...temp[0]
            })
        }
    };
    const onCancelHandle = (e) => {
        setShow(!show)
        setReqData({
            reqDates: '',
            reqTime: '',//hour
            reqMassege: '',
            reqAccept: null,//true or false
        })
        setMeeting({
            tutorId: '',
            meetingName: '',
            meetingCode: '',
            participants: []
        })
    };

    if (!show)
        return null;
    return (
        <div className="flex w-full   items-center justify-center xs:flex-col absolute z-20 top-4 left-0">
            {contextHolder}
            <div className=" bg-color-3 dark:bg-color-11 transition-all duration-500 ease-in-out dark:border  w-4/6 h-auto p-3 rounded-3xl flex flex-col  items-center justify-center  sm:h-auto shadow-md shadow-color-8 xs:flex-col xs:w-11/12">
                <div className="flex  w-full justify-start"> <h2 className="text-color-14 py-2 px-4 text-2xl p-2   ">Meeting</h2></div>

                <div className="flex p-1   w-full justify-between text-sm xs:text-xs xs:gap-0 xs:p-1 xs:flex-col xs:w-full">

                    <div className="flex flex-col relative w-[45%] p-2  xs:w-full">
                        <label className="w-full p-2 text-base xs:text-base">Would You like to</label>
                        <div className="mt-2">
                            <Radio.Group
                                buttonStyle="solid"
                                optionType="button"
                                defaultValue={reqData.reqAccept}
                                value={reqData.reqAccept}
                                onChange={(e) => setReqData({ ...reqData, reqAccept: e.target.value })}
                            >
                                <Radio.Button
                                    value={true}
                                    style={{
                                        // margin: 10
                                    }}
                                >
                                    Accept
                                </Radio.Button>
                                <Radio.Button
                                    value={false}
                                    style={{
                                        // margin: 10
                                    }}
                                >
                                    Reject
                                </Radio.Button>

                            </Radio.Group>
                        </div>
                        <label className="text-xs ml-2 p-1">Write something</label>
                    </div>
                    {
                        reqData.reqAccept
                        &&
                        <div className="flex flex-col relative  w-[45%] p-2  xs:w-full">
                            <label className="w-full p-2 text-base xs:text-base">Select Meeting date</label>
                            <Radio.Group
                                buttonStyle="solid"
                                optionType="button"
                                value={reqData.reqDates[0]}
                                onChange={(e) => setReqData({ ...reqData, reqDates: [e.target.value] })}
                            >
                                {
                                    data.reqDates.map((_item, i) =>
                                        <Radio.Button
                                            value={_item}
                                            key={i}
                                            style={{
                                                // margin: 10
                                            }}
                                        >
                                            {_item}
                                        </Radio.Button>
                                    )
                                }
                            </Radio.Group>
                            <label className="text-xs ml-2 p-1">Write something</label>
                        </div>
                    }
                </div>

                {
                    reqData.reqAccept
                    &&
                    <>
                        <div className="flex p-1   w-full justify-between text-sm xs:text-xs xs:gap-0 xs:p-1 xs:flex-col xs:w-full">

                            <div className="flex flex-col relative  w-[45%] p-2  xs:w-full">
                                <label className="w-full p-2 text-base xs:text-base" htmlFor="slots">Choose meeting :</label>
                                <select
                                    placeholder="select option"
                                    name="meeting"
                                    className="rounded-xl w-full transition-all ease-in-out border-[#4f6da877] focus:ring-[#6868ea] bg-color-3  duration-500 focus:border-color-17 border-[2px] outline-none dark:bg-color-11 dark:border  p-2"
                                    value={meeting.meetingName}
                                    onChange={(e) => onMeetingChange(e)}
                                >
                                    <option value={''}>Creating new Meeting</option>
                                    {
                                        meets.map((item, i) => (
                                            <option
                                                value={item.meetingName}
                                                key={i}
                                            >{item.meetingName}</option>
                                        ))
                                    }
                                </select>
                                <label className="text-xs ml-2 p-1">Select what is type of your post</label>
                            </div>

                            <div className=" gap-2 relative  w-[45%] p-2  xs:w-full">
                                <label className="w-full p-2 text-base xs:text-base" htmlFor="slots">Set time :</label>

                                <div className="flex gap-2 relative  w-full p-2 ">
                                    <label htmlFor="from">Meeting Start at</label>
                                    <TimePicker
                                        id="from"
                                        className="h-fit"
                                        showTime={{ format: 'hh:mm A', use12Hours: true }}
                                        showSecond={false}

                                        value={reqData.reqTime == '' || reqData.reqTime.length < 2 ? '' : moment(reqData.reqTime, 'hh:mm A')}

                                        onSelect={(value) => setReqData({ ...reqData, reqTime: value.format('hh:mm A') })}
                                    />
                                </div>
                                <label className="text-xs ml-2 p-1">Write something</label>
                            </div>
                        </div>

                        <div className="flex p-1   w-full justify-between text-sm xs:text-xs xs:gap-0 xs:p-1 xs:flex-col xs:w-full">
                            <div className="flex flex-col relative  w-[45%] p-2  xs:w-full">
                                <label className="w-full p-2 text-base xs:text-base">Name of Meeting</label>
                                <div className="flex items-center  relative   transition-all ease-in-out border-[#4f6da877] focus:ring-[#6868ea] bg-color-3  duration-500 focus:border-color-17 border-[2px]   text-sm   rounded-xl py-1 px-1  ">
                                    <input
                                        type="text"
                                        placeholder="Write something"
                                        className="rounded-lg px-2 py-1 dark:bg-color-11   w-full  transition-all ease-in-out border-none bg-color-3 border-[2px] outline-none "
                                        value={meeting.meetingName}
                                        onChange={(e) => setMeeting({ ...meeting, meetingName: e.target.value })}
                                    ></input>
                                    {
                                        !meeting._id
                                        &&
                                        <Button
                                            className="absolute rounded-xl text-sm  py-1 w-fit dark:bg-color-11  dark:border dark:border-[#4f6da877]  text-white right-1   bg-color-14"
                                            type="primary"
                                            loading={loadings}
                                            onClick={() => generateMeetId()}
                                        >
                                            Create
                                        </Button>
                                    }



                                </div>

                                <label className="text-xs ml-2 p-1">Write something</label>
                            </div>
                            <div className="flex flex-col relative  w-[45%] p-2  xs:w-full">
                                <label className="w-full p-2 text-base xs:text-base">Meeting Code</label>
                                <input
                                    className="rounded-xl w-full dark:bg-color-11 dark:border dark:text-white transition-all ease-in-out border-[#4f6da877] focus:ring-[#6868ea] bg-color-3  duration-500 focus:border-color-17 border-[2px] outline-none p-2"
                                    type="text"
                                    name="code"
                                    value={meeting.meetingCode}
                                    disabled
                                />
                                <label className="text-xs ml-2 p-1">Copy meeeting link</label>
                            </div>
                        </div>
                        <div className="flex p-1   w-full justify-between text-sm xs:text-xs xs:gap-0 xs:p-1 xs:flex-col xs:w-full">
                            <div className="flex flex-col relative  w-[45%] p-2  xs:w-full">
                                <label className="w-full p-2 text-base  xs:text-base">Go to meeting</label>
                                <label className="text-xs ml-2 p-1">Write something</label>
                            </div>
                        </div>
                    </>
                }


                <div className="flex p-2 xs:w-full xs:justify-evenly gap-2 w-full justify-end">
                    <button className="xs:w-2/5 bg-color-13 text-white rounded-xl p-2 w-[15%]"

                    >Delete
                    </button>
                    <button className="xs:w-2/5 bg-color-4 text-white rounded-xl p-2 w-[15%]"

                        onClick={() => updateRequestDetails()}
                    >Send
                    </button>
                    <button className=" xs:w-2/5 bg-color-10 text-white rounded-xl p-2 w-[15%]"
                        onClick={() => onCancelHandle()}
                    >Cancel
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Meeting;
