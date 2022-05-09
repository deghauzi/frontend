import React from "react";
import {useDispatch, useSelector} from 'react-redux'
import {withRouter} from 'react-router-dom'
import { logout } from "store/actions/Auth";
import {Avatar} from '@material-ui/core'
import { deepGreen, deepPurple } from '@material-ui/core/colors';
import {
  CDropdown,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
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

  import { makeStyles } from '@material-ui/core/styles';
  
  return (
    <CDropdown inNav className="c-header-nav-items mx-2" direction="down">
      <CDropdownToggle className="c-header-nav-link" caret={false}>
        <div className="c-avatar">
          <Avatar
            src={"user.username"}
            className="c-avatar-img"
            alt={user.username}
          />
          <Avatar sx={{ bgcolor: deepGreen[500] }}>{user.username}.substr(-2)</Avatar>
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
