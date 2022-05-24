const initState = {
  user: {
    username: "",
    password: "",
    auth: localStorage.getItem("accessToken") ? true : false,
  },
};

const rootReducer = (state = initState, action) => {
  console.log({ state, action });
  console.log(localStorage);
  switch (action.type) {
    case "LOGIN_BY_ACCOUNT": {
      return {
        ...state,
        user: {
          ...state.user,
          username: action.payload.account,
          password: action.payload.password,
          auth: true,
        },
      };
    }
    case "LOGIN_BY_GOOGLE": {
      return {
        ...state,
        user: {
          ...state.user,
          auth: true,
        },
      };
    }
    case "LOGOUT": {
      return {
        ...state,
        user: {
          ...state.user,
          username: "",
          password: "",
          auth: false,
        },
      };
    }
    default:
      return state;
  }
};

export default rootReducer;
