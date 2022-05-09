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
  const account_image = useSelector(state => state.authReducer);
  const { mainAccount } = account_image;
  const useStyles = makeStyles((theme) => ({
    large: {
      width: theme.spacing(20),
      height: theme.spacing(20),
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
      const mainAccountBal =
    mainAccount.length && mainAccount.map(acc =>{
      return(
        <>
        <div className=" d-flex justify-content-between pr-3">
        <h4 className="font-weight-bold">Account No:{" "}{acc.bank_account_no}</h4>
        <span className="text-white  icon-position">
          <BiMoney className="fs-3" />
        </span>
      </div>
        <div className="d-block pr-3">
             <h4 className="mt-2 font-weight-bold">Available Balance: ₦{numeral(acc.bank_account_balance).format("0,0")}</h4>
             <p className="total-donations-received font-weight-bold">
               Account Type: {acc.bank_account_type['name']}
             </p>
           </div> 
           </>
      )
    })
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
