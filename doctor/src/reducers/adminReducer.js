import { REGISTER_DOCTOR } from "../constants"

const initialState = {
  isRegisterSuccess: false
}

const adminReducer = (state = initialState, action) => {
  switch (action.type) {
    case REGISTER_DOCTOR:
      state.isRegisterSuccess = false
      return {
        ...state
      }
    default:
      return state
  }
}

export default adminReducer
