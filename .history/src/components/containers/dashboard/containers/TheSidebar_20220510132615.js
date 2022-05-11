import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { toggleDashboardSideNav } from "store/actions/Settings";
import {
  CCreateElement,
  CSidebar,
  CSidebarBrand,
  CSidebarNav,
  CSidebarNavDivider,
  CSidebarNavTitle,
  CSidebarNavDropdown,
  CSidebarNavItem
} from "@coreui/react";
import { makeStyles } from "@material-ui/core/styles";
import Account_Logo from "assets/images/homepage/platinum.jpg";
import CIcon from "@coreui/icons-react";
import { Avatar } from "@material-ui/core";
// sidebar nav config
import navigation from "./_nav";

const TheSidebar = () => {
  const dispatch = useDispatch();
  const account_image = useSelector(state => state.contributionReducer);
  const { mainAccount } = account_image;
  const image =
    mainAccount.length &&
    mainAccount.map(acc => {
      return acc.bank_account_type["name"];
    });
  console.log(image);
  const useStyles = makeStyles(theme => ({
    large: {
      width: theme.spacing(20),
      height: theme.spacing(20),
      marginTop: 2,
      marginBottom: 1
    }
  }));
  const show = useSelector(state => state.settings);
  const { sidebarShow } = show;
  const classes = useStyles();
  return <CSidebar show={sidebarShow} onShowChange={() => {
        dispatch(toggleDashboardSideNav());
      }}>
      <CSidebarBrand className="d-md-down-none" to="/">
        <h4 className="text-center">De-Ghauzi</h4>
        <CIcon className="c-sidebar-brand-minimized" name="sygnet" height={10} />
      </CSidebarBrand>
      <CSidebarNav>
        <CCreateElement items={navigation} components={{ CSidebarNavDivider, CSidebarNavDropdown, CSidebarNavItem, CSidebarNavTitle }} />
      </CSidebarNav>
      {image == "Diamond" ? <div className="account_logo_type">
            <Avatar src="https://deghauzimicrolending.com/wp-content/uploads/2021/10/IMG-20211026-WA0000.jpg" className={classes.large} alt="image-logo" />
          </div> : image == "Gold" ? <div className="account_logo_type">
              <Avatar src="https://deghauzimicrolending.com/wp-content/uploads/2021/10/IMG-20211025-WA0017.jpg" className={classes.large} alt="image-logo" />
            </div> : image == "Silver" ? <div className="account_logo_type">
                <Avatar src="https://deghauzimicrolending.com/wp-content/uploads/2021/11/silver.jpg" className={classes.large} alt="image-logo" />
              </div> : image == "Platinum" ? <div className="account_logo_type">
                  <Avatar src="https://deghauzimicrolending.com/wp-content/uploads/2021/10/IMG-20211025-WA0016.jpg" className={classes.large} alt="image-logo" />
                </div> : <div className="account_logo_type">
                  <Avatar src="https://deghauzimicrolending.com/wp-content/uploads/2021/10/logo.png" className={classes.large} alt="image-logo" />
                </div>}
    </CSidebar>;
};

export default React.memo(TheSidebar);
