import { FETCH_PATIENT, FETCH_RELATIVES, REMOVE_SUBUSER } from "../constants"

const initialState = {
  elder: null,
  listRelatives: [],
  listPrescription: []
}

const patientReducer = (state = initialState, action) => {
  switch (action.type) {
    // case ADD_PATIENT:
    //   return {
    //     ...state,

    //   }
    case FETCH_PATIENT:
      return {
        ...state,
        elder: action.payload
      }
    case FETCH_RELATIVES:
      let listRelatives = action.payload.map((relative, index) => {
        return {
          ...relative,
          key: index
        }
      })
      return {
        ...state,
        listRelatives: [...listRelatives]
      }
    case REMOVE_SUBUSER:
      let list = state.listRelatives.filter(
        relative => relative.relativeId !== action.payload
      )
      return {
        ...state,
        listRelatives: [...list]
      }
    default:
      return state
  }
}

export default patientReducer
