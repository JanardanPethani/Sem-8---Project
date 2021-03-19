import axios from 'axios'

import {
    GET_PROFILE,
    PROFILE_ERROR
} from './types'

import { setAlert } from './alert'

// Get current users profile
export const getCurrentProfile = () => async dispatch => {
    try {
        const req = await axios.get('/api/ride/allRequests')
        const off = await axios.get('/api/ride/allOffers')

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

export const editProfile = (formData, history) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    try {
        await axios.patch('/api/user/me', formData, config)
        dispatch(getCurrentProfile())

        dispatch(setAlert('Profile Updated(Refresh to see changes in Dashboard)', 'success'))

        // can't use Redirect bcz Action is not react 

    } catch (error) {
        const errors = error.response.data.errors;
        if (errors) {
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')))
        }
        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: error }
        });
    }
}

export const getLocName = (geoData) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    await axios.patch('/api/user/me', geoData, config)
}