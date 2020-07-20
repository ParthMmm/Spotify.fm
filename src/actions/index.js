export const submitForm = (data) => {
  return {
    type: "SUBMIT_FORM",
    payload: data,
  };
};

export const userID = (text) => {
  return {
    type: "GET_USERID",
    payload: text,
  };
};
