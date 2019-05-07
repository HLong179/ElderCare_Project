import { combineReducers } from "redux"
import errorReducer from "./errorReducer"
import authReducer from "./authReducer"
import adminReducer from "./adminReducer"
import patientReducer from "./patientReducer"

const rootReducer = combineReducers({
  errors: errorReducer,
  auth: authReducer,
  admin: adminReducer,
  patient: patientReducer
})

export default rootReducer
