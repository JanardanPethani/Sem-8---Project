import { MAP_ERROR, GET_PLACENAME, CLEAR_PLACE } from '../actions/types'

const initialState = {
  loading: true,
  place: '',
  error: '',
}

function map(state = initialState, action) {
  const { type, payload } = action

  switch (type) {
    case MAP_ERROR:
      // this will set new state
      return {
        ...state,
        loading: false,
        error: payload,
      }
    case CLEAR_PLACE:
      return {
        loading: true,
        place: '',
      }
    case GET_PLACENAME:
      return {
        loading: false,
        place: payload,
      }
    default:
      return state
  }
}

export default map
