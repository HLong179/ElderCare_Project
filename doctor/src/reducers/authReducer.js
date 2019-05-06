import { SET_CURRENT_USER, LOGOUT_USER } from "../constants"

const initialState = {
  isAuthenticated: false,
  user: null
}

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        ...state,
        isAuthenticated: Object.keys(action.payload).length !== 0,
        user: action.payload
      }
    case LOGOUT_USER: {
      console.log('ok');
      return {
        ...state,
        isAuthenticated: false,
        user: null
      }
    }
    default:
      return state
  }
}

export default authReducer
