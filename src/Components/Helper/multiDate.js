import React, { useCallback, useMemo } from "react";
// import PropTypes from "prop-types";/
import moment from 'moment'
import { Select, Calendar, Tag, Input } from "antd";

function toValidArray(value) {
    const arr = Array.isArray(value) ? value : [value];

    return arr.filter(e => e != null && e != undefined); // must be ==
}

const MultipleDatePicker = (props) => {
    const {
        onChange = () => { },
        value,
        format = "DD/MM",
        available,
        reqValue = false,
        onChangeReValue = () => { },
        onChangeAppointementDate = () => { },
        selectedDate = false,
        appointementDates = false
    } = props;

    const arrValues = useMemo(() => toValidArray(value), [value]);
    const reqArrValues = useMemo(() => toValidArray(reqValue), [reqValue]);
    const arrAppointementDates = useMemo(() => toValidArray(appointementDates), [appointementDates]);
    console.log('arrAppointementDates', arrAppointementDates)
    const customRenderDate = useCallback(
        current => {

            const day = current.format("DD")
            const currentDate = moment();

            if (current.format("YYYY-MM-DD") == selectedDate) {
                return <div className={"border border-bg-color-9 m-2"}>{day}</div>;
            }
            //appointented scheduling to user
            if (arrAppointementDates.some(e => current.format("YYYY-MM-DD") == e.date && e.isPaymentComplete == true)) {
                return <div className={"bg-color-8 text-white m-2"}>{day}</div>;
            }
            if (arrAppointementDates.some(e => current.format("YYYY-MM-DD") == e.date && e.reqAccept == true)) {
                return <div className={"bg-color-12 text-white m-2"}>{day}</div>;
            }
            if (arrAppointementDates.some(e => current.format("YYYY-MM-DD") == e.date)) {
                return <div className={"bg-color-9 text-white m-2"}>{day}</div>;
            }

            if (current.isBefore(currentDate.subtract(1, "day"))) {
                return <div className="m-2 text-color-8" title="Could Not Select">{day}</div>;
            }

            if (reqArrValues.some(e => current.format("YYYY-MM-DD") == e)) {
                return <div className={"bg-color-9 text-white m-2"}>{day}</div>;
            }

            if (arrValues.some(e => current.format("YYYY-MM-DD") == e)) {
                return <div className={"bg-color-10 text-white m-2"}>{day}</div>;
            }

            const currentDay = new Date(current.format("YYYY-MM-DD")).getDay();

            if (available === "weekend" && (currentDay == 0 || currentDay == 6)) {
                return <div className={"bg-color-10 text-white m-2"}>{day}</div>;
            }
            if (available === "weekdays" && (currentDay != 0 && currentDay != 6)) {
                return <div className={"bg-color-10 text-white m-2"}>{day}</div>;
            }
            if (available === "everyday") {
                return <div className={"bg-color-10 text-white m-2"}>{day}</div>;
            }
            if (available === "not") {
                return <div className={"bg-color-13 text-white m-2"}>{day}</div>;
            }


            return <div className="m-2 text-color-14">{day}</div>;
        },
        [arrValues, reqArrValues, available, arrAppointementDates, selectedDate]
    );

    const renderTag = useCallback(
        ({ value, onClose }) => {
            return (
                <Tag onClose={onClose} closable>
                    {moment(value).format('DD/MM')}
                </Tag>
            );
        },
        [format]
    );

    const _onChange = useCallback(
        selected => {

            const currentDate = moment();

            if (selected.isBefore(currentDate.subtract(1, "day"))) {
                return
            }

            const index = arrValues.findIndex(e => selected.format("YYYY-MM-DD") == e);

            // console.log('selected', moment(selected.format("YYYY-DD-MM")).day())

            const temp = [...arrValues];

            if (index !== -1) {
                temp.splice(index, 1);
            } else {

                // temp.push(selected);
                temp.push(selected.format("YYYY-MM-DD"));
            }

            onChange(temp);
        },
        [arrValues, onChange]
    );
    const _onChangeReqValue = useCallback(
        selected => {
            const currentDate = moment();

            if (selected.isBefore(currentDate.subtract(1, "day"))) {
                return
            }
            const index = reqArrValues.findIndex(e => selected.format("YYYY-MM-DD") == e);

            // console.log('selected', moment(selected.format("YYYY-DD-MM")).day())

            const temp = [...reqArrValues];

            if (index !== -1) {
                temp.splice(index, 1);
            } else {

                // temp.push(selected);
                temp.push(selected.format("YYYY-MM-DD"));
            }

            onChangeReValue(temp);
        },
        [reqArrValues, onChangeReValue]
    );
    const _onChangeAppointementDate = useCallback(
        selected => {
            const currentDate = moment();

            // if (selected.isBefore(currentDate.subtract(1, "day"))) {
            //     return
            // }
            // const index = reqArrValues.findIndex(e => selected.format("YYYY-MM-DD") == e);

            // console.log('selected', selected.format("YYYY-MM-DD"))

            const temp = [];

            // if (index !== -1) {
            //     temp.splice(index, 1);
            // } else {

            //     // temp.push(selected);
            //     temp.push(selected.format("YYYY-MM-DD"));
            // }

            if (selectedDate == selected.format("YYYY-MM-DD"))
                onChangeAppointementDate(null);
            else
                onChangeAppointementDate(selected.format("YYYY-MM-DD"));
        },
        [onChangeAppointementDate, selectedDate]
    );

    const onDeselect = useCallback(
        oldSelect => {
            const newVal = arrValues.filter(e => !e.isSame(oldSelect));
            onChange(newVal);
        },
        [arrValues, onChange]
    );

    return (
        <>

            <div className={"calendar  dark:bg-color-2 "}>
                {
                    reqValue ?
                        <Calendar
                            fullscreen={false}
                            fullCellRender={customRenderDate}
                            onSelect={_onChangeReqValue}
                        />

                        :
                        appointementDates ?
                            <Calendar
                                fullscreen={false}
                                fullCellRender={customRenderDate}
                                onSelect={_onChangeAppointementDate}
                            />
                            :
                            <Calendar
                                fullscreen={false}
                                fullCellRender={customRenderDate}
                                onSelect={_onChange}
                            />
                }

            </div>
        </>
    );
};

export default MultipleDatePicker;
