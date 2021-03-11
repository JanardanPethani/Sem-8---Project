import axios from 'axios'

import {
    GET_PROFILE,
    PROFILE_ERROR
} from './types'

// Get current users profile
export const getCurrentProfile = () => async dispatch => {
    try {
        const req = await axios('/api/ride/allRequests')
        const off = await axios('/api/ride/allOffers')

        // console.log(res);
        dispatch({
            type: GET_PROFILE,
            payload: { req: req.data, off: off.data }
        })
    } catch (error) {
        // console.log(error);
        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: error }
        })
    }
}