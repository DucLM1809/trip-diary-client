export const loginAccount = (data) => {
  return {
    type: "LOGIN_BY_ACCOUNT",
    payload: data,
  };
};

export const loginGoogle = (data) => {
  return {
    type: "LOGIN_BY_GOOGLE",
    payload: data,
  };
};

export const logOut = () => {
  return {
    type: "LOGOUT",
  };
};
