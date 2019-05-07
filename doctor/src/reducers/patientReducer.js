import { ADD_PATIENT, FETCH_PATIENTS, FETCH_RELATIVES } from "../constants"

const initialState = {
  listPatients: [],
  listRelatives: []
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
    default:
      return state
  }
}

export default patientReducer
