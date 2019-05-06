import axios from "axios"
import { GET_ERRORS, SET_CURRENT_USER } from "../constants"

export const registerUser = (userData, history) => dispatch => {}


export const loginUser = (userData, history) => dispatch => {
  // axios.post('http://localhost:6900/account/addDoctor')
  if (userData.email === "admin") {
    history.push("/admin/register")
    let newData = {
      email: userData.email,
      password: userData.password,
      isAdmin: true
    }
    localStorage.setItem("userData", JSON.stringify(newData))
    dispatch(setCurrentUser(newData))
  } else {
    history.push("/")
    let newData = {
      email: userData.email,
      password: userData.password,
      isAdmin: false
    }
    localStorage.setItem("userData", JSON.stringify(newData))
    dispatch(setCurrentUser(newData))
  }
}

export const setCurrentUser = data => {
  return {
    type: SET_CURRENT_USER,
    payload: data
  }
}
