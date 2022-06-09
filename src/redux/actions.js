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

export const registerNew = (data) => {
  return {
    type: "REGISTER",
    payload: data,
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
    payload: data,
  };
};

export const getPath = (data) => {
  return {
    type: "GET_PATH",
    payload: data,
  };
};

export const createTrip = (data) => {
  return {
    type: "CREATE_TRIP",
    payload: data
  }
}

export const createLocation = (data) => {
  return {
    type: "CREATE_LOCATION",
    payload: data
  }
}

export const updateLocation = (data) => {
  return {
    type: "UPDATE_LOCATION",
    payload: data
  }
}

export const updateLocations = (data) => {
  return {
    type: "UPDATE_LOCATIONS",
    payload: data
  }
}


export const createChecklist = (data) => {
  return {
    type: "CREATE_CHECKLIST",
    payload: data
  }
}