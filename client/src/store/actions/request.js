import axios from 'axios'
import { setAlert } from './alert'
import { getCurrentProfile } from './profile'

import { PROFILE_ERROR } from './types'

// Create or Update request
export const sendRequest = (formData, history, edit = false) => async dispatch => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        await axios.post('/api/ride/request', formData, config)
        dispatch(getCurrentProfile())

        dispatch(setAlert(edit ? 'Request Updated' : 'Request Created', 'success'))

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

export const deleteReq = id => async dispatch => {
    try {
        await axios.delete(`/api/ride/request/${id}`)
        dispatch(getCurrentProfile())
        dispatch(setAlert('Request Deleted', 'success'))
    } catch (error) {
        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: error }
        })
    }
}