import { combineReducers } from "redux";

const formReducer = (data = null, action) => {
  if (action.type === "SUBMIT_FORM") {
    return action.payload;
  }
  return data;
};

const userReducer = (text = "empty", action) => {
  if (action.type === "GET_USERID") {
    return action.payload;
  }
  return text;
};

export default combineReducers({
  data: formReducer,
  text: userReducer,
});
