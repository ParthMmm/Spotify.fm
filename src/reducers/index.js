import { combineReducers } from "redux";

const formReducer = (data = null, action) => {
  if (action.type === "SUBMIT_FORM") {
    return action.payload;
  }
  return data;
};

export default combineReducers({
  data: formReducer,
});
