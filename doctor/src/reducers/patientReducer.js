import {
  FETCH_PATIENT,
  FETCH_RELATIVES,
  FETCH_PRESCIPTION,
  CLEAR_PRESCIPTION
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
    case FETCH_PRESCIPTION:
      let listPrescription = action.payload.map((prescription, index) => {
        return {
          ...prescription,
          key: index
        }
      })
      return {
        ...state,
        listPrescription: [...listPrescription]
      }
    case CLEAR_PRESCIPTION:
      state.listPrescription = []
      return state

    default:
      return state
  }
}

export default patientReducer
