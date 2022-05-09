import * as actionTypes from "./ActionTypes"
import axiosInstance  from 'util/api'
import { tokenConfig } from 'util/TokenConfig';
import { setLoading,offLoading } from './Common';




// FETCH DailyContributions
export const fetchDailyContributions = () => async(dispatch,getState) => {
  dispatch(setLoading())
try {
  const res = await axiosInstance.get("trans/get_daily_trans",tokenConfig(getState))
  dispatch({type: actionTypes.FETCH_CONTRIBUTION_DAILY_SUCCESS, payload: res.data});
  dispatch(offLoading());
} catch (error) {
  dispatch({type: actionTypes.FETCH_CONTRIBUTION_DAILY_FAIL,payload: error});
  dispatch({type:actionTypes.FETCH_ERROR})
}
}

// FETCH MonthlyContributions
export const fetchMonthlyContributions = () => async(dispatch, getState) =>{
  dispatch(setLoading())
try {
  const res = await axiosInstance.get("trans/get_target_trans", tokenConfig(getState))
  dispatch({type: actionTypes.FETCH_CONTRIBUTION_TARGET_SUCCESS , payload: res.data});
  dispatch(offLoading());
} catch (error) {
  dispatch({type: actionTypes.FETCH_CONTRIBUTION_TARGET_FAIL, payload: error});
  dispatch({type:actionTypes.FETCH_ERROR})
}
}

// FETCH MAIN ACCOUNT
export const fetchBankAccountMain = () => async(dispatch, getState) =>{
  dispatch(setLoading())
try {
  const res = await axiosInstance.get("account/get_bank_account", tokenConfig(getState))
  dispatch({type: actionTypes.FETCH_BANK_MAIN_SUCCESS , payload: res.data});
  dispatch(offLoading());
} catch (error) {
  dispatch({type: actionTypes.FETCH_BANK_MAIN_FAIL, payload: error});
  dispatch({type:actionTypes.FETCH_ERROR})
}
}

// FETCH BONUS WALLET
export const fetchBankAccountBonus = () => async(dispatch, getState) =>{
  dispatch(setLoading())
try {
  const res = await axiosInstance.get("account/get_bonus_account", tokenConfig(getState))
  dispatch({type: actionTypes.FETCH_BANK_BONUS_SUCCESS , payload: res.data});
  dispatch(offLoading());
} catch (error) {
  dispatch({type: actionTypes.FETCH_BANK_BONUS_FAIL, payload: error});
  dispatch({type:actionTypes.FETCH_ERROR})
}
}

