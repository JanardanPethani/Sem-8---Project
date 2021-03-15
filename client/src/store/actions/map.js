import axios from 'axios'

import { GET_PLACENAME, MAP_ERROR } from './types'

export const getPlace = (latLong) => async dispatch => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const res = await axios.get('/api/map/getPlace', latLong, config)
        console.log(res);
        dispatch({
            type: GET_PLACENAME,
            payload: res
        })
        

    } catch (error) {

        dispatch({
            type: MAP_ERROR,
            payload: { msg: error }
        })
    }
}
