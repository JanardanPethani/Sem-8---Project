import { MAP_ERROR, GET_PLACENAME } from '../actions/types';

const initialState = {
    place: '',
    error: ''
};

function map(state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case MAP_ERROR:
            // this will set new state
            return {
                ...state,
                error: payload
            };
        case GET_PLACENAME:
            return {
                place: payload
            }
        default:
            return state;
    }
}

export default map;