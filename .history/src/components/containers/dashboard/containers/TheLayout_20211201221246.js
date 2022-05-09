import React, { useEffect } from "react";
import { TheContent, TheSidebar, TheFooter, TheHeader } from "./index";
import { useDispatch} from "react-redux";
import { load_user } from 'store/actions/Auth.js';
import { fetchBankAccountBonus,fetchBankAccountMain } from "store/actions/Contributions";



const TheLayout = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(load_user());
    dispatch(fetchBankAccountBonus());
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