import axios from 'axios'
import { setAlert } from './alert'
import { getCurrentProfile } from './profile'

import { ACCEPT_REQ, GET_OFFER, OFFER_FAIL, PROFILE_ERROR } from './types'

// Create or Update request
export const sendOffer = (newFormData, history) => async (dispatch) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    }
    // console.log(newFormData);
    await axios.post('/api/ride/offer', newFormData, config)
    dispatch(getCurrentProfile())

    dispatch(setAlert('Offer Accepted', 'success'))

    // can't use Redirect bcz Action is not react
    history.push('/dashboard')
  } catch (error) {
    console.log(error.response)
    const errors = error.response.data.errors
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'error')))
    }
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: error },
    })
  }
}

export const deleteOff = (id) => async (dispatch) => {
  if (window.confirm('Sure? this can not be undone..!')) {
    try {
      await axios.delete(`/api/ride/offer/${id}`)
      dispatch(getCurrentProfile())
      dispatch(setAlert('Offer Deleted', 'success'))
    } catch (error) {
      const errors = error.response.data.errors
      if (errors) {
        errors.forEach((error) => dispatch(setAlert(error.msg, 'warning')))
      }
      dispatch({
        type: PROFILE_ERROR,
        payload: { msg: error },
      })
    }
  }
}

export const getOffer = (id) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/ride/offer/${id}`)
    dispatch(getCurrentProfile())
    dispatch({
      type: GET_OFFER,
      payload: res.data,
    })
  } catch (error) {
    const errors = error.response.data.errors
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'error')))
    }
    dispatch({
      type: OFFER_FAIL,
      payload: { msg: error },
    })
  }
}

export const deleteReceMsg = (id) => async (dispatch) => {
  if (window.confirm('Sure? this can not be undone..!')) {
    try {
      await axios.delete(`/api/sendReqMsg/receMsg/${id}`)
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

export const acceptRide = (id) => async (dispatch) => {
  if (window.confirm('Sure...?')) {
    try {
      const ride = await axios.patch(`/api/sendReqMsg/acceptReq/${id}`)
      dispatch({
        type: ACCEPT_REQ,
        payload: ride.data,
      })
      dispatch(getCurrentProfile())
      dispatch(setAlert('Accepted', 'success'))
    } catch (error) {
      dispatch(setAlert('Already Accepted', 'warning'))
      dispatch({
        type: PROFILE_ERROR,
        payload: { msg: error },
      })
    }
  }
}

export const paymentReceived = (id) => async (dispatch) => {
  if (window.confirm('Check Again before confirm..')) {
    try {
      await axios.patch(`/api/sendReqMsg/paymentRec/${id}`)
      dispatch(getCurrentProfile())
      dispatch(setAlert('System Updated', 'success'))
    } catch (error) {
      dispatch({
        type: PROFILE_ERROR,
        payload: { msg: error },
      })
    }
  }
}
