import axios from "axios"
import {
  FETCH_PATIENT,
  FETCH_RELATIVES,
  REMOVE_SUBUSER,
  FETCH_NOTES
} from "../constants"
import SETTING from "../setting"

export const addSubRelative = userData => dispatch => {
  axios
    .post(`${SETTING}/account/addSubUser`, userData)
    .then(res => {
      dispatch(fetchRelatives({ elderId: userData.elder_id }))
    })
    .catch()
}

export const fetchRelatives = elderId => async dispatch => {
  await axios
    .post(`${SETTING}/account/listRelatives`, elderId)
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
    .post(`${SETTING}/account/elderDetail`, { elderId: elderId })
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
    .post(`${SETTING}/account/removeSubUser`, {
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
export const updateRelative = data => dispatch => {
  axios
    .post(`${SETTING}/account/updateSubUser`, data)
    .then(res => {
      console.log(res)
      dispatch(fetchRelatives({ elderId: data.elderId }))
    })
    .catch()
}

export const fetchNotes = elderId => async dispatch => {
  await axios
    .post(`${SETTING}/account/getNotes`, elderId)
    .then(res => {
      dispatch({
        type: FETCH_NOTES,
        payload: res.data
      })
    })
    .catch()
}

export const addNote = userData => dispatch => {
  axios
    .post(`${SETTING}/account/addNote`, userData)
    .then(res => {
      dispatch(fetchNotes({ elderId: userData.elderId }))
    })
    .catch()
}

export const updateNote = data => dispatch => {
  axios
    .post(`${SETTING}/account/updateNote`, data)
    .then(res => {
      dispatch(fetchNotes({ elderId: data.elderId }))
    })
    .catch()
}

export const removeNote = data => dispatch => {
  axios
    .post(`${SETTING}/account/removeNote`, {
      noteId: data.noteId
    })
    .then(res => {
      dispatch(fetchNotes({ elderId: data.elderId }))
    })
    .catch()
}
