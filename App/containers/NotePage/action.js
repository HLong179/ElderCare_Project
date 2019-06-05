export function removeNote(id) {
  return {
    type: "REMOVE_NOTE",
    payload: id
  }
}

export function updateNote(data) {
  return {
    type: "UPDATE_NOTE",
    payload: data
  }
}

export const getNotes = data => {
  return {
    type: "GET_NOTES",
    payload: data
  }
}
