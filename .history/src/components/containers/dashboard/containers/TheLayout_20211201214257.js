import React, { useEffect } from "react";
import { TheContent, TheSidebar, TheFooter, TheHeader } from "./index";
import { useDispatch, useSelector } from "react-redux";
import { ReactComponent as LoaderSpinn } from "assets/images/244.svg";
import { load_user } from 'store/actions/Auth.js';
import { fetchBankAccountBonus,fetchBankAccountMain } from "store/actions/Contributions";



const TheLayout = () => {
  const dispatch = useDispatch();
  // const isLoading = useSelector(state => state.commonReducer.loading);
  useEffect(() => {
    // dispatch(load_user());
    // dispatch(fetchBankAccountBonus());
    dispatch(fetchBankAccountMain());
  }, [])


  return (
    <div className="c-app c-default-layout">
      <TheSidebar />
      <div className="c-wrapper">
        <div className="c-body">
          <TheHeader />
          <TheContent />
        </div>
        <TheFooter />
      </div>
    </div>
  );
};

export default TheLayout;