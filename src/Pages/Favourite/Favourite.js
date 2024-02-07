import React, { useEffect, useState } from "react";
import {
  createFavourite,
  getFavourites,
  updateFavourite,
} from "../../App/favoriteApi";
import { useAuth } from "../../providers/auth";
import { Link } from "react-router-dom";

function Favourite() {
  const auth = useAuth();
  const [favourite, setFavourite] = useState([]);
  const [isFavourite, setisFavourite] = useState(false);
  //get fovourit
  useEffect(() => {
    const fetchFav = async (id) => {
      const res = await getFavourites(auth.user._id, "");
      if (res.error) {
      } else if (res.payload) {
        if (res.payload.length <= 0) return;
        setFavourite(res.payload);
        setisFavourite(res.payload[0].isFavourite);
      }
    };
    if (!favourite._id && auth.user) {
      //minus one favourite
      fetchFav();
    }
  }, [auth.user]);

  const onClickFavourit = async (status, item) => {
    setisFavourite(!isFavourite);

    if (favourite._id) {
      //update
      let data = {
        ...item,
        isFavourite: status,
      };
      const res = await updateFavourite(favourite._id, data);

      if (res.error) {
      } else if (res.payload) {
      }
    }
  };

  console.log("favourite", favourite);

  return (
    <div className="bg-white w-full dark:bg-color-11 transition-all duration-500 ease-in-out rounded-3xl sm:ml-0 sm:h-screen ml-16 py-4 px-2">
      <div id="result " className="w-1/2 mt-16 dark:bg-color-11  p-2 relative sm:mb-16  sm:w-full">
        <div className="w-full fixed z-[10]  dark:bg-color-11 dark:text-white bg-white top-16 ">
          <h1 className="text-color-14   font-semibold  px-4 py-4  w-fit text-2xl ">
            Your Favourite Tutors
          </h1>
        </div>
        {favourite.length > 0 ?
          favourite.map((item, i) => (
            <Link to={"/showProfile/" + item.tutorId} key={i}>
              <div
                className="my-3 sm:py-1 sm:px-4 mx-4 py-3 px-5 transition-all ease-in-out duration-500 hover:shadow-md hover:shadow-[#5d899795] sm:mx-2   rounded-3xl dark:bg-color-11 dark:border-white border dark:text-white   bg-color-3  h-auto w-full   flex  "
                key={i}>
                <div className="flex gap-4 items-center  w-full">
                  <div className="bg-color-4 relative  dark:bg-color-4 dark:text-white rounded-full h-14 w-14 xs:h-12 xs:w-12 ">
                    <h1 className="absolute right-5 bottom-4  sm:right-3 sm:bottom-1 font-semibold text-xl text-white p-1">
                      K
                    </h1>
                  </div>
                  <div className="p-1 text-xs flex flex-col text-color-8 dark:text-white py-8">
                    <div className="flex flex-col p-1">
                      <h1 className="text-lg font-bold text-blue-900">
                        {item.tutorName}
                      </h1>
                      {/* {
                                                isFavourite ?
                                                    <button
                                                        className={"bg-[#837e7a] text-white w-24 h-11 rounded-md xs:w-20 xs:p-1 xs:h-9"}
                                                        onClick={(e) => onClickFavourit(false , item)}
                                                    >
                                                        {"unfavourite"}
                                                    </button>
                                                    :
                                                    <button
                                                        className={"bg-[#F8AF6A] text-white w-24 h-11 rounded-md xs:w-20 xs:p-1 xs:h-9"}
                                                        onClick={(e) => onClickFavourit(true , item)}
                                                    >
                                                        {"Favourite"}
                                                    </button>
                                            }
                                            } */}
                      <span className="">online</span>
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

export default Favourite;
