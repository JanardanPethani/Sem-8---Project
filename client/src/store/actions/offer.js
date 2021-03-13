import axios from 'axios'
import { setAlert } from './alert'
import { getCurrentProfile } from './profile'

import { PROFILE_ERROR } from './types'

// Create or Update request
export const sendOffer = (formData, history, edit = false) => async dispatch => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        // console.log(formData);
        await axios.post('/api/ride/offer', formData, config)
        dispatch(getCurrentProfile())

        dispatch(setAlert(edit ? 'Offer Updated' : 'Offer Accepted', 'success'))

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