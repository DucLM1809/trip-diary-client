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

export const getUserInfo = (data) => {
  return {
    type: "USER_GET_USER_INFO",
    payload: data,
  };
};

export const registerNew = () => {
  return {
    type: "REGISTER",
  };
};

export const forgetPassword = () => {
  return {
    type: "FORGET_PASSWORD",
  };
};

export const resetPassword = () => {
  return {
    type: "RESET_PASSWORD",
  };
};

export const loadingPage = (data) => {
  return {
    type: "LOADING",
    payload: data
  };
};
