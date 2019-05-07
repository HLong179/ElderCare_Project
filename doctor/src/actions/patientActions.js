import axios from "axios"
import { FETCH_PATIENTS, FETCH_RELATIVES } from "../constants"

export const addPatient = userData => dispatch => {
  axios
    .post("http://localhost:6900/doctor/addElder", userData)
    .then(res => dispatch(fetchPatients({ doctorId: userData.doctorId })))
    .catch()
}

export const fetchPatients = doctorId => async dispatch => {
  await axios
    .post("http://localhost:6900/doctor/listElders", doctorId)
    .then(res => {
      dispatch({
        type: FETCH_PATIENTS,
        payload: res.data
      })
    })
    .catch()
}

export const addRelative = userData => dispatch => {
  axios
    .post("http://localhost:6900/account/addMainUser", userData)
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
    .post("http://localhost:6900/doctor/listRelatives", elderId)
    .then(res => {
      dispatch({
        type: FETCH_RELATIVES,
        payload: res.data
      })
    })
    .catch()
}
