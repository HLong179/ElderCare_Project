const initialState = {
  notes: []
}
export default function authReducer(state = initialState, action) {
  switch (action.type) {
    case "ADD_NOTE":
      return {
        ...state,
        notes: [...notes, action.payload]
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
