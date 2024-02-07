import React from "react";
import axios from "axios";
const END_POINT = process.env.REACT_APP_END_POINT


export const createNotification = async (data) => {
    const payload = { payload: data }
    console.log('data', data)
    // return
    return await axios.post(`${END_POINT}/createNotification`, payload)
        .then(function (response) {
            return response.data;
        })
        .catch(function (error) {
            console.log('Api error', error)
            if (error.response) {
                if (error.response.data.error)//this writtern by backend dev
                    return error.response.data
                else {//this erro somethin defferent
                    const resp = {
                        error: {
                            errCode: error.code,
                            errMessage: error.message
                        }
                    }
                    return resp
                }
            } else {
                const resp = {
                    error: {
                        errCode: error.code,
                        errMessage: error.message
                    }
                }
                return resp
            }
        });
};

export const updateNotification = async (id, data) => {
    const payload = {
        payload: data
    }
    // return
    return await axios.put(`${END_POINT}/updateNotification/${id}`, payload)
        .then(function (response) {
            return response.data;
        })
        .catch(function (error) {
            console.log('Api error', error)
            if (error.response) {
                if (error.response.data.error)//this writtern by backend dev
                    return error.response.data
                else {//this erro somethin defferent
                    const resp = {
                        error: {
                            errCode: error.code,
                            errMessage: error.message
                        }
                    }
                    return resp
                }
            } else {
                const resp = {
                    error: {
                        errCode: error.code,
                        errMessage: error.message
                    }
                }
                return resp
            }
        });
};
export const getNotifications = async (find) => {

    let url = `id=${find.receiverId || ''}&read=${find.read == undefined ? '' : find.read}`
    // if (tutorId != '' && learnerId != '') {
    //     url = `tutorId=${tutorId}&learnerId=${learnerId}`
    // } else if (tutorId != '') {
    //     url = `tutorId=${tutorId}`
    // } else if (learnerId != '') {
    //     url = `learnerId=${learnerId}
    // }
    console.log('url', url)
    return await axios.get(`${END_POINT}/getNotifications?${url}`)
        .then(function (response) {
            return response.data
        })
        .catch(function (error) {
            console.log('Api error', error)
            if (error.response) {
                if (error.response.data.error)//this writtern by backend dev
                    return error.response.data
                else {//this erro somethin defferent
                    const resp = {
                        error: {
                            errCode: error.code,
                            errMessage: error.message
                        }
                    }
                    return resp
                }
            } else {
                const resp = {
                    error: {
                        errCode: error.code,
                        errMessage: error.message
                    }
                }
                return resp
            }
        })

};