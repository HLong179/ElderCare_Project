import {
  FETCH_PATIENTS,
  FETCH_RELATIVES,
  FETCH_PRESCIPTION,
  CLEAR_PRESCIPTION
} from "../constants"

const initialState = {
  listPatients: [],
  listRelatives: [],
  listPrescription: []
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
