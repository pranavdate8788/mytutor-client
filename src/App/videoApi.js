import axios from "axios";
const END_POINT = process.env.REACT_APP_END_POINT
const VIDEOSDK_TOKEN = process.env.REACT_APP_VIDEOSDK_TOKEN

export const generateMeetingId = async (data) => {
    const token = VIDEOSDK_TOKEN

    try {
        const res = await fetch(`https://api.videosdk.live/v2/rooms`, {
            method: "POST",
            headers: {
                authorization: `${token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({}),
        });

        console.log('res', res)
        //Destructuring the roomId from the response



        const { roomId } = await res.json();
        console.log(res.json())
        return roomId
    } catch (error) {
        console.log('error :>> ', error);

        return error
    }

};
export const createMeeting = async (data) => {

    const payload = {
        payload: data
    }
    return await axios.post(`${END_POINT}/createmeeting`, payload)
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

export const getUserallMeets = async (id) => {

    return await axios.get(`${END_POINT}/getuserallmeetings/${id}`)
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

