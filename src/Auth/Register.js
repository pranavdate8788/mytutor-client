import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAllUser, register } from "../App/Api";
import RegisterImage from '../assets/register1.png'
// import Google from '../assets/Google-logo.png'
import { useAuth } from "../providers/auth";
import Loader from "../Components/Helper/Loader";
import { validatePassword } from "../Components/Helper/helper";
import { useAlert } from "../Components/Alert";

export default function Register() {
   const [name, setName] = useState('')
   const [email, setEmail] = useState('')
   const [password, setPassword] = useState('')
   const [confiPass, setConfiPass] = useState('')
   const [error, setError] = useState('Please enter your details.')

   const [showNotification, contextHolder] = useAlert()

   const auth = useAuth()



   async function fetchData() {
      if (!validatePassword(password)) {
         showNotification("Please use strong password")
         return
      }
      if (password !== confiPass) {
         setError("Password does not match")
         return
      }
      auth.setLoading(true)
      const res = await register({
         name, email, password
      });
      if (res.error) {
         //error
         setError(res.error.errMessage)
         auth.setLoading(false)
      } else if (res.payload) {
         auth.setUser(res.payload)
         localStorage.setItem('_id', res.payload._id)
         auth.setLoading(false)
      }
   }


   return (
      <div className="w-full ml-16 bg-white sm:ml-0  h-screen xs:flex xs:flex-col flex items-start">
         {contextHolder}
         <div className="relative   w-[57%] h-full flex flex-col items-center  xs:hidden sm:hidden ">
            <div className="absolute top-[5%] items-center  flex flex-col">
               <span class="text-5xl font-extrabold bg-clip-text text-transparent py-2 bg-gradient-to-r from-[#439cfb] to-[#7e7280]">
                  Welcome to My tutor
               </span>

            </div>
            <img className="w-full     h-full " src={RegisterImage} />
         </div>

         <div className="w-[43%] bg-white  sm:w-[97%] sm:p-7 xs:p-8 dark:bg-color-11 dark:text-white    xs:justify-center sm:justify-center xs:gap-4 sm:gap-3   mx-auto h-full bg-white flex flex-col p-20 justify-between items-center">
            <h1 className="text-4xl text-stone-700 dark:text-white font-bold">My Tutor</h1>

            <div className="w-full xs:w-full flex flex-col max-w-[500px] ">
               <div className="w-full flex flex-col mb-2">
                  <h3 className="text-2xl font-semibold mb-2 dark:text-white text-stone-700">Register</h3>
                  <p className="text-sm mb-2 text-red-600">{error}</p>
               </div>
               <div className="w-full flex flex-col">
                  <input className="w-full text-black py-2 px-1 my-2 bg-transparent dark:text-white dark:border-white  border-b border-stone-700 outline-none focus:outline-none"
                     type="text"
                     placeholder="FullName"
                     value={name}
                     onChange={(e) => setName(e.target.value)}
                  />
                  <input className="w-full px-1 text-black py-2 my-2 bg-transparent dark:text-white dark:border-white border-b border-stone-700 outline-none focus:outline-none"
                     type="email"
                     placeholder="Email"
                     value={email}
                     onChange={(e) => setEmail(e.target.value)}
                  />
                  <input className="w-full text-black py-2 px-1 my-2 bg-transparent dark:text-white dark:border-white border-b border-stone-700 outline-none focus:outline-none"
                     type="password"
                     placeholder="Password"
                     value={password}
                     onChange={(e) => setPassword(e.target.value)}
                  />
                  <input className="w-full px-1 text-black py-2 my-2 bg-transparent dark:text-white dark:border-white border-b border-stone-700 outline-none focus:outline-none"
                     type="password"
                     placeholder="ConfirmPassword"
                     value={confiPass}
                     onChange={(e) => setConfiPass(e.target.value)}
                  />
               </div>

               <div className="w-full flex flex-col my-4">

                  {
                     auth.loading ?
                        <button className="w-full text-white my-2 bg-color-6 rounded-md p-4 text-center flext items-center justify-center shadow-sm shadow-slate-500 cursor-pointer"
                           disabled={true}

                        >
                           loading...
                        </button>
                        :
                        <button className="w-full text-xl text-white my-2 bg-color-4 rounded-md p-4 sm:p-3 text-center border-black/40 hover:bg-[#e8bd6d] transition-all duration-500 ease-in-out shadow-sm hover:text-black border-px flext items-center justify-center  shadow-black cursor-pointer"
                           onClick={() => fetchData()}
                        >
                           Register
                        </button>
                  }

               </div>

               <div className="w-full flex items-center justify-center relative py-2">
                  <div className="w=full h-[1px] bg-black"></div>
                  <p className=" text-lg absolute text-black/80 dark:bg-zinc-700 dark:text-white ">or</p>
               </div>


            </div>
            <div className="w-full flex items-center justify-center">
               <p className="text-sm font-normal dark:text-white text-[#060606]">You have already account
                  <Link to={'/login'}>

                     <span className="font-semibold text-lg underline-offset-2 dark:text-blue-500 dark:underline text-[blue] cursor-pointer"> Log in </span>
                  </Link>
               </p>
            </div>

         </div>
      </div >
   )
}