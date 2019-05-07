
import { fromJS } from 'immutable';
const initialState = fromJS({
    user: null,
    auth: false
})
export default function authReducer(state = initialState, action) {
    switch (action.type) {
        case 'SET_USER_INFOR':
        console.log(action.payload)
            return state.set('user', action.payload.curUser)
        default:
            return state;
    }
}