import axios from "axios"
import {
  FETCH_PATIENT,
  FETCH_RELATIVES,
  FETCH_PRESCIPTION,
  CLEAR_PRESCIPTION
} from "../constants"

// export const addPatient = userData => dispatch => {
//   axios
//     .post("http://localhost:6900/doctor/addElder", userData)
//     .then(res => dispatch(fetchPatients({ doctorId: userData.doctorId })))
//     .catch()
// }

// export const fetchPatients = doctorId => async dispatch => {
//   await axios
//     .post("http://localhost:6900/doctor/listElders", doctorId)
//     .then(res => {
//       dispatch({
//         type: FETCH_PATIENTS,
//         payload: res.data
//       })
//     })
//     .catch()
// }

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

export const addPrescription = data => dispatch => {
  axios
    .post("http://localhost:6900/medicine/addPrescription", data)
    .then(res => {
      dispatch(fetchPrescription({ elderId: data.elderId }))
    })
    .catch()
}

export const fetchPrescription = elderId => async dispatch => {
  await axios
    .post("http://localhost:6900/medicine/getPescription", elderId)
    .then(res => {
      dispatch({
        type: FETCH_PRESCIPTION,
        payload: res.data
      })
    })
    .catch()
}

export const updatePrescription = (data, elderId) => dispatch => {
  axios
    .post("http://localhost:6900/medicine/updatePrescription", data)
    .then(res => {
      dispatch(fetchPrescription({ elderId: elderId }))
    })
    .catch()
}

export const clearPresciption = () => dispatch => {
  dispatch({
    type: CLEAR_PRESCIPTION
  })
}

export const fetchPatient = elderId => dispatch => {
  axios
    .post("http://localhost:6900/account/elderDetail", { elderId: elderId })
    .then(res => {
      dispatch({
        type: FETCH_PATIENT,
        payload: res.data
      })
    })
    .catch()
}
