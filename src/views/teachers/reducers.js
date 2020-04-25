import { ActionTypes as types } from "./constants";

export const initialState = {
  teachers: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case types.FETCH_TEACHERS:
      return {
        ...state,
        teachers: action.payload,
      };

    default:
      return state;
  }
};
