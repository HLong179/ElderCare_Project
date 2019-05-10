import { createStore, applyMiddleware } from "redux"
import thunk from "redux-thunk"
import rootReducer from "./reducers"

const middlewareList = [thunk]

const store = createStore(rootReducer, applyMiddleware(...middlewareList))

export default store
