import { LOGIN_USER, SET_CURRENT_USER } from "../constants"

const initialState = {
  isAuthenticated: false,
  isAdmin: false,
  user: null
}

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload,
        isAdmin: action.payload.isAdmin
      }
    default:
      return state
  }
}

export default authReducer
