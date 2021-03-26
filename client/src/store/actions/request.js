import axios from 'axios'
import { setAlert } from './alert'
import { getCurrentProfile } from './profile'

import {
  PROFILE_ERROR,
  GET_REQUEST,
  REQUEST_FAIL,
  MATCH_FAILED,
  MATCH_REQ,
  SEND_MSG,
  MSG_FAILED,
} from './types'

// Create or Update request
export const sendRequest = (formData, history) => async (dispatch) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    }

    await axios.post('/api/ride/request', formData, config)
    dispatch(getCurrentProfile())

    dispatch(setAlert('Request Created', 'success'))

    // can't use Redirect bcz Action is not react
    history.push('/dashboard')
  } catch (error) {
    if (error) {
      const errors = error.response.data.errors
      if (errors) {
        errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')))
      }
    }
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: error },
    })
  }
}

export const deleteReq = (id) => async (dispatch) => {
  if (window.confirm('Sure? this can not be undone..!')) {
    try {
      await axios.delete(`/api/ride/request/${id}`)
      dispatch(getCurrentProfile())
      dispatch(setAlert('Request Deleted', 'success'))
    } catch (error) {
      dispatch({
        type: PROFILE_ERROR,
        payload: { msg: error },
      })
    }
  }
}

// Get req by Id
export const getRequest = (id) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/ride/request/${id}`)
    dispatch(getCurrentProfile())
    // console.log(res);
    dispatch({
      type: GET_REQUEST,
      payload: res.data,
    })
  } catch (error) {
    dispatch({
      type: REQUEST_FAIL,
      payload: { msg: error },
    })
  }
}

//  Match offerd ride with current req
export const matchRides = (from) => async (dispatch) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    }

    const body = {
      from,
    }

    const res = await axios.post('/api/match/request', body, config)
    dispatch(getCurrentProfile())
    // console.log(res);
    dispatch({
      type: MATCH_REQ,
      payload: res.data,
    })
  } catch (error) {
    dispatch({
      type: MATCH_FAILED,
      payload: { msg: error },
    })
  }
}

// Send msg to driver
export const sendMsg = ({
  email,
  to,
  forWhich,
  from,
  destination,
  type,
}) => async (dispatch) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    }

    const body = {
      email,
      to,
      forWhich,
      from,
      destination,
      type,
    }

    const res = await axios.post('/api/sendReqMsg/send', body, config)
    // console.log(res);
    dispatch({
      type: SEND_MSG,
      payload: res.data,
    })
    dispatch(getCurrentProfile())
    dispatch(setAlert('Request Sent', 'success'))
  } catch (error) {
    if (error) {
      const errors = error.response.data.errors
      if (errors) {
        errors.forEach((error) => dispatch(setAlert(error.msg, 'warning')))
      }
    }
    dispatch({
      type: MSG_FAILED,
      payload: { msg: error },
    })
  }
}

export const deleteReqMsg = (id) => async (dispatch) => {
  if (window.confirm('Sure? this can not be undone..!')) {
    try {
      await axios.delete(`/api/sendReqMsg/msg/${id}`)
      dispatch(getCurrentProfile())
      dispatch(setAlert('Request Msg Deleted', 'success'))
    } catch (error) {
      dispatch({
        type: PROFILE_ERROR,
        payload: { msg: error },
      })
    }
  }
}
