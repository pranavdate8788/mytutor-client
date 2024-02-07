import React from "react";
import axios from "axios";
const END_POINT = process.env.REACT_APP_END_POINT


export const createPayment = async (data) => {
    const payload = { payload: data }

    // return
    return await axios.post(`${END_POINT}/createPayment`,
        data
        ,
        { headers: { 'Content-Type': 'multipart/form-data' } }
    )
        .then(function (response) {
            return response.data;
        })
        .catch(function (error) {
            console.log('error :>> ', error);
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
export const updatePayment = async (id, data) => {
    const payload = {
        payload: data
    }
    // return
    return await axios.put(`${END_POINT}/updatePayment/${id}`,
        data
        ,
        { headers: { 'Content-Type': 'multipart/form-data' } }
    )
        .then(function (response) {
            return response.data;
        })
        .catch(function (error) {
            console.log('error :>> ', error);
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
export const getPayment = async (id) => {

    return await axios.get(`${END_POINT}/getPayment/${id}`)
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