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
import Logo from "assets/images/homepage/logopngs.png";
import CIcon from '@coreui/icons-react'
import {Avatar} from '@material-ui/core'
// sidebar nav config
import navigation from './_nav'



  const TheSidebar = () => {
  const dispatch = useDispatch()
  const authState = useSelector(state => state.authReducer);
  const { user } = authState;
  const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      '& > *': {
        margin: theme.spacing(1),
      },
    },
    small: {
      width: theme.spacing(3),
      height: theme.spacing(3),
    },
    large: {
      width: theme.spacing(10),
      height: theme.spacing(10),
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
        {/* <img src ={Logo} alt= 'logo' className="logo c-sidebar-brand-full"
              style={{ width: "100px" }}  name="logo-negative"/> */}
          <div className="c-avatar">
          <Avatar
            src={Logo}
            // className="c-avatar-img"
            className={classes.large} 
            alt={"user.username"}
          />
        </div>
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
      <CSidebarMinimizer className="c-d-md-down-none"/>
    </CSidebar>
  )
}

export default React.memo(TheSidebar)
