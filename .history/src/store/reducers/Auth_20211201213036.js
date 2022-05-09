import * as actionTypes from "../actions/ActionTypes";




const initialState = {
  access: localStorage.getItem("access"),
  refresh: localStorage.getItem("refresh"),
  isAuthenticated: false,
  accountCreated: null,
  user: [],
  loading: false,
};

const auth = (state = initialState, action) => {
  const { type, payload} = action;
  
  switch (type) {
    case actionTypes.AUTHENTICATED_SUCCESS:
    return {
      ...state,
      isAuthenticated: true,
    };
    case actionTypes.LOGIN_SUCCESS:
    localStorage.setItem("access", payload.access);
    localStorage.setItem("refresh", payload.refresh);
    return {
      ...state,
      isAuthenticated: true,
      error: false,
      access: payload.access,
      refresh: payload.refresh,
    };
    case actionTypes.SIGNUP_SUCCESS:
    return {
      ...state,
      error: false,
    };
    case actionTypes.USER_LOADED_SUCCESS:
    return {
      ...state,
      user: payload,
    };
    case actionTypes.PASSWORD_RESET_SUCCESS:
    return {
      ...state,
    };
    case actionTypes.AUTHENTICATED_FAIL:
    return {
        ...state,
        isAuthenticated: false,
        loading: false
      };
    case actionTypes.USER_LOADED_FAIL:
      return {
        ...state,
        user: null,
      };
   case actionTypes.CREATE_PERSONAL_PROFILE_SUCCESS:
    case actionTypes.UPDATE_PERSONAL_PROFILE_SUCCESS:
    case actionTypes.FETCH_PERSONAL_PROFILE_SUCCESS:
      return {
        ...state,
        profile_user: payload
      };
    case actionTypes.GET_SINGLE_PERSONAL_PROFILE_SUCCESS:
      return {
        ...state,
        singleProfile: payload.res.data,
      };
    case actionTypes.LOGOUT:
      localStorage.removeItem("access");
      localStorage.removeItem("refresh");
      return {
        ...state,
        access: null,
        refresh: null,
        isAuthenticated: false,
        user: null,
      };
      case actionTypes.LOGIN_FAIL:
      case actionTypes.SIGNUP_FAIL:
    case actionTypes.PASSWORD_RESET_FAIL:
        case actionTypes.UPDATE_PERSONAL_PROFILE_FAIL:
    case actionTypes.CREATE_PERSONAL_PROFILE_FAIL:

    return {
      ...state,
    };
    default:
      return state;
  }
};

export default auth;
