import { ActionTypes as types } from "./constants";

export const initialState = {
  students: [],
  classes: [],
  degrees: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case types.FETCH_STUDENTS:
      return {
        ...state,
        students: action.payload,
      };

    case types.FETCH_CLASSES:
      return {
        ...state,
        classes: action.payload,
      };

    case types.FETCH_DEGREES:
      return {
        ...state,
        degrees: action.payload,
      };

    default:
      return state;
  }
};
