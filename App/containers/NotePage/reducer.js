const initialState = {
  notes: []
}
export default function authReducer(state = initialState, action) {
  switch (action.type) {
    case "REMOVE_NOTE":
      let notes = state.notes.filter(note => {
        return note.id !== action.payload
      })
      return {
        ...state,
        notes
      }
    case "GET_NOTES":
      return {
        ...state,
        notes: [...action.payload]
      }
    default:
      return state
  }
}
