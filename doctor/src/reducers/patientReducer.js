import {
  FETCH_PATIENTS,
  FETCH_RELATIVES,
  FETCH_PRESCIPTION
} from "../constants"

const initialState = {
  listPatients: [],
  listRelatives: [],
  prescription: {}
}

const patientReducer = (state = initialState, action) => {
  switch (action.type) {
    // case ADD_PATIENT:
    //   return {
    //     ...state,

    //   }
    case FETCH_PATIENTS:
      let listPatients = action.payload.map((patient, index) => {
        return {
          ...patient,
          key: index
        }
      })
      return {
        ...state,
        listPatients: [...listPatients]
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
      return {
        ...state,
        prescription: { ...action.payload }
      }

    default:
      return state
  }
}

export default patientReducer
