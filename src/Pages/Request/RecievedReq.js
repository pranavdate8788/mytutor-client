import React, { useEffect, useRef, useState } from "react";
import Meeting from "./Meeting";
import Payment from "./Payment";
import { useAuth } from "../../providers/auth";
import EditReq from "./EditReq";
import { useAlert } from "../../Components/Alert";
import { Link } from "react-router-dom";
import { formatDateToShow, getTimeAgo } from "../../Components/Helper/helper";
import moment from "moment";
import { debugg } from "../../Components/Helper/Debug";

export default function RecievedReq({ requests, setRefreshReqData, profileToggler }) {
  const [showNotification, contextHolder] = useAlert()
  const [show, setShow] = useState(false);
  const [showPayment, setShowPayment] = useState(false);
  const [reqData, setReqData] = useState({});
  const [refresh, setRefresh] = useState(false)
  const auth = useAuth()
  const onManageClick = (item, i) => {
    setShow(!show);
    setReqData(item);

  };
  const [meetingLink, setMeetingLink] = useState("");

  const handleCopyClick = async (value) => {

    try {
      await navigator.clipboard.writeText(value);
      showNotification('Meeting link copied', '')
    } catch (err) {
      showNotification('Failed to copy meeting link', '')
      console.error("Failed to copy meeting link: ", err);
    }
  };

  const handleLinkChange = (event) => {
    setMeetingLink(event.target.value);
  };
  const onPaymentClick = (data, i) => {
    setShowPayment(!showPayment)
    setReqData(data);
  };
  const handleShowPayment = () => {
    setShowPayment(!showPayment)
    setRefreshReqData(true)
  };

  const [cardActioveInd, setcardActioveInd] = useState(-1)
  const [openProfile, setOpenProfile] = useState([]);
  // const auth = useAuth()
  let menuRef = useRef();
  useEffect(() => {
    let handler = (e) => {
      if (!menuRef.current.contains(e.target)) {
        setOpenProfile(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => {
      document.removeEventListener("mousedown", handler);
    };
  });
  const onClickThreePoint = (item, i) => {
    setcardActioveInd(i)
    setOpenProfile((prev) => !prev)
  }


  debugg('request', requests)

  return (
    <>
      {contextHolder}
      <div className=" w-full p-4 flex flex-col gap-4 h-screen overflow-scroll xs:w-full xs:p-1 xs:ml-1" ref={menuRef}>
        {requests.length > 0 ? (
          requests.map((item, i) => (
            <div
              className="flex flex-col     shadow-sm shadow-color-8 rounded-2xl  "
              key={i}>
              <div className="flex flex-col  p-2 rounded-2xl dark:bg-color-11 transition-all duration-500 ease-in-out bg-color-3 hover:shadow-md hover:shadow-[#5d899795]    gap-2  ">
                <div className="flex justify-between">
                  <div className="flex items-center gap-2 ">
                    <Link to={'/showprofile/' + item.requestedId._id}>
                      <div className="bg-color-14 relative dark:bg-orange-400 dark:text-white rounded-full h-14 w-14 xs:h-10 xs:w-10 ">
                        <h1 className="absolute right-5 bottom-3 sm:right-3 sm:bottom-1 font-semibold text-xl text-white p-1">{item.requestedId.name[0]}</h1>
                      </div>
                    </Link>
                    <div className="flex flex-col gap-1">
                      <h3 className="text-color-9 dark:text-white ">{item.requesterId.name}</h3>
                      <p className="text-sm dark:text-white">{item.postId.postTitle}</p>
                    </div>
                  </div>
                  <div
                    // onClick={() => setOpenProfile((prev) => !prev)}
                    className="text-lg font-extrabold relative">
                    <i className="fa-solid cursor-pointer px-2 fa-ellipsis-vertical"
                      onClick={() => onClickThreePoint(item, i)}
                    ></i>
                    {
                      (openProfile && i == cardActioveInd)
                      &&
                      <EditReq
                        type={'requestRecieved'}
                        item={item}
                      />}
                  </div>
                </div>
                <div className="flex justify-between w-full">
                  <div className="flex flex-col gap-2 dark:text-white text-xs sm:text-xs w-full">
                    <p className="text-sm dark:text-white ">message : {item.reqMassege}</p>
                    <p className="text-sm dark:text-white ">Request for {item.reqTime} hour</p>
                    <div className="flex sm:text-xs justify-between">
                      {
                        item.reqAccept ?
                          <div className="flex items-center gap-2 sm:gap-1 sm:text-xs text-lg">
                            <i className="fa-solid fa-circle-check text-color-10"></i>
                            <p className="text-sm dark:text-white sm:text-[10px]">
                              Accepeted
                            </p>
                          </div>
                          :
                          <div className="flex items-center gap-2 text-lg">
                            <i className="fa-solid fa-circle-xmark text-[red]"></i>
                            <p className="text-sm sm:text-[10px]">
                              Not Accepted
                            </p>
                          </div>
                      }

                      <p className="text-sm sm:text-[10px] dark:text-white"><i class="fa-solid fa-calendar-days"></i> : {formatDateToShow(item.reqDates[0])}</p>{" "}
                      <p className="text-sm sm:text-[10px] dark:text-white"><i class="fa-solid fa-clock"></i> : {item.reqTime}</p>
                    </div>

                    {item.reqAccept && (
                      <>
                        <div className="">

                          <button
                            className="p-1 transition-all ease-in-out border-white focus:ring-[#6868ea]   duration-500 focus:border-color-17 border-[2px] outline-none rounded-xl dark:bg-color-11 dark:border bg-color-4 text-white px-4  sm:text-[12px] sm:px-2"
                            value={item.meetingId?.meetingCode}
                            // onChange={handleLinkChange}
                            onClick={() => handleCopyClick(item.meetingId?.meetingCode)}> Meeting Code : {item.meetingId?.meetingCode}
                          </button>
                        </div>

                        {/* <p className="text-sm"> Meeting Name : {item.meetingName}</p> */}
                        {/* <p className="text-sm ">
                          Meeting Code : {item.meetingCode}
                        </p> */}
                      </>
                    )}

                    <div className="gap-2 sm:gap-2 flex justify-end">


                      <button
                        className=" rounded-xl text-sm  h-7 w-fit px-4 sm:px-2 sm:w-auto sm:text-[10px] text-white bg-color-13"
                        onClick={() => onManageClick(item, i)}>
                        Manage Meeting
                      </button>

                      {item.reqAccept && (
                        <button
                          className=" rounded-xl text-sm  h-7 w-fit px-4 sm:px-2 sm:w-auto sm:text-[10px] text-white bg-color-4"
                          onClick={() => onPaymentClick(item, i)}
                        >
                          {item.paymentId && item.paymentId != '' ? 'View Payment' : 'Initiat Payment'}
                        </button>
                      )}
                      {item.reqAccept && (
                        moment(item.reqDates[0], 'YYYY-MM-DD').isAfter(moment().subtract(1, "day")) ?
                          <button button className=" rounded-xl text-sm  h-7 w-fit px-4 sm:px-2 sm:w-auto sm:text-[10px]  text-white bg-color-8">
                            Meeting Not started
                          </button>
                          :
                          moment(item.reqDates[0], 'YYYY-MM-DD').isBefore(moment().subtract(1, "day")) ?
                            <button button className=" rounded-xl text-sm  h-7 w-fit px-4 sm:px-2 sm:w-auto sm:text-[10px]  text-white bg-color-8">
                              Meeting Ended
                            </button>
                            :
                            <a href="https://myturt.onrender.com/" target="_blank">
                              <button className=" rounded-xl text-sm  h-7 w-fit px-4 sm:px-2 sm:w-auto sm:text-[10px]  text-white bg-color-10">
                                Go to Meeting
                              </button>
                            </a>

                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div >
          ))
        ) : (
          <p className="dark:text-white"> No Requests recieved </p>
        )
        }
      </div >
      <Meeting
        show={show}
        setShow={() => {
          setShow(!show)
          setRefreshReqData(true)
        }}
        data={reqData}
        refresh={refresh}
      />
      <Payment
        showPayment={showPayment}
        setShowPayment={handleShowPayment}
        reqData={reqData}
        setReqData={(res) => setReqData(res)}
        refresh={refresh}
      />
    </>
  );
}
