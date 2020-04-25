import { combineReducers } from "redux";
import students from "./views/students/reducers";
import teachers from "./views/teachers/reducers";

export default combineReducers({
  students,
  teachers,
});
