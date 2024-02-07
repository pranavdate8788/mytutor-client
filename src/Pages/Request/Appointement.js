import React, { useState, useEffect } from "react";
import MultipleDatePicker from "../../Components/Helper/multiDate";
import AllPost from "../Profile/AllPost";
import { Link } from "react-router-dom";
import { getAllRequested, getAllRequester } from "../../App/RequestApi";
import { useAuth } from "../../providers/auth";
import Meeting from "./Meeting";
import { Radio } from "antd";
import RecievedReq from "./RecievedReq";
import SendReq from "./SendReq";
import Loader from "../../Components/Helper/Loader";

const Appointement = () => {
    const auth = useAuth()
    const [profileToggler, setProfileToggler] = useState('1')
    const [commpletedToggler, setCommpletedToggler] = useState(false)
    const [requests, setRequests] = useState([])
    const [refreshReqData, setRefreshReqData] = useState(false)
    const [appointementDates, setAppointementDates] = useState([])
    const [selectedDateAppointment, setselectedDateAppointment] = useState(null)

    const [updateReqWhenSelectDate, setUpdateReqWhenSelectDate] = useState(false)
    const [loader, setLoader] = useState({
        post: false
    })
    const appointementDatesFillUp = (data) => {
        let dates = []
        for (let index = 0; index < data.length; index++) {
            const element = data[index];
            for (let j = 0; j < element.reqDates.length; j++) {
                const ele = element.reqDates[j];
                let date = {
                    _id: element._id,
                    date: ele,
                    reqAccept: element.reqAccept,
                    isPaymentComplete: element.isPaymentComplete
                }
                dates.push(date)
            }
        }
        setAppointementDates(dates)
        console.log('dates', dates)
    };

    useEffect(() => {
        const getListAppointements = async () => {
            let res;
            setUpdateReqWhenSelectDate(false)

            if (profileToggler == '1') {//send

                setLoader({ ...loader, post: true })
                res = await getAllRequester(auth.user._id);
            }
            if (profileToggler == '2') {//received
                setLoader({ ...loader, post: true })
                res = await getAllRequested(auth.user._id);
            }


            if (res.error) {
                setLoader({ ...loader, post: false })
            } else if (res.payload) {
                setLoader({ ...loader, post: false })

                appointementDatesFillUp(res.payload)
                if (commpletedToggler) {
                    setRequests(res.payload.filter(r => r.isPaymentComplete === true))
                    setUpdateReqWhenSelectDate(true)
                    return
                }
                setRequests(res.payload.filter(r => r.isPaymentComplete === false))
                setUpdateReqWhenSelectDate(true)
            }
        };
        getListAppointements()
        return () => {

        };
    }, [profileToggler, refreshReqData, commpletedToggler, selectedDateAppointment])

    useEffect(() => {
        let sortedRequests = []
        console.log('requests', requests)
        if (updateReqWhenSelectDate && requests.length && selectedDateAppointment) {
            for (let index = 0; index < requests.length; index++) {
                const element = requests[index];

                for (let j = 0; j < element.reqDates.length; j++) {
                    const ele = element.reqDates[j];
                    if (selectedDateAppointment == ele)
                        sortedRequests.push(element)
                }
            }
            setRequests(sortedRequests)
        }
    }, [selectedDateAppointment, updateReqWhenSelectDate])

    console.log('selectedDateAppointment', selectedDateAppointment)

    return (
        <>
            <div className="flex w-full ml-16 h-screen rounded-t-3xl bg-white  dark:bg-color-11 transition-all duration-500 ease-in-out p-3 mx-2 dark:text-white xs:flex-col xs:ml-0" >
                <div className="w-[40%] flex flex-col h-full items-center p-1 gap-6 mt-5 sm:mt-1   rounded-tl-3xl xs:w-full  sm:ml-0 xs:ml-0  ">
                    <div className="flex w-full py-2 flex-wrap justify-evenly placeholder:">
                        <div className="text-lg"><i class="fa-solid fa-calendar-check text-color-10 bg-color-5 rounded-full p-[5px]"> </i> Available</div>
                        <div className="text-lg"><i class="fa-solid fa-calendar-xmark text-color-13 bg-color-5 rounded-full p-[5px]"></i> Not Available</div>
                        <div className="text-lg"><i class="fa-solid fa-calendar-plus text-color-14 bg-color-5 rounded-full p-[5px]"></i>Requested</div>
                        <div className="text-lg"><i class="fa-solid fa-check-to-slot text-color-8 bg-color-5 rounded-full p-[5px]"></i>Completed</div>
                        <div className="text-lg"><i class="fa-solid fa-check-to-slot text-[#ee85d3] bg-color-5 rounded-full p-[5px]"></i>Upcoming</div>

                    </div>
                    <div>
                        <MultipleDatePicker
                            value={auth.user.slots.customDates}
                            available={auth.user.slots.available}
                            // reqValue={requests[0].reqDates}
                            appointementDates={appointementDates}
                            onChangeAppointementDate={(value) => setselectedDateAppointment(value)}
                            selectedDate={selectedDateAppointment}
                        />
                    </div>

                </div>

                <div className="w-3/5 flex-col flex  sm:w-full xs:relative sm:mb-16  ">
                    <h3 className="text-xl font-semibold p-2 dark:text-white">Your Appointements</h3>

                    <div className="flex top-0 sticky bg-white dark:bg-color-11 p-2  gap-4 sm:w-full sm:text-[10px] sm:gap-1 sm:p-1 mt-1  mb-2 ">

                        <button
                            className={profileToggler == 1 ? "bg-color-14 text-white rounded-2xl text-md px-4 py-1 sm:rounded-lg sm:px-2 sm:w-auto sm:text-[10px]  shadow-md shadow-color-8 dark:shadow-sm " : " dark:bg-color-11 dark:text-white dark:shadow-none dark:border bg-[#EAF0FF] text-black rounded-2xl text-md px-4 py-1 shadow-md shadow-slate-400 "}

                            onClick={() => {
                                setCommpletedToggler(false)
                                setProfileToggler('1')
                            }}
                        >
                            Send Requests
                        </button>
                        <button
                            className={profileToggler == 2 ? "bg-color-14 text-white rounded-2xl text-md px-4 sm:px-2 sm:w-auto sm:text-[10px] py-1 shadow-md shadow-color-8  dark:shadow-sm" : " dark:bg-color-11 dark:text-white dark:shadow-none dark:border bg-[#EAF0FF] text-black rounded-2xl text-md px-4 py-1 shadow-md shadow-slate-400 "}

                            onClick={() => {
                                setCommpletedToggler(false)
                                setProfileToggler('2')
                            }}
                        >
                            Received Requests
                        </button>
                        <button
                            className={commpletedToggler ? "bg-color-14 text-white rounded-2xl text-md px-4 sm:px-2 sm:w-auto sm:text-[10px] py-1 shadow-md shadow-color-8  dark:shadow-sm" : " dark:bg-color-11 dark:text-white dark:shadow-none dark:border bg-[#EAF0FF] text-black rounded-2xl text-md px-4 py-1 shadow-md shadow-slate-400 "}

                            onClick={() => setCommpletedToggler(true)}
                        >
                            Completed Meeting
                        </button>
                    </div>
                    {/* ccalender and about */}
                    {
                        loader.post ?
                            <Loader />
                            :
                            <div className=" xs:overflow-y-auto overflow-y-auto " >
                                {
                                    profileToggler === '1' ?
                                        <SendReq
                                            requests={requests}
                                            setRefreshReqData={() => setRefreshReqData(!refreshReqData)}
                                        />
                                        :
                                        <RecievedReq
                                            requests={requests}
                                            profileToggler={profileToggler}
                                            setRefreshReqData={() => setRefreshReqData(!refreshReqData)}
                                        />
                                }
                            </div>
                    }

                </div>
            </div >
        </>
    );
};

export default Appointement;
