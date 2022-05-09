import React from "react";
import {useDispatch, useSelector} from 'react-redux'
import {withRouter} from 'react-router-dom'
import { logout } from "store/actions/Auth";
import {Avatar} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
// import { deepGreen, deepPurple } from '@material-ui/core/colors';
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
  const useStyles = makeStyles((theme) => ({
    orange: {
      color: theme.palette.getContrastText("#0B5B37"),
      backgroundColor: "#0B5B37",
    },

  }));
  const logoutUser = () => {
    dispatch(logout());
    history.push('/');
  }

  const classes = useStyles();
  return (
    <CDropdown inNav className="c-header-nav-items mx-2" direction="down">
      <CDropdownToggle className="c-header-nav-link" caret={false}>
        <div className="c-avatar">
          <Avatar className={classes.orange}>{user.username.substring(0,1).c}</Avatar>
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
