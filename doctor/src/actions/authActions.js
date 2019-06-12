import { LOGOUT_USER, SET_CURRENT_USER } from "../constants"
import SETTING from "../setting"

export const registerUser = (userData, history) => dispatch => {}

export const loginUser = (data, history) => async dispatch => {
  const response = await fetch(`http://${SETTING}:6900/account/login`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      username: data.username,
      password: data.password
    })
  })

  const result = await response.json()
  dispatch(setCurrentUser(result))
}

export const setCurrentUser = data => {
  return {
    type: SET_CURRENT_USER,
    payload: data
  }
}

export const logout = history => {
  localStorage.removeItem("userData")
  history.push("/login")
  return {
    type: LOGOUT_USER,
    payload: null
  }
}
