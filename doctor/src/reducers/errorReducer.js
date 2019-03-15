import { GET_ERRORS } from "../constants"

const initialState = {}

const errorReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ERRORS:
    default:
      return state
  }
}

export default errorReducer