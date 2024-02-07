import React, { useState, useEffect, cloneElement } from "react";
import { Buffer } from 'buffer';
import { useAuth } from "../../providers/auth";
import { Button, Radio, Steps, TimePicker, notification } from "antd";
import moment from 'moment'
import { createMeeting, generateMeetingId, getUserallMeets } from "../../App/videoApi";
import { updateRequest } from "../../App/RequestApi";
import { useAlert } from "../../Components/Alert";
import { updateUser } from "../../App/Api";
import { getPost } from "../../App/postAPI";
import { createPayment, getPayment, updatePayment } from "../../App/paymentApi";
import { postImgCollection } from "../../assets/postImages/postImg";
import { NotiMassages } from "../../Components/Helper/NotiMassages";
import { createNotification } from "../../App/NotificationApi";




function Payment({ showPayment, setShowPayment, reqData, setReqData, readOnly = false }) {

    const auth = useAuth()
    const [showNotification, contextHolder] = useAlert();
    const [isUipCorrect, setIsUipCorrect] = useState(true)
    const [loadings, setLoadings] = useState({
        user: false,
        post: false,
    })
    const [payment, setPayment] = useState({
        remark: '',
        upiId: '',
        charges: '',
        image: {
            data: [],
            contentType: ''
        }
        // postId: '',
        // tutorId: '',
        // learnerId: '',
        // requestId: '',
    })
    const [qrCode, setQrCode] = useState()
    const [prevQrCode, setPrevQrCode] = useState()
    const bufferToImage = (bufferData) => {
        return `data:${bufferData.image.contentType};base64, ${Buffer.from(bufferData.image.data.data).toString('base64')}`
    };
    useEffect(() => {
        if (!qrCode) {
            setPrevQrCode(undefined)
            return
        }
        const objectUrl = URL.createObjectURL(qrCode)
        setPrevQrCode(objectUrl)

        // free memory when ever this component is unmounted
        return () => URL.revokeObjectURL(objectUrl)
    }, [qrCode])
    const [payStatus, setPayStatus] = useState(-1)
    const [isDoneStateChanges, setIsDoneStateChanges] = useState(false)
    //get post for charges price
    useEffect(() => {

        if (payment.charges == '' && reqData._id) {
            setPayment({
                ...payment,
                charges: reqData.postId.charges,
            })
        }
        // fetchgetPost()
    }, [reqData])

    //get payment details
    useEffect(() => {
        const fetchPayment = async () => {
            // setLoadings({ ...loadings, post: true })
            const res = await getPayment(reqData.paymentId);
            if (res.error) {
                // setLoadings({ ...loadings, post: false })
            } else if (res.payload) {
                setPayment({
                    ...res.payload,
                })
                setPayStatus(paymentStatusUpdate(res.payload))
                // setLoadings({ ...loadings, post: false })
            }

        };
        if (reqData.paymentId) {
            //     fetchPayment()
            setPayment({
                ...reqData.paymentId
            })

            setPayStatus(paymentStatusUpdate(reqData.paymentId))
        }
    }, [reqData])

    //update payment ids from reqData
    useEffect(() => {
        // if (reqData._id) {
        //     setPayment({
        //         ...payment,
        //         tutorId: reqData.requestedId,
        //         tutorName: reqData.requestedName,
        //         postId: reqData.postId,
        //         postName: reqData.postName,
        //         learnerId: reqData.requesterId,
        //         learnerName: reqData.requesterName,
        //         requestId: reqData._id,
        //     })
        // }
    }, [reqData])


    useEffect(() => {
        if (payment._id) {
            setPayStatus(paymentStatusUpdate(payment))
        }
    }, [payment])


    useEffect(() => {
        if (isDoneStateChanges) {
            updatePaymentDetails(payment)
            setIsDoneStateChanges(false)
        }

    }, [isDoneStateChanges])


    const onUpdateUser = async () => {
        setLoadings({ ...loadings, user: true })
        const res = await updateUser(auth.user);
        if (res.error) {
            setLoadings({ ...loadings, user: false })
            showNotification(res.error.errMessage)
        } else if (res.payload) {
            setLoadings({ ...loadings, user: false })
            setIsUipCorrect(true)
            showNotification("Profile Updated successfully")
        }
    };
    const onCreatePayment = async () => {
        //upreqDatate payment , request

        const paymentData = {
            ...payment,
            upiId: auth.user.payment.upiId,
            postId: reqData.postId._id,
            tutorId: reqData.requestedId._id,
            learnerId: reqData.requesterId._id,
            requestId: reqData._id,
        }

        if (payment._id) {
            updatePaymentDetails(paymentData)
            return
        }

        let formData = new FormData()
        formData.append('payload', JSON.stringify(paymentData))
        formData.append('qrCode', qrCode)

        const resp = await createPayment(formData)

        if (resp.payload) {
            setPayment(resp.payload)
            showNotification("Payment Request Initiated")

            const _reqData = {
                ...reqData,
                paymentId: resp.payload._id,

            }


            const res = await updateRequest(_reqData)
            if (res.payload) {
                showNotification("Request updated Successfull")
                //send notification

                let notiData = {
                    recieverId: resp.payload.learnerId,
                    senderId: auth.user._id,
                    type: 'payment',
                    requestId: resp.payload.requestId,
                    postId: resp.payload.postId,
                    paymentId: resp.payload._id,
                    message: NotiMassages.PAYMENT_INITIATED,
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

            } else if (res.error) {
                showNotification(res.error.errMessage)
            }

        } else if (resp.error) {
            showNotification(resp.error.errMessage)
        }
    };

    const updatePaymentDetails = async (data) => {
        // return

        let formData = new FormData()
        formData.append('payload', JSON.stringify(data))
        formData.append('qrCode', qrCode)


        const resp = await updatePayment(payment._id, formData)
        if (resp.payload) {
            setPayment(resp.payload)
            showNotification("Payment Request updated")

            //send notification
            let notiData = {
                recieverId: resp.payload.learnerId,
                senderId: auth.user._id,
                type: 'payment',
                requestId: resp.payload.requestId,
                postId: resp.payload.postId,
                paymentId: resp.payload._id,
                message: NotiMassages.PAYMENT_UPDATED,
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
        } else if (resp.error) {
            showNotification(resp.error.errMessage)
        }
    };


    const paymentStatusUpdate = (_payment) => {

        if (_payment.paymentStatus?.isCompletd) {
            // setPayStatus(5)
            //send notification
            return 5;
        } else if (_payment.paymentStatus?.isReceivedByTutor) {
            // setPayStatus(3)

            return 3;
        } else if (_payment.paymentStatus?.isDoneByLearner) {
            // setPayStatus(2)
            //send notification

            return 2;
        } else if (_payment._id) {
            // setPayStatus(1)

            return 1;
        } else {
            // setPayStatus(-1)
            return -1;
        }
    };

    const onPaymentStatusChange = async (value) => {

        let notiData = {
            recieverId: payment.tutorId,
            senderId: auth.user._id,
            type: 'payment',
            requestId: payment.requestId,
            postId: payment.postId,
            paymentId: payment._id,
            message: NotiMassages.PAYMENT_DONE_BYLERNER,
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


        setPayment((prev, tet) => ({
            ...prev,
            paymentStatus: {
                ...prev.paymentStatus,
                isDoneByLearner: value
            }
        }))

        setIsDoneStateChanges(true)
    }
    const onPaymentReceivedStatus = async (value) => {


        if (value == 'received') {
            if (window.confirm("Alert!! Once you clicked on ok you will not allow to undo that status")) {
                setPayment({
                    ...payment,
                    paymentStatus: {
                        ...payment.paymentStatus,
                        isReceivedByTutor: true,
                        isCompletd: true,
                    }
                })
                setIsDoneStateChanges(!isDoneStateChanges)

                let notiData = {
                    recieverId: payment.learnerId,
                    senderId: auth.user._id,
                    type: 'payment',
                    requestId: payment.requestId,
                    postId: payment.postId,
                    paymentId: payment._id,
                    message: NotiMassages.PAYMENT_RECEVED_BYTUTOTR,
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
        } else {//not received
            setPayment({
                ...payment,
                paymentStatus: {
                    ...payment.paymentStatus,
                    isReceivedByTutor: false,
                    isCompletd: false
                }
            })

            let notiData = {
                recieverId: payment.learnerId,
                senderId: auth.user._id,
                type: 'payment',
                requestId: payment.requestId,
                postId: payment.postId,
                paymentId: payment._id,
                message: NotiMassages.PAYMENT_RECEVED_BYTUTOTR,
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
    }

    const renderPaymentStatusBtn = (payment) => {
        if (!payment._id || payment.paymentStatus.isCompletd || !payment.paymentStatus.isDoneByLearner) {
            return null
        } else if (payment._id && payment.paymentStatus.isDoneByLearner && payment.paymentStatus.isReceivedByTutor) {

            return (
                <button className="xs:w-[30%] sm:text-xs bg-[#9a9a9a] text-white rounded-xl p-2 w-[15%]"
                    onClick={() => onPaymentReceivedStatus('not_received')}
                >Not Recieved
                </button>
            )
        } else if (payment._id && payment.paymentStatus.isDoneByLearner) {
            return (
                <button className="xs:w-[30%] sm:text-xs bg-[#30f65e] text-white rounded-xl p-2 w-[15%]"
                    onClick={() => onPaymentReceivedStatus('received')}
                >Recieved
                </button>
            )
        }
    };
    const onCancelHandle = (e) => {
        setShowPayment(!showPayment)
    };

    const renderInitialUpdateBtn = (payment) => {
        if (!payment._id) {
            return (
                <button className="xs:w-[30%] sm:text-xs bg-color-4 text-white rounded-xl p-2 w-[15%]"
                    onClick={() => onCreatePayment()}
                > Initiate
                </button>
            )
        } else if (payment._id && (payment.paymentStatus.isCompletd || payment.paymentStatus.isDoneByLearner)) {
            return null
        } else if (payment._id) {
            return (
                <button className="xs:w-[30%] sm:text-xs bg-[#f68f30] text-white rounded-xl p-2 w-[15%]"

                    onClick={() => onCreatePayment()}
                > Update
                </button>
            )
        }
    };

    if (!showPayment)
        return null;
    return (
        <div className="flex w-full  items-center justify-center xs:flex-col absolute z-10 top-4 left-0">
            {contextHolder}
            <div className=" bg-color-3 border-[1px] border-color-8 shadow-md shadow-color-8 dark:bg-color-11 transition-all duration-500 ease-in-out dark:border  w-4/6 h-auto p-3 rounded-3xl flex flex-col  items-center justify-center   xs:flex-col xs:w-11/12">
                <div className="flex  w-full justify-start"> <h2 className="text-color-4 py-2 px-4 text-2xl p-2   ">Payment details</h2></div>
                <div className="flex p-1   w-full justify-between text-sm xs:text-xs xs:gap-0 xs:p-1 xs:flex-col xs:w-full">
                    <div className="flex flex-col relative  w-[45%] p-2  xs:w-full">
                        <label className="w-full p-2 text-base xs:text-base"> {readOnly ? "Reciever's UPI id" : 'Your UPI id'}</label>
                        <div className="flex items-center  relative  text-sm   rounded-xl p-1 transition-all ease-in-out border-[#4f6da877] focus:ring-[#6868ea] bg-color-3  duration-500 focus:border-color-17 border-[2px] outline-none  ">
                            <input
                                type="text"
                                placeholder="Write something"
                                className="rounded-lg px-2 py-1 dark:bg-color-11  w-full transition-all ease-in-out border-color-3 focus:ring-[#6868ea] bg-color-3  duration-500 focus:border-color-17 border-[2px] outline-none "
                                value={readOnly ? payment.upiId : auth.user.payment.upiId}
                                onChange={(e) => { auth.setUser({ ...auth.user, payment: { ...auth.user.payment, upiId: e.target.value } }); setPayment({ ...payment, upiId: e.target.value }) }}
                                disabled={readOnly ? true : isUipCorrect}
                            ></input>
                            {
                                !isUipCorrect
                                &&
                                <Button
                                    className="absolute rounded-xl text-sm  h-7 w-fit  text-white right-1   bg-blue-500"
                                    type="primary"
                                    loading={loadings}
                                    onClick={() => onUpdateUser()}
                                >
                                    Update
                                </Button>
                            }
                        </div>

                        <label className="text-xs ml-2 p-1">e.g. 9824xxxxx@ybl, 9824xxxxx@okayhdfs, etc </label>
                    </div>
                    {
                        !readOnly &&
                        <div className="flex flex-col relative  w-[45%] p-2  xs:w-full">
                            <label className="w-full p-2 text-base xs:text-base">Is UIP id Correct</label>
                            <div className="mt-2">
                                <Radio.Group
                                    buttonStyle="solid"
                                    optionType="button"
                                    defaultValue={isUipCorrect}
                                    value={isUipCorrect}
                                    onChange={(e) => setIsUipCorrect(e.target.value)}
                                >
                                    <Radio.Button
                                        value={true}
                                        style={{
                                            // margin: 10
                                        }}
                                    >
                                        Yes
                                    </Radio.Button>
                                    <Radio.Button
                                        value={false}
                                        style={{
                                            // margin: 10
                                        }}
                                    >
                                        No
                                    </Radio.Button>

                                </Radio.Group>
                            </div>

                            <label className="text-xs ml-2 p-1">Write something</label>
                        </div>
                    }
                </div>
                <div className="flex p-1   w-full justify-between text-sm xs:text-xs xs:gap-0 xs:p-1 xs:flex-col xs:w-full">
                    <div className="flex flex-col relative  w-[45%] p-2  xs:w-full">
                        <label className="w-full p-2 text-base xs:text-base">Final Charges</label>
                        <input
                            className="rounded-xl w-full dark:bg-color-11 dark:border transition-all ease-in-out border-[#4f6da877] focus:ring-[#6868ea] bg-color-3  duration-500 focus:border-color-17 border-[2px] outline-none p-2"
                            type="number"
                            name="charges"
                            disabled={readOnly ? true : false}
                            value={payment.charges}
                            onChange={(e) => setPayment({ ...payment, charges: e.target.value })}
                        />
                        <label className="text-xs ml-2 p-1">some notes</label>
                    </div>
                    <div className="flex flex-col relative  w-[45%] p-2  xs:w-full">
                        <label className="w-full p-2 text-base xs:text-base">Remark</label>
                        <input
                            className="rounded-xl w-full dark:bg-color-11 dark:border transition-all ease-in-out border-[#4f6da877] focus:ring-[#6868ea] bg-color-3  duration-500 focus:border-color-17 border-[2px] outline-none p-2"
                            type="text"
                            name="code"
                            disabled={readOnly ? true : false}
                            value={payment.remark}
                            onChange={(e) => setPayment({ ...payment, remark: e.target.value })}
                        />
                        <label className="text-xs ml-2 p-1">some notes</label>
                    </div>
                </div>
                <div className="flex p-1   w-full justify-between text-sm xs:text-xs xs:gap-0 xs:p-1 xs:flex-col xs:w-full">
                    {
                        !readOnly &&
                        <div className="flex flex-col relative  w-[45%] p-2  xs:w-full">
                            <label className="w-full p-2 text-base xs:text-base">Upload QR Code</label>
                            <input
                                className="rounded-xl w-full transition-all ease-in-out border-[#4f6da877] focus:ring-[#6868ea] bg-color-3  duration-500 focus:border-color-17 border-[2px] outline-none p-2"
                                type="file"
                                name="qrCode"
                                disabled={readOnly ? true : false}
                                // value={payment.qrCode}
                                onChange={(e) => setQrCode(e.target.files[0])}
                            />
                            <label className="text-xs ml-2 p-1">Upload image</label>
                        </div>
                    }

                    <div className="flex flex-col relative  w-[45%] p-2  xs:w-full">
                        <label className="w-full p-2 text-base xs:text-base">QR code</label>
                        {
                            prevQrCode ?
                                <img src={prevQrCode} alt="" />
                                :
                                <img src={payment._id && bufferToImage(payment)} alt="" />
                        }
                    </div>
                </div>
                <div className=" p-1 my-2 w-full justify-between text-sm xs:text-xs xs:gap-0 xs:p-1 xs:flex-col xs:w-full">
                    <div className="flex flex-col  w-full   p-2 justify-around  ">
                        <label className="w-full p-2 py-4 text-base xs:text-base">Payment Status</label>
                        <Steps
                            className="dark:text-white"
                            size="small"
                            current={payStatus}
                            items={[
                                {
                                    title: 'Tutor Initiated',
                                },
                                {
                                    title: 'Done by Learner',
                                },
                                {
                                    title: 'Recieved by Tutor',
                                },
                                {
                                    title: 'Payment Completed',
                                },
                            ]}
                        />
                        {/* <label className="text-xs ml-2 p-1"></label> */}
                    </div>

                </div>

                {
                    readOnly ? //learner
                        <div className="flex p-2 xs:w-full xs:justify-evenly gap-2 w-full justify-end">

                            {

                                (payment._id && !payment.paymentStatus.isCompletd)
                                &&
                                <>
                                    {

                                        payment._id && payment.paymentStatus.isDoneByLearner ?
                                            <button className="xs:w-[30%] sm:text-xs bg-color-8 text-white rounded-xl p-2 w-[15%]"
                                                onClick={() => onPaymentStatusChange(false)}
                                            >Not Done
                                            </button>
                                            :
                                            <button className="xs:w-[30%] sm:text-xs bg-color-10 text-white rounded-xl p-2 w-[15%]"
                                                onClick={() => onPaymentStatusChange(true)}
                                            >Done
                                            </button>
                                    }
                                </>
                            }

                            {
                                (payment._id && !payment.paymentStatus.isDoneByLearner)
                                &&
                                <button className="xs:w-[30%] sm:text-xs bg-color-4 text-white rounded-xl p-2 w-[15%]"

                                    onClick={() => window.alert("Make payment on that uip and after payment done please update status as done for confiremation")}
                                > Go to Payment
                                </button>
                            }
                            <button className=" xs:w-[30%] sm:text-xs bg-color-13 text-white rounded-xl p-2 w-[15%]"
                                onClick={() => onCancelHandle()}
                            >Cancel
                            </button>
                        </div>
                        ://teacher

                        <div className="flex p-2 xs:w-full xs:justify-evenly gap-2 w-full justify-end">

                            {payment._id && renderPaymentStatusBtn(payment)}

                            {renderInitialUpdateBtn(payment)}
                            <button className=" xs:w-[30%] sm:text-xs bg-color-13 text-white rounded-xl p-2 w-[15%]"
                                onClick={() => onCancelHandle()}
                            >Cancel
                            </button>
                        </div>
                }
            </div>
        </div >
    );
};

export default Payment;
