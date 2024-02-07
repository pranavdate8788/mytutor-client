import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { deletePost, getAllPosts, getUserAllPosts } from "../../App/postAPI";
import { useAuth } from "../../providers/auth";
import { ConfigProvider, FloatButton } from "antd";
import { useUserData } from "../../providers/userData";
import Loader, { LoaderSmall } from "../../Components/Helper/Loader";
import EditReq from "../Request/EditReq";
import AddPost from "../Posts/AddPost";
import cat_image1 from "../Posts/../../assets/user.png";
import { postImgCollection } from "../../assets/postImages/postImg";
import { useAlert } from "../../Components/Alert";


function AllPost({ resPost = false, isEditable = true }) {
  const [posts, setPosts] = useState([])
  const [show, setShow] = useState(false)
  const [reFresh, setReFresh] = useState(false)
  const [showNotification, contextHolder] = useAlert()

  const [loader, setLoader] = useState({
    post: false
  })
  const [err, setErr] = useState('')
  const auth = useAuth()
  const userData = useUserData()
  //get all post of user
  useEffect(() => {
    const getallpost = async (id) => {
      setLoader({ ...loader, post: true })
      const res = await getUserAllPosts(id);
      if (res.error) {
        setLoader({ ...loader, post: false })
        setErr(res.error.errMessage)
      } else if (res.payload) {
        setLoader({ ...loader, post: false })
        setPosts(res.payload)
      }
    };

    if (!resPost) {
      isEditable ? getallpost(auth.user._id) : getallpost(userData.userDetails._id)
    }
    else
      setPosts(resPost)
    return () => {

    };
  }, [reFresh])
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


  const onHandleClickForEdit = (e) => {

    setShow(!show)
  };
  const onHandleClickForDeletePost = async (item) => {
    const res = await deletePost(item._id)
    if (res.error) {
      showNotification(res.error.errMessage)

    } else if (res.payload) {
      showNotification(res.message)
      setReFresh(!reFresh)
    }
  };


  if (loader.post) {
    return <LoaderSmall />
  }
  console.log('userData', userData)
  return (
    <>

      {contextHolder}
      <div className="sm:mb-16  w-full px-2 py-1 flex flex-col gap-4 overflow-scroll xs:w-full xs:p-1 xs:ml-1" ref={menuRef}>
        {
          posts.length > 0 ?
            posts.map((item, i) => (
              <div className="flex flex-col  gap-[2px] bg-color-3 shadow-lg shadow-color-8 dark:bg-color-11 transition-all duration-500 ease-in-out dark:shadow-sm w-4/6 p-2 rounded-2xl  dark:border-white border xs:w-full xs:text-xs" key={i}>
                <div className="flex justify-between px-2 ">
                  <span className="text-xs">{item.createdAt}</span>
                  {

                    item.createdTutor._id === auth.user._id &&
                    <div
                      className="text-lg font-extrabold relative">
                      <i className="fa-solid fa-ellipsis-vertical"
                        onClick={() => onClickThreePoint(item, i)}
                      ></i>
                      {
                        (openProfile && i == cardActioveInd)
                        &&
                        <EditReq
                          type={'post'}
                          item={item}
                          onClickEdit={(e) => onHandleClickForEdit(e)}
                          onDeletePost={(e) => onHandleClickForDeletePost(e)}
                        />}
                    </div>
                  }
                </div>
                <div className="flex w-full gap-2">
                  <div className="h-auto w-2/5  sm:h-auto  dark:bg-color-9 bg-color-4   rounded-xl">
                    <Link to={'/postcontent/' + item._id}
                      className="relative" >

                      <img src={item.thumbnailUrl && postImgCollection[item.thumbnailUrl.image]} className="h-auto   w-full rounded-xl sm:h-full sm:w-full "></img>
                      <span className="font-semibold  absolute  text-white font-font-logo top-7 w-[35%] left-3 line-clamp-3 text-sm xs:text-xs ">
                        {item.postTitle}
                      </span>
                      <div className="flex gap-2 sm:gap-[2px] items-center absolute  bottom-3 sm:bottom-2 sm:left-2  left-3">
                        <img src={cat_image1} className="h-5 sm:h-3 sm:w-3 w-5"></img>
                        <label className="font-font-logo sm:text-xs text-white">Username</label>
                      </div>
                    </Link>
                  </div>
                  <div className="flex flex-col w-[60%] p-1 sm:gap-2 gap-1 ">

                    <span className="font-semibold xs:text-xs line-clamp-2 text-lg">
                      {item.postTitle}
                    </span>
                    <span className="text-sm">{item.createdTutor.name}</span>
                    <div className="flex items-center gap-1">
                      <div className="rounded-full bg-green-500  h-2 w-2"></div>
                      <label>{item.createdTutor.analytics.favorite} favorite</label>
                    </div>
                    <button className="bg-white text-color-4 w-36 xs:w-28 rounded-xl p-1 dark:bg-color-11 dark:border">
                      Rs.{item.pricePerHour || item.charges}(per hour)
                    </button>
                  </div>
                </div>
                {
                  (openProfile && i == cardActioveInd)
                  &&
                  <AddPost
                    show={show}
                    setShow={() => setShow(!show)}
                    post={item}
                    reFresh={(e) => setReFresh(!reFresh)}
                  />
                }
              </div>
            ))
            :
            <p> No data available {err}</p>
        }

      </div>
    </>
  );
}

export default AllPost;
