import {
  PROFILE_ERROR,
  GET_PROFILE,
  CLEAR_PROFILE,
  UPDATE_PROFILE,
  GET_REQUEST,
  REQUEST_FAIL,
  GET_OFFER,
  OFFER_FAIL,
  MATCH_REQ,
  MATCH_FAILED,
  MSG_FAILED,
  SEND_MSG,
} from '../actions/types'

const initialState = {
  profile: null,
  loading: true,
  currRequestData: {},
  currRequestMatches: [],
  currOfferData: {},
  currReqMsgs: [],
  currReqSend: [],
  error: {},
}

function profileReducer(state = initialState, action) {
  const { type, payload } = action

  switch (type) {
    case GET_PROFILE:
    case UPDATE_PROFILE:
      return {
        ...state,
        profile: payload,
        loading: false,
      }
    case CLEAR_PROFILE:
      return {
        ...state,
        profile: null,
        loading: false,
      }
    case PROFILE_ERROR:
    case REQUEST_FAIL:
    case OFFER_FAIL:
    case MATCH_FAILED:
    case MSG_FAILED:
      return {
        ...state,
        error: payload,
        loading: false,
      }
    case GET_REQUEST:
      return {
        ...state,
        currRequestData: payload,
        loading: false,
      }
    case GET_OFFER:
      return {
        ...state,
        currOfferData: payload,
        loading: false,
      }
    case MATCH_REQ:
      return {
        ...state,
        currRequestMatches: payload,
        loading: false,
      }
    case SEND_MSG:
      return {
        ...state,
        currReqSend: state.currReqSend.unshift(payload),
        loading: false,
      }
    default:
      return { ...state }
  }
}

export default profileReducer
