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

export const getUserInfo = (payload) => {
  return {
    type: "USER_GET_USER_INFO",
    payload: payload,
  };
};

export const registerNew = () => {
  return {
    type: "REGISTER",
  };
};
