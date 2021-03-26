import axios from 'axios'

import { GET_PLACENAME, MAP_ERROR, CLEAR_PLACE } from './types'

export const getPlace = (latitude, longitude) => async (dispatch) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    }

    // console.log(body);
    if (latitude !== '' && longitude !== '') {
      const res = await axios.post(
        '/api/map/getPlace',
        {
          LatLong: {
            latitude,
            longitude,
          },
        },
        config
      )
      // console.log(res);
      dispatch({
        type: GET_PLACENAME,
        payload: res.data,
      })
    }
  } catch (error) {
    dispatch({
      type: MAP_ERROR,
      payload: { msg: error },
    })
  }
}

export const clearPlace = () => async (dispatch) => {
  try {
    dispatch({
      type: CLEAR_PLACE,
      payload: null,
    })
  } catch (error) {
    dispatch({
      type: MAP_ERROR,
      payload: { msg: error },
    })
  }
}
