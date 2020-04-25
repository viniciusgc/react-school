import client from "../../client";
import qs from "qs";
import { API } from "../../constants";
import { ActionTypes as types } from "./constants";

export const fetchTeachers = () => (dispatch) => {
  client
    .get(`${API.RELATIONSHIPS}?_expand=teacher&_expand=matter`)
    .then((response) => {
      dispatch({
        type: types.FETCH_TEACHERS,
        payload: response.data,
      });
    })
    .catch((e) => {
      console.log(e);
    });
};
