import * as actionTypes from "../actions/ActionTypes";

const initialState = {
  navCollapsed: false,
  sidebarShow: "responsive"
};

const settings = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.TOGGLE_COLLAPSED_NAV:
      return {
        ...state,
        navCollapsed: !state.navCollapsed
      };

    case actionTypes.TOGGLE_DASHBOARD_SIDENAV:
      const val = [true, "responsive"].includes(state.sidebarShow)
        ? false
        : "responsive";
      return {
        ...state,
        sidebarShow: val
      };
    case actionTypes.TOGGLE_DASHBOARD_MOBILE_SIDENAV:
      const responsiveVal = [false, "responsive"].includes(state.sidebarShow)
        ? true
        : "responsive";
      return {
        ...state,
        sidebarShow: responsiveVal
      };
    default:
      return state;
  }
};

export default settings;
