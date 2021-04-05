import axios from 'axios'

import { GET_PROFILE, PROFILE_ERROR, GET_ACTIVE_D, GET_ACTIVE_P } from './types'

import { setAlert } from './alert'

// Get current users profile
export const getCurrentProfile = () => async (dispatch) => {
  try {
    // const req = await axios.get('/api/ride/allRequests')
    const off = await axios.get('/api/ride/allOffers')
    const sendReq = await axios.get('/api/sendReqMsg/allReqMsgs')
    const offerReq = await axios.get('/api/sendReqMsg/allReqMsgsToMe')
    const activeRideD = await axios.get('/api/sendReqMsg/getActiveForDriver')
    const activeRideP = await axios.get('/api/sendReqMsg/getActiveForPassenger')
    const history = await axios.get('/api/user/history')
    // console.log(history)
    // console.log(off)
    dispatch({
      type: GET_PROFILE,
      payload: {
        // req: req.data,
        off: off.data,
        send: sendReq.data,
        received: offerReq.data,
        history: history.data,
      },
    })
    dispatch({
      type: GET_ACTIVE_D,
      payload: activeRideD.data,
    })
    dispatch({
      type: GET_ACTIVE_P,
      payload: activeRideP.data,
    })
  } catch (error) {
    // console.log(error);
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: error },
    })
  }
}

export const editProfile = (formData, history) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  }

  try {
    console.log(formData)

    // console.log(photo)
    await axios.patch('/api/user/me', formData, config)
    dispatch(getCurrentProfile())

    dispatch(
      setAlert(
        'Profile Updated. (Refresh to see changes in Dashboard)',
        'success'
      )
    )

    // can't use Redirect bcz Action is not react
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

export const getLocName = (geoData) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  }
  await axios.patch('/api/user/me', geoData, config)
}
