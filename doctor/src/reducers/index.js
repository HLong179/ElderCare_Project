import { combineReducers } from "redux"
import errorReducer from "./errorReducer"
import authReducer from "./authReducer"
import patientReducer from "./patientReducer"

const rootReducer = combineReducers({
  errors: errorReducer,
  auth: authReducer,
  patient: patientReducer
})

export default rootReducer
