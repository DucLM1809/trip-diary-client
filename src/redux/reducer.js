const initState = {
  user: {
    email: "",
    username: "",
    password: "",
    status: null,
    auth: localStorage.getItem("accessToken") ? true : false,
    sasToken: null,
  },
  page: {
    path: [],
    loading: null,
  },
  trip: {
    name: "",
    type: "",
    fromLat: "",
    fromLng: "",
    toLat: "",
    toLng: "",
    startAt: "",
    finishAt: "",
    backtripAt: "",
    tripID: "",
    coverImgUrl: "",
  },
  locations: [],
  checklist: {
    name: "",
    notes: "",
  },
  searchRes: [],
  comments: [],
  profile: {

  }
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
          status: "Register Successfully! Check your email to verify account",
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
          status: "Reset Password Successfully!",
        },
        page: {
          ...state.page,
          loading: action.payload,
        },
      };
    }
    case "VERIFY_ACCOUNT": {
      return {
        ...state,
        user: {
          ...state.user,
          status: action.payload,
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
    case "CREATE_TRIP": {
      return {
        ...state,
        trip: {
          ...state.trip,
          name: action.payload.name,
          fromLat: action.payload.fromLat,
          fromLng: action.payload.fromLng,
          toLat: action.payload.toLat,
          toLng: action.payload.toLng,
          startAt: action.payload.startAt,
          finishAt: action.payload?.backTripAt,
          tripID: action.payload.id,
          coverImgUrl: action.payload.coverImgUrl,
          description: action.payload.description,
        },
        locations: [],
      };
    }
    case "CREATE_LOCATION": {
      return {
        ...state,
        locations: [
          ...state.locations,
          {
            review: action.payload.review,
            lat: action.payload.lat,
            lng: action.payload.lng,
            startAt: action.payload.startAt,
            locationID: action.payload.id,
          },
        ],
      };
    }
    case "UPDATE_LOCATION": {
      return {
        ...state,
        locations: [
          {
            review: action.payload.review,
            lat: action.payload.lat,
            lng: action.payload.lng,
            startAt: action.payload.startAt,
            locationID: action.payload.id,
          },
        ],
      };
    }
    case "UPDATE_LOCATIONS": {
      return {
        ...state,
        locations: action.payload,
      };
    }

    case "ADD_SAS_TOKEN": {
      return {
        ...state,
        user: {
          ...state.user,
          sasToken: action.payload,
        },
      };
    }
    case "GET_SEARCH_RESPONSE": {
      return {
        ...state,
        searchRes: action.payload,
      };
    }
    case "CREATE_COMMENT": {
      return {
        ...state,
        comments: [
          ...state.comments,
          {
            id: action.payload.id,
            content: action.payload.content,
          },
        ],
      };
    }
    case "GET_COMMENTS": {
      return {
        ...state,
        comments: action.payload,
      };
    }
    case "GET_MY_PROFILE": {
      return {
        ...state,
        profile: action.payload,
      };
    }
    default:
      return state;
  }
};

export default rootReducer;
