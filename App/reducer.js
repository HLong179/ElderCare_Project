import {createStore, combineReducers, applyMiddleware} from "redux";
import createSagaMiddleware from 'redux-saga';

import authReducer from './containers/AuthPage/reducer';
import rootSaga from './containers/AuthPage/saga'

const initialState = {
    data: null
};

const rootReducer = combineReducers({
    ini: initialState,
    auth: authReducer
});



export default rootReducer;