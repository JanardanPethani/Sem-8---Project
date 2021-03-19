import axios from 'axios'
import { setAlert } from './alert'
import { getCurrentProfile } from './profile'

import { GET_OFFER, OFFER_FAIL, PROFILE_ERROR } from './types'

// Create or Update request
export const sendOffer = (formData, history) => async dispatch => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        // console.log(formData);
        await axios.post('/api/ride/offer', formData, config)
        dispatch(getCurrentProfile())

        dispatch(setAlert('Offer Accepted', 'success'))

        // can't use Redirect bcz Action is not react 
        history.push('/dashboard')
    } catch (error) {
        const errors = error.response.data.errors;
        if (errors) {
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')))
        }
        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: error }
        })
    }

}

export const deleteOff = id => async dispatch => {
    if (window.confirm('Sure? this can not be undone..!')) {
        try {
            await axios.delete(`/api/ride/offer/${id}`)
            dispatch(getCurrentProfile())
            dispatch(setAlert('Offer Deleted', 'success'))
        } catch (error) {
            dispatch({
                type: PROFILE_ERROR,
                payload: { msg: error }
            })
        }
    }
}

export const getOffer = id => async dispatch => {
    try {
        const res = await axios.get(`/api/ride/offer/${id}`)
        dispatch(getCurrentProfile())
        dispatch({
            type: GET_OFFER,
            payload: res.data
        })
    } catch (error) {
        dispatch({
            type: OFFER_FAIL,
            payload: { msg: error }
        })
    }
}