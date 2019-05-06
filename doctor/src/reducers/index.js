import { combineReducers } from "redux"
import errorReducer from "./errorReducer"
import authReducer from "./authReducer"
import adminReducer from "./adminReducer"

const rootReducer = combineReducers({
  errors: errorReducer,
  auth: authReducer,
  admin: adminReducer
})

export default rootReducer
