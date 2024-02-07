import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { createPost, getPost, updatePost } from "../../App/postAPI";
import { useAuth } from "../../providers/auth";
import TagsInput from "../Profile/TagsInput";
import { getAlllCatgories } from "../../App/category.Api";
import { useAlert } from "../../Components/Alert";
import { postImgCollection } from "../../assets/postImages/postImg";
import { isEmptyObj, isEmptyObjects } from "../../Components/Helper/helper";


function AddPost({ show, setShow, post, reFresh }) {
  const auth = useAuth()
  const [showNotification, contextHolder] = useAlert()
  //! i very sorry for i didnt change userData to post data
  //! please userData === postData
  const [userData, setUserData] = useState({
    postTitle: '',
    thumbnailUrl: {
      image: Math.ceil(Math.random() * 10)
    },
    charges: '',
    descrp: '',

    postType: "",
    category: "",
    tags: [],
  });

  const [cats, setCats] = useState([]);

  //fetch all categoreis

  useEffect(() => {
    const fetchAllCats = async () => {
      const res = await getAlllCatgories();
      if (res.error) {
        showNotification(res.error.errMassege)
      } else if (res.payload) {
        setCats(res.payload)
      }
    };
    fetchAllCats()
  }, [])

  //fetch all post data
  useEffect(() => {
    const fetchPost = async () => {
      const res = await getPost(post._id);
      if (res.error) {
        showNotification(res.error.errMassege)
      } else if (res.payload) {
        setUserData({ ...res.payload })
      }
    };
    if (post)
      fetchPost()
  }, [post])


  const onAddDetails = async () => {

    if (!auth.user._id)
      return

    const emptyFields = isEmptyObjects(userData, 'descrp')

    if (emptyFields) {
      const message = emptyFields.join(', ') + " should not empty"

      showNotification(message, '')
      return
    }
    const res = await createPost({
      ...userData,
      createdTutor: auth.user._id,
      createdTutorName: auth.user.name,
      slots: auth.user.slots
    })
    if (res.error) {
      //handle error
    } else if (res.payload) {
      //handle sussece responce
      showNotification("Created successfully")
      setShow(!show)
      // setUserData({
      //     postTitle: '',
      //     thumbnailUrl: '',
      //     charges: '',
      //     descrp: '',
      //     postType: '',
      //     category: '',
      //     tags: []
      // })
    }
    setShow(!show)
  };
  const onUpdateDetails = async () => {

    const res = await updatePost(userData._id, userData)
    if (res.error) {
      //handle error
    } else if (res.payload) {
      //handle sussece responce
      showNotification("updated successfully")
      reFresh(true)
      // setUserData({
      //     postTitle: '',
      //     thumbnailUrl: '',
      //     charges: '',
      //     descrp: '',
      //     postType: '',
      //     category: '',
      //     tags: []
      // })
    }
    // setShow(!show)
  };


  const onChoseImg = (value) => {
    setUserData({ ...userData, thumbnailUrl: { ...userData.thumbnailUrl, image: value } })
  };

  if (!show) return null;
  return (
    // <form action="/" enctype="multipart/form-data">
    <div className="flex w-full h-screen items-center transition-all ease-in-out   duration-500 justify-center xs:flex-col  fixed left-0 ,  top-0 overflow-scroll  z-20">
      {contextHolder}
      <div className=" bg-color-3 dark:bg-color-11 z-[9] dark:text-white dark:border absolute my-[10%] top-0 w-4/6 px-6 py-10 rounded-3xl flex flex-col  items-center justify-center  shadow-md shadow-color-8 xs:flex-col xs:w-11/12   ">
        <h2 className="text-color-14 top-0 left-2 text-3xl px-4 py-3 font-medium absolute ">
          Add Post
        </h2>

        <div className="flex p-1   w-full justify-between text-sm xs:text-xs xs:gap-0 xs:p-1 xs:flex-col xs:w-full">
          <div className="flex flex-col relative  w-[45%] p-2  xs:w-full">
            <label
              className="w-full p-2 text-base xs:text-base"
              htmlFor="slots">
              Post Type :
            </label>
            <select
              placeholder="select option"
              name="postType"
              className="rounded-xl w-full dark:bg-color-11 bg-color-3 dark:border  transition-all ease-in-out border-[#4f6da877] focus:ring-[#6868ea]  duration-500 focus:border-color-17 border-[2px] outline-none p-2"
              onChange={(e) =>
                setUserData({ ...userData, [e.target.name]: e.target.value })
              }
              value={userData.postType}>
              <option value={""}>Select</option>
              <option value={"learner"}>Learner</option>
              <option value={"tutor"}>Tutor</option>
            </select>
            <label className="text-xs ml-2 p-1">
              Select what is type of your post
            </label>
          </div>
          <div className="flex flex-col   w-[45%] p-2 xs:w-full">
            <label
              className="w-full p-2 text-base xs:text-base"
              htmlFor="slots">
              Post Category :
            </label>
            <select
              placeholder="select option"
              name="category"
              className="rounded-xl dark:bg-color-11 dark:border bg-color-3  w-full transition-all ease-in-out border-[#4f6da877] focus:ring-[#6868ea]  duration-500 focus:border-color-17 border-[2px] outline-none p-2"
              onChange={(e) =>
                setUserData({ ...userData, [e.target.name]: e.target.value })
              }
              value={userData.category}>
              <option value={""}>Select</option>
              {cats.map((item, i) => (
                <option value={item.catName} key={i}>
                  {item.catName}
                </option>
              ))}
            </select>
            <label className="text-xs ml-2 p-1">
              Select what is type of your post
            </label>
          </div>
        </div>
        <div className="flex p-1   w-full justify-between text-sm xs:text-xs xs:gap-0 xs:p-1 xs:flex-col xs:w-full">
          <div className="flex flex-col relative  w-[45%] p-2  xs:w-full">
            <label className="w-full p-2 text-base xs:text-base">
              Title Of Post
            </label>
            <input
              className="rounded-xl dark:bg-color-11 dark:border bg-color-3 w-full  transition-all ease-in-out border-[#4f6da877] focus:ring-[#6868ea]  duration-500 focus:border-color-17 border-[2px] outline-none p-2 "
              type="text"
              name="postTitle"
              onChange={(e) =>
                setUserData({ ...userData, [e.target.name]: e.target.value })
              }
              value={userData.postTitle}
            />
            <label className="text-xs ml-2 p-1">Write something</label>
          </div>
          <div className="flex flex-col   w-[45%]  p-2  xs:w-full  ">
            <label className="w-full text-base p-2 ">Offering Charges</label>
            <input
              className=" dark:bg-color-11 dark:border bg-color-3  rounded-xl w-full  p-2 transition-all ease-in-out border-[#4f6da877] focus:ring-[#6868ea]  duration-500 focus:border-color-17 border-[2px] outline-none"
              type="number"
              name="charges"
              onChange={(e) =>
                setUserData({ ...userData, [e.target.name]: e.target.value })
              }
              value={userData.charges}
            />
            <label className="text-xs ml-2 p-1">Per hour</label>
          </div>

        </div>

        <div className="flex p-1   w-full justify-between text-sm xs:text-xs xs:gap-0 xs:p-1 xs:flex-col xs:w-full">

          <div className="flex flex-col   w-[45%]  p-2  xs:w-full  ">
            <label className="w-full text-base p-2 ">Tags</label>
            <TagsInput
              setResTags={(e) => setUserData({ ...userData, tags: e })}
              resTags={userData.tags}
              isEditable={true}
            />
            <label className="text-xs ml-2 p-1">Your strength</label>
          </div>
          <div className="flex flex-col  xs:w-full  w-[45%] p-2 justify-around  ">
            <Link to={"/profile"}>
              <label
                className="w-full text-base p-2 text-color-9 cursor-pointer"
                onClick={() => setShow(!show)}>
                Click here to Update Slots time and date
              </label>
            </Link>
            <label className="text-xs ml-2 p-1">
              You can change time and date slot from your profile
            </label>
          </div>
        </div>

        <div className="p-1">
          <h2 className="py-2">Description :</h2>
          <textarea
            rows={5}
            cols={112}
            className="rounded-2xl w-full dark:bg-color-11 dark:border  pl-2 xs:h-24  xs:w-11/12 transition-all ease-in-out border-[#4f6da877] focus:ring-[#6868ea] bg-color-3  duration-500 focus:border-color-17 border-[2px] outline-none"
            name="descrp"
            onChange={(e) =>
              setUserData({ ...userData, [e.target.name]: e.target.value })
            }
            value={userData.descrp}></textarea>
        </div>
        <div className="p-1">
          <h2>Choose Thumbnail BG :</h2>
          <div className="flex gap-1 flex-wrap ">
            {
              postImgCollection.map((item, i) =>
                userData.thumbnailUrl?.image == i ?
                  <div className=" bg-black transition-all cursor-pointer rounded-lg border-color-4 border-4 min-w-[20%] max-w-[20%] flex justify-center h-auto items-center"

                  >
                    <img src={item} alt="" srcset="" className="max-w-full h-auto " />
                  </div>
                  :
                  <div className="transition-all bg-black opacity-70 cursor-pointer min-w-[20%] max-w-[20%] flex justify-center h-auto items-center"
                    onClick={() => onChoseImg(i)}
                  >
                    <img src={item} alt="" srcset="" className="max-w-full h-auto " />
                  </div>
              )
            }
          </div>
        </div>
        <div className="flex p-2 xs:w-full xs:justify-evenly gap-2 w-full justify-end">

          {
            post ?
              <button className="xs:w-2/5 bg-color-4 text-white rounded-xl p-2 w-[15%]"

                onClick={() => onUpdateDetails()}
              >Update
              </button>
              :
              <button className="xs:w-2/5 bg-color-4 text-white rounded-xl p-2 w-[15%] transition-all ease-in-out    duration-500  border-[2px] "

                onClick={() => onAddDetails()}
              >Add
              </button>
          }

          <button className=" xs:w-2/5 bg-color-4 text-white rounded-xl p-2 w-[15%]"
            onClick={() => setShow(!show)}
          >Cancel
          </button>
        </div>
      </div>
    </div >
    // </form>
  );
}

export default AddPost;
