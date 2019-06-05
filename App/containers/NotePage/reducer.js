const initialState = {
  notes: []
}
export default function noteReducer(state = initialState, action) {
  switch (action.type) {
    case "REMOVE_NOTE":
      let notes = state.notes.filter(note => {
        return note.id !== action.payload
      })
      return {
        ...state,
        notes
      }
    case "UPDATE_NOTE":
      let newNote = state.notes.map(obj => {
        if (obj.id === action.payload.id)
          return {
            ...obj,
            time: action.payload.time,
            title: action.payload.title,
            script: action.payload.script
          }
        return obj
      })
      return {
        ...state,
        notes: [...newNote]
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
