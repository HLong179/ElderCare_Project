import {
  FETCH_PATIENT,
  FETCH_RELATIVES
} from "../constants"

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
    default:
      return state
  }
}

export default patientReducer
