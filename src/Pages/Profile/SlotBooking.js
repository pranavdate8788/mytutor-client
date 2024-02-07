import React, { useState } from 'react'
import { Dropdown, TimePicker, Tag } from 'antd'
import MultipleDatePicker from '../../Components/Helper/multiDate'
import moment from 'moment'
import { useAuth } from '../../providers/auth'
import { useUserData } from '../../providers/userData'

function SlotBooking({ isEditable }) {
    const auth = useAuth()
    const userData = useUserData()
    const [dates, setDates] = useState([]);
    const [slot, setSlot] = useState({
        available: "",//ath.user.slots.available
        customDates: [],//array of selected date
        isEveryTime: false,
        timeRange: []

    })

    const [available, setAvailable] = useState('')

    const [fromTime, setFromTime] = useState("00:00")
    const [toTime, setToTime] = useState("00:00")

    const [isEveryTime, setIsEveryTime] = useState(false)
    const [slotTime, setSlotTime] = useState([])

    const [error, setError] = useState('')

    const handleAddClick = (e) => {
        if (toTime == "00:00" || fromTime == "00:00") {
            setError("Invalid Time")
            return
        }

        // var duration = moment.duration(toTime.diff(fromTime));
        // var days = `${duration.asHours()} + ${duration.asMinutes()}`;
        // console.log("duration.asDays()", duration.asDays())
        // console.log("duration.asHours()", duration.asHours())
        // console.log("duration.asHours()", duration.asHours())
        // console.log('days', days)

        setError('')
        let slot = {
            from: moment(fromTime).format('hh:mm A'),
            to: moment(toTime).format('hh:mm A')
        }
        let t = [...auth.user.slots.timeRange]
        t.push(slot);
        setFromTime('00:00')
        setToTime('00:00')

        auth.setUser({ ...auth.user, slots: { ...auth.user.slots, timeRange: t } })

    };

    const onChange = (value, t) => {
        if (t === "from") {
            setFromTime(moment(value, 'hh:mm A'));
        }
        else if (t === "to") {
            setToTime(moment(value, 'hh:mm A'));
        };

    }
    return (
        <>

            <div className="w-1/2   xs:flex-col xs:w-full ">
                {
                    isEditable
                    &&
                    <div className="p-2 gap-2 flex flex-col">
                        <h2 className="text-lg text-color-14 dark:text-white">Set Slot</h2>
                        <div className="flex w-full justify-evenly placeholder:">
                            <div className="text-lg"><i class="fa-solid fa-calendar-check text-color-10 bg-color-5 rounded-full p-[5px]"> </i> Available</div>
                            <div className="text-lg"><i class="fa-solid fa-calendar-xmark text-color-13 bg-color-5 rounded-full p-[5px]"></i> Not Available</div>
                            <div className="text-lg"><i class="fa-solid fa-calendar-plus text-color-14 bg-color-5 rounded-full p-[5px]"></i> Selected</div>
                        </div>
                        <div className="flex gap-5">
                            <label className="w-[20%] px-2 py-1 text-base xs:text-xs" htmlFor="slots">Available: </label>
                            <select
                                placeholder="select option"
                                name="slots"
                                className="rounded-xl w-[80%]  dark:bg-color-11  dark:border transition-all ease-in-out border-white focus:ring-[#6868ea] bg-color-3  duration-500 focus:border-color-17 border-[2px] outline-none px-1"
                                value={auth.user.slots.available}
                                onChange={(e) => auth.setUser({ ...auth.user, slots: { ...auth.user.slots, available: e.target.value } })}
                            >
                                <option value={''}>Custom Select</option>
                                <option value={'everyday'}>Everyday</option>
                                <option value={'weekend'}>Weekend</option>
                                <option value={'weekdays'}>Week days</option>
                                <option value={'not'}>Not Available</option>
                            </select>
                        </div>
                    </div>
                }

                <div className=" border border-blue-100 w-full  dark:bg-zinc-800  dark:text-black  p-2 text-lg font-semibold mt-2 rounded-2xl xs:gap-1 xs:p-2 xs:ml-2 xs:font-normal ">

                    {
                        isEditable
                            ?
                            <MultipleDatePicker
                                value={auth.user.slots.customDates}
                                onChange={(dates) => auth.setUser({ ...auth.user, slots: { ...auth.user.slots, customDates: dates } })}
                                available={auth.user.slots.available}
                            />
                            :
                            <MultipleDatePicker
                                value={userData.userDetails.slots.customDates}
                                // onChange={(dates) => auth.setUser({ ...auth.user, slots: { ...auth.user.slots, customDates: dates } })}
                                available={userData.userDetails.slots.available}
                            />
                    }

                </div>

                <div className=" flex flex-col gap-5 p-2 ">
                    {
                        isEditable
                        &&
                        <>
                            <h2 className="font-semibold dark:text-white">Select Time Range</h2>
                            <div className="every sm:text-xs">
                                <input
                                    type="checkbox"
                                    id='everytime'
                                    className='w-4  h-4 mr-2'
                                    checked={auth.user.slots.isEveryTime}
                                    onChange={(e) => auth.setUser({ ...auth.user, slots: { ...auth.user.slots, isEveryTime: !auth.user.slots.isEveryTime } })}
                                />
                                <label htmlFor="everytime">Every Time</label>
                            </div>
                            <div className="flex sm:gap-1 gap-4">
                                <div className="flex sm:gap-1 sm:text-xs sm:items-center gap-4 ">

                                    From
                                    <TimePicker className="dark:bg-white dark:border "
                                        disabled={auth.user.slots.isEveryTime}
                                        showTime={{ format: 'hh:mm A', use12Hours: true }}

                                        showSecond={false}
                                        value={moment(fromTime, 'hh:mm A')}
                                        onChange={(value) => {
                                        }}
                                        onSelect={(e) => onChange(e, 'from')}
                                    />
                                    to
                                    <TimePicker className="dark:bg-white dark:border "
                                        disabled={auth.user.slots.isEveryTime}
                                        showTime={{ format: 'hh:mm A', use12Hours: true }}
                                        showSecond={false}
                                        value={moment(toTime, 'hh:mm A')}
                                        onChange={(value) => {
                                            console.log('onchange', value);
                                        }}
                                        onSelect={(e) => onChange(e, 'to')}
                                    />
                                </div>

                                <button className="rounded-xl  w-20 h-7 dark:bg-color-11 text-white  dark:border bg-color-4"
                                    onClick={() => handleAddClick()}
                                    disabled={auth.user.slots.isEveryTime}
                                >Add</button>{" "}
                            </div>
                        </>
                    }
                    <p>{error}</p>
                    <div className="w-full mb-16 h-auto p-1 gap-4 flex flex-wrap xs:w-full dark:text-white" >
                        {/* <button className="w-2/5 text-sm border shadow-lg shadow-gray-400 rounded-xl   p-2">
                            {moment(fromTime).format('hh:mm A')} - {moment(toTime).format('hh:mm A')}
                        </button> */}

                        {
                            isEditable
                                ?
                                !auth.user.slots.isEveryTime && auth.user.slots.timeRange?.map((item, i) => (

                                    <Tag
                                        onClose={(e) => console.log(e)}
                                        closable={isEditable}
                                        className=" text-sm border shadow-lg dark:text-white dark:shadow-none shadow-color-8 rounded-xl p-2 pr-3"
                                        title={"bbjn"}
                                        key={i}
                                    >
                                        {item.from} - {item.to}
                                    </Tag>

                                ))
                                :
                                !userData.userDetails.slots.isEveryTime && userData.userDetails.slots.timeRange?.map((item, i) => (

                                    <Tag
                                        onClose={(e) => console.log(e)}
                                        closable={isEditable}
                                        className=" text-sm border dark:text-white shadow-lg dark:shadow-none shadow-color-8 rounded-xl p-2 pr-3"
                                        title={"bbjn"}
                                        key={i}
                                    >
                                        {item.from} - {item.to}
                                    </Tag>

                                ))
                        }
                    </div>
                </div>



            </div>

        </>
    )
}

export default SlotBooking