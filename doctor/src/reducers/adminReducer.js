import { REGISTER_DOCTOR, FETCH_DOCTORS } from "../constants"

const initialState = {
  isRegisterSuccess: false,
  listDoctors: []
}

const adminReducer = (state = initialState, action) => {
  switch (action.type) {
    case REGISTER_DOCTOR:
      return {
        ...state
      }
    case FETCH_DOCTORS:
      return {
        ...state,
        listDoctors: [...action.payload]
      }

    default:
      return state
  }
}

export default adminReducer
