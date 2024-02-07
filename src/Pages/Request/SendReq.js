import { useState, useEffect, useRef } from "react";
import { Link, NavLink } from "react-router-dom";
import Meeting from "./Meeting";
import Payment from "./Payment";
// import Backrop from "../../Header/Backrop";
import EditReq from "./EditReq";
import { useAlert } from "../../Components/Alert";
import { formatDateToShow, getTimeAgo } from "../../Components/Helper/helper";
import moment from "moment";

export default function SendReq({ requests, setRefreshReqData }) {
  // const [showNotification, contextHolder] = useAlert()

  const [meetingLink, setMeetingLink] = useState("");
  const [showPayment, setShowPayment] = useState(false);
  const [reqData, setReqData] = useState({});
  const [showNotification, contextHolder] = useAlert()



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


  const handleShowPayment = () => {
    setShowPayment(!showPayment)
    setRefreshReqData(true)
  };

  return (
    <>
      {contextHolder}
      <div
        ref={menuRef}
        className=" w-full p-4 flex flex-col gap-4 relative overflow-scroll xs:w-full xs:p-1 xs:ml-1">
        {requests.length > 0 ? (
          requests.map((item, i) => (
            <div
              className="flex flex-col dark:bg-color-11 dark:border  transition-all ease-in-out duration-300    bg-color-3 hover:shadow-md hover:shadow-[#5d899795] rounded-2xl  "
              key={i}
            // ref={menuRef}
            >
              <div className="flex flex-col p-2   gap-2  ">
                <div className="flex justify-between">
                  <div className="flex gap-2 items-center dark:text-white ">
                    <Link to={'/showprofile/' + item.requestedId._id}>
                      <div className="bg-color-14 relative dark:bg-orange-400 dark:text-white rounded-full h-14 w-14 xs:h-10 xs:w-10 ">
                        <h1 className="absolute right-5 bottom-3 sm:right-3 sm:bottom-1 font-semibold text-xl text-white p-1">{item.requestedId.name[0]}</h1>
                      </div>
                    </Link>
                    <div className="flex flex-col gap-1">
                      <h3 className="dark:text-white text-sm">{item.requestedId.name}</h3>
                      <p className="text-lg  dark:text-white">{item.postId.postTitle}</p>
                    </div>
                  </div>

                  <div
                    className="text-lg font-extrabold relative">
                    <i className="fa-solid fa-ellipsis-vertical cursor-pointer px-2 "
                      onClick={() => onClickThreePoint(item, i)}
                    ></i>
                    {
                      (openProfile && i == cardActioveInd)
                      &&
                      <EditReq
                        type={'requestSend'}
                        item={item}
                      />}
                  </div>

                </div>
                <div className="flex justify-between w-full">
                  <div className="flex flex-col gap-2 text-xs w-full">
                    <p className="text-sm">message : {item.reqMassege}</p>
                    <p className="text-sm">Request for {item.reqTime} hour</p>
                    <div className="flex justify-between">
                      {
                        item.reqAccept ?
                          <div className="flex items-center gap-2 text-lg">
                            <i className="fa-solid fa-circle-check  text-color-10"></i>
                            <p className="text-sm dark:text-white">
                              Accepeted
                            </p>
                          </div>
                          :
                          <div className="flex items-center gap-2 text-lg">
                            <i className="fa-solid fa-circle-xmark text-color-13"></i>
                            <p className="text-sm">
                              Not Accepted
                            </p>
                          </div>
                      }
                      <p className="text-sm dark:text-white"><i class="fa-solid fa-calendar-days"></i> : {formatDateToShow(item.reqDates[0])}</p>
                      <p className="text-sm dark:text-white"><i class="fa-solid fa-clock"></i> : {item.reqTime}</p>
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

                    <div className="gap-2 flex justify-end">
                      {
                        item.paymentId
                        &&
                        <button
                          className=" rounded-xl text-sm  h-7 w-fit px-4  text-white bg-color-4"
                          onClick={() => onPaymentClick(item, i)}
                        >
                          {item.paymentId.paymentStatus?.isCompletd ? 'View Payment' : 'Make Payment'}
                        </button>
                      }
                      {
                        console.log(moment(item.reqDates[0], 'YYYY-MM-DD').isAfter(moment().subtract(1, "day")))
                      }
                      {item.reqAccept && (
                        !moment(item.reqDates[0], 'YYYY-MM-DD').isAfter(moment().subtract(1, "day")) ?
                          <button button className=" rounded-xl text-sm  h-7 w-fit px-4 sm:px-2 sm:w-auto sm:text-[10px]  text-white bg-color-8">
                            Meeting Not started
                          </button>
                          :
                          moment(item.reqDates[0], 'YYYY-MM-DD').isBefore(moment().subtract(1, "day")) ?
                            <button button className=" rounded-xl text-sm  h-7 w-fit px-4 sm:px-2 sm:w-auto sm:text-[10px]  text-white bg-color-8">
                              Meeting Ended
                            </button>
                            :
                            <a href={`${process.env.REACT_APP_VIDEO_SDK}?meetingId=${item.meetingId.meetingCode}`} target="_blank">
                              <button className=" rounded-xl text-sm  h-7 w-fit px-4 sm:px-2 sm:w-auto sm:text-[10px]  text-white bg-color-10">
                                Go to Meeting
                              </button>
                            </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="dark:text-white"> No Requests Sended </p>
        )}
      </div>
      <Payment
        className="absolute "
        showPayment={showPayment}
        setShowPayment={handleShowPayment}
        reqData={reqData}
        setReqData={(res) => setReqData(res)}
        readOnly={true}
      />
    </>
  );
}

