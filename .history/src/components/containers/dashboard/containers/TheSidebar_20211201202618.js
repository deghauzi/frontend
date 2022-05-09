import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { toggleDashboardSideNav} from 'store/actions/Settings';
import {
  CCreateElement,
  CSidebar,
  CSidebarBrand,
  CSidebarNav,
  CSidebarNavDivider,
  CSidebarNavTitle,
  CSidebarMinimizer,
  CSidebarNavDropdown,
  CSidebarNavItem,
} from '@coreui/react'
import { makeStyles } from '@material-ui/core/styles';
import Account_Logo from "assets/images/homepage/platinum.jpg";
import CIcon from '@coreui/icons-react'
import {Avatar} from '@material-ui/core'
// sidebar nav config
import navigation from './_nav'



  const TheSidebar = () => {
  const dispatch = useDispatch()
  const authState = useSelector(state => state.authReducer);
  const { user } = authState;
  const useStyles = makeStyles((theme) => ({
    large: {
      width: theme.spacing(9),
      height: theme.spacing(7.5),
      marginTop: 2,
      marginBottom: 1
    },
  }));
  const show = useSelector(state => state.settings)
  const {sidebarShow} = show
  const classes = useStyles();
  return (
    <CSidebar
      show={sidebarShow}
      onShowChange={() =>{dispatch(toggleDashboardSideNav())}}
    >
      <CSidebarBrand className="d-md-down-none" to="/">
        <CIcon
          className="c-sidebar-brand-full"
          name="logo-negative"
          height={5}
        />
        <CIcon
          className="c-sidebar-brand-minimized"
          name="sygnet"
          height={5}
        />
      </CSidebarBrand>
      <CSidebarNav>

        <CCreateElement
          items={navigation}
          components={{
            CSidebarNavDivider,
            CSidebarNavDropdown,
            CSidebarNavItem,
            CSidebarNavTitle
          }}
        />  
      </CSidebarNav>
      <div className="account_logo_type">
          <Avatar
            src={Account_Logo}
            className={classes.large} 
            alt={"user.username"}
          />
        </div>
    </CSidebar>
  )
}

export default React.memo(TheSidebar)
