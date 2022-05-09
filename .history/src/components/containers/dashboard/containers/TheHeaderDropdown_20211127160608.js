import React from "react";
import {useDispatch, useSelector} from 'react-redux'
import {withRouter} from 'react-router-dom'
import { logout } from "store/actions/Auth";
import {Avatar} from '@material-ui/core'

import {
  CBadge,
  CDropdown,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
  CImg,
  CLink,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { freeSet } from '@coreui/icons'

const TheHeaderDropdown = ({history}) => {
  const dispatch = useDispatch();
  const authState = useSelector(state => state.authReducer)
  const {isAuthenticated,user} = authState;
  
  const logoutUser = () => {
    dispatch(logout());
    history.push('/');
  }


  // const profile_img = profile_user.length && profile_user.map(profile => profile.profile_image)
 
 
  
  return (
    <CDropdown inNav className="c-header-nav-items mx-2" direction="down">
      <CDropdownToggle className="c-header-nav-link" caret={false}>
        <div className="c-avatar">
          <Avatar
            src={user.username}
            className="c-avatar-img"
            alt="profile_image"
          />
        </div>
      </CDropdownToggle>

      <CDropdownMenu className="pt-0" placement="bottom-end">
        <CDropdownItem>
          <CIcon content={freeSet.cilSpeedometer} className="mfe-2" />
          <CLink
            className="c-subheader-nav-link"
            aria-current="page"
            to="/dashboard"
          >
            Dashboard
          </CLink>
        </CDropdownItem>
        <CDropdownItem>
          <CLink
            className="c-subheader-nav-link"
            aria-current="page"
            to="/dashboard/profile"
          >
            <CIcon name="cil-user" className="mfe-2" />
            Profile
          </CLink>
        </CDropdownItem>
        <CDropdownItem divider />
        <CDropdownItem onClick={logoutUser}>
          <CIcon name="cil-lock-locked" className="mfe-2" />
          {isAuthenticated ? "Log out" : "Login"}
        </CDropdownItem>
      </CDropdownMenu>
    </CDropdown>
  );
};

export default withRouter(TheHeaderDropdown);
