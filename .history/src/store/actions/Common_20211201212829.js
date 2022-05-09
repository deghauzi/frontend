import * as actionType from "./ActionTypes";
import axiosInstance from 'util/api'

export const hideMessage = () => (dispatch) => {
    dispatch({
      type: actionType.HIDE_MESSAGE,
    });
  };

  export const verifyPaystack = (refcode) => async(dispatch) => {
    try{
      const res= await axiosInstance.get('/verify_transaction/?refcode='+ parseInt(refcode))
          dispatch({
            type:actionType.VERIFY_PAYSTACK,
            payload:res
          })
          console.log(res)
    }catch(error){
      console.log(error)
    }

  }
  export const setLoading = () => dispatch => dispatch({ type: actionType.FETCH_START });
  export const offLoading = () => dispatch => dispatch({ type: actionType.FETCH_ });