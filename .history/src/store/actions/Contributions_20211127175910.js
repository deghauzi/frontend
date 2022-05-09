import * as actionTypes from "./ActionTypes"
import axiosInstance  from 'util/api'
import { tokenConfig } from 'util/TokenConfig';





// FETCH DailyContributions
export const fetchDailyContributions = () => async(dispatch,getState) => {
try {
  const res = await axiosInstance.get("account/get_trans",tokenConfig(getState))
  dispatch({type: actionTypes.FETCH_CONTRIBUTION_DAILY_SUCCESS, payload: res.data});
} catch (error) {
  dispatch({type: actionTypes.FETCH_CONTRIBUTION_DAILY_FAIL,payload: error});
}
}

// FETCH MonthlyContributions
export const fetchMonthlyContributions = () => async(dispatch, getState) =>{
try {
  const res = await axiosInstance.get("account/get_contribution", tokenConfig(getState))
  dispatch({type: actionTypes.FETCH_CONTRIBUTION_TARGET_SUCCESS , payload: res.data});
} catch (error) {
  dispatch({type: actionTypes.FETCH_CONTRIBUTION_TARGET_FAIL, payload: error});
}
}
export const fetchMonthlyContributions = () => async(dispatch, getState) =>{
try {
  const res = await axiosInstance.get("account/get_contribution", tokenConfig(getState))
  dispatch({type: actionTypes.FETCH_CONTRIBUTION_TARGET_SUCCESS , payload: res.data});
} catch (error) {
  dispatch({type: actionTypes.FETCH_CONTRIBUTION_TARGET_FAIL, payload: error});
}
}

