import React from "react";
import {
  toggleDashboardSideNav,
  toggleDashboardMobileSideNav
} from "store/actions/Settings";
import { useDispatch,useSelector } from "react-redux";

import {
  CHeader,
  CToggler,
  CHeaderBrand,
  CHeaderNav,
  CHeaderNavItem,
  CHeaderNavLink,
  CSubheader,
  CBreadcrumbRouter,
  CLink
} from "@coreui/react";
import CIcon from "@coreui/icons-react";

// routes config
import routes from "../routes";

import {
  TheHeaderDropdown,
  TheHeaderDropdownMssg
} from "./index";

const TheHeader = () => {
  const dispatch = useDispatch();
  const User = useSelector(state => state.authReducer.user)

  const toggleSidebar = () => {
    dispatch(toggleDashboardSideNav());
  };

  const toggleSidebarMobile = () => {
    dispatch(toggleDashboardMobileSideNav());
  };

  return (
    <CHeader withSubheader>
      <CToggler
        inHeader
        className="ml-md-3 d-lg-none"
        onClick={toggleSidebarMobile}
      />
      <CToggler
        inHeader
        className="ml-3 d-md-down-none"
        onClick={toggleSidebar}
      />
      <CHeaderBrand className="mx-auto d-lg-none" to="/">
        <CIcon name="logo" height="48" alt="Logo" />
      </CHeaderBrand>

      <CHeaderNav className="d-md-down-none mr-auto">
        <CHeaderNavItem className="px-3">
          <CHeaderNavLink to="/dashboard">Dashboard</CHeaderNavLink>
        </CHeaderNavItem>
      </CHeaderNav>
      <CHeaderNav className="px-3">
        <TheHeaderDropdownMssg />
        <TheHeaderDropdown />
      </CHeaderNav>

      <CSubheader className="px-3 justify-content-between">
        <CBreadcrumbRouter
          className="border-0 c-subheader-nav m-0 px-0 px-md-3"
          routes={routes}
        />
        <div className="d-md-down-none mfe-2 c-subheader-nav">
          <CLink className="c-subheader-nav-link" href="#">
          {User == null ? null : <p>Welcome: <span><strong> {User.username.charAt(0).toUpperCase() + User.username.slice(1)}</strong></span></p>}
          </CLink>
        </div>
      </CSubheader>
    </CHeader>
  );
};

export default TheHeader;
