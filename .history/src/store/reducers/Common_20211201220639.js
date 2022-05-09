import {
    SHOW_SUCCESS_MESSAGE,
    HIDE_MESSAGE,
    SHOW_ERROR_MESSAGE,
    OFF_LOADING,
    LOADING
  } from "../actions/ActionTypes";
  

  const initialState = {
    error: true,
    Message: "",
    showMessage: false,
    loading: false
  };

  const common = (state = initialState, action) => {
    const { type, payload } = action;

    switch (type) {
        case SHOW_SUCCESS_MESSAGE:
        return {
            ...state, showMessage: true, Message:payload, error: false,
        }
        case SHOW_ERROR_MESSAGE:
        return {
            ...state, showMessage: true, Message:payload, error: true,
        }
        case HIDE_MESSAGE:
        return {
            ...state, showMessage: false, Message: " ", 
        }
        case LOADING:
        return {
            ...state, loading:true
        }
        case OFF_LOADING:
        return {
            ...state, loading:false
        } 
        default:
            return state;
    }
  }

export default common;