import axios from "axios"
import {
  FETCH_PATIENT,
  FETCH_RELATIVES
} from "../constants"
import SETTING from "../setting"

export const addRelative = userData => dispatch => {
  axios
    .post(`http://${SETTING}:6900/account/addMainUser`, userData)
    .then(res => {
      // dispatch({
      //   type: ADD_RELATIVE,
      //   payload: res.data
      // })
      dispatch(fetchRelatives({ elderId: userData.elder_id }))
    })
    .catch()
}

export const fetchRelatives = elderId => async dispatch => {
  await axios
    .post(`http://${SETTING}:6900/account/listRelatives`, elderId)
    .then(res => {
      dispatch({
        type: FETCH_RELATIVES,
        payload: res.data
      })
    })
    .catch()
}

export const fetchPatient = elderId => dispatch => {
  axios
    .post(`http://${SETTING}:6900/account/elderDetail`, { elderId: elderId })
    .then(res => {
      dispatch({
        type: FETCH_PATIENT,
        payload: res.data
      })
    })
    .catch()
}
