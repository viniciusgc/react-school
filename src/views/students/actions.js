import client from "../../client";
import qs from "qs";
import { API } from "../../constants";
import { ActionTypes as types } from "./constants";

export const fetchStudents = (search) => (dispatch) => {
  const queryString = search
    ? `?${qs.stringify(search)}&_expand=degree&_expand=class`
    : "?_expand=degree&_expand=class";

  client
    .get(`${API.STUDENTS}${queryString}`)
    .then((response) => {
      dispatch({
        type: types.FETCH_STUDENTS,
        payload: response.data,
      });
    })
    .catch((e) => {
      console.log(e);
    });
};

export const fetchClasses = () => (dispatch) => {
  client
    .get(`${API.CLASSES}`)
    .then((response) => {
      dispatch({
        type: types.FETCH_CLASSES,
        payload: response.data,
      });
    })
    .catch((e) => {
      console.log(e);
    });
};

export const fetchDegrees = () => (dispatch) => {
  client
    .get(`${API.DEGREES}`)
    .then((response) => {
      dispatch({
        type: types.FETCH_DEGREES,
        payload: response.data,
      });
    })
    .catch((e) => {
      console.log(e);
    });
};

export const createStudents = (data) => (dispatch) => {
  client
    .post(`${API.STUDENTS}`, data)
    .then((response) => {
      dispatch(fetchStudents());
    })
    .catch((e) => {
      console.log(e);
    });
};

export const updateStudents = (id, data) => (dispatch) => {
  client
    .patch(`${API.STUDENTS}${id}`, data)
    .then((response) => {
      dispatch(fetchStudents());
    })
    .catch((e) => {
      console.log(e);
    });
};
