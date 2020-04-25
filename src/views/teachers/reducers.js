import { ActionTypes as types } from "./constants";

export const initialState = {
  teachers: [],
  teachersSimple: [],
  matters: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case types.FETCH_RELANTIONSHIPS:
      return {
        ...state,
        teachers: action.payload,
      };

    case types.FETCH_MATTERS:
      return {
        ...state,
        matters: action.payload,
      };

    case types.FETCH_TEACHERS:
      return {
        ...state,
        teachersSimple: action.payload,
      };

    default:
      return state;
  }
};
