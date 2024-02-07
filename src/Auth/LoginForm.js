import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { forgetPassword, login } from "../App/Api";
import loginImage from "../assets/Tablet login-rafiki.png";
import { useAuth } from "../providers/auth";
import Loader from "../Components/Helper/Loader";
import { useAlert } from "../Components/Alert";

export default function LoginForm() {
  const navaigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(
    "Welcome Back! Please enter your details."
  );
  const [showNotification, contextHolder] = useAlert()

  const [loader, setLoader] = useState({
    forgetPass: false,
  })

  const auth = useAuth();
  async function fetchData() {
    auth.setLoading(true);
    const res = await login({
      email,
      password,
    });

    if (res.error) {
      //error
      setError(res.error.errMessage);
      showNotification(res.error.errMessage)
      auth.setLoading(false);
    } else if (res.payload) {
      auth.setUser(res.payload);
      auth.setLoading(false);
      showNotification(res.message)
      localStorage.setItem("_id", res.payload._id);
    }
  }

  async function onHandleforgetPassword(e) {
    if (email == '') {
      showNotification("Email field should not empty")
      return
    }
    // return
    // auth.setLoading(true)
    setLoader({ ...loader, forgetPass: true })
    const res = await forgetPassword({
      email
    });
    if (res.error) {
      //error
      showNotification(res.error.errMessage)
      setLoader({ ...loader, forgetPass: false })

      // auth.setLoading(false)
    } else if (res.payload) {
      // auth.setUser(res.payload)
      // auth.setLoading(false)
      showNotification(res.message)
      setLoader({ ...loader, forgetPass: false })

      // localStorage.setItem('_id', res.payload._id)
    }
  }
  return (
    <div className="w-[100%] ml-16 sm:ml-0 overflow-auto scrollbar-hide md:scrollbar-default">
      {contextHolder}
      <div className="w-full   sm:ml-0 h-screen   flex  xs:flex-col">
        {/* left field of login */}
        <div className="relative bg-white  w-[57%] h-full flex flex-col items-center xs:hidden sm:hidden">
          <div class="text-5xl w-[90%] font-extrabold flex my-4 justify-center">
            <span class="bg-clip-text text-transparent py-2 bg-gradient-to-r from-color-14 to-color-12">
              Welcome to My tutor
            </span>
          </div>
          <div class="text-3xl font-bold flex justify-center items-center">
            <span class="bg-clip-text py-1 text-transparent bg-gradient-to-r from-color-12 text-color-14">
              Start your new way of learning
            </span>
          </div>

          {/* <a href="https://storyset.com/user">User illustrations by Storyset</a> */}
          <img
            className="w-full absolute py-8   object-cover"
            src={loginImage}
          />
        </div>
        {/* right fiked of login page */}
        <div className="w-[43%] bg-white xs:w-full sm:w-full  dark:bg-color-11 dark:text-white sm:p-8 xs:mx-1 xs:p-7 xs:justify-evenly sm:justify-evenly sm:mx-1 mx-auto h-full flex flex-col py-16 px-7  justify-between items-center">
          <h1 className="text-5xl text-color-14 dark:text-white py-5 font-semibold">
            My Tutor
          </h1>

          <div className="w-full flex gap-2 flex-col  ">
            <div className="w-full flex flex-col mb-2">
              <h3 className="text-3xl font-semibold mb-2 dark:text-white text-color-14">
                Login
              </h3>
              <p className="text-sm mb-2 text-red-600">{error}</p>
            </div>
            <div className="w-full flex flex-col">
              <div className="w-full relative ">
                <input
                  className="w-full text-black px-2 py-2 my-2 bg-transparent border-b dark:border-white dark:border-b dark:text-white border-[#075985] outline-none focus:outline-none"
                  type="email"
                  placeholder="Email/Username"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <i class="fa-solid fa-user absolute right-4 text-xl top-4"></i>
              </div>
              <div className="w-full relative">
                <input
                  className="w-full px-2 text-black py-2 my-2 bg-transparent border-b dark:border-white dark:border-b dark:text-white border-[#075985] outline-none focus:outline-none"
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <i class="fa-solid fa-lock absolute right-4 text-xl top-4"></i>
              </div>
            </div>
            <div className="w-full flex items-center justify-betwwen">
              {
                loader.forgetPass ?

                  <p className="text-sm font-medium whitespace-nowrap cursor-pointer underline underline-offset-2"

                  >
                    Loading...
                  </p>
                  :
                  <p className="text-sm font-medium whitespace-nowrap cursor-pointer underline underline-offset-2"
                    onClick={(e) => onHandleforgetPassword(e)}
                  >
                    Forget Password?
                  </p>
              }
            </div>
            <div className="w-full flex flex-col my-2 font-semibold text-lg">
              {auth.loading ? (
                <button
                  className="w-full text-white my-2 bg-color-6 rounded-md p-4 sm:p-3 text-center flext items-center justify-center shadow-sm shadow-slate-500 cursor-pointer"
                  disabled={true}>
                  loading...
                </button>
              ) : (
                <button
                  className="w-full text-white my-2 bg-color-4 rounded-md p-4 sm:p-3 text-center border-black/40 hover:bg-[#f6d18d] transition-all duration-500 ease-in-out shadow-sm hover:text-black border-px flext items-center justify-center  shadow-black cursor-pointer"
                  onClick={() => fetchData()}>
                  Login
                </button>
              )}
              <Link to={"/register"}>
                <button className="w-full text-black font-semibold my-2 bg-white border-px border-black/40 rounded-md p-4 sm:p-3 text-center flex justify-center items-center  cursor-pointer shadow-sm transition-all duration-500 ease-in-out hover:text-white shadow-black hover:bg-color-8">
                  Register
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
