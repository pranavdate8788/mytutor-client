import React, { useState, useEffect, useMemo } from "react";
import { Link, NavLink, useParams, useNavigate } from "react-router-dom";
import { getPost, updatePost } from "../../App/postAPI";
import { useAuth } from "../../providers/auth";
import { getUser, updateUser } from "../../App/Api";
import { Radio, Tag } from "antd";
import Loader from "../../Components/Helper/Loader";
import { createRequest, getAllPostRequested, getAllPostRequester } from "../../App/RequestApi";
import RecievedReq from "../Request/RecievedReq";
import SendReq from "../Request/SendReq";
import ChoseSlot from "./ChoseSlot";
import { createFavourite, getFavourites, updateFavourite } from "../../App/favoriteApi";
import cat_image0 from "../Posts/../../assets/Thumbnail.png";
import cat_image1 from "../Posts/../../assets/user.png";
import { postImgCollection } from "../../assets/postImages/postImg";
import { NotiMassages } from "../../Components/Helper/NotiMassages";
import { createNotification } from "../../App/NotificationApi";

import LearnerRibbion from "../Posts/../../assets/leaner.png";
import tutorRibbion from "../Posts/../../assets/tutor.png";

const Post = () => {
  const auth = useAuth()
  const param = useParams()
  const navigate = useNavigate()
  const [post, setpost] = useState({})
  const [loading, setLoading] = useState({
    post: false,
    slot: false,
    userData: false,
    request: false
  })
  const [err, setErr] = useState('')
  const [userData, setUserData] = useState({})
  const [refreshReqData, setRefreshReqData] = useState(false)

  const [comment, setComment] = useState({
    comment: ''
  })
  const [comments, setComments] = useState([])
  const [requests, setRequests] = useState([])
  const [favourite, setFavourite] = useState({
    isFavourite: false,
  })
  const [isFavourite, setisFavourite] = useState(false)

  const [reqData, setReqData] = useState({
    reqID: '',
    reqDates: [],
    reqTime: '',//hour
    reqMassege: '',
    reqAccept: null,//true or false
  })

  //get all details of post
  useEffect(() => {
    const fetchgetPost = async () => {
      setLoading({ ...loading, post: true })
      const res = await getPost(param.id);
      if (res.error) {
        setErr(res.error.errMessage)
        navigate('/notfound')
        setLoading({ ...loading, post: false })
      } else if (res.payload) {
        setpost(res.payload)
        setLoading({ ...loading, post: false })
      }

    };
    if (param.id)
      fetchgetPost()
  }, [])

  //get all requsets with postid and requsted id
  useEffect(() => {
    const fetchUserAllRequest = async () => {
      let res
      setLoading({ ...loading, post: true })
      if (post.createdTutor._id == auth.user._id) {
        res = await getAllPostRequested(post._id, auth.user._id);
        if (res.error) {
          //handle error
          setErr(res.error.errMessage)
          setLoading({ ...loading, post: false })

        } else if (res.payload) {
          setRequests(res.payload)
          setLoading({ ...loading, post: false })

        }
      } else {
        setLoading({ ...loading, post: true })
        res = await getAllPostRequester(post._id, auth.user._id);

        if (res.error) {
          setErr(res.error.errMessage)
          setLoading({ ...loading, post: false })
        } else if (res.payload) {
          setLoading({ ...loading, post: false })
          if (res.payload.length > 0) {
            setReqData(res.payload[0])

          } else {
            setErr("user not requested to this post")
          }
        }

      }
    };
    if (post._id && auth.user._id)
      fetchUserAllRequest()
  }, [post._id, auth.user._id, refreshReqData])

  //get fovourit
  useEffect(() => {
    const fetchFav = async (id) => {
      const res = await getFavourites(auth.user._id, post.createdTutor._id)

      if (res.error) {

      } else if (res.payload) {
        if (res.payload.length <= 0)
          return
        setFavourite(res.payload[0])
        setisFavourite(res.payload[0].isFavourite)
      }
    };
    if (!favourite._id && post._id && auth.user._id) {
      fetchFav()
    }
  }, [post, auth.user])


  const onClickFavourit = async (status, learner, tutor) => {
    setisFavourite(!isFavourite)
    if (favourite._id) {//update
      let data = {
        ...favourite,
        isFavourite: status
      }
      const res = await updateFavourite(favourite._id, data)

      if (res.error) {

      } else if (res.payload) {

      }

    } else {
      //create
      let data = {
        ...favourite,
        tutorId: tutor._id,
        tutorName: tutor.name,

        learnerId: learner._id,
        learnerName: learner.name,
        isFavourite: status
      }
      const res = await createFavourite(data)

      if (res.error) {

      } else if (res.payload) {
        let notiData = {
          recieverId: res.payload.tutorId,
          senderId: auth.user._id,
          type: 'favourite',
          // requestId: res.payload.requestId,
          // postId: res.payload.postId,
          // paymentId: res.payload._id,
          message: NotiMassages.FAVOURITE_TUTOR,
          read: false,
        }
        const resNotify = await createNotification(notiData)

        if (resNotify.error) {
          //error
          // showNotification(resNotify.error.errMessage)
        } else if (resNotify.payload) {
          //send notification to tutor that received request

          // showNotification(resNotify.message)
        }
      }
    }
  };


  const onCommentClicked = (e) => {
    let _comment = {
      ...comment,
      learnerName: auth.user.name,
      learnerId: auth.user._id
    }

    setComments([...comments, _comment]);
    setComment({
      comment: ''
    })
  };

  const onCommentDelete = (item, i) => {

    let t = comments.filter(e => e.comment != item.comment)
    setComments(t);
  };

  // console.log('requests', requests)
  // console.log('reqData', reqData)
  // console.log('favourite', favourite)
  // console.log('post', post)
  // console.log('userData', userData)

  if (auth.loading)
    return <Loader />
  if (!post._id)
    return null
  return (
    <>
      {
        (loading.post) ?
          <Loader />
          :
          post._id ?
            <div className="w-[96%] sm:mb-[80px] ml-16 h-auto rounded-t-3xl flex  dark:text-white dark:bg-color-11 transition-all duration-500 ease-in-out bg-white xs:w-full xs:flex-col sm:ml-0 sm:flex-col sm:w-full">
              <div className="flex flex-col w-3/5  sm:w-full">
                <div className=" h-auto p-1 xs:p-1 mx-2 sm:mx-0 ">
                  <div className="flex w-full justify-between mx-3 py-5 px-2 relative  sm:px-4  sm:mx-1  items-center">
                  <div className="w-[45%] h-fit absolute py-2 ">
                      
                          {/* // item.postType === 'learner' ? */}
                            {/* <img src={LearnerRibbion} className="absolute left-0 -top-16 sm:-top-10  w-[50%]"></img> */}
                            {/* // : */}
                            <img src={tutorRibbion} className=" -top-16 sm:-top-16  w-[50%]"></img>
                        
                      </div>
                    {/* <h4 className="xs:text-xs text-color-8"> {post.postType == "learner" ? "I want to learn" : "I can teach"}</h4> */}
                    <i className="fa-sharp fa-solid fa-ellipsis-vertical mx-7 right-0 absolute text-xl xs:text-xs"></i>
                  </div>
                  <div className="bg-color-4  relative  rounded-xl h-auto mx-3 xs:w-[97%]  xs:m-1 ">
                    <img src={postImgCollection[post.thumbnailUrl.image]} className="w-full  h-auto sm:h-[40%] rounded-xl"></img>
                    <span className=" absolute sm:text-lg top-14 sm:top-14 text-3xl sm:left-10 left-10 font-font-logo  text-white w-[30%] line-clamp-4 sm:line-clamp-2 p-2  ">
                      {post.postTitle}
                    </span>

                    <div className="flex gap-2 sm:gap-[2px] items-center absolute  top-[230px] sm:top-32 text-2xl   sm:left-10  left-10">
                      <img src={cat_image1} className="h-5 sm:h-3 sm:w-3 w-5"></img>
                      <label className="font-font-logo sm:text-xs text-white">{post.createdTutor.name}</label>
                    </div>
                  </div>
                  <div className="flex justify-between p-1 mx-1 items-center text-xl sm:text-xs xs:p-0">
                    <h1 className=" line-clamp-5 dark:text-white font-font-primary px-2 sm:text-xs">
                      {post.postTitle}
                    </h1>
                    <div className="flex   items-center gap-5 p-2 xs:gap-0  xs:p-1 sm:text-xs  sm:gap-1 px-4 ">
                      <div className="flex  gap-1 items-center xs:gap-0 sm:px-4 sm:text-xs">
                        <i className="fa-solid fa-indian-rupee-sign text-[#FFB300] sm:text-xs">
                          {post.pricePerHour || post.charges}
                        </i>
                        <h6 className="text-[#FFB300] text-sm ">
                          /lecture
                        </h6>
                      </div>
                      {/* <div className="flex gap-1  items-center xs:gap-0 xs:text-[12px] ">
                        <h4>4</h4>
                        <label className="text-sm sm:text-[7px] text-[#6F6F6F]">(sits left)</label>
                      </div> */}


                      {/* <div className="flex gap-1 items-center xs:gap-1 xs:text-xs">
                        <h4>60</h4>
                        <i className="fa-solid fa-thumbs-up text-[#FFB300]"></i>
                      </div>

                      <div className="flex gap-1  items-center xs:gap-1 xs:text-xs">
                        <h4>60</h4>
                        <i className="fa-solid fa-thumbs-down text-[#FFB300]"></i>
                      </div> */}
                    </div>
                  </div>
                  <p className="xs:text-xs text-base  px-4 sm:px-4 line-clamp-5 text-[#6F6F6F]">
                    {post.discrip || post.descrp}
                  </p>
                </div>
                <div className="flex justify-between mx-1  p-3 xs:p-2">
                  <Link to={'/showProfile/' + post.createdTutor._id}>
                    <div className="flex items-center gap-2 px-3 sm:px-1 xs:gap-1 cursor-pointer ">

                      <div className="bg-color-6 relative dark:bg-orange-400 dark:text-white rounded-full h-14 w-14 xs:h-10 xs:w-10 ">
                        <h1 className="absolute right-5 bottom-4 sm:text-sm sm:right-3 sm:bottom-2 font-semibold text-xl text-white p-1">K</h1>
                      </div>

                      <div className="flex flex-col xs:text-xs cursor-pointer">
                        <label className="text-lg sm:text-sm dark:text-white">{post.createdTutor.name}</label>
                        <label className="text-color-14 sm:text-xs dark:text-white text-sm">{post.createdTutor.analytics.favorite} Favourite</label>
                      </div>
                    </div>
                  </Link>
                  {
                    !auth.user._id ?
                      <Link to={'/login'}>
                        <button className="w-32 h-10 bg-color-4 text-white font-semibold dark:text-black  rounded-lg p-1"
                        >
                          Favourite
                        </button>
                      </Link>
                      :
                      isFavourite ?
                        <button
                          className={"bg-color-6 text-white px-3 sm:h-fit sm:py-2 sm:px-1 rounded-md xs:w-auto sm:text-xs"}
                          onClick={(e) => onClickFavourit(false, auth.user, post.createdTutor)}
                        >
                          {"unfavourite"}
                        </button>
                        :
                        <button
                          className={"bg-color-4 text-white px-3 sm:h-fit sm:py-2  sm:px-1 rounded-md xs:w-auto sm:text-xs"}
                          onClick={(e) => onClickFavourit(true, auth.user, post.createdTutor)}
                        >
                          {"Favourite"}
                        </button>
                  }
                </div>
                <div className="flex items-center mx-2 sm:my-2 px-2 gap-3 xs:text-sm ">
                  <div className="flex p-1 dark:text-white gap-1 ">
                    <h3 className="dark:text-white">286</h3>
                    <label>Comments</label>
                  </div>

                </div>
                <div className="flex flex-col sm:w-full mx-2">

                  {
                    reqData.isPaymentComplete
                      ?
                      <div className=" relative flex items-center px-2 sm:w-[90%]  py-2 gap-4">
                        <div className="bg-color-6 relative dark:bg-orange-400 dark:text-white rounded-full h-14 w-14 xs:h-10 xs:w-10 ">
                          <h1 className="absolute right-5 bottom-4 sm:text-xm  sm:right-3 sm:bottom-1 font-semibold text-xl text-white p-1">K</h1>
                        </div>
                        <input
                          type="text"
                          placeholder="Add a public comment"
                          className="w-11/12 sm:w-[90%] border-b-2 outline-none dark:bg-color-11 dark:border-white "
                          value={comment.comment}
                          onChange={(e) => setComment({ ...comment, comment: e.target.value })}
                        >

                        </input>
                        <button
                          className="absolute bg-color-4 right-2 rounded-xl p-2 top-2 sm:top-1 text-white xs:p-2 xs:text-xs "
                          onClick={onCommentClicked}
                        >Comment</button>
                      </div>
                      :
                      <div className=" sm:w-full relative flex items-center sm:gap-1 sm:p-0 p-2 gap-4">
                        <div className="bg-color-6 relative dark:bg-orange-400 dark:text-white rounded-full h-14 w-14 xs:h-10 xs:w-10 ">
                          <h1 className="absolute right-5 bottom-4  sm:right-3 sm:bottom-1 font-semibold text-xl text-white p-1">K</h1>
                        </div>
                        <input
                          type="text"
                          placeholder="You allow to comment on this after meeting"
                          className="w-11/12 sm:w-[80%] border-b-2 outline-none sm:text-xs dark:bg-color-11 dark:border-white border-[#303030]"
                          // value={comment.comment}
                          // onChange={(e) => setComment({ ...comment, comment: e.target.value })}
                          disabled
                          title="You allow to comment on this after meeting"

                        >

                        </input>
                        <button
                          className="absolute bg-color-4 right-2 rounded-xl p-2 top-2 sm:top-0 sm:right-7 text-white xs:p-2 xs:text-xs "
                          // onClick={onCommentClicked}
                          title="You allow to comment on this after meeting"

                        >Comment</button>
                      </div>
                  }

                  <div className="flex flex-col p-4 gap-4 xs:p-4 xs:gap-2 xs:overflow-y-auto">
                    {/* Comment card */}

                    {
                      comments.length > 0 &&
                      comments.map((item, i) =>
                        <div className="flex flex-col  gap-1 ">
                          <div className="flex  gap-2  ">
                            <div className="bg-color-6 relative dark:bg-orange-400 dark:text-white rounded-full h-14 w-14 xs:h-10 xs:w-10 ">
                              <h1 className="absolute right-5 bottom-4  sm:right-3 sm:bottom-1 font-semibold text-xl text-white p-1">K</h1>
                            </div>
                            <div className="flex justify-between w-full">
                              <div className="flex flex-col text-xs">
                                <h3 className="text-violet-800 ">{item.learnerName}</h3>
                                <p className="text-sm"> {item.comment} </p></div>
                              <div className="text-lg font-extrabold cursor-pointer">
                                <i className="fa-solid fa-trash"
                                  onClick={() => onCommentDelete(item, i)}
                                >
                                </i>
                              </div>
                            </div>
                          </div>
                        </div>
                      )
                    }
                  </div>
                </div>
              </div>

              {
                loading.request ?
                  <Loader />
                  :
                  post.createdTutor._id == auth.user._id ? //user to see all request recieved from other learner of that post
                    <div className=" flex  flex-col w-2/5 px-2 py-1 xs:w-full xs:p-1 sm:w-full  ">
                      <h4 className="text-lg dark:text-white font-font-primary font-semibold mt-2 sm:px-2">All your requests  </h4>
                      <div className="flex flex-col p-4 gap-4 xs:p-2 xs:gap-2 xs:overflow-y-auto">
                        <RecievedReq
                          requests={requests}
                          setRefreshReqData={() => setRefreshReqData(!refreshReqData)}
                        />
                      </div>
                    </div>
                    ://learner will see
                    reqData.reqAccept ?
                      <div className=" flex  flex-col w-2/5 p-2 xs:w-full xs:p-1 sm:w-full  ">
                        <h4 className="text-lg dark:text-white font-semibold mt-2">Your Request Accpeted</h4>
                        <SendReq
                          requests={[reqData]}
                          setRefreshReqData={() => setRefreshReqData(!refreshReqData)}
                        />
                      </div>
                      :
                      <ChoseSlot
                        post={post}
                        _reqData={reqData}
                        userData={post.createdTutor}
                      />

              }


            </div >
            :
            <Loader />
      }
    </>
  );
};

export default Post;
