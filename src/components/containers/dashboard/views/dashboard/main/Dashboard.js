import React, { lazy, useEffect } from "react";


const WidgetsDropdown = lazy(() => import("../../widgets/WidgetsDropdown.js"));

const Dashboard = () => {

  useEffect(() => {
    document.title = "De-Ghauzi | Dashboard";
  
  }, []);

  return (
    <>
      <div>
        <WidgetsDropdown />
      </div>
    </>
  );
};

export default Dashboard;
