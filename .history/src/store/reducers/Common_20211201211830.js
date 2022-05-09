import {
    SHOW_SUCCESS_MESSAGE,
    HIDE_MESSAGE,
    SHOW_ERROR_MESSAGE,
    FETCH_SUCCESS,
    FETCH_START,
    FETCH_ERROR
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
        case FETCH_START:
        return {
            ...state, loading:true
        }
        case FETCH_SUCCESS:
        return {
            ...state, loading:false
        } 
        case FETCH_ERROR:
        return {
            ...state, loading:true
        } 
        default:
            return state;
    }
  }

export default common;