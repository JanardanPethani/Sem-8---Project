import axios from 'axios'
import { setAlert } from './alert'

import {
    GET_PROFILE,
    PROFILE_ERROR
} from './types'

// Get current users profile
export const getCurrentProfile = () => async dispatch => {
    try {
        const res = await axios('/api/user/me')
        // console.log(res);
        dispatch({
            type: GET_PROFILE,
            payload: res.data
        })
    } catch (error) {
        console.log(error);
        // setAlert(error)
        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: error.response.statusText, status: error.response.status }
        })
    }
}