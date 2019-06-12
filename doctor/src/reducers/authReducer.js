import { SET_CURRENT_USER, LOGOUT_USER, LOGIN_USER } from "../constants"

const initialState = {
  isAuthenticated: false,
  user: null,
  errors: null
}

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_USER:
      if (!action.payload.auth) {
        let error = action.payload
        return {
          ...state,
          errors: error
        }
      } else if (action.payload.auth) {
        let user = action.payload.curUser[0]
        user.lastLogin = new Date().getTime()
        localStorage.setItem("userData", JSON.stringify(user))
        return {
          ...state,
          isAuthenticated: true,
          user: user
        }
      } else {
        let error = action.payload
        return {
          ...state,
          errors: error
        }
      }
    case SET_CURRENT_USER:
      return {
        ...state,
        isAuthenticated: Object.keys(action.payload).length !== 0,
        user: action.payload
      }

    case LOGOUT_USER: {
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        errors: null
      }
    }
    default:
      return state
  }
}

export default authReducer
