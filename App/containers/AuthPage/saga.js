import {Login} from '../../services/authServices';
import {call, fork, takeLatest, put} from 'redux-saga/effects';
import { NavigationActions } from 'react-navigation';
import NavigationServices from '../../services/navigationServices';

export function* submitLogin(action) {

    try {
        const response = yield call(Login, action.payload);
        yield put({type: 'SET_USER_INFOR', payload: response});
        console.log('set user successs');
        yield put(NavigationActions.navigate({ routeName: 'Home' })); 
        yield put(NavigationServices.navigate('Home'));
        console.log('navigated');
    }
   catch (e) {
       console.log(e);
   }
}

export function* addRelative(action) {
    
}

export default function* defaultSaga() {
    yield takeLatest('LOGIN', submitLogin);
}