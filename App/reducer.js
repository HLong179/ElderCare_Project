import {createStore, combineReducers, applyMiddleware} from "redux";
import createSagaMiddleware from 'redux-saga';

import noteReducer from "./containers/NotePage/reducer"
import authReducer from './containers/AuthPage/reducer';
import rootSaga from './containers/AuthPage/saga'

const initialState = {
    data: null
};

const rootReducer = combineReducers({
    ini: initialState,
    auth: authReducer,
    notes: noteReducer
});



export default rootReducer;