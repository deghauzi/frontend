import * as actionTypes from "store/actions/ActionTypes"

const INITIAL_STATE = {
    dailyContributions: [],
    monthlyContributions:[],
    mainAccount:[],
    bonusAccount:[],
    
}


const auction = (state=INITIAL_STATE, action) => {
  switch (action.type) {
    case actionTypes.FETCH_CONTRIBUTION_DAILY_SUCCESS:
      return {
        ...state,
        dailyContributions: action.payload,
        isLoading: false
      };
    case actionTypes.FETCH_CONTRIBUTION_TARGET_SUCCESS :
      return {
        ...state,
        monthlyContributions: action.payload,
        isLoading: false
      };
    case actionTypes.FETCH_BANK_MAIN_SUCCESS:
      return {
        ...state,
        mainAccount: action.payload,
        isLoading: false
      };
    case actionTypes.FETCH_BANK_BONUS_SUCCESS:
      return {
        ...state,
        bonusAccount: action.payload,
        isLoading: false
      };
    case actionTypes.FETCH_CONTRIBUTION_TARGET_FAIL:
    case actionTypes.FETCH_CONTRIBUTION_DAILY_FAIL:
    case actionTypes.FETCH_BANK_MAIN_FAIL:
    case actionTypes.FETCH_BANK_BONUS_FAIL:
      return {
        ...state,
        isLoading: true
      };
    default:
      return state;
  }
}

export default auction;