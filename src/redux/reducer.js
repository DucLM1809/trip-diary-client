const initState = {
  user: {
    email: "",
    username: "",
    password: "",
    status: null,
    auth: localStorage.getItem("accessToken") ? true : false,
  },
  page: {
    path: [],
    loading: null,
  },
};

const rootReducer = (state = initState, action) => {
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
        page: {
          ...state.page,
          loading: action.payload,
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
        page: {
          ...state.page,
          loading: action.payload,
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
          status: null,
          auth: false,
        },
        page: {
          ...state.page,
          loading: action.payload,
        },
      };
    }
    case "USER_GET_USER_INFO": {
      return {
        ...state,
        user: {
          ...state.user,
          email: action.payload.email,
          username: action.payload.username,
        },
      };
    }
    case "REGISTER": {
      return {
        ...state,
        user: {
          ...state.user,
          status: "Register Successfull!",
        },
        page: {
          ...state.page,
          loading: action.payload,
        },
      };
    }
    case "FORGET_PASSWORD": {
      return {
        ...state,
        page: {
          ...state.page,
          loading: action.payload,
        },
      };
    }
    case "RESET_PASSWORD": {
      return {
        ...state,
        user: {
          ...state.user,
          status: "Reset Password Successfull!",
        },
        page: {
          ...state.page,
          loading: action.payload,
        },
      };
    }
    case "LOADING": {
      return {
        ...state,
        page: {
          ...state.page,
          loading: action.payload,
        },
      };
    }
    case "GET_PATH": {
      return {
        ...state,
        page: {
          ...state.page,
          path: action.payload,
        },
      };
    }
    default:
      return state;
  }
};

export default rootReducer;
