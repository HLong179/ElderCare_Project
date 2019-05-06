import axios from "axios"
import { LOGOUT_USER, SET_CURRENT_USER } from "../constants"

export const registerUser = (userData, history) => dispatch => {}

export const loginUser = (userData, history) => dispatch => {
  if (userData.username === "admin") {
    const user = {
      name: "Admin",
      username: "admin",
      permission: "admin"
    }
    localStorage.setItem("userData", JSON.stringify(user))
    dispatch(setCurrentUser(user))
  } else {
    axios
      .post("http://localhost:6900/doctor/login", userData)
      .then(res => {
        const user = {
          doctorId: res.data[0].doctorId,
          name: res.data[0].name,
          email: res.data[0].email,
          phone: res.data[0].phone,
          specializeIn: res.data[0].specializeIn,
          username: res.data[0].username,
          permission: res.data[0].permission
        }
        localStorage.setItem("userData", JSON.stringify(user))
        dispatch(setCurrentUser(user))
      })
      .catch()
  }

  // if (userData.email === "admin") {
  //   history.push("/admin/register")
  //   let newData = {
  //     email: userData.email,
  //     password: userData.password,
  //     isAdmin: true
  //   }
  //   localStorage.setItem("userData", JSON.stringify(newData))
  //   dispatch(setCurrentUser(newData))
  // } else {
  //   history.push("/")
  //   let newData = {
  //     email: userData.email,
  //     password: userData.password,
  //     isAdmin: false
  //   }
  //   localStorage.setItem("userData", JSON.stringify(newData))
  //   dispatch(setCurrentUser(newData))
  // }
}

export const setCurrentUser = data => {
  return {
    type: SET_CURRENT_USER,
    payload: data
  }
}

export const logout = () => dispatch => {
  localStorage.removeItem("userData")
  return {
    type: LOGOUT_USER
  }
}
