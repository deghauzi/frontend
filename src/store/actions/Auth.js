import axiosInstance from "util/api";
import { tokenConfig } from "util/TokenConfig";
import { setLoading, offLoading } from "./Common";
import { stopSubmit, reset } from "redux-form";

import {
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  USER_LOADED_SUCCESS,
  USER_LOADED_FAIL,
  AUTHENTICATED_SUCCESS,
  AUTHENTICATED_FAIL,
  PASSWORD_RESET_SUCCESS,
  PASSWORD_RESET_FAIL,
  PASSWORD_CHANGE_SUCCESS,
  PASSWORD_CHANGE_FAIL,
  SIGNUP_SUCCESS,
  SIGNUP_FAIL,
  ACTIVATION_SUCCESS,
  ACTIVATION_FAIL,
  LOGOUT,
  SHOW_SUCCESS_MESSAGE,
  SHOW_ERROR_MESSAGE,
  FETCH_PERSONAL_PROFILE_SUCCESS,
  FETCH_PERSONAL_PROFILE_FAIL,
  PASSWORD_RESET_CONFIRM_SUCCESS,
  PASSWORD_RESET_CONFIRM_FAIL
} from "./ActionTypes";



export const checkAuthenticated = () => async dispatch => {
  if (localStorage.getItem("access")) {
    const body = { token: localStorage.getItem("access") };

    try {
      const res = await axiosInstance.post("auth/jwt/verify/", body);

      if (res.data.code !== "token_not_valid") {
        dispatch({
          type: AUTHENTICATED_SUCCESS
        });
      } else {
        dispatch({
          type: AUTHENTICATED_FAIL
        });
      }
    } catch (err) {
      dispatch({
        type: AUTHENTICATED_FAIL
      });
    }
  } else {
    dispatch({
      type: AUTHENTICATED_FAIL
    });
  }
};

// login
export const login = ({ email, password }) => async dispatch => {
  dispatch(setLoading());
  const body = { email, password };
  try {
    const res = await axiosInstance.post("auth/jwt/create/", body);
    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data
    });
    localStorage.setItem("access", res.data.access);
    localStorage.setItem("refresh", res.data.refresh);
    dispatch(offLoading());
    dispatch({
      type: SHOW_SUCCESS_MESSAGE,
      payload: "You've successfully logged in"
    });
    dispatch(stopSubmit("LoginForm"));
    dispatch(reset("LoginForm"))
  } catch (err) {
    dispatch(setLoading());
    dispatch({ type: LOGIN_FAIL });
    if (err.response.data) {
      err.response.data.email &&
        err.response.data.email.map(err => {
          return dispatch({
            type: SHOW_ERROR_MESSAGE,
            payload: `Email: ${err}`
          });
        });
      err.response.data.password &&
        err.response.data.password.map(err => {
          return dispatch({ type: SHOW_ERROR_MESSAGE, payload: `Password: ${err}` });
        });
      err.response.data.detail &&
        dispatch({ type: SHOW_ERROR_MESSAGE, payload: `Detail: ${err.response.data.detail}` });
    }
    dispatch(offLoading());
    dispatch(stopSubmit("LoginForm"));
    dispatch(reset("LoginForm"));
  }
};
// load user
export const load_user = () => async (dispatch, getState) => {
  try {
    const res = await axiosInstance.get("auth/users/me/", tokenConfig(getState));
    localStorage.setItem("de_user", res.data.username);
    dispatch({
      type: USER_LOADED_SUCCESS,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: USER_LOADED_FAIL
    });
  }
};

// CHANGE PASSWORD
export const change_password = ({
  current_password,
  new_password,
  re_new_password
}) => async (dispatch,getState) => {

  const body = { current_password, new_password, re_new_password };
  dispatch(setLoading());
  try {
    await axiosInstance.post("/auth/users/set_password/", body, tokenConfig(getState));
    dispatch({
      type: PASSWORD_CHANGE_SUCCESS
    });
    dispatch({ type: SHOW_SUCCESS_MESSAGE, payload: "Password Change Success" });
  } catch (err) {
    dispatch({ type: PASSWORD_CHANGE_FAIL });
    dispatch({ type: SHOW_ERROR_MESSAGE, payload: "Password Change Fail" })
  }
};

// logout
export const logout = () => dispatch => {
  dispatch({
    type: LOGOUT,
    messageInfo: "Account Logged out"
  });
  dispatch({
    type: SHOW_SUCCESS_MESSAGE,
    payload: "Account Logged out"
  })
};

// signup
export const signup = ({ first_name, last_name, email, password }) => async dispatch => {
  dispatch(setLoading());
  const body = { first_name, last_name, email, password };
  try {
    const res = await axiosInstance.post("auth/users/", body);
    dispatch({
      type: SIGNUP_SUCCESS,
      payload: res.data
    });
    dispatch({
      type: SHOW_SUCCESS_MESSAGE,
      payload: "Account Created: Please check your email to verify your account."
    });
    dispatch(stopSubmit("SignupForm"));
    dispatch(reset("SignupForm"));
    dispatch(offLoading());
  } catch (err) {
    dispatch(setLoading());
    dispatch({ type: SIGNUP_FAIL });
    if (err.response.data) {
      err.response.data.email &&
        err.response.data.email.map(err => {
          return dispatch({ type: SHOW_ERROR_MESSAGE, payload: `Email: ${err}` });
        });
      err.response.data.password &&
        err.response.data.password.map(err => {
          return dispatch({ type: SHOW_ERROR_MESSAGE, payload: `Password: ${err}` });
        });
      err.response.data.first_name &&
        err.response.data.first_name.map(err => {
          return dispatch({ type: SHOW_ERROR_MESSAGE, payload: `First Name: ${err}` });
        });
      err.response.data.last_name &&
        err.response.data.last_name.map(err => {
          return dispatch({ type: SHOW_ERROR_MESSAGE, payload: `Last Name: ${err}` });
        });
    }
    dispatch(offLoading());
    dispatch(stopSubmit("SignupForm"));
    dispatch(reset("SignupForm"));
  }
};

export const verify = ({ uid, token }) => async dispatch => {
  const body = { uid, token };
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };
  try {
    await axiosInstance.post("auth/users/activation/", body, config);
    dispatch({
      type: ACTIVATION_SUCCESS
    });
  } catch (err) {
    dispatch({
      type: ACTIVATION_FAIL
    });
  }
};

// request password change
export const reset_password = ({ email }) => async dispatch => {
  const body = { email };
  try {
    await axiosInstance.post("auth/users/reset_password/", body);
    dispatch({
      type: PASSWORD_RESET_SUCCESS
    });
    dispatch({
      type: SHOW_SUCCESS_MESSAGE,
      payload:
        "Password Reset: Please check your email if you have an account to reset your password."
    });
  } catch (err) {
    dispatch({
      type: PASSWORD_RESET_FAIL
    });
  }
};

export const fetchPersonalProfile = () => async (dispatch, getState) => {
  try {
    const res = await axiosInstance.get("accounts/profile/personal", tokenConfig(getState));
    dispatch({ type: FETCH_PERSONAL_PROFILE_SUCCESS, payload: res.data });
  } catch (error) {
    dispatch({ type: FETCH_PERSONAL_PROFILE_FAIL, payload: error.message });
  }
};

export const reset_password_confirm = (
  uid,
  token,
  new_password,
  re_new_password
) => async dispatch => {
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  const body = JSON.stringify({ uid, token, new_password, re_new_password });
  dispatch(setLoading());
  try {
    await axiosInstance.post("/auth/users/reset_password_confirm/", body, config);
    dispatch({
      type: PASSWORD_RESET_CONFIRM_SUCCESS
    });
    dispatch(offLoading());
    dispatch({ type: SHOW_SUCCESS_MESSAGE, payload: "Password Change Successfully" });
  } catch (err) {
    dispatch(offLoading());
    dispatch({
      type: PASSWORD_RESET_CONFIRM_FAIL
    });
    dispatch({ type: SHOW_SUCCESS_MESSAGE, payload: "Password Change Fail" });
  }
};

