import client from "../../client";
import qs from "qs";
import { API } from "../../constants";
import { ActionTypes as types } from "./constants";

export const fetchRelationships = (search) => (dispatch) => {
  const queryString = search
    ? `?${qs.stringify(search)}&_expand=teacher&_expand=matter`
    : "?_expand=teacher&_expand=matter";

  client
    .get(`${API.RELATIONSHIPS}${queryString}`)
    .then((response) => {
      dispatch({
        type: types.FETCH_RELANTIONSHIPS,
        payload: response.data,
      });
    })
    .catch((e) => {
      console.log(e);
    });
};

export const fetchMatters = () => (dispatch) => {
  client
    .get(`${API.MATTERS}`)
    .then((response) => {
      dispatch({
        type: types.FETCH_MATTERS,
        payload: response.data,
      });
    })
    .catch((e) => {
      console.log(e);
    });
};

export const createRelationship = (data) => (dispatch) => {
  client
    .post(`${API.RELATIONSHIPS}`, data)
    .then((response) => {
      dispatch(fetchRelationships());
    })
    .catch((e) => {
      console.log(e);
    });
};

export const fetchTeachers = () => (dispatch) => {
  client
    .get(`${API.TEACHERS}`)
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
