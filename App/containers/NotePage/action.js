export function removeNote(id) {
  return {
    type: "REMOVE_NOTE",
    payload: id
  }
}

export const getNotes = data => {
  return {
    type: "GET_NOTES",
    payload: data
  }
}
