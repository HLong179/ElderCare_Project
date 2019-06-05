import AsyncStorage from "@react-native-community/async-storage"

export function addNote(data) {
  return {
    type: "ADD_NOTES",
    payload: data
  }
}

export const getNotes = data => {
  return {
    type: "GET_NOTES",
    payload: data
  }
}
