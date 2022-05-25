const initState = {
  user: {
    email: '',
    username: '',
    password: '',
    status: null,
    auth: localStorage.getItem('accessToken') ? true : false,
  },
};

const rootReducer = (state = initState, action) => {
  console.log({ state, action });
  console.log(localStorage);
  switch (action.type) {
    case 'LOGIN_BY_ACCOUNT': {
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
    case 'LOGIN_BY_GOOGLE': {
      return {
        ...state,
        user: {
          ...state.user,
          auth: true,
        },
      };
    }
    case 'LOGOUT': {
      return {
        ...state,
        user: {
          ...state.user,
          username: '',
          password: '',
          auth: false,
        },
      };
    }
    case 'USER_GET_USER_INFO': {
      return {
        ...state,
        user: {
          ...state.user,
          email: action.payload.email,
          username: action.payload.username,
        },
      };
    }
    case 'REGISTER': {
      return {
        ...state,
        user: {
          ...state.user,
          status: "Register Successfull!",
        },
      };
    }
    case 'RESET_PASSWORD': {
      return {
        ...state,
        user: {
          ...state.user,
          status: "Reset Password Successfull!",
        },
      };
    }
    default:
      return state;
  }
};

export default rootReducer;
