import axios from "axios"
import {
  FETCH_PATIENT,
  FETCH_RELATIVES,
  REMOVE_SUBUSER,
} from "../constants"
import SETTING from "../setting"

export const addSubRelative = userData => dispatch => {
  axios
    .post(`http://${SETTING}:6900/account/addSubUser`, userData)
    .then(res => {
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
export const removeSubUser = relativeId => dispatch => {
  axios
    .post(`http://${SETTING}:6900/account/removeSubUser`, {
      relativeId: relativeId
    })
    .then(res => {
      dispatch({
        type: REMOVE_SUBUSER,
        payload: relativeId
      })
    })
    .catch()
}
