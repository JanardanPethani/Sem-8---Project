import axios from 'axios'

import { GET_PLACENAME, MAP_ERROR } from './types'

export const getPlace = (latitude, longitude) => async dispatch => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const body = {
            LatLong: {
                latitude,
                longitude
            }
        }
        // console.log(body);
        if (latitude && longitude) {
            const res = await axios.post('/api/map/getPlace', body, config)
            // console.log(res);
            dispatch({
                type: GET_PLACENAME,
                payload: res.data
            })
        }
    } catch (error) {

        dispatch({
            type: MAP_ERROR,
            payload: { msg: error }
        })
    }
}
