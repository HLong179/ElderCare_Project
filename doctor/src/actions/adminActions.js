import axios from "axios"
import { REGISTER_DOCTOR, FETCH_DOCTORS } from "../constants"

export const registerDoctor = userData => dispatch => {
  axios
    .post("http://localhost:6900/doctor/addDoctor", userData)
    .then(res =>
      dispatch({
        type: REGISTER_DOCTOR
      })
    )
    .catch()
}
export const fetchDoctors = () => dispatch => {
  axios
    .get("http://localhost:6900/doctor/listDoctors")
    .then(res =>
      dispatch({
        type: FETCH_DOCTORS,
        payload: res.data
      })
    )
    .catch()
}
