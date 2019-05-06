import axios from "axios"
import { REGISTER_DOCTOR } from "../constants"

export const registerDoctor = (userData, history) => dispatch => {
  axios
    .post("http://localhost:6900/doctor/addDoctor", userData)
    .then(res =>
      dispatch({
        type: REGISTER_DOCTOR
      })
    )
    .catch()
}
