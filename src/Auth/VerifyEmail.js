import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useAlert } from '../Components/Alert'
import { resendVerification, verify } from '../App/Api'
import { useAuth } from '../providers/auth'

function VerifyEmail() {
    const auth = useAuth()
    const [showNotification, contextHolder] = useAlert()
    const params = useParams()

    const resendVerifyMail = async (e) => {
        if (!auth.user._id) {
            showNotification("Please login again")
            return
        }
        auth.setLoading(true)
        const res = await resendVerification({ name: auth.user.name, email: auth.user.email })

        if (res.error) {
            //error
            showNotification(res.error.errMessage)
            auth.setLoading(false)
        } else if (res.payload) {
            // auth.setUser(res.payload)
            auth.setLoading(false)
            showNotification(res.message)
            // localStorage.setItem('_id', res.payload._id)
        }
    };

    useEffect(() => {
        const fetchData = async (params) => {
            auth.setLoading(true)
            const res = await verify({ email: params.email, token: params.token })

            if (res.error) {
                showNotification(res.error.errMessage)
                auth.setLoading(false)

            } else if (res.payload) {
                auth.setUser(res.payload)
                showNotification(res.message)
                auth.setLoading(false)
            }
        };
        if (params.email)
            fetchData(params)
    }, [])
    return (
        <div className="w-full bg-white rounded-3xl ml-16 h-screen ">
            {contextHolder}
            <div className=" w-[70%] mx-auto my-3  justify-center dark:bg-color-11 dark:text-white flex-col  flex gap-5   ">

                <h1 className="font-bold py-4 px-4 font-font-primary dark:text-white text-color-14 text-4xl">
                    Verify Your Mail
                </h1>
                <p className="px-4 dark:text-white ">
                    We have sent verification link on <b>{auth.user.email}</b>
                </p>


                {
                    auth.loading ?
                        <button className="bg-color-14 w-1/2
                 text-white dark:border dark:bg-gray-500 rounded-lg sm:px-2 sm:text-sm px-3 py-1 text-base dark:bg-zinc-900 dark:border-white dark:border-solid"
                        >
                            Loading...
                        </button>

                        :
                        <button className="bg-color-14 w-1/2
                 text-white dark:border dark:bg-gray-500 rounded-lg sm:px-2 sm:text-sm px-3 py-1 text-base dark:bg-zinc-900 dark:border-white dark:border-solid"
                            onClick={resendVerifyMail}
                        >
                            Resend Verification mail
                        </button>

                }
            </div>
        </div>
    )
}

export default VerifyEmail