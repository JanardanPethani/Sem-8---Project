import axios from 'axios'
import { setAlert } from './alert'
import { getCurrentProfile } from './profile'

import {
    REQUEST_FAIL
} from './types'

// Create or Update request
export const sendRequest = (formData, history, edit = false) => async dispatch => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        // console.log(formData);
        const res = await axios.post('/api/ride/request', formData, config)
        console.log(res);
        dispatch(getCurrentProfile())

        dispatch(setAlert(edit ? 'Request Updated' : 'Request Created', 'light'))

        // can't use Redirect bcz Action is not react 
        history.push('/dashboard')
    } catch (error) {
        const errors = error.response.data.errors;
        if (errors) {
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')))
        }
        dispatch({
            type: REQUEST_FAIL,
            payload: { msg: error }
        })
    }

}