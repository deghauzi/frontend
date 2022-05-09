import React from 'react';

const Dashboard = React.lazy(() => import('./views/dashboard/main/Dashboard'));
// const Profile = React.lazy(() => import('./views/dashboard/user/Profile'))
const ChangePassword = React.lazy(() => import("./views/dashboard/user/ChangePassword"));
const daily = React.lazy(() => import('./views/dashboard/contributions/Daily'))
const monthly = React.lazy(() => import('./views/dashboard/contributions/Monthly'))
const projectForm = React.lazy(() => import('./views/dashboard/contributions/WithdrawalForm'))


const routes = [
  {
    path: "/",
    exact: true,
    name: "Home"
  },
  { path: "/dashboard", name: "Dashboard", component: Dashboard, exact: true },
  // {
  //   path: "/dashboard/profile/",
  //   name: "Profile",
  //   component: Profile,
  //   exact: true
  // },
  {
    path: "/dashboard/settings/profile/ChangePassword",
    name: "Change Password",
    component: ChangePassword
  },

  { path: "/dashboard/contribution/daily", name: "Daily Contribution", component: daily },
  { path: "/dashboard/contribution/monthly", name: "Monthly Contribution", component: monthly },
  { path: "/dashboard/contribution/withdrawal", name: "Withdrawal Request", component: projectForm }
];


export default routes;